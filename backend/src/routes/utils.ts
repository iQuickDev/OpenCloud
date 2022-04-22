import { Router, Request, Response, NextFunction } from 'express'
import { JwtPayload, verify } from 'jsonwebtoken'
import FileManager from '../filemanager'
import path from 'path'
import fs from 'fs'
import vars from '../config/env-vars'
import checkDiskSpace from 'check-disk-space'
import { asyncWrapper } from '../helper'

const utils = Router()
const fileManager = new FileManager(path.join(__dirname, '../../files'))

interface ExtendedRequest extends Request {
    token?: JwtPayload | string
}

function validateRequest(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
) {
    const bearerHeader = req.headers['authorization'] as string
    if (bearerHeader) {
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = verify(bearerToken, vars.jwtPrivateKey)
        next()
    } else {
        res.sendStatus(401)
    }
}

utils.post(
    '/upload',
    validateRequest,
    asyncWrapper(async (req: Request, res: Response) => {
        const stream = fs.createWriteStream(
            fileManager.rootFolder + '/' + req.headers['x-name']
        )

        stream.on('open', () => req.pipe(stream))
        stream.on('close', () => {
            res.sendStatus(200)
        })
    })
)

utils.post(
    '/download',
    validateRequest,
    asyncWrapper((req: Request, res: Response) => {
        res.download(`${fileManager.rootFolder}/../files/${req.body.name}`)
    })
)

utils.post(
    '/delete',
    asyncWrapper(async (req: Request, res: Response) => {
        await fileManager.deleteFile(req.body.name)
        res.sendStatus(200)
    })
)

utils.post(
    '/details',
    asyncWrapper((req: Request, res: Response) => {
        res.json(fileManager.getDetails(req.body.name)).status(200)
    })
)

utils.get(
    '/diskspace',
    validateRequest,
    asyncWrapper(async (req: Request, res: Response) => {
        const infoSpace = await checkDiskSpace(
            path.resolve(__dirname, '../../files')
        )
        res.json({ infoSpace })
    })
)

utils.get(
    '/files',
    validateRequest,
    asyncWrapper((req: Request, res: Response) => {
        res.send(fileManager.getFiles())
    })
)

utils.post(
    '/mkdir',
    validateRequest,
    asyncWrapper(async (req: Request, res: Response) => {
        await fileManager.makeDirectory(req.body.name)
        res.sendStatus(200)
    })
)

utils.post(
    '/rmdir',
    validateRequest,
    asyncWrapper(async (req: Request, res: Response) => {
        await fileManager.deleteDirectory(req.body.name)
        res.sendStatus(200)
    })
)

export default utils

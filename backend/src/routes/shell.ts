import { Router, Request, Response } from 'express'
import { exec } from 'child_process'
import { asyncWrapper } from '../helper'
const shell = Router()
const allowedCmds = [
    'ls',
    'cat',
    'cd',
    'pwd',
    'rm',
    'mkdir',
    'touch',
    'mv',
    'cp',
    'find',
    'grep',
    'wc',
    'whoami',
    'tree',
    'id'
]

let workingDir: string = 'files'

exec('pwd', (err, stdout, stderr) => {
    workingDir = `${stdout.substring(0, stdout.length - 1)}/files`
})

shell.post('/exec', asyncWrapper((req: Request, res: Response) => {
    for (const cmd of allowedCmds) {
        if (req.body.command.includes(cmd)) {
            exec(
                `cd '${workingDir}/${req.body.workingDir}' && ${req.body.command}`,
                (err, stdout, stderr) => {
                    if (err) {
                        res.status(500).send(err)
                    } else {
                        res.send(stdout)
                    }
                }
            )
            return
        }
    }
    res.sendStatus(403)
}))

export default shell

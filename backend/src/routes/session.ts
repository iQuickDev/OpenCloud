import { Router, Request, Response } from 'express'
import { pick } from 'lodash'
import Database from '../db/database'
import { asyncWrapper } from '../helper'

const db = new Database()
const session = Router()

session.post(
    '/login',
    asyncWrapper(async (req: Request, res: Response) => {
        const resp = await db.login(pick(req.body, ['username', 'password']))
        if (resp !== 401) {
            return res.status(200).json({ token: resp })
        } else {
            return res.status(403).json({ message: 'Incorrect credentials!' })
        }
    })
)

export default session

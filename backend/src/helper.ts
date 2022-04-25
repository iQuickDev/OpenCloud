import { createLogger, transports, format } from 'winston'
import { Request, Response, NextFunction } from 'express'
import vars from './config/env-vars'

const { combine, printf, timestamp } = format

const loggerFormat = printf(({ level, message }) => {
    return `[${new Date()
        .toLocaleString('it')
        .replace(', ', ' - ')}] [${level.toUpperCase()}]: ${message}`
})

const logger = createLogger({
    format: combine(timestamp(), loggerFormat),
    transports: [new transports.File({ filename: './log/logs.log' })]
})

if (vars.mode === 'development') {
    console.log(process.env.NODE_ENV)
    logger.add(new transports.Console())
}

const asyncWrapper = (f: Function) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await f(req, res)
            logger.log({level: 'info', message: printRequest(req) as string})
        } catch (e: any) {
            logger.log({ level: 'error', message: e.message })
            res.status(500).json({ message: e.message })
            next()
        }
    }
}

function printRequest(req : Request)
{
    let message : String =
    `
SENDER: ${req.socket.remoteAddress?.substring(7)}
PATH: ${req.originalUrl} (${req.method})
    `
    return message
}

export { asyncWrapper }

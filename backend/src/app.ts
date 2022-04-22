import express from 'express'
import cors from 'cors'
import fs from 'fs'
import vars from './config/env-vars'
import session from './routes/session'
import utils from './routes/utils'
import shell from './routes/shell'
import httpsServer from 'https'
import path from 'path'
import connectHistory from 'connect-history-api-fallback'

const app = express()
const port = vars.port || 5555
app.use(connectHistory())
app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(express.static(`${__dirname}/../dist`))
;(async () => {
    try {
        app.use('/api/session', session)
        app.use('/api/utils', utils)
        app.use('/api/shell', shell)
        httpsServer
            .createServer(
                {
                    key: fs.readFileSync(
                        path.resolve(`${__dirname}/../TLS/key.pem`)
                    ),
                    cert: fs.readFileSync(
                        path.resolve(`${__dirname}/../TLS/cert.pem`)
                    )
                },
                app
            )
            .listen(port, () => {
                console.log(`https://quicksense.ddns.net:${port}`)
            })
    } catch (e) {
        console.error(e)
        process.exit(1)
    }
})()

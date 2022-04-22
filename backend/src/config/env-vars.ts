import * as dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })
const jwt: Secret = process.env.JWT_PRIVATE_KEY ?? ''
const rootFolder = process.env.FILES_FOLDER ?? ''
export default {
    port: process.env.PORT,
    mongoUsername: process.env.MONGO_USERNAME,
    mongoPassword: process.env.MONGO_PASSWORD,
    mode: process.env.NODE_ENV,
    jwtPrivateKey: jwt,
    rootFolder: path.join(__dirname, rootFolder)
}

import { connect } from 'mongoose'
import { sign } from 'jsonwebtoken'
import vars from '../config/env-vars'
import UsersModel from '../models/users.model'
import { pick } from 'lodash'
export default class Database {
    private User = UsersModel
    constructor() {
        connect(
            `mongodb+srv://${vars.mongoUsername}:${vars.mongoPassword}@cluster0.0ahln.mongodb.net/opencloud?retryWrites=true&w=majority`
        )
    }

    public async login(credentials: object): Promise<string | number> {
        const user = await this.User.findOne(credentials)
        if (!user) {
            return 401
        }
        return sign(pick(user, ['username', 'password']), vars.jwtPrivateKey)
    }
}

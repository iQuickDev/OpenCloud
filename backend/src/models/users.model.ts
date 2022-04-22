import { Schema, model, Document } from 'mongoose'

export interface UserDocument extends Document {
    username: string
    password: string
}

export default model<UserDocument>(
    'User',
    new Schema<UserDocument>({
        username: String,
        password: String
    })
)

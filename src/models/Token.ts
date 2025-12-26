import { Schema, Document, model, Types } from "mongoose"

export interface IToken extends Document {
    token: string
    user: Types.ObjectId
    createdAt: string
}

const TokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    },
    user: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: "30m"
    }
}, {versionKey: false})

const Token = model<IToken>("Token", TokenSchema)
export default Token
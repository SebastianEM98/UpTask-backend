import { Schema, Document, model } from "mongoose"

export interface IUser extends Document {
    email: string,
    password: string
    name: string
    confirmed: boolean
}

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

// Hides the __v in responses (remains on database)
UserSchema.set("toJSON", { versionKey: false })
UserSchema.set("toObject", { versionKey: false })

const User = model<IUser>("User", UserSchema)
export default User
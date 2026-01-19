import { Schema, Document, model, Types, PopulatedDoc } from "mongoose"
import { ITask } from "./Task"
import { IUser } from "./User"

export interface IComment extends Document {
    content: string
    createdBy: PopulatedDoc<IUser & Document>
    task: PopulatedDoc<ITask & Document>
}

export const CommentSchema: Schema = new Schema({
    content: {
        type: String,
        trim: true,
        required: true
    },
    createdBy: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    task: {
        type: Types.ObjectId,
        ref: "Task",
        required: true
    }
}, { timestamps: true })

// Hides the __v in responses (remains on database)
CommentSchema.set("toJSON", { versionKey: false })
CommentSchema.set("toObject", { versionKey: false })

const Comment = model<IComment>("Comment", CommentSchema)
export default Comment
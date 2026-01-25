import { Schema, Document, model, Types, PopulatedDoc } from "mongoose"
import { IUser } from "./User"
import Comment from "./Comment"

const taskStatus = {
    PENDING: "pending",
    ON_HOLD: "onHold",
    IN_PROGRESS: "inProgress",
    UNDER_REVIEW: "underReview",
    COMPLETED: "completed"
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask extends Document {
    name: string
    description: string
    project: PopulatedDoc<ITask & Document>
    status: TaskStatus
    statusUpdatedBy: {
        user: PopulatedDoc<IUser & Document>
        status: TaskStatus
    }[]
}

export const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    project: {
        type: Types.ObjectId,
        ref: "Project",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING
    },
    statusUpdatedBy: [
        {
            user: {
                type: Types.ObjectId,
                ref: "User",
                default: null
            },
            status: {
                type: String,
                enum: Object.values(taskStatus),
                default: taskStatus.PENDING
            }
        }
    ],
}, { timestamps: true })

// Hides the __v in responses (remains on database)
TaskSchema.set("toJSON", { versionKey: false })
TaskSchema.set("toObject", { versionKey: false })


// Schema Middleware
TaskSchema.pre('deleteOne', { document: true, query: false }, async function () {
    const taskId = this._id
    if (!taskId) return
    await Comment.deleteMany({ task: taskId })
})


const Task = model<ITask>("Task", TaskSchema)
export default Task
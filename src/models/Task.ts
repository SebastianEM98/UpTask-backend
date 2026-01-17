import { Schema, Document, model, Types, PopulatedDoc } from "mongoose"
import { IUser } from "./User"

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
    completedBy: PopulatedDoc<IUser & Document>
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
    completedBy: {
        type: Types.ObjectId,
        ref: "User",
        default: null
    },
}, { timestamps: true })

// Hides the __v in responses (remains on database)
TaskSchema.set("toJSON", { versionKey: false })
TaskSchema.set("toObject", { versionKey: false })

const Task = model<ITask>("Task", TaskSchema)
export default Task
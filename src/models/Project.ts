import { Schema, Document, model, PopulatedDoc } from "mongoose"
import { Types } from "mongoose"
import { IUser } from "./User"

export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    manager: PopulatedDoc<IUser & Document>
    team: PopulatedDoc<IUser & Document>[]
}

const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        trim: true,
        required: true
    },
    clientName: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    manager: {
        type: Types.ObjectId,
        ref: "User"
    },
    team: [
        {
            type: Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })

// Hides the __v in responses (remains on database)
ProjectSchema.set("toJSON", { versionKey: false })
ProjectSchema.set("toObject", { versionKey: false })

const Project = model<IProject>("Project", ProjectSchema)
export default Project
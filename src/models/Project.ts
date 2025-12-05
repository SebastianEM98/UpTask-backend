import { Schema, Document, model } from "mongoose"

export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
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
    }
}, { timestamps: true })

// Hides the __v in responses (remains on database)
ProjectSchema.set("toJSON", { versionKey: false })
ProjectSchema.set("toObject", { versionKey: false })

const Project = model<IProject>("Project", ProjectSchema)
export default Project
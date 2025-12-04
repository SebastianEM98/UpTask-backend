import { Request, Response, NextFunction } from "express"
import Project, { IProject } from "../models/Project"

declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}


export const validateProjectExists = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { projectId } = req.params
        const project = await Project.findById(projectId)

        if (!project) {
            return res.status(404).json({
                message: "Project Not Found"
            })
        }

        req.project = project
        next()

    } catch (error) {
        return res.status(500).json({
            message: "An error has occurred while validating the project's existence"
        })
    }

}
import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectContorller {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        try {
            const storedProject = await project.save()

            res.status(201).json({
                message: "Project Successfully Created"
            })

        } catch (error) {
            res.status(400).json({
                message: "An error occurred while creating the project"
            });
        }
    }


    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})

            res.status(200).json(projects)

        } catch (error) {
            res.status(400).json({
                message: "An error occurred while getting the projects"
            });
        }
    }
}
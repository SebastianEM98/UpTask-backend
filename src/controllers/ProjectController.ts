import type { Request, Response } from "express"
import Project, { IProject } from "../models/Project"

export class ProjectContorller {

    static createProject = async (req: Request, res: Response) => {
        try {
            const project = new Project(req.body)

            // Asign manager
            project.manager = req.user._id

            await project.save()

            return res.status(201).json({
                message: "Project Successfully Created"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while creating the project"
            })
        }
    }


    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: req.user._id },
                    { team: { $in: [req.user._id] } }
                ]
            })

            return res.status(200).json(projects)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the projects"
            })
        }
    }


    static getProjectById = async (req: Request, res: Response) => {

        if (req.project.manager.toString() !== req.user._id.toString() && !req.project.team.includes(req.user._id)) {
            return res.status(401).json({
                message: "You don't have access to this project"
            })
        }

        return res.status(200).json(req.project)
    }


    static updateProject = async (req: Request<{}, {}, IProject>, res: Response) => {
        try {
            const { clientName, projectName, description } = req.body

            req.project.clientName = clientName
            req.project.projectName = projectName
            req.project.description = description

            await req.project.save()

            return res.status(200).json({
                message: "Project Successfully Updated"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while updating the project"
            })
        }
    }


    static deleteProject = async (req: Request, res: Response) => {
        try {
            await req.project.deleteOne()

            return res.status(200).json({
                message: "Project Deleted"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while deleting the project"
            })
        }
    }
}
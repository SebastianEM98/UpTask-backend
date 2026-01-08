import type { Request, Response } from "express"
import Project from "../models/Project"

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
            const projects = await Project.find({ manager: req.user._id })

            return res.status(200).json(projects)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the projects"
            })
        }
    }


    static getProjectById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findById(id)

            if (!project) {
                return res.status(404).json({
                    message: "Project Not Found"
                })
            }

            if (project.manager.toString() !== req.user._id.toString()) {
                return res.status(401).json({
                    message: "Insufficient Permissions"
                })
            }

            return res.status(200).json(project)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the project by ID"
            })
        }
    }


    static updateProject = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            const project = await Project.findByIdAndUpdate(id, req.body, { runValidators: true })

            if (!project) {
                return res.status(404).json({
                    message: "Project Not Found"
                })
            }

            if (project.manager.toString() !== req.user._id.toString()) {
                return res.status(401).json({
                    message: "Insufficient Permissions"
                })
            }

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
            const { id } = req.params
            const project = await Project.findById(id)

            if (!project) {
                return res.status(404).json({
                    message: "Project Not Found"
                })
            }

            if (project.manager.toString() !== req.user._id.toString()) {
                return res.status(401).json({
                    message: "Insufficient Permissions"
                })
            }

            await project.deleteOne()

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
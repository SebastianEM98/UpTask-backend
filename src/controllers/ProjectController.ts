import type { Request, Response } from "express"
import Project from "../models/Project"

export class ProjectContorller {

    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body)

        try {
            await project.save()

            return res.status(201).json({
                message: "Project Successfully Created"
            })

        } catch (error) {
            return res.status(400).json({
                message: "An error occurred while creating the project"
            })
        }
    }


    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({})

            return res.status(200).json(projects)

        } catch (error) {
            return res.status(400).json({
                message: "An error occurred while getting the projects"
            })
        }
    }


    static getProjectById = async (req: Request, res: Response) => {
        const { id } = req.params
        
        try {
            const project = await Project.findById(id)

            if (!project) {
                return res.status(404).json({
                    message: "Project Not Found"
                })
            }

            return res.status(200).json(project)

        } catch (error) {
            return res.status(400).json({
                message: "An error occurred while getting the project by ID"
            })
        }
    }


    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params
        
        try {
            const project = await Project.findByIdAndUpdate(id, req.body)

            if (!project) {
                return res.status(404).json({
                    message: "Project Not Found"
                })
            }

            return res.status(200).json({
                message: "Project Successfully Updated"
            })

        } catch (error) {
            return res.status(400).json({
                message: "An error occurred while updating the project"
            })
        }
    }


    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params
        
        try {
            const project = await Project.findById(id)

            if (!project) {
                return res.status(404).json({
                    message: "Project Not Found"
                })
            }

            await project.deleteOne()

            return res.status(200).json({
                message: "Project Deleted"
            })

        } catch (error) {
            return res.status(400).json({
                message: "An error occurred while deleting the project"
            })
        }
    }
}
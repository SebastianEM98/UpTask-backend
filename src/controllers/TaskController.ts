import type { Request, Response } from "express"
import Project from "../models/Project"
import Task from "../models/Task"

export class TaskController {

    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body)
            task.project = req.project._id
            await task.save()

            return res.status(201).json({
                message: "Task Successfully Created"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while creating the task",
                error
            })
        }
    }


    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const projectTasks = await Task.find({ project: req.project._id }).populate('project', '-__v')

            return res.status(200).json(projectTasks)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the project tasks",
                error
            })
        }
    }
}
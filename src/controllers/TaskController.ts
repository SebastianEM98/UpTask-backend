import type { Request, Response } from "express"
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
            const projectTasks = await Task.find({ project: req.project._id }).populate('project')

            return res.status(200).json(projectTasks)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the project tasks",
                error
            })
        }
    }


    static getTasksById = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findOne({ _id: taskId, project: req.project._id })

            if (!task) {
                return res.status(404).json({
                    message: "Task Not Found"
                })
            }

            return res.status(200).json(task)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the task",
                error
            })
        }
    }


    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findOneAndUpdate({ _id: taskId, project: req.project._id }, req.body, { runValidators: true })

            if (!task) {
                return res.status(404).json({
                    message: "Task Not Found"
                })
            }

            return res.status(200).json({
                message: "Task Successfully Updated"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while updating the task"
            })
        }
    }


    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { taskId } = req.params
            const task = await Task.findOne({ _id: taskId, project: req.project._id })

            if (!task) {
                return res.status(404).json({
                    message: "Task Not Found"
                })
            }

            await task.deleteOne()

            return res.status(200).json({
                message: "Task Deleted"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while deleting the task",
                error
            })
        }
    }
}
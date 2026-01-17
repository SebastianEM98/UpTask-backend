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
                message: "An error occurred while creating the task"
            })
        }
    }


    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            const projectTasks = await Task.find({ project: req.project._id })

            return res.status(200).json(projectTasks)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the project tasks"
            })
        }
    }


    static getTasksById = async (req: Request, res: Response) => {
        try {
            const task = await req.task.populate("statusUpdatedBy.user", "_id name email")

            return res.status(200).json(task)
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the task"
            })
        }
    }


    static updateTask = async (req: Request, res: Response) => {
        try {
            const task = req.task
            await task.updateOne(req.body)

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
            const task = req.task
            await task.deleteOne()

            return res.status(200).json({
                message: "Task Deleted"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while deleting the task"
            })
        }
    }


    static updateStatus = async (req: Request, res: Response) => {
        try {
            const task = req.task
            const { status } = req.body

            task.status = status

            const data = {
                user: req.user._id,
                status
            }

            req.task.statusUpdatedBy.push(data)
            
            await task.save()

            return res.status(200).json({
                message: "Task Status Successfully Updated"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while updating the task's status"
            })
        }
    }
}
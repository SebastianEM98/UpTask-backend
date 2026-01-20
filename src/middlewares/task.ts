import { Request, Response, NextFunction } from "express"
import Task, { ITask } from "../models/Task"

declare global {
    namespace Express {
        interface Request {
            task: ITask
        }
    }
}


export const taskExists = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { taskId } = req.params
        const task = await Task.findOne({ _id: taskId, project: req.project._id })

        if (!task) {
            return res.status(404).json({
                message: "Task Not Found"
            })
        }

        req.task = task
        next()

    } catch (error) {
        return res.status(500).json({
            message: "An error has occurred while validating the task's existence"
        })
    }

}

export const isManager = async (req: Request, res: Response, next: NextFunction) => {
    if (req.user._id.toString() !== req.project.manager.toString()) {
        return res.status(401).json({
            message: "Insufficient Permissions - Not manager"
        })
    }
    next()
}
import { Request, Response, NextFunction } from "express"
import Comment, { IComment } from "../models/Comment"
import { Types } from "mongoose"

declare global {
    namespace Express {
        interface Request {
            comment: IComment
        }
    }
}

type CommentParams = {
    commentId: Types.ObjectId
}

export const commentExists = async (req: Request<CommentParams>, res: Response, next: NextFunction) => {

    try {
        const { commentId } = req.params
        const comment = await Comment.findOne({ _id: commentId, task: req.task._id })

        if (!comment) {
            return res.status(404).json({
                message: "Comment Not Found"
            })
        }

        req.comment = comment
        next()

    } catch (error) {
        return res.status(500).json({
            message: "An error has occurred while validating the comment's existence"
        })
    }
}

export const hasAuthtorization = async (req: Request, res: Response, next: NextFunction) => {

    if (req.user._id.toString() !== req.project.manager.toString() && !req.project.team.includes(req.user._id)) {
        return res.status(401).json({
            message: "Insufficient Permissions"
        })
    }

    if (req.method === 'DELETE') {
        if (req.comment.createdBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({
                message: "Insufficient Permissions"
            })
        }
    }

    next()
}
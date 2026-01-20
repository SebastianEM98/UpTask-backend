import type { Request, Response } from "express"
import Comment, { IComment } from "../models/Comment"
import { Types } from "mongoose"

type CommentParams = {
    commentId: Types.ObjectId
}


export class CommentController {

    static createComment = async (req: Request<{}, {}, IComment>, res: Response) => {
        try {
            const { content } = req.body

            const comment = new Comment()

            comment.content = content
            comment.createdBy = req.user._id
            comment.task = req.task._id

            await comment.save()

            return res.status(201).json({
                message: "Comment Successfully Created"
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while creating the comment"
            })
        }
    }


    static getTaskComments = async (req: Request, res: Response) => {
        try {
            const comments = await Comment.find({ task: req.task._id }).populate("createdBy", "_id name email")

            return res.status(200).json(comments)

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while getting the task comments"
            })
        }
    }


    static deleteComment = async (req: Request<CommentParams>, res: Response) => {
        try {
            const comment = req.comment

            await comment.deleteOne()

            return res.status(200).json({
                message: "Comment Deleted"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while deleting the comment"
            })
        }
    }
}
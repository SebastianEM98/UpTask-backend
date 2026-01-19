import type { Request, Response } from "express"
import Comment, { IComment } from "../models/Comment"


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
}
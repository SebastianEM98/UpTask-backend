import { Router } from "express"
import { handleValidationErrors } from "../middlewares/validation"
import { projectExists } from "../middlewares/projectExists"
import { taskExists } from "../middlewares/task"
import { createCommentValidationRules, deleteCommentValidationRules } from "../helpers/commentValidator"
import { CommentController } from "../controllers/CommentController"
import { IdsParamsValidationRules } from "../helpers/taskValidator"
import { commentExists, hasAuthtorization } from "../middlewares/comment"

const router = Router()

// Routes
router.post('/:projectId/tasks/:taskId/comments', createCommentValidationRules, handleValidationErrors, projectExists, taskExists, hasAuthtorization, CommentController.createComment)
router.get('/:projectId/tasks/:taskId/comments', IdsParamsValidationRules, handleValidationErrors, projectExists, taskExists, hasAuthtorization, CommentController.getTaskComments)
router.delete('/:projectId/tasks/:taskId/comments/:commentId', deleteCommentValidationRules, handleValidationErrors, projectExists, taskExists, commentExists, hasAuthtorization, CommentController.deleteComment)


export default router
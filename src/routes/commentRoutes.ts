import { Router } from "express"
import { handleValidationErrors } from "../middlewares/validation"
import { projectExists } from "../middlewares/projectExists"
import { taskExists } from "../middlewares/task"
import { createCommentValidationRules } from "../helpers/commentValidator"
import { CommentController } from "../controllers/CommentController"

const router = Router()

// Routes
router.post('/:projectId/tasks/:taskId/comments', createCommentValidationRules, handleValidationErrors, projectExists, taskExists, CommentController.createComment)


export default router
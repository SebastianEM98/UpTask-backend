import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { taskParamsAndBodyValidationRules } from "../helpers/taskValidator"
import { handleValidationErrors } from "../middlewares/validation"
import { validateProjectExists } from "../middlewares/project"

const router = Router()

// Routes
router.post('/:projectId/tasks', taskParamsAndBodyValidationRules, handleValidationErrors, validateProjectExists, TaskController.createTask)


export default router
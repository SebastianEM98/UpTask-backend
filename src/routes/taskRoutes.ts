import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { taskParamsAndBodyValidationRules, taskParamsValidationRules } from "../helpers/taskValidator"
import { handleValidationErrors } from "../middlewares/validation"
import { validateProjectExists } from "../middlewares/project"

const router = Router()

// Routes
router.post('/:projectId/tasks', taskParamsAndBodyValidationRules, handleValidationErrors, validateProjectExists, TaskController.createTask)
router.get('/:projectId/tasks', taskParamsValidationRules, handleValidationErrors, validateProjectExists, TaskController.getProjectTasks)


export default router
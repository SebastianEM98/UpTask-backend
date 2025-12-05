import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { taskParamsAndBodyValidationRules, projectIdParamValidationRule, taskIdParamsValidationRules } from "../helpers/taskValidator"
import { handleValidationErrors } from "../middlewares/validation"
import { validateProjectExists } from "../middlewares/project"

const router = Router()

// Routes
router.post('/:projectId/tasks', taskParamsAndBodyValidationRules, handleValidationErrors, validateProjectExists, TaskController.createTask)
router.get('/:projectId/tasks', projectIdParamValidationRule, handleValidationErrors, validateProjectExists, TaskController.getProjectTasks)
router.get('/:projectId/tasks/:taskId', taskIdParamsValidationRules, handleValidationErrors, validateProjectExists, TaskController.getTasksById)


export default router
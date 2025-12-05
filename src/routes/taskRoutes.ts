import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { createTaskValidationRules, projectIdValidationRule, IdsParamsValidationRules, updateTaskValidationRules } from "../helpers/taskValidator"
import { handleValidationErrors } from "../middlewares/validation"
import { validateProjectExists } from "../middlewares/project"

const router = Router()

// Routes
router.post('/:projectId/tasks', createTaskValidationRules, handleValidationErrors, validateProjectExists, TaskController.createTask)
router.get('/:projectId/tasks', projectIdValidationRule, handleValidationErrors, validateProjectExists, TaskController.getProjectTasks)
router.get('/:projectId/tasks/:taskId', IdsParamsValidationRules, handleValidationErrors, validateProjectExists, TaskController.getTasksById)
router.put('/:projectId/tasks/:taskId', updateTaskValidationRules, handleValidationErrors, validateProjectExists, TaskController.updateTask)
router.delete('/:projectId/tasks/:taskId', IdsParamsValidationRules, handleValidationErrors, validateProjectExists, TaskController.deleteTask)


export default router
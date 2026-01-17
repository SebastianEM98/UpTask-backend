import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { createTaskValidationRules, projectIdValidationRule, IdsParamsValidationRules, updateTaskValidationRules, updateTaskStatusValidationRules } from "../helpers/taskValidator"
import { handleValidationErrors } from "../middlewares/validation"
import { projectExists } from "../middlewares/projectExists"
import { hasAuthtorization, taskExists } from "../middlewares/task"

const router = Router()

// Routes
router.post('/:projectId/tasks', createTaskValidationRules, handleValidationErrors, projectExists, hasAuthtorization, TaskController.createTask)
router.get('/:projectId/tasks', projectIdValidationRule, handleValidationErrors, projectExists, TaskController.getProjectTasks)
router.get('/:projectId/tasks/:taskId', IdsParamsValidationRules, handleValidationErrors, projectExists, taskExists, TaskController.getTasksById)
router.put('/:projectId/tasks/:taskId', updateTaskValidationRules, handleValidationErrors, projectExists, taskExists, hasAuthtorization, TaskController.updateTask)
router.delete('/:projectId/tasks/:taskId', IdsParamsValidationRules, handleValidationErrors, projectExists, taskExists, hasAuthtorization, TaskController.deleteTask)
router.post('/:projectId/tasks/:taskId/status', updateTaskStatusValidationRules, handleValidationErrors, projectExists, taskExists, TaskController.updateStatus)


export default router
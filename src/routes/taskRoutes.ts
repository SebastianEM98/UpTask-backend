import { Router } from "express"
import { TaskController } from "../controllers/TaskController"
import { projectIdValidationRule } from "../helpers/projectValidator"
import { createTaskValidationRules, IdsParamsValidationRules, updateTaskValidationRules, updateTaskStatusValidationRules } from "../helpers/taskValidator"
import { handleValidationErrors } from "../middlewares/validation"
import { projectExists } from "../middlewares/projectExists"
import { isManager, taskExists } from "../middlewares/task"

const router = Router()

// Routes
router.post('/:projectId/tasks', createTaskValidationRules, handleValidationErrors, projectExists, isManager, TaskController.createTask)
router.get('/:projectId/tasks', projectIdValidationRule, handleValidationErrors, projectExists, TaskController.getProjectTasks)
router.get('/:projectId/tasks/:taskId', IdsParamsValidationRules, handleValidationErrors, projectExists, taskExists, TaskController.getTasksById)
router.put('/:projectId/tasks/:taskId', updateTaskValidationRules, handleValidationErrors, projectExists, taskExists, isManager, TaskController.updateTask)
router.delete('/:projectId/tasks/:taskId', IdsParamsValidationRules, handleValidationErrors, projectExists, taskExists, isManager, TaskController.deleteTask)
router.post('/:projectId/tasks/:taskId/status', updateTaskStatusValidationRules, handleValidationErrors, projectExists, taskExists, TaskController.updateStatus)


export default router
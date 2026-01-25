import { body, param } from "express-validator"
import { projectIdValidationRule } from "./projectValidator"

export const taskBodyValidationRules = [
    body('name').notEmpty().withMessage('The Task Name is Required'),

    body('description').notEmpty().withMessage('The Task Description is Required')
]

export const IdsParamsValidationRules = [
    ...projectIdValidationRule,
    param('taskId').isMongoId().withMessage('Invalid Task ID')
]

export const createTaskValidationRules = [
    ...projectIdValidationRule,
    ...taskBodyValidationRules
]

export const updateTaskValidationRules = [
    ...IdsParamsValidationRules,
    ...taskBodyValidationRules
]

export const updateTaskStatusValidationRules = [
    ...IdsParamsValidationRules,
    body('status').notEmpty().withMessage('The Task Status is Required')
]

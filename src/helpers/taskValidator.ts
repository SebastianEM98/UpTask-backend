import { body, param } from "express-validator"

export const taskBodyValidationRules = [
    body('name').notEmpty().withMessage('The Task Name is Required'),

    body('description').notEmpty().withMessage('The Task Description is Required')
]

export const projectIdValidationRule = [
    param('projectId').isMongoId().withMessage('Invalid Project ID')
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

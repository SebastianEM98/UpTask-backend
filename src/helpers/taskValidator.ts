import { body, param } from "express-validator"

export const taskBodyValidationRules = [
    body('name').notEmpty().withMessage('The Task Name is Required'),

    body('description').notEmpty().withMessage('The Task Description is Required')
]

export const projectIdParamValidationRule = [
    param('projectId').isMongoId().withMessage('Invalid Project ID')
]

export const taskIdParamsValidationRules = [
    ...projectIdParamValidationRule,
    param('taskId').isMongoId().withMessage('Invalid Task ID')
]

export const taskParamsAndBodyValidationRules = [
    ...projectIdParamValidationRule,
    ...taskBodyValidationRules
]

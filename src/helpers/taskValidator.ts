import { body, param } from "express-validator"

export const taskBodyValidationRules = [
    body('name').notEmpty().withMessage('The Task Name is Required'),

    body('description').notEmpty().withMessage('The Task Description is Required')
]

export const taskParamsValidationRules = [
    param('projectId').isMongoId().withMessage('Invalid ID')
]

export const taskParamsAndBodyValidationRules = [
    ...taskParamsValidationRules,
    ...taskBodyValidationRules
]

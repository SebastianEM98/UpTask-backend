import { body, param } from "express-validator"

export const projectBodyValidationRules = [
    body('projectName').notEmpty().withMessage('The Project Name is Required'),

    body('clientName').notEmpty().withMessage('The Client Name is Required'),

    body('description').notEmpty().withMessage('The Project Description is Required')
]

export const projectIdValidationRule = [
    param('id').isMongoId().withMessage('Invalid Project ID')
]

export const updateProjectValidationRules = [
    ...projectIdValidationRule,
    ...projectBodyValidationRules
]

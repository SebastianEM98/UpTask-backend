import { body, param } from "express-validator"

export const createProjectValidationRules = [
    body('projectName').notEmpty().withMessage('The Project Name is Required'),

    body('clientName').notEmpty().withMessage('The Client Name is Required'),

    body('description').notEmpty().withMessage('The Project Description is Required')
]

export const getProjectParamValidationRules = [
    param('id').isMongoId().withMessage('Invalid ID')
]

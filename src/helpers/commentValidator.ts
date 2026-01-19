import { body, param } from "express-validator"
import { IdsParamsValidationRules } from "./taskValidator"

export const commentBodyValidationRules = [
    body('content').notEmpty().withMessage('The Comment Content is Required')
]

export const createCommentValidationRules = [
    ...IdsParamsValidationRules,
    ...commentBodyValidationRules
]
import { body, param } from "express-validator"

export const userEmailValidationRules = [
    body('email').notEmpty().withMessage('The Email is Required'),

    body('email').isEmail().withMessage('Invalid Email'),
]

export const userPasswordsValidationRules = [
    body('password').isLength({ min: 8 }).withMessage('The password is too short, minimum 8 characters'),

    body('password_confirmation').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    })
]

export const passwordValidationRule = [
    body('password').notEmpty().withMessage('The Password is Required')
]

export const userRegisterValidationRules = [
    ...userEmailValidationRules,

    body('name').notEmpty().withMessage('The Name is Required'),

    ...userPasswordsValidationRules
]

export const userLoginValidationRules = [
    ...userEmailValidationRules,
    ...passwordValidationRule
]

export const userIdBodyValidationRule = [
    body('id').isMongoId().withMessage('Invalid User ID')
]

export const userIdParamValidationRule = [
    param('userId').isMongoId().withMessage('Invalid User ID')
]

export const profileUpdateValidationRules = [
    body('name').notEmpty().withMessage('The Name is Required'),
    ...userEmailValidationRules
]

export const profilePasswordValidationRules = [
    body('current_password').notEmpty().withMessage('The Current Password is Required'),
    ...userPasswordsValidationRules
]
import { body, param } from "express-validator"

export const userRegisterValidationRules = [
    body('name').notEmpty().withMessage('The Name is Required'),

    body('email').notEmpty().withMessage('The Email is Required'),

    body('email').isEmail().withMessage('Invalid Email'),

    body('password').isLength({ min: 8 }).withMessage('The password is too short, minimum 8 characters'),

    body('password_confirmation').custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error('Passwords do not match')
        }
        return true
    })
]

export const userLoginValidationRules = [
    body('email').notEmpty().withMessage('The Email is Required'),

    body('email').isEmail().withMessage('Invalid Email'),

    body('password').notEmpty().withMessage('The Password is Required')
]

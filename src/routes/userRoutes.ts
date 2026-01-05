import { Router } from "express"
import { UserContorller } from "../controllers/UserController"
import { userEmailValidationRules, userLoginValidationRules, userPasswordsValidationRules, userRegisterValidationRules } from "../helpers/userValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/register', userRegisterValidationRules, handleValidationErrors, UserContorller.register)
router.post('/confirm-account/:token', UserContorller.confirmAccount)
router.post('/login', userLoginValidationRules, handleValidationErrors, UserContorller.login)
router.post('/request-link', userEmailValidationRules, handleValidationErrors, UserContorller.requestConfirmationLink)
router.post('/forgot-password', userEmailValidationRules, handleValidationErrors, UserContorller.requestPasswordResetLink)
router.post('/validate-token/:token', UserContorller.validateToken)
router.post('/update-password/:token', userPasswordsValidationRules, handleValidationErrors, UserContorller.updatePasswordWithToken)


export default router
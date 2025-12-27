import { Router } from "express"
import { UserContorller } from "../controllers/UserController"
import { userLoginValidationRules, userRegisterValidationRules } from "../helpers/userValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/register', userRegisterValidationRules, handleValidationErrors, UserContorller.register)
router.post('/confirm-account/:token', UserContorller.confirmAccount)
router.post('/login', userLoginValidationRules, handleValidationErrors, UserContorller.login)


export default router
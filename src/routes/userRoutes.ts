import { Router } from "express"
import { UserContorller } from "../controllers/UserController"
import { userBodyValidationRules } from "../helpers/userValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/register', userBodyValidationRules, handleValidationErrors, UserContorller.register)
router.post('/confirm-account/:token', UserContorller.confirmAccount)


export default router
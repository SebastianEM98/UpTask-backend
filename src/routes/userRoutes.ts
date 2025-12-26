import { Router } from "express"
import { UserContorller } from "../controllers/UserController"
import { userBodyValidationRules } from "../helpers/userValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/register', userBodyValidationRules, handleValidationErrors, UserContorller.register)


export default router
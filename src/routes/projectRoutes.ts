import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { createProjectValidationRules } from "../helpers/productValidator"
import { handleInputErrors } from "../middlewares/validation"

const router = Router()

// Routing
router.post('/', createProjectValidationRules, handleInputErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)

export default router
import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { createProjectValidationRules, getProjectParamValidationRules } from "../helpers/productValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routing
router.post('/', createProjectValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', getProjectParamValidationRules, handleValidationErrors, ProjectContorller.getProjectById)


export default router
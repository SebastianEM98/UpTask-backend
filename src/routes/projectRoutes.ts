import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { createProjectValidationRules, getProjectParamValidationRules, updateProjectValidationRules } from "../helpers/productValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routing
router.post('/', createProjectValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', getProjectParamValidationRules, handleValidationErrors, ProjectContorller.getProjectById)
router.put('/:id', updateProjectValidationRules, handleValidationErrors, ProjectContorller.updateProject)


export default router
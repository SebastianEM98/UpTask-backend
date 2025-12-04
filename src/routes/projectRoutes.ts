import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { projectBodyValidationRules, projectParamsValidationRules, projectParamsAndBodyValidationRules } from "../helpers/productValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/', projectBodyValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', projectParamsValidationRules, handleValidationErrors, ProjectContorller.getProjectById)
router.put('/:id', projectParamsAndBodyValidationRules, handleValidationErrors, ProjectContorller.updateProject)
router.delete('/:id', projectParamsValidationRules, handleValidationErrors, ProjectContorller.deleteProject)


export default router
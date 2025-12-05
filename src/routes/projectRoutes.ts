import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { projectBodyValidationRules, projectIdParamValidationRule, projectParamsAndBodyValidationRules } from "../helpers/productValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/', projectBodyValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', projectIdParamValidationRule, handleValidationErrors, ProjectContorller.getProjectById)
router.put('/:id', projectParamsAndBodyValidationRules, handleValidationErrors, ProjectContorller.updateProject)
router.delete('/:id', projectIdParamValidationRule, handleValidationErrors, ProjectContorller.deleteProject)


export default router
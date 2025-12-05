import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { projectBodyValidationRules, projectIdValidationRule, updateProjectValidationRules } from "../helpers/projectValidator"
import { handleValidationErrors } from "../middlewares/validation"

const router = Router()

// Routes
router.post('/', projectBodyValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', projectIdValidationRule, handleValidationErrors, ProjectContorller.getProjectById)
router.put('/:id', updateProjectValidationRules, handleValidationErrors, ProjectContorller.updateProject)
router.delete('/:id', projectIdValidationRule, handleValidationErrors, ProjectContorller.deleteProject)


export default router
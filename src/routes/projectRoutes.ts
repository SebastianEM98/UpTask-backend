import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { handleValidationErrors } from "../middlewares/validation"
import { authenticate } from "../middlewares/auth"
import { projectBodyValidationRules, projectIdValidationRule, updateProjectValidationRules } from "../helpers/projectValidator"

const router = Router()

// Routes Protection
router.use(authenticate)

// Routes
router.post('/', projectBodyValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', projectIdValidationRule, handleValidationErrors, ProjectContorller.getProjectById)
router.put('/:id', updateProjectValidationRules, handleValidationErrors, ProjectContorller.updateProject)
router.delete('/:id', projectIdValidationRule, handleValidationErrors, ProjectContorller.deleteProject)


export default router
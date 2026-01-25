import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { handleValidationErrors } from "../middlewares/validation"
import { authenticate } from "../middlewares/auth"
import { projectBodyValidationRules, projectIdValidationRule, updateProjectValidationRules } from "../helpers/projectValidator"
import { projectExists } from "../middlewares/projectExists"
import { isManager } from "../middlewares/task"

const router = Router()

// Routes Protection
router.use(authenticate)

// Routes
router.post('/', projectBodyValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:projectId', projectIdValidationRule, handleValidationErrors, projectExists, ProjectContorller.getProjectById)
router.put('/:projectId', updateProjectValidationRules, handleValidationErrors, projectExists, isManager, ProjectContorller.updateProject)
router.delete('/:projectId', projectIdValidationRule, handleValidationErrors, projectExists, isManager, ProjectContorller.deleteProject)


export default router
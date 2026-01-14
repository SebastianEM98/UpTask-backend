import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"
import { handleValidationErrors } from "../middlewares/validation"
import { authenticate } from "../middlewares/auth"
import { projectBodyValidationRules, projectIdValidationRule, updateProjectValidationRules } from "../helpers/projectValidator"
import { userEmailValidationRules, userIdBodyValidationRule } from "../helpers/userValidator"
import { TeamMemberContorller } from "../controllers/TeamController"
import { projectExists } from "../middlewares/projectExists"

const router = Router()

// Routes Protection
router.use(authenticate)

// Routes
router.post('/', projectBodyValidationRules, handleValidationErrors, ProjectContorller.createProject)
router.get('/', ProjectContorller.getAllProjects)
router.get('/:id', projectIdValidationRule, handleValidationErrors, ProjectContorller.getProjectById)
router.put('/:id', updateProjectValidationRules, handleValidationErrors, ProjectContorller.updateProject)
router.delete('/:id', projectIdValidationRule, handleValidationErrors, ProjectContorller.deleteProject)

// Routes for Project Members
router.post('/:projectId/team/search', userEmailValidationRules, handleValidationErrors, projectExists, TeamMemberContorller.findMemberByEmail)
router.post('/:projectId/team/', userIdBodyValidationRule, handleValidationErrors, projectExists, TeamMemberContorller.addMemberById)


export default router
import { Router } from "express"
import { handleValidationErrors } from "../middlewares/validation"
import { userEmailValidationRules, userIdBodyValidationRule, userIdParamValidationRule } from "../helpers/userValidator"
import { TeamMemberContorller } from "../controllers/TeamController"
import { projectExists } from "../middlewares/projectExists"
import { isManager } from "../middlewares/task"

const router = Router()

// Routes
router.post('/:projectId/team/find', userEmailValidationRules, handleValidationErrors, projectExists, isManager, TeamMemberContorller.findMemberByEmail)
router.get('/:projectId/team', projectExists, isManager, TeamMemberContorller.getProjectTeam)
router.post('/:projectId/team', userIdBodyValidationRule, handleValidationErrors, projectExists, isManager, TeamMemberContorller.addMemberById)
router.delete('/:projectId/team/:userId', userIdParamValidationRule, handleValidationErrors, projectExists, isManager, TeamMemberContorller.RemoveMemberById)

export default router
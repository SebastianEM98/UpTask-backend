import { Router } from "express"
import { handleValidationErrors } from "../middlewares/validation"
import { userEmailValidationRules, userIdBodyValidationRule, userIdParamValidationRule } from "../helpers/userValidator"
import { TeamMemberContorller } from "../controllers/TeamController"
import { projectExists } from "../middlewares/projectExists"

const router = Router()

// Routes
router.post('/:projectId/team/find', userEmailValidationRules, handleValidationErrors, projectExists, TeamMemberContorller.findMemberByEmail)
router.get('/:projectId/team', projectExists, TeamMemberContorller.getProjectTeam)
router.post('/:projectId/team', userIdBodyValidationRule, handleValidationErrors, projectExists, TeamMemberContorller.addMemberById)
router.delete('/:projectId/team/:userId', userIdParamValidationRule, handleValidationErrors, projectExists, TeamMemberContorller.RemoveMemberById)

export default router
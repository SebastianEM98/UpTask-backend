import { Router } from "express"
import { handleValidationErrors } from "../middlewares/validation"
import { userEmailValidationRules, userIdBodyValidationRule } from "../helpers/userValidator"
import { TeamMemberContorller } from "../controllers/TeamController"
import { projectExists } from "../middlewares/projectExists"

const router = Router()

// Routes
router.post('/:projectId/team/search', userEmailValidationRules, handleValidationErrors, projectExists, TeamMemberContorller.searchMemberByEmail)
router.post('/:projectId/team/', userIdBodyValidationRule, handleValidationErrors, projectExists, TeamMemberContorller.addMemberById)
router.delete('/:projectId/team/', userIdBodyValidationRule, handleValidationErrors, projectExists, TeamMemberContorller.RemoveMemberById)


export default router
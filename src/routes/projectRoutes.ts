import { Router } from "express"
import { ProjectContorller } from "../controllers/ProjectController"

const router = Router()

// Routing
router.get('/', ProjectContorller.getAllProjects)

export default router
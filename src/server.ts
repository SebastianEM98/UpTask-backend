import express from "express"
import dotenv from "dotenv"
import { dbConnection } from "./database/dbConnection"
import projectRoutes from "./routes/projectRoutes"
import taskRoutes from "./routes/taskRoutes"


// Dotenv setup
dotenv.config()


// Data Base Connection
dbConnection()

// Server Creation
const app = express()


// Middlewares (configuration to convert data from body to JSON)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Routes Setup
app.use("/api/projects", projectRoutes)
app.use("/api/projects", taskRoutes)


export default app
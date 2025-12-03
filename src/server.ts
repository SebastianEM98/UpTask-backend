import express from "express"
import dotenv from "dotenv"
import { dbConnection } from "./database/dbConnection"
import projectRoutes from "./routes/projectRoutes"

// Dotenv setup
dotenv.config()


// Data Base Connection
dbConnection()

// Server Creation
const app = express()


// Routes Setup
app.use("/api/projects", projectRoutes)


export default app
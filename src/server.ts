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


// Middlewares (configuration to convert data from body to JSON)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// Routes Setup
app.use("/api/projects", projectRoutes)


export default app
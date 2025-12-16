import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import morgan from "morgan"
import { dbConnection } from "./config/dbConnection"
import { corsOptions } from "./config/cors"
import projectRoutes from "./routes/projectRoutes"
import taskRoutes from "./routes/taskRoutes"
import { corsErrorHandler } from "./middlewares/corsErrorHandler"


// Dotenv setup
dotenv.config()


// Data Base Connection
dbConnection()


// Express Instance
const app = express()


// CORS Setup
app.use(cors(corsOptions))


// Middlewares (configuration to convert data from body to JSON)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Logging
app.use(morgan('dev'))


// Routes Setup
app.use("/api/projects", projectRoutes)
app.use("/api/projects", taskRoutes)


// CORS Error Handler Middleware
app.use(corsErrorHandler)


export default app
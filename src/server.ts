import express from "express"
import dotenv from "dotenv"
import { dbConnection } from "./database/dbConnection"

// Dotenv setup
dotenv.config()


// Data Base Connection
dbConnection()

// Server Creation
const app = express()


export default app
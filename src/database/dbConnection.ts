import mongoose from "mongoose"
import colors from "colors"
import { exit } from "node:process"



export const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        
        console.log(colors.blue.bold("****** Connection to the database successfully established ******"))

    } catch (error) {
        console.log(error.message);
        console.log(colors.red.bold("There was an error connecting to the database"))
        exit(1)
    }
} 
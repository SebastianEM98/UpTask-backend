import type { Request, Response } from "express"
import bcrypt from "bcrypt"
import User from "../models/User"

export class UserContorller {

    static register = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body
            const user = new User(req.body)

            const userExists = await User.findOne({ email })

            if (userExists) {
                return res.status(409).json({
                    message: "An account with this email already exists"
                })
            }

            // Password Hash
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()

            return res.status(201).json({
                message: "Account created. Check your email to confirm your account."
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while creating the user"
            })
        }
    }
}
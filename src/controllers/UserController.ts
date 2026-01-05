import type { Request, Response } from "express"
import User from "../models/User"
import Token from "../models/Token"
import { generate6DigitToken } from "../utils/token"
import { UserEmail } from "../emails/UserEmail"
import { checkPassword, hashPassword } from "../utils/user"

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
            user.password = await hashPassword(password)

            // Generate Token
            const token = new Token()
            token.token = generate6DigitToken()
            token.user = user._id

            await Promise.allSettled([user.save(), token.save()])

            // Send Email
            UserEmail.sendConfirmationEmail({
                email: user.email,
                name: user.name,
                token: token.token
            })

            return res.status(201).json({
                message: "Account created. Check your email to confirm your account"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while creating the user"
            })
        }
    }


    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.params

            const tokenExists = await Token.findOne({ token })

            if (!tokenExists) {
                return res.status(404).json({
                    message: "Invalid Token"
                })
            }

            const user = await User.findById(tokenExists.user)
            user.confirmed = true

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])

            return res.status(200).json({
                message: "Account Confirmed",
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while confirming the account",
            })
        }
    }


    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(404).json({
                    message: "Incorrect email or password"
                })
            }

            const isValidPassword = await checkPassword(password, user.password)

            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Incorrect email or password"
                })
            }


            if (!user.confirmed) {
                return res.status(401).json({
                    message: "Your account has not been confirmed yet",
                })
            }

            return res.status(200).json({
                message: "Logged In",
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while logging in",
            })
        }
    }


    static requestConfirmationLink = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const user = await User.findOne({ email })

            // If the user exists and it's NOT confirmed -> email is sent
            if (user && !user.confirmed) {
                // Generate Token
                const token = new Token()
                token.token = generate6DigitToken()
                token.user = user._id

                await token.save()

                // Send Email
                UserEmail.sendConfirmationEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })
            }

            return res.status(200).json({
                message: "If an account with this email exists, a new confirmation link has been sent"
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while sending a new confirmation link"
            })
        }
    }


    static requestPasswordResetLink = async (req: Request, res: Response) => {
        try {
            const { email } = req.body

            const user = await User.findOne({ email })

            // If the user exists and it's NOT confirmed -> email is sent
            if (user) {
                // Generate Token
                const token = new Token()
                token.token = generate6DigitToken()
                token.user = user._id

                await token.save()

                // Send Email
                UserEmail.sendPasswordResetEmail({
                    email: user.email,
                    name: user.name,
                    token: token.token
                })
            }

            return res.status(200).json({
                message: "If an account with this email exists, a link to reset your password has been sent"
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while sending a link to reset your password"
            })
        }
    }


    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params

            const tokenExists = await Token.findOne({ token })

            if (!tokenExists) {
                return res.status(404).json({
                    message: "Invalid Token"
                })
            }

            return res.status(200).json({
                message: "Valid token, set your new password",
            })
        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while validating the token",
            })
        }
    }


    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params
            const { password } = req.body

            const tokenExists = await Token.findOne({ token })

            if (!tokenExists) {
                return res.status(404).json({
                    message: "Invalid Token"
                })
            }

            const user = await User.findById(tokenExists.user)

            const isSamePassword = await checkPassword(password, user.password)

            if (isSamePassword) {
                return res.status(401).json({
                    message: "The new password cannot be the same as the previous one"
                })
            }
            
            user.password = await hashPassword(password)

            await Promise.allSettled([user.save(), tokenExists.deleteOne()])

            return res.status(201).json({
                message: "Password Successfully Updated"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while reseting the password"
            })
        }
    }
}
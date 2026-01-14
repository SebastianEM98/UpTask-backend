import type { Request, Response } from "express"
import User from "../models/User"

export class TeamMemberContorller {

    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body

        // Find User
        const user = await User.findOne({
            $and: [
                { email },
                { email: { $ne: req.user.email } }
            ]
        }).select('_id email name')

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        return res.status(200).json({ user })
    }
}
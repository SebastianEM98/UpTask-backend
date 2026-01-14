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

    static addMemberById = async (req: Request, res: Response) => {
        const { id } = req.body

        // Find User
        const user = await User.findOne({
            $and: [
                { _id: id },
                { _id: { $ne: req.user._id } }
            ]
        }).select('_id')

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        if (req.project.team.includes(id)) {
            return res.status(409).json({
                message: "The user is already a member of the project team"
            })
        }

        req.project.team.push(user._id)
        await req.project.save()

        return res.status(200).json({
            message: "User Successfully Added"
        })
    }
}
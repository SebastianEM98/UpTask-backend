import type { Request, Response } from "express"
import User from "../models/User"

export class TeamMemberContorller {

    static searchMemberByEmail = async (req: Request, res: Response) => {
        try {
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

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while searching the user"
            })
        }
    }

    static addMemberById = async (req: Request, res: Response) => {
        try {
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
                message: "User Successfully Added as a Team Member"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while adding a team member to the project"
            })
        }
    }


    static RemoveMemberById = async (req: Request, res: Response) => {
        try {
            const { id } = req.body

            // Find User
            const user = await User.findOne({
                $and: [
                    { _id: id },
                    { _id: { $ne: req.user._id } }
                ]
            }).select('_id')

            if (!user || !req.project.team.includes(id)) {
                return res.status(404).json({
                    message: "Team Member Not Found"
                })
            }

            req.project.team = req.project.team.filter(teamMember => teamMember._id.toString() !== id)

            await req.project.save()

            return res.status(200).json({
                message: "Team Member Removed"
            })

        } catch (error) {
            return res.status(500).json({
                message: "An error occurred while removing a team member from the project"
            })
        }
    }
}
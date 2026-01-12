import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User, { IUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: IUser
        }
    }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {

    const bearer = req.headers.authorization

    if (!bearer) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const token = bearer.split(' ')[1]

    try {
        const payloadDecoded = jwt.verify(token, process.env.JWRT_SECRET)
        
        if(typeof payloadDecoded === 'object' && payloadDecoded.id) {
            const user = await User.findById(payloadDecoded.id).select('_id name email')
            
            if(user) {
                req.user = user
                next()
            } else {
                return res.status(500).json({
                    message: "Invalid Token"
                })
            }
        }
    } catch (error) {
        return res.status(500).json({
            message: "Invalid Token"
        })
    }
}
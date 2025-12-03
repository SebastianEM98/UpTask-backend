import type { Request, Response } from "express"

export class ProjectContorller {

    static getAllProjects = async (req: Request, res: Response) => {
        res.status(200).json("All projects here")
    }
}
import type { Request, Response, NextFunction } from "express";

export const corsErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

    // CORS error
    if (err.message === "Not allowed by CORS") {
        return res.status(403).json({
            error: "CORS Error",
            message: "Origin not allowed"
        });
    }

    // Other errors
    return res.status(500).json({
        error: "Server Error",
        message: err.message
    });
};

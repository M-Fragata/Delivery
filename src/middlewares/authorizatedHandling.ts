import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export function authorization(role: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {

        if(!req.user || !role.includes(req.user.role)){
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}
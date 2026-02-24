import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { authConfig } from "../configs/auth.js";
import { AppError } from "../utils/AppError.js";

type TokenPayloud = {
    role: string,
    sub: string
}

export function authenticated(req: Request, res: Response, next: NextFunction) {

    try {
        
        const authHeader = req.headers.authorization

        if(!authHeader){
            throw new AppError("JWT token not found", 401)
        }


        const token = authHeader.split(" ")[1]

        const { role, sub: user_id } = jwt.verify(token, authConfig.jwt.secret) as TokenPayloud

        req.user = {
            id: user_id,
            role
        }

        return next()

    } catch (error) {
        throw new AppError("Invalid JWT token", 401)
    }

}
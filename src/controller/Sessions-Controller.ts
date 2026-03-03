import { Request, Response } from "express";
import { prisma } from "../database/prisma";
import { AppError } from "../utils/AppError";
import { compare } from "bcrypt";
import { z } from "zod"
import { authConfig } from "../configs/auth"
import jwt from "jsonwebtoken"

export class SessionsController {
    async login(req: Request, res: Response) {

        const bodySchema = z.object({
            "email": z.string().email(),
            "password": z.string().min(6)
        })

        const { email, password } = bodySchema.parse(req.body)

        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            throw new AppError("Email ou senha incorreto(s)", 401)
        }

        const passwordUser = await compare(password, user.password)

        if (!passwordUser) {
            throw new AppError("Email ou senha incorreto(s)", 401)
        }

        const {secret, expiresIn} = authConfig.jwt

        const token = jwt.sign({
            role: user.role,
        }, secret, {
            subject: user.id,
            expiresIn: expiresIn as any
        })

        const {password: hashedPassword, ...userWithoutPassword} = user

        return res.status(201).json({token, user: userWithoutPassword})

    }
}
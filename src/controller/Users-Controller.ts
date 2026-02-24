import { Request, Response } from "express";
import { prisma } from "../database/prisma.js"
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "../utils/AppError.js";

export class UsersController {
    async index(req: Request, res: Response) {

        const users = await prisma.user.findMany()

        return res.json(users)
    }

    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            "name": z.string().trim().min(3),
            "email": z.string().email(),
            "password": z.string().min(6)
        })

        const { name, email, password } = bodySchema.parse(req.body)

        const verifyEmail = await prisma.user.findUnique({ where: { email } })

        if (verifyEmail) {
            throw new AppError("Email already exist")
        }

        const hashedPassword = await hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const { password: _, ...userWithoutPassword } = user

        return res.status(201).json(userWithoutPassword)

    }

    async update(req: Request, res: Response) { }

    async remove(req: Request, res: Response) { }
}
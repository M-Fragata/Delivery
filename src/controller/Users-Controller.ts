import { Request, Response } from "express";
import { prisma } from "../database/prisma"
import { z } from "zod"
import { hash } from "bcrypt"
import { AppError } from "../utils/AppError";

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

    async update(req: Request, res: Response) {

        const paramsSchema = z.object({
            "id": z.string().uuid()
        })

        const bodySchema = z.object({
            "name": z.string().min(3),
            "email": z.string().email(),
        })

        const { id } = paramsSchema.parse(req.params)
        const { name, email } = bodySchema.parse(req.body)
        const { role } = req.body

        console.log(typeof(role))

        if (role !== "sale" && role !== "customer") {
            throw new AppError("Role desconhecida")
        }

        if (!id) {
            throw new AppError("ID não encontrado", 404)
        }

        await prisma.user.update({
            where: {
                id
            },
            data: {
                name, email, role
            }

        })

        return res.status(200).json()

    }

    async remove(req: Request, res: Response) {

        const paramsSchema = z.object({
            "id": z.string().uuid()
        })

        const { id } = paramsSchema.parse(req.params)

        const user = await prisma.user.findUnique({where: {
            id
        }})

        if (!user) {
            throw new AppError("ID não encontrado", 404)
        }

        await prisma.user.delete({
            where: { id: user.id }
        })

        return res.status(204).json()

    }
}
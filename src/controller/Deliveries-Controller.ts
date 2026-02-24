import { Request, Response } from "express";
import { prisma } from "../database/prisma.js";
import { z } from "zod"

export class DeliveriesController {
    async index(req: Request, res: Response) {

        const delivery = await prisma.delivery.findMany({
            include: {
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        })

        return res.json(delivery)
    }

    async create(req: Request, res: Response) {

        const bodySchema = z.object({
            user_id: z.string().uuid(),
            description: z.string(),
        })

        const { user_id, description } = bodySchema.parse(req.body)

        await prisma.delivery.create({
            data: {
                userId: user_id,
                description
            }
        })

        return res.status(201).json()
    }
}
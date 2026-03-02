import request from "supertest"

import { app } from "../app"
import { prisma } from "../database/prisma"

describe("UsersController", () => {

    let user_id: string

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } })
        user_id = ""
        
    })

    it("should create a new user sucessfully", async () => {

        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "test1user@example.com",
            password: "test123"
        })

        expect(response.statusCode).toBe(201)
        expect(response.body).toHaveProperty("id")
        expect(response.body.name).toBe("Test User")

        user_id = response.body.id
    })

    it("should throw an error if user whith email already exist", async () => {

        const response = await request(app).post("/users").send({
            name: "Test duplicate User",
            email: "test1user@example.com",
            password: "test123"
        })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Email already exist")
    })

    it("should throw a validation error if email is invalid", async () => {

        const response = await request(app).post("/users").send({
            name: "Test duplicate User",
            email: "invalid-email",
            password: "test123"
        })

        expect(response.statusCode).toBe(400)
        expect(response.body.message).toBe("Validation Error")


    })
})
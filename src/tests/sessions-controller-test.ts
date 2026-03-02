import request from "supertest";
import { prisma } from "../database/prisma"
import { app } from "../app";
import { string } from "zod";

describe("sessionsController", () => {

    let user_id: string

    afterAll(async () => {

        await prisma.user.delete({
            where: {
                id: user_id
            }
        })

        user_id = ""
    })

    it("should authenticate and get acess token", async () => {
        const userResponse = await request(app).post("/users").send({
            name: "Test session User",
            email: "test2sessionuser@example.com",
            password: "test123"
        })

        user_id = userResponse.body.id

        const loginResponse = await request(app).post("/session").send({
            email: "test2sessionuser@example.com",
            password: "test123"
        })

        expect(loginResponse.statusCode).toBe(201)
        expect(loginResponse.body.token).toEqual(expect.any(String))

    })

})
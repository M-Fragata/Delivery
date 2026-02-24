import { Router } from "express";
import { UsersController } from "../controller/Users-Controller.js"

const usersRoutes = Router()

const usersController = new UsersController

usersRoutes.get("/", usersController.index)
usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)
usersRoutes.delete("/:id", usersController.remove)

export { usersRoutes }
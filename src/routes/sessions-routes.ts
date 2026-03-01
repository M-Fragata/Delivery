import { Router } from "express";
import { SessionsController } from "../controller/Sessions-Controller"

const sessionRoutes = Router()
const sessionController = new SessionsController

sessionRoutes.post("/", sessionController.login)

export {sessionRoutes}
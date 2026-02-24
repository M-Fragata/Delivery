import { Router } from "express";
import { DeliveriesStatusController } from "../controller/Deliveries-Status-Controller.js"
import { authenticated } from "../middlewares/authenticatedHandling.js"
import { authorization } from "../middlewares/authorizatedHandling.js"

const deliveriesStatusRoutes = Router()
const deliveriesStatusController = new DeliveriesStatusController

deliveriesStatusRoutes.use(authenticated, authorization(["sale"]))

deliveriesStatusRoutes.put("/:id", deliveriesStatusController.update)

export { deliveriesStatusRoutes }
import { Router } from "express";
import { DeliveriesStatusController } from "../controller/Deliveries-Status-Controller"
import { authenticated } from "../middlewares/authenticatedHandling"
import { authorization } from "../middlewares/authorizatedHandling"

const deliveriesStatusRoutes = Router()
const deliveriesStatusController = new DeliveriesStatusController

deliveriesStatusRoutes.use(authenticated, authorization(["sale"]))

deliveriesStatusRoutes.put("/:id", deliveriesStatusController.update)

export { deliveriesStatusRoutes }
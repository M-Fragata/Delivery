import { Router } from "express";
import { DeliveriesController } from "../controller/Deliveries-Controller"
import { authenticated } from "../middlewares/authenticatedHandling"
import { authorization } from "../middlewares/authorizatedHandling"

const deliveriesRoutes = Router()
const deliveriesController = new DeliveriesController

deliveriesRoutes.use(authenticated)

deliveriesRoutes.get("/",
    authorization(["customer", "sale"]), deliveriesController.index)

deliveriesRoutes.post("/",
    authorization(["sale"]),
    deliveriesController.create)

export { deliveriesRoutes }
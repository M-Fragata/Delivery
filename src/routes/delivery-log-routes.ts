import { Router } from "express";
import { DeliveryLogsController } from "../controller/Delivery-Logs-Controller"

import { authorization } from "../middlewares/authorizatedHandling";
import { authenticated } from "../middlewares/authenticatedHandling";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController

deliveryLogsRoutes.use(authenticated)
deliveryLogsRoutes.post("/", authenticated, authorization(["sale"]), deliveryLogsController.create)
deliveryLogsRoutes.get("/:id", authenticated, authorization(["sale", "customer"]), deliveryLogsController.index)

export { deliveryLogsRoutes }
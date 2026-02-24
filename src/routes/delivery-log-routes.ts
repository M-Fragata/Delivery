import { Router } from "express";
import { DeliveryLogsController } from "../controller/delivery-logs-controller.js"

import { authorization } from "../middlewares/authorizatedHandling.js";
import { authenticated } from "../middlewares/authenticatedHandling.js";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController

deliveryLogsRoutes.use(authenticated)
deliveryLogsRoutes.post("/", authenticated, authorization(["sale"]), deliveryLogsController.create)
deliveryLogsRoutes.get("/:id", authenticated, authorization(["sale", "customer"]), deliveryLogsController.index)

export { deliveryLogsRoutes }
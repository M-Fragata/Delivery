import { Router } from "express";

import { usersRoutes } from "./users-routes.js"
import { sessionRoutes } from "./sessions-routes.js"
import { deliveriesRoutes } from "./deliveries-routes.js"
import { deliveriesStatusRoutes } from "./deliveries-status-routes.js"
import { deliveryLogsRoutes } from "./delivery-log-routes.js"

const routes = Router()

routes.use("/users", usersRoutes)
"/session"
routes.use("/session", sessionRoutes)
routes.use("/delivery", deliveriesRoutes)
routes.use("/delivery-status", deliveriesStatusRoutes)
routes.use("/delivery-logs", deliveryLogsRoutes)

export {routes}
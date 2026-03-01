import { Router } from "express";

import { usersRoutes } from "./users-routes"
import { sessionRoutes } from "./sessions-routes"
import { deliveriesRoutes } from "./deliveries-routes"
import { deliveriesStatusRoutes } from "./deliveries-status-routes"
import { deliveryLogsRoutes } from "./delivery-log-routes"

const routes = Router()

routes.use("/users", usersRoutes)
"/session"
routes.use("/session", sessionRoutes)
routes.use("/delivery", deliveriesRoutes)
routes.use("/delivery-status", deliveriesStatusRoutes)
routes.use("/delivery-logs", deliveryLogsRoutes)

export {routes}
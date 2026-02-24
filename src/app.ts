import express from "express"
import "express-async-errors"

import { errorHandling } from "./middlewares/errorHandling.js"
import { routes } from "./routes/index.js"

const app = express()
app.use(express.json())

app.use(routes)

app.use(errorHandling)

export { app }
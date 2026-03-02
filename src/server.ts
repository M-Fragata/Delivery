import { app } from "./app.js"
import { env } from "./env.js"

const PORT = env.PORT

app.listen(PORT, () => {
    console.log("Server is runnin on PORT ", PORT)
})
import { app } from "./app.js"

const PORT = 3333

app.listen(PORT, () => {
    console.log("Server is runnin on PORT ", PORT)
})
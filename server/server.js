import cultureRouter from "./routes/culture.js"
import express from "express"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use("/api", cultureRouter)

app.get("/api/home", (req, res) => {
  res.json({ message: "hello world!" })
})

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})

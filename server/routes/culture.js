import express from "express"
import axios from "axios"

const cultureRouter = express.Router()

cultureRouter.get("/culture", async (req, res) => {
  const { country } = req.query

  if (!country) {
    return res.status(400).json({ error: "Country parameter is required" })
  }

  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/name/${country}`
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error("Error fetching culture info:", error.message)
    res.status(500).json({ error: "Failed to fetch culture info" })
  }
})

cultureRouter.get("/culture/desc", async (req, res) => {
  const { country } = req.query

  if (!country) {
    return res.status(400).json({ error: "Country parameter is required" })
  }

  try {
    const response = await axios.get(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${country}`
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error("Error fetching culture info:", error.message)
    res.status(500).json({ error: "Failed to fetch culture info" })
  }
})

cultureRouter.get("/all", async (req, res) => {
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/all?fields=name`
    )

    res.status(200).json(response.data)
  } catch (error) {
    console.error("Error fetching culture info:", error.message)
    res.status(500).json({ error: "Failed to fetch culture info" })
  }
})

export default cultureRouter

"use client"

import InfoCard from "@/components/InfoCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function CountryPage() {
  const params = useParams()
  const culture = decodeURI(params?.culture)
  const [countryData, setCountryData] = useState({
    name: culture,
    description: "Loading...",
    population: "Loading...",
    capital: "Loading...",
    language: "Loading...",
    currency: "Loading...",
    image: "/images/japan.jpg",
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const [cultureRes, descRes] = await Promise.all([
          fetch(`http://localhost:5000/api/culture?country=${culture}`),
          fetch(`http://localhost:5000/api/culture/desc?country=${culture}`),
        ])

        const cultureData = await cultureRes.json()
        const descData = await descRes.json()

        const countryInfo = {
          name: culture,
          description: descData.extract || "No description available.",
          population:
            cultureData[0]?.population > 999999
              ? Math.round(cultureData[0].population / 1_000_000) + " millions"
              : cultureData[0]?.population || "Unknown",
          capital: cultureData[0]?.capital?.[0] || "Unknown",
          language: cultureData[0]?.languages
            ? Object.values(cultureData[0].languages).join(", ")
            : "Unknown",
          currency: cultureData[0]?.currencies
            ? Object.entries(cultureData[0].currencies).map(
                ([code, { name, symbol }]) => `${code} - ${name} (${symbol})`
              )[0]
            : "Unknown",
          image: descData.originalimage?.source,
        }
        console.log("Image URL:", descData.originalimage?.source)

        setCountryData(countryInfo)
      } catch (error) {
        console.error("Error fetching country data:", error)
      }
    }

    fetchData()
  }, [culture])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={countryData.image}
            alt={countryData.name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg bg-black">
              {culture}
            </h1>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard title="Capital" content={countryData.capital} />
          <InfoCard title="Population" content={countryData.population} />
          <InfoCard title="Language" content={countryData.language} />
          <InfoCard title="Currency" content={countryData.currency} />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            About {countryData.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {countryData.description}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

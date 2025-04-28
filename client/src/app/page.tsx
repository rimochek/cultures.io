"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

export default function HomePage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [isFocus, setIsFocus] = useState(false)
  const [mouseOnList, setMouseOnList] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim() !== "") {
        fetchSearchResults(query)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query])

  async function fetchSearchResults(query: string) {
    try {
      const response = await fetch("http://localhost:5000/api/all")
      const data = await response.json()

      const countries = data
        .map((country: any) => country.name.common)
        .filter((name: string) =>
          name.toLowerCase().startsWith(query.toLowerCase())
        )

      setResults(countries)
    } catch (error) {
      console.error("Search API error:", error)
    }
  }

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim() !== "" && results[0]) {
      router.push(`/culture/${encodeURIComponent(results[0])}`)
    }
  }

  function handleSelect(country: string) {
    setQuery(country)
    router.push(`/culture/${encodeURIComponent(country)}`)
    setIsFocus(false)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center mt-12 bg-gray-50 dark:bg-gray-900 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <img
        src="/people.png"
        alt="World Map"
        className="object-cover w-96 rounded-b-3xl shadow-lg mb-12"
      />
      <div className="max-w-2xl text-center space-y-6">
        <motion.h1
          className="text-5xl font-bold text-gray-800 dark:text-white"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Explore Cultures Around the World
        </motion.h1>

        <motion.p
          className="text-gray-600 dark:text-gray-300 text-lg"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Dive into a world of diversity — find information about any country by
          simply searching its name.
        </motion.p>

        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center justify-center mt-8 relative"
        >
          <input
            type="text"
            placeholder="Search for a country..."
            className="w-full max-w-md p-4 rounded-l-2xl border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocus(true)}
            onBlur={() => !mouseOnList && setIsFocus(false)}
          />
          <button
            type="submit"
            className="px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-r-2xl transition-colors"
          >
            Search
          </button>
        </form>
      </div>
    </motion.div>
  )
}

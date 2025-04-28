"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function Example() {
  const [isFocus, setIsFocus] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<string[]>([])
  const [mouseOnList, setMouseOnList] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        fetchSearchResults(searchQuery)
      } else {
        setResults([])
      }
    }, 300)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  async function fetchSearchResults(query: string) {
    try {
      const response = await fetch("http://localhost:5000/api/all")
      const data = await response.json()

      const countries = data
        .map((country: any) => country.name.common)
        .filter((name: string) =>
          name.toLowerCase().startsWith(query.toLowerCase())
        )

      console.log(countries)
      setResults(countries)
    } catch (error) {
      console.error("Search API error:", error)
    }
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (searchQuery.trim() !== "" && results[0] != null) {
      router.push(`/culture/${encodeURIComponent(results[0].toLowerCase())}`)
    }
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div
          onClick={() => {
            router.push("/")
          }}
          className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer"
        >
          <Image src="/logo.png" alt="Logo" width={32} height={32} />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            cultures.io
          </span>
        </div>
        <div className="flex md:order-2 items-center">
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
          <div
            className={`relative ${
              isSearchOpen ? "block" : "hidden"
            } md:block w-full md:w-auto mt-2 md:mt-0`}
          >
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  onFocus={() => {
                    setIsFocus(true)
                  }}
                  onBlur={() => {
                    !mouseOnList ? setIsFocus(false) : 0
                  }}
                  type="text"
                  id="search-navbar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </form>

            {isFocus && results.length > 0 && (
              <div className="absolute z-20 left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md max-h-64 overflow-y-auto">
                {results.length > 0 && (
                  <ul
                    onMouseEnter={() => {
                      setMouseOnList(true)
                    }}
                    onMouseLeave={() => {
                      setMouseOnList(false)
                    }}
                    className="space-y-2"
                  >
                    {results.map((item, index) => (
                      <li
                        key={index}
                        className="text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded p-2"
                        onClick={() => {
                          router.push(`/culture/${encodeURIComponent(item)}`)
                          setIsFocus(false)
                        }}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

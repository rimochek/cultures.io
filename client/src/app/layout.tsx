import { usePathname } from "next/navigation"
import type { Metadata } from "next"
import Header from "@/components/Header"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Cultures.io",
  description: "Created by rimochekk",
  icons: {
    icon: [{ url: "/favicon.ico" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <Header />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
          {children}
        </div>
      </body>
    </html>
  )
}

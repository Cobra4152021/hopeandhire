import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./i18n"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HopeAndHire - Empowering Second Chances Through Employment",
  description:
    "Connecting formerly incarcerated individuals with career mentors, recruiters, and second-chance employers.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

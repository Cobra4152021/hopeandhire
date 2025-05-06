import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Navbar } from "@/app/components/navbar"
import { Footer } from "@/app/components/footer"

export const metadata: Metadata = {
  title: "Hope and Hire - Empowering Second Chances",
  description: "Empowering individuals with second chances through workforce readiness and meaningful employment.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  )
}

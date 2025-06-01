import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GridDiagnostic } from "@/components/grid-diagnostic"
import { LayoutDebugger } from "@/components/layout-debugger"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HopeAndHire - Bridging the Gap from Hope to Hire",
  description: "Empowering individuals with second chances through workforce readiness and meaningful employment.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* Only show debugging tools in development */}
        {process.env.NODE_ENV === "development" && (
          <>
            <GridDiagnostic />
            <LayoutDebugger />
          </>
        )}
      </body>
    </html>
  )
}

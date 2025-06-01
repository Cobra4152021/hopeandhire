import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GridDiagnostic } from "@/components/grid-diagnostic"
import { LayoutDebugger } from "@/components/layout-debugger"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Providers from "@/app/providers"
import { Toaster } from "@/components/ui/toaster"

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
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          {/* Only show debugging tools in development */}
          {process.env.NODE_ENV === "development" && (
            <>
              <GridDiagnostic />
              <LayoutDebugger />
            </>
          )}
        </Providers>
      </body>
    </html>
  )
}

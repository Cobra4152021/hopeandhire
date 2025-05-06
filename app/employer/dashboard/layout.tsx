import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">{children}</div>
      </main>
      <Footer />
    </div>
  )
}

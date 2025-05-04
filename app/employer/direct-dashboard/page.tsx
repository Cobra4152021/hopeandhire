"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function DirectDashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check if we have a session
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Direct Dashboard - Session error:", error.message)
          router.push("/employer/login?error=" + encodeURIComponent(error.message))
          return
        }

        if (!data.session) {
          console.log("Direct Dashboard - No session found, redirecting to login")
          router.push("/employer/login?message=Please sign in to access this page")
          return
        }

        console.log("Direct Dashboard - Session found, redirecting to dashboard")
        // Use window.location for a hard navigation
        window.location.href = "/employer/dashboard"
      } catch (error) {
        console.error("Direct Dashboard - Unexpected error:", error)
        router.push("/employer/login?error=" + encodeURIComponent("An unexpected error occurred"))
      }
    }

    checkSession()
  }, [router])

  return (
    <div className="container max-w-6xl py-10 md:py-16 flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
      <h1 className="text-2xl font-bold mb-2">Redirecting to Dashboard</h1>
      <p className="text-muted-foreground">Please wait while we verify your session...</p>
    </div>
  )
}

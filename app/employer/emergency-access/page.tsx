"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function EmergencyAccessPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [sessionInfo, setSessionInfo] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (error) {
          setError(error.message)
        } else {
          setSessionInfo(data.session)
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        setError("Failed to check session: " + message)
      }
    }

    checkSession()
  }, [])

  const handleClearCookies = () => {
    setIsLoading(true)

    // Clear all cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
    })

    // Force reload to the login page
    window.location.href = "/employer/login?message=All cookies have been cleared. Please sign in again."
  }

  const handleForceAccess = async () => {
    setIsLoading(true)

    try {
      // Force redirect to dashboard without any checks
      window.location.href = "/employer/dashboard"
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError("Failed to force access: " + message)
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-6xl py-10 md:py-16">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl">Emergency Dashboard Access</CardTitle>
          <CardDescription>This page helps you break out of redirect loops and authentication issues.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              <p className="font-medium">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Current Session Status</h3>
            <div className="bg-muted p-3 rounded-md">
              {sessionInfo ? (
                <p>Session active for user: {sessionInfo.user?.email || "Unknown"}</p>
              ) : (
                <p>No active session found</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Available Actions</h3>
            <div className="bg-muted p-3 rounded-md space-y-2">
              <p className="text-sm">Choose one of the following options to resolve authentication issues:</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button className="w-full" variant="default" onClick={handleForceAccess} disabled={isLoading}>
            Force Access to Dashboard
          </Button>

          <Button className="w-full" variant="outline" onClick={handleClearCookies} disabled={isLoading}>
            Clear All Cookies & Restart
          </Button>

          <div className="w-full pt-2">
            <Link href="/" className="text-sm text-center block text-muted-foreground hover:text-foreground">
              Return to Homepage
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

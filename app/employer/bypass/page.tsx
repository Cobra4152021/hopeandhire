"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function BypassPage() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        setLoading(true)

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Session error:", sessionError)
          setError(`Session error: ${sessionError.message}`)
          return
        }

        setSession(sessionData.session)

        if (!sessionData.session) {
          setError("No active session found")
          return
        }

        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError) {
          console.error("User error:", userError)
          setError(`User error: ${userError.message}`)
          return
        }

        setUser(userData.user)
      } catch (err: any) {
        console.error("Unexpected error:", err)
        setError(`Unexpected error: ${err.message}`)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = "/employer/login"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleClearAuthCookies = () => {
    try {
      document.cookie = "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"
      document.cookie = "sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"
      document.cookie = "supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=lax"

      window.location.href = "/employer/login?message=Auth cookies cleared. Please sign in again."
    } catch (error) {
      console.error("Error clearing cookies:", error)
    }
  }

  if (loading) {
    return (
      <div className="container max-w-4xl py-10">
        <Card>
          <CardHeader>
            <CardTitle>Authentication Bypass</CardTitle>
            <CardDescription>Checking authentication status...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Authentication Bypass</CardTitle>
          <CardDescription>This page bypasses the middleware to help diagnose authentication issues.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error ? (
            <div className="bg-destructive/10 text-destructive p-4 rounded-md">
              <h3 className="font-semibold mb-2">Error</h3>
              <p>{error}</p>

              {error.includes("User from sub claim in JWT does not exist") && (
                <div className="mt-4 p-3 bg-amber-100 text-amber-800 rounded border border-amber-200">
                  <p className="font-medium">JWT references a user that doesn't exist</p>
                  <p className="text-sm mt-1">
                    This happens when a user has been deleted from the database but their token is still valid. Click
                    "Reset Auth Cookies" below to fix this issue.
                  </p>
                </div>
              )}
            </div>
          ) : null}

          <div>
            <h3 className="font-semibold mb-2">Session Status</h3>
            <div className="bg-muted p-4 rounded-md">
              <p>Session: {session ? "Active" : "None"}</p>
              {session && (
                <>
                  <p>Expires: {new Date(session.expires_at * 1000).toLocaleString()}</p>
                  <p>User ID: {session.user.id}</p>
                </>
              )}
            </div>
          </div>

          {user && (
            <div>
              <h3 className="font-semibold mb-2">User Information</h3>
              <div className="bg-muted p-4 rounded-md">
                <p>Email: {user.email}</p>
                <p>ID: {user.id}</p>
                <p>Created: {new Date(user.created_at).toLocaleString()}</p>
                <p>Last Sign In: {new Date(user.last_sign_in_at).toLocaleString()}</p>
              </div>
            </div>
          )}

          <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="font-semibold mb-2 text-blue-800">Quick Fix Options</h3>
            <p className="text-sm text-blue-700 mb-4">
              If you're experiencing authentication issues, try these options:
            </p>
            <div className="flex flex-col gap-2">
              <Button onClick={handleClearAuthCookies} variant="destructive" className="w-full">
                Reset Auth Cookies
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                This will clear all authentication cookies and redirect you to the login page.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 sm:flex-row">
          {session ? (
            <>
              <Button asChild>
                <Link href="/employer/dashboard">Go to Dashboard</Link>
              </Button>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild>
              <Link href="/employer/login">Go to Login</Link>
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

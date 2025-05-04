"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import Link from "next/link"

export default function StaticDashboardPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser()

        if (error) {
          setError(error.message)
        } else if (data?.user) {
          setUser(data.user)
        }
      } catch (err) {
        setError("Failed to get user: " + (err.message || String(err)))
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = "/employer/login?message=You have been signed out"
    } catch (err) {
      setError("Failed to sign out: " + (err.message || String(err)))
    }
  }

  if (loading) {
    return (
      <div className="container py-10 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>

      {error ? (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-red-700">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-700">{error}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => (window.location.href = "/employer/login")}>
              Return to Login
            </Button>
          </CardFooter>
        </Card>
      ) : null}

      {user ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
              <CardDescription>Your employer account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Email:</span> {user.email}
                </div>
                <div>
                  <span className="font-medium">User ID:</span> {user.id}
                </div>
                <div>
                  <span className="font-medium">Last Sign In:</span> {new Date(user.last_sign_in_at).toLocaleString()}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common employer tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button className="w-full" asChild>
                <Link href="/employer/dashboard/jobs/create">Post a New Job</Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/employer/dashboard/profile">Update Company Profile</Link>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/employer/dashboard/jobs">Manage Job Listings</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Not Authenticated</CardTitle>
            <CardDescription>You need to sign in to access the dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Please sign in with your employer account to access the dashboard.</p>
          </CardContent>
          <CardFooter>
            <Button asChild>
              <Link href="/employer/login">Sign In</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

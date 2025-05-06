"use client"

import { useEffect, useState } from "react"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestAuth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState("")
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }
    getUser()
  }, [supabase.auth])

  async function handleSignUp() {
    setMessage("")
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      setMessage("Check your email for the confirmation link!")
    } catch (error: any) {
      setMessage(error.message)
    }
  }

  async function handleSignIn() {
    setMessage("")
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      setUser(data.user)
      setMessage("Sign in successful!")
    } catch (error: any) {
      setMessage(error.message)
    }
  }

  async function handleSignOut() {
    setMessage("")
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      setUser(null)
      setMessage("Sign out successful!")
    } catch (error: any) {
      setMessage(error.message)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (user) {
    return (
      <div className="p-8">
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle>You are signed in</CardTitle>
            <CardDescription>Welcome back!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label>Email</Label>
                <div className="p-2 border rounded-md">{user.email}</div>
              </div>
              <div>
                <Label>User ID</Label>
                <div className="p-2 border rounded-md truncate">{user.id}</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSignOut} className="w-full">
              Sign Out
            </Button>
          </CardFooter>
        </Card>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    )
  }

  return (
    <div className="p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Authentication Test</CardTitle>
          <CardDescription>Test Supabase authentication</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="flex space-x-2 w-full">
            <Button onClick={handleSignIn} className="flex-1">
              Sign In
            </Button>
            <Button onClick={handleSignUp} variant="outline" className="flex-1">
              Sign Up
            </Button>
          </div>
        </CardFooter>
      </Card>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  )
}

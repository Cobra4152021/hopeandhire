"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Linkedin } from "lucide-react"

export default function VolunteerLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, just redirect to dashboard
      router.push("/volunteer/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md mx-auto border-0 shadow-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-gray-800">Volunteer Login</CardTitle>
            <CardDescription>Sign in to access your volunteer dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/volunteer/reset-password" className="text-sm text-[#26a69a] hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-[#26a69a] hover:bg-[#1e8e82] text-white" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-gray-50" type="button">
                <Linkedin className="mr-2 h-4 w-4 text-[#0077b5]" />
                Sign in with LinkedIn
              </Button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/volunteer/register" className="text-[#26a69a] hover:underline">
                  Register
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

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

export default function EmployerLogin() {
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
      router.push("/employer/dashboard")
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
            <CardTitle className="text-2xl font-bold text-gray-800">Employer Login</CardTitle>
            <CardDescription>Sign in to access your employer dashboard</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/employer/reset-password" className="text-sm text-[#f2b01e] hover:underline">
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
                  className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button type="submit" className="w-full bg-[#f2b01e] hover:bg-[#e0a31c] text-white" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </Button>
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/employer/register" className="text-[#f2b01e] hover:underline">
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

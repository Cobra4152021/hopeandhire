"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, ArrowLeft, CheckCircle2, Mail } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/employer/reset-password`,
      })

      if (error) {
        setError(error.message)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError("An unexpected error occurred. Please try again.")
      console.error("Password reset error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-md py-10 md:py-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Forgot Password</h1>
          <p className="text-muted-foreground">Enter your email to reset your password</p>
        </div>

        {success ? (
          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <CheckCircle2 className="h-16 w-16 text-green-500" />
              </div>
              <CardTitle className="text-center">Check Your Email</CardTitle>
              <CardDescription className="text-center">
                We've sent a password reset link to your email address. Please check your inbox and click the link to
                reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-md text-sm">
                <p className="font-medium mb-2">Next steps:</p>
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Check your email inbox (and spam folder)</li>
                  <li>Click the password reset link in the email</li>
                  <li>Create a new password</li>
                </ol>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/employer/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Return to Login
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Reset Password</CardTitle>
              <CardDescription>
                Enter your email address and we'll send you a link to reset your password.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      className="pl-10"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="w-full" asChild>
                <Link href="/employer/login">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Login
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}

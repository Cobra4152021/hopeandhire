"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Mail, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import confetti from "canvas-confetti"

// These are the actual working demo credentials
const DEMO_EMAIL = "demo@hopeandhire.com"
const DEMO_PASSWORD = "Demo@123456"

export default function EmployerLoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [signupError, setSignupError] = useState("")
  const [signupSuccess, setSignupSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [sessionChecked, setSessionChecked] = useState(false)

  // Check for success message in URL
  useEffect(() => {
    const message = searchParams.get("message")
    const error = searchParams.get("error")
    const success = searchParams.get("success")
    const next = searchParams.get("next")

    if (message) {
      toast({
        title: success === "true" ? "Success" : "Information",
        description: message,
        variant: success === "false" ? "destructive" : "default",
      })
    }

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }

    // If user is coming from email confirmation
    if (searchParams.get("email_confirmed") === "true") {
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      toast({
        title: "Email confirmed!",
        description: "Your email has been confirmed. You can now log in to your account.",
      })
    }

    // Check if user is already logged in
    const checkSession = async () => {
      try {
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession()

        if (sessionError) {
          console.error("Login - Session error:", sessionError.message)
          setSessionChecked(true)
          return
        }

        if (session) {
          console.log("Login - Session found:", session)

          // Use static dashboard to avoid RSC issues
          window.location.href = "/employer/static-dashboard"
          return
        }

        setSessionChecked(true)
      } catch (err) {
        console.error("Login - Unexpected session check error:", err)
        setSessionChecked(true)
      }
    }

    checkSession()
  }, [searchParams, toast, router])

  const fillDemoCredentials = () => {
    setEmail(DEMO_EMAIL)
    setPassword(DEMO_PASSWORD)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setLoginError("")

    try {
      console.log("Attempting login with:", { email })

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Login error:", error)
        setLoginError(error.message)
        setIsLoading(false)
        return
      }

      console.log("Login successful:", data)

      // Trigger confetti on successful login
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      toast({
        title: "Login successful",
        description: "Welcome back to your employer dashboard.",
      })

      // Use static dashboard to avoid RSC issues
      window.location.href = "/employer/static-dashboard"
    } catch (error) {
      console.error("Unexpected login error:", error)
      setLoginError(`An unexpected error occurred: ${error.message}`)
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSignupError("")
    setSignupSuccess(false)

    try {
      console.log("Attempting signup with:", { email, companyName })

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            company_name: companyName,
            role: "employer",
          },
          emailRedirectTo: `${window.location.origin}/employer/auth/callback`,
        },
      })

      if (error) {
        console.error("Signup error:", error)
        setSignupError(error.message)
        setIsLoading(false)
        return
      }

      console.log("Signup successful:", data)

      // Show success state
      setSignupSuccess(true)

      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      setIsLoading(false)
    } catch (error) {
      console.error("Unexpected signup error:", error)
      setSignupError(`An unexpected error occurred: ${error.message}`)
      setIsLoading(false)
    }
  }

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
        options: {
          redirectTo: `${window.location.origin}/employer/auth/callback`,
        },
      })

      if (error) {
        console.error("LinkedIn sign in error:", error)
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Unexpected LinkedIn sign in error:", error)
    }
  }

  if (!sessionChecked) {
    return (
      <div className="container max-w-6xl py-10 md:py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container max-w-6xl py-10 md:py-16">
      <div className="flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold">Employer Portal</h1>
          <p className="text-muted-foreground max-w-md">
            Connect with job-ready candidates and make a difference through second-chance hiring.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Employer Login</CardTitle>
                <CardDescription>Sign in to access your employer dashboard and manage job listings.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  {loginError && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      {loginError}
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

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/employer/forgot-password" className="text-xs text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>

                  {/* Demo credentials */}
                  <div className="mt-4 text-center text-sm">
                    <Button
                      variant="link"
                      type="button"
                      className="text-muted-foreground hover:text-primary p-0 h-auto"
                      onClick={fillDemoCredentials}
                    >
                      Use demo account
                    </Button>
                  </div>
                </form>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="relative w-full">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <Button variant="outline" className="w-full" type="button" onClick={handleLinkedInSignIn}>
                    <Image src="/linkedin-icon.png" alt="LinkedIn" width={20} height={20} className="mr-2" />
                    Sign in with LinkedIn
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="signup">
            {signupSuccess ? (
              <Card>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="h-16 w-16 text-green-500" />
                  </div>
                  <CardTitle className="text-center">Check Your Email</CardTitle>
                  <CardDescription className="text-center">
                    We've sent a confirmation link to your email address. Please check your inbox and click the link to
                    complete your registration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-muted p-4 rounded-md text-sm">
                    <p className="font-medium mb-2">Next steps:</p>
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Check your email inbox (and spam folder)</li>
                      <li>Click the confirmation link in the email</li>
                      <li>You'll be redirected to your dashboard after confirmation</li>
                    </ol>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSignupSuccess(false)
                      setActiveTab("login")
                    }}
                  >
                    Return to Login
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Create Employer Account</CardTitle>
                  <CardDescription>
                    Register your company to post jobs and connect with qualified candidates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSignup} className="space-y-4">
                    {signupError && (
                      <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        {signupError}
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="company-name"
                          name="company-name"
                          placeholder="Acme Inc."
                          className="pl-10"
                          required
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
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

                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="signup-password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="pl-10 pr-10"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Must be at least 8 characters with a number and special character.
                      </p>
                    </div>

                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By creating an account, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4">
                  <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <Button variant="outline" className="w-full" type="button" onClick={handleLinkedInSignIn}>
                      <Image src="/linkedin-icon.png" alt="LinkedIn" width={20} height={20} className="mr-2" />
                      Sign up with LinkedIn
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

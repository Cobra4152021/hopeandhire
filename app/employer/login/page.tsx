// Full corrected content of login/page.tsx goes here

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Lock, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import confetti from "canvas-confetti"

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

  useEffect(() => {
    const message = searchParams.get("message")
    const error = searchParams.get("error")
    const success = searchParams.get("success")

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

    if (searchParams.get("email_confirmed") === "true") {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      toast({
        title: "Email confirmed!",
        description: "Your email has been confirmed. You can now log in to your account.",
      })
    }

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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })

      if (error) {
        console.error("Login error:", error)
        const message = error instanceof Error ? error.message : String(error)
        setLoginError(message)
        setIsLoading(false)
        return
      }

      console.log("Login successful:", data)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      toast({ title: "Login successful", description: "Welcome back to your employer dashboard." })
      window.location.href = "/employer/static-dashboard"
    } catch (error) {
      console.error("Unexpected login error:", error)
      const message = error instanceof Error ? error.message : String(error)
      setLoginError(`An unexpected error occurred: ${message}`)
      setIsLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSignupError("")
    setSignupSuccess(false)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { company_name: companyName, role: "employer" },
          emailRedirectTo: `${window.location.origin}/employer/auth/callback`,
        },
      })

      if (error) {
        console.error("Signup error:", error)
        const message = error instanceof Error ? error.message : String(error)
        setSignupError(message)
        setIsLoading(false)
        return
      }

      setSignupSuccess(true)
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
      setIsLoading(false)
    } catch (error) {
      console.error("Unexpected signup error:", error)
      const message = error instanceof Error ? error.message : String(error)
      setSignupError(`An unexpected error occurred: ${message}`)
      setIsLoading(false)
    }
  }

  const handleLinkedInSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin",
        options: { redirectTo: `${window.location.origin}/employer/auth/callback` },
      })

      if (error) {
        console.error("LinkedIn sign in error:", error)
        const message = error instanceof Error ? error.message : String(error)
        toast({ title: "Error", description: message, variant: "destructive" })
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
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4 sm:px-6">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold">Hope & Hire</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center p-4 bg-muted/40">
        {/* Add login/signup card JSX here */}
      </main>
    </div>
  )
}

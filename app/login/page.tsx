"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("volunteer")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      // In a real application, this would be an API call to authenticate
      // For demo purposes, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate successful login
      if (activeTab === "volunteer") {
        router.push("/volunteer/dashboard")
      } else if (activeTab === "employer") {
        router.push("/employer/dashboard")
      } else {
        router.push("/organization/dashboard")
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="volunteer" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
                <TabsTrigger value="employer">Employer</TabsTrigger>
                <TabsTrigger value="organization">Organization</TabsTrigger>
              </TabsList>
              <TabsContent value="volunteer">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">Demo credentials: </span>
                  <code className="rounded bg-muted px-1 py-0.5">volunteer@example.com</code>
                  <span className="text-muted-foreground"> / </span>
                  <code className="rounded bg-muted px-1 py-0.5">password</code>
                </div>

                <div className="relative my-6">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-muted-foreground text-sm">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Image src="/linkedin-icon.png" alt="LinkedIn" width={20} height={20} className="mr-2" />
                    LinkedIn
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="employer">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

                  <div className="space-y-2">
                    <Label htmlFor="employer-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="employer-email"
                        type="email"
                        placeholder="you@company.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="employer-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="employer-password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">Demo credentials: </span>
                  <code className="rounded bg-muted px-1 py-0.5">employer@example.com</code>
                  <span className="text-muted-foreground"> / </span>
                  <code className="rounded bg-muted px-1 py-0.5">password</code>
                </div>

                <div className="relative my-6">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-muted-foreground text-sm">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="w-full">
                    <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
                    Google
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="organization">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">{error}</div>}

                  <div className="space-y-2">
                    <Label htmlFor="org-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="org-email"
                        type="email"
                        placeholder="you@organization.org"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="org-password">Password</Label>
                      <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="org-password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10 pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-4 text-center text-sm">
                  <span className="text-muted-foreground">Demo credentials: </span>
                  <code className="rounded bg-muted px-1 py-0.5">org@example.org</code>
                  <span className="text-muted-foreground"> / </span>
                  <code className="rounded bg-muted px-1 py-0.5">password</code>
                </div>

                <div className="relative my-6">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-2 text-muted-foreground text-sm">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Button variant="outline" className="w-full">
                    <Image src="/google-icon.png" alt="Google" width={20} height={20} className="mr-2" />
                    Google
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/register" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

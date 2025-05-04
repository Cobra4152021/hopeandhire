"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("volunteer")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // In a real application, this would be an API call to register
      // For demo purposes, we'll simulate a successful registration after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful registration
      router.push("/login")
    } catch (err) {
      setError("Registration failed. Please try again.")
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
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription>Sign up to join our community</CardDescription>
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

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                        <Input id="first-name" placeholder="John" className="pl-10" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Last Name</Label>
                      <Input id="last-name" placeholder="Doe" required />
                    </div>
                  </div>

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
                    <Label htmlFor="password">Password</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          terms and conditions
                        </Link>
                      </Label>
                      <p className="text-sm text-muted-foreground">By signing up, you consent to our privacy policy.</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

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
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" placeholder="Acme Inc." required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="employer-email">Work Email</Label>
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
                    <Label htmlFor="employer-password">Password</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="employer-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="employer-confirm-password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="employer-terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="employer-terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          terms and conditions
                        </Link>
                      </Label>
                      <p className="text-sm text-muted-foreground">By signing up, you consent to our privacy policy.</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

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
                    <Label htmlFor="org-name">Organization Name</Label>
                    <Input id="org-name" placeholder="Second Chance Foundation" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="org-email">Work Email</Label>
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
                    <Label htmlFor="org-password">Password</Label>
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

                  <div className="space-y-2">
                    <Label htmlFor="org-confirm-password">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                      <Input
                        id="org-confirm-password"
                        type={showPassword ? "text" : "password"}
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <Checkbox id="org-terms" required />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="org-terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary hover:underline">
                          terms and conditions
                        </Link>
                      </Label>
                      <p className="text-sm text-muted-foreground">By signing up, you consent to our privacy policy.</p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

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
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}

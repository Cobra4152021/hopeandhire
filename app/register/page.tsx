"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [userType, setUserType] = useState("jobseeker")

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate registration - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="container flex items-center justify-center min-h-screen py-12">
      {/* Logo Section - Centrally positioned */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2">
        <Image src="/logo.png" alt="Hope and Hire Logo" width={180} height={72} className="h-auto" priority />
      </div>

      <Card className="w-full max-w-md mt-16">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            Join Hope and Hire to connect with opportunities and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="jobseeker" onValueChange={setUserType}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="jobseeker">Job Seeker</TabsTrigger>
              <TabsTrigger value="volunteer">Volunteer</TabsTrigger>
              <TabsTrigger value="employer">Employer</TabsTrigger>
            </TabsList>

            <TabsContent value="jobseeker">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" required />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-teal hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-teal hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-teal text-white hover:bg-teal-dark" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="volunteer">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="volunteerFirstName">First Name</Label>
                    <Input id="volunteerFirstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volunteerLastName">Last Name</Label>
                    <Input id="volunteerLastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteerEmail">Email</Label>
                  <Input id="volunteerEmail" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteerPhone">Phone Number</Label>
                  <Input id="volunteerPhone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteerExpertise">Area of Expertise</Label>
                  <Select>
                    <SelectTrigger id="volunteerExpertise">
                      <SelectValue placeholder="Select your expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="resume">Resume Review</SelectItem>
                      <SelectItem value="interview">Mock Interviews</SelectItem>
                      <SelectItem value="career">Career Counseling</SelectItem>
                      <SelectItem value="jobsearch">Job Search Strategy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteerPassword">Password</Label>
                  <Input id="volunteerPassword" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="volunteerConfirmPassword">Confirm Password</Label>
                  <Input id="volunteerConfirmPassword" type="password" required />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="volunteerTerms" required />
                  <Label htmlFor="volunteerTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-teal hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-teal hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full bg-teal text-white hover:bg-teal-dark" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="employer">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactFirstName">Contact First Name</Label>
                    <Input id="contactFirstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactLastName">Contact Last Name</Label>
                    <Input id="contactLastName" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerEmail">Business Email</Label>
                  <Input id="employerEmail" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerPhone">Business Phone</Label>
                  <Input id="employerPhone" type="tel" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry</Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerPassword">Password</Label>
                  <Input id="employerPassword" type="password" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employerConfirmPassword">Confirm Password</Label>
                  <Input id="employerConfirmPassword" type="password" required />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="employerTerms" required />
                  <Label htmlFor="employerTerms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-teal hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-teal hover:underline">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow text-dark-text hover:bg-yellow-dark"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-teal hover:underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

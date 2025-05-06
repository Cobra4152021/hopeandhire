"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft, Upload, Lock, Building, Mail, Phone, MapPin } from "lucide-react"

export default function EmployerProfilePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample employer profile data
  const [profileData, setProfileData] = useState({
    companyName: "Bay Area Distribution",
    industry: "Logistics",
    website: "https://bayareadistribution.com",
    description:
      "Bay Area Distribution is a leading logistics company specializing in warehouse management and distribution services for businesses of all sizes.",
    address: "123 Industrial Way, San Francisco, CA 94107",
    phone: "(415) 555-1234",
    email: "hr@bayareadistribution.com",
    contactPerson: "John Smith",
    contactTitle: "HR Director",
    contactEmail: "john.smith@bayareadistribution.com",
    contactPhone: "(415) 555-5678",
    password: "••••••••",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your company profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault()

    if (profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      })

      // Reset password fields
      setProfileData((prev) => ({
        ...prev,
        password: "••••••••",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error updating your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Button variant="outline" size="sm" className="mb-4 border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/employer/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Company Profile</h1>
            <p className="text-gray-600">Manage your company information and account settings</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/generic-company-logo.png" alt="Company Logo" />
                      <AvatarFallback className="bg-[#fff8e1] text-[#f2b01e] text-xl">
                        {profileData.companyName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-gray-800">{profileData.companyName}</h2>
                    <p className="text-gray-600 text-sm">{profileData.industry}</p>

                    <div className="w-full mt-6 space-y-2 text-left">
                      <div className="flex items-center text-sm text-gray-600">
                        <Building className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">{profileData.companyName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">{profileData.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">{profileData.phone}</span>
                      </div>
                      <div className="flex items-start text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                        <span className="truncate">{profileData.address}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                      <Link href="/employer/dashboard">View Dashboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="company" className="space-y-6">
                <TabsList className="bg-white border border-gray-200">
                  <TabsTrigger
                    value="company"
                    className="data-[state=active]:bg-[#fff8e1] data-[state=active]:text-[#f2b01e]"
                  >
                    Company Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="contact"
                    className="data-[state=active]:bg-[#fff8e1] data-[state=active]:text-[#f2b01e]"
                  >
                    Contact Details
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-[#fff8e1] data-[state=active]:text-[#f2b01e]"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="company">
                  <Card className="border-0 shadow-md">
                    <form onSubmit={handleProfileUpdate}>
                      <CardHeader>
                        <CardTitle>Company Information</CardTitle>
                        <CardDescription>Update your company details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="companyName" className="text-gray-700">
                                Company Name
                              </Label>
                              <Input
                                id="companyName"
                                name="companyName"
                                value={profileData.companyName}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="industry" className="text-gray-700">
                                Industry
                              </Label>
                              <Input
                                id="industry"
                                name="industry"
                                value={profileData.industry}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website" className="text-gray-700">
                              Website
                            </Label>
                            <Input
                              id="website"
                              name="website"
                              value={profileData.website}
                              onChange={handleInputChange}
                              className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="description" className="text-gray-700">
                              Company Description
                            </Label>
                            <Textarea
                              id="description"
                              name="description"
                              value={profileData.description}
                              onChange={handleInputChange}
                              rows={5}
                              className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="address" className="text-gray-700">
                              Address
                            </Label>
                            <Textarea
                              id="address"
                              name="address"
                              value={profileData.address}
                              onChange={handleInputChange}
                              rows={2}
                              className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-700">Company Logo</Label>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src="/generic-company-logo.png" alt="Company Logo" />
                                <AvatarFallback className="bg-[#fff8e1] text-[#f2b01e]">
                                  {profileData.companyName.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <Button
                                type="button"
                                variant="outline"
                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Logo
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Recommended: Square image, at least 200x200 pixels, JPG or PNG format.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="submit"
                          className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="contact">
                  <Card className="border-0 shadow-md">
                    <form onSubmit={handleProfileUpdate}>
                      <CardHeader>
                        <CardTitle>Contact Details</CardTitle>
                        <CardDescription>Update your company contact information</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-gray-700">
                                Company Phone
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-gray-700">
                                Company Email
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                              />
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Primary Contact Person</h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="contactPerson" className="text-gray-700">
                                  Contact Name
                                </Label>
                                <Input
                                  id="contactPerson"
                                  name="contactPerson"
                                  value={profileData.contactPerson}
                                  onChange={handleInputChange}
                                  className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contactTitle" className="text-gray-700">
                                  Job Title
                                </Label>
                                <Input
                                  id="contactTitle"
                                  name="contactTitle"
                                  value={profileData.contactTitle}
                                  onChange={handleInputChange}
                                  className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                              <div className="space-y-2">
                                <Label htmlFor="contactEmail" className="text-gray-700">
                                  Contact Email
                                </Label>
                                <Input
                                  id="contactEmail"
                                  name="contactEmail"
                                  type="email"
                                  value={profileData.contactEmail}
                                  onChange={handleInputChange}
                                  className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contactPhone" className="text-gray-700">
                                  Contact Phone
                                </Label>
                                <Input
                                  id="contactPhone"
                                  name="contactPhone"
                                  value={profileData.contactPhone}
                                  onChange={handleInputChange}
                                  className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="submit"
                          className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card className="border-0 shadow-md">
                    <form onSubmit={handlePasswordUpdate}>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>Update your password and security preferences</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="password" className="text-gray-700">
                              Current Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="password"
                                name="password"
                                type="password"
                                value={profileData.password}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e] pr-10"
                              />
                              <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="newPassword" className="text-gray-700">
                              New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={profileData.newPassword}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e] pr-10"
                              />
                              <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500">
                              Password must be at least 8 characters long and include a mix of letters, numbers, and
                              symbols.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword" className="text-gray-700">
                              Confirm New Password
                            </Label>
                            <div className="relative">
                              <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                value={profileData.confirmPassword}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e] pr-10"
                              />
                              <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <Button
                          type="submit"
                          className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Updating..." : "Update Password"}
                        </Button>
                        <p className="text-sm text-gray-500 mt-4">
                          For additional security options or if you've forgotten your password, please contact support.
                        </p>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft, Upload, Lock, Plus, Mail, Phone, Briefcase, Calendar } from "lucide-react"

export default function VolunteerProfilePage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sample volunteer profile data
  const [profileData, setProfileData] = useState({
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@example.com",
    phone: "(415) 555-9876",
    company: "Tech Recruiters Inc.",
    jobTitle: "HR Director",
    bio: "Experienced HR professional with 15+ years in recruitment and talent acquisition. Passionate about helping job seekers find meaningful employment opportunities.",
    experience: "10+",
    skills: ["Resume Review", "Mock Interview", "Job Placement", "Career Coaching"],
    newSkill: "",
    availability: "3-5 hours/week",
    availableDays: ["Monday", "Wednesday", "Friday"],
    notifications: {
      email: true,
      sms: false,
      appointments: true,
      matches: true,
      newsletter: true,
    },
    password: "••••••••",
    newPassword: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setProfileData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [name]: checked,
      },
    }))
  }

  const addSkill = () => {
    if (profileData.newSkill.trim() !== "" && !profileData.skills.includes(profileData.newSkill.trim())) {
      setProfileData((prev) => ({
        ...prev,
        skills: [...prev.skills, prev.newSkill.trim()],
        newSkill: "",
      }))
    }
  }

  const removeSkill = (skill: string) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skill),
    }))
  }

  const toggleAvailableDay = (day: string) => {
    setProfileData((prev) => {
      if (prev.availableDays.includes(day)) {
        return {
          ...prev,
          availableDays: prev.availableDays.filter((d) => d !== day),
        }
      } else {
        return {
          ...prev,
          availableDays: [...prev.availableDays, day],
        }
      }
    })
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
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
              <Link href="/volunteer/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Volunteer Profile</h1>
            <p className="text-gray-600">Manage your personal information and volunteer preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="/professional-woman-diverse.png" alt="Profile" />
                      <AvatarFallback className="bg-[#e6f7f5] text-[#26a69a] text-xl">
                        {profileData.firstName.charAt(0)}
                        {profileData.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold text-gray-800">
                      {profileData.firstName} {profileData.lastName}
                    </h2>
                    <p className="text-gray-600 text-sm">{profileData.jobTitle}</p>

                    <div className="flex flex-wrap justify-center gap-1 mt-2">
                      {profileData.skills.slice(0, 3).map((skill) => (
                        <Badge key={skill} className="bg-[#e6f7f5] text-[#26a69a] hover:bg-[#d4f0ed]">
                          {skill}
                        </Badge>
                      ))}
                      {profileData.skills.length > 3 && (
                        <Badge variant="outline" className="border-gray-200 text-gray-700">
                          +{profileData.skills.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="w-full mt-6 space-y-2 text-left">
                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">{profileData.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">{profileData.phone}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">{profileData.company}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="truncate">Available: {profileData.availableDays.join(", ")}</span>
                      </div>
                    </div>

                    <Button className="w-full mt-6 bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                      <Link href="/volunteer/dashboard">View Dashboard</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="personal" className="space-y-6">
                <TabsList className="bg-white border border-gray-200">
                  <TabsTrigger
                    value="personal"
                    className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
                  >
                    Personal Information
                  </TabsTrigger>
                  <TabsTrigger
                    value="volunteer"
                    className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
                  >
                    Volunteer Preferences
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
                  >
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
                  >
                    Security
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="personal">
                  <Card className="border-0 shadow-md">
                    <form onSubmit={handleProfileUpdate}>
                      <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="firstName" className="text-gray-700">
                                First Name
                              </Label>
                              <Input
                                id="firstName"
                                name="firstName"
                                value={profileData.firstName}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="lastName" className="text-gray-700">
                                Last Name
                              </Label>
                              <Input
                                id="lastName"
                                name="lastName"
                                value={profileData.lastName}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="email" className="text-gray-700">
                                Email
                              </Label>
                              <Input
                                id="email"
                                name="email"
                                type="email"
                                value={profileData.email}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phone" className="text-gray-700">
                                Phone
                              </Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={profileData.phone}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="company" className="text-gray-700">
                                Company/Organization
                              </Label>
                              <Input
                                id="company"
                                name="company"
                                value={profileData.company}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="jobTitle" className="text-gray-700">
                                Job Title
                              </Label>
                              <Input
                                id="jobTitle"
                                name="jobTitle"
                                value={profileData.jobTitle}
                                onChange={handleInputChange}
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio" className="text-gray-700">
                              Bio
                            </Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={profileData.bio}
                              onChange={handleInputChange}
                              rows={4}
                              className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-700">Profile Photo</Label>
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src="/professional-woman-diverse.png" alt="Profile" />
                                <AvatarFallback className="bg-[#e6f7f5] text-[#26a69a]">
                                  {profileData.firstName.charAt(0)}
                                  {profileData.lastName.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <Button
                                type="button"
                                variant="outline"
                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                              >
                                <Upload className="mr-2 h-4 w-4" />
                                Upload Photo
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
                          className="bg-[#26a69a] hover:bg-[#1e8e82] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="volunteer">
                  <Card className="border-0 shadow-md">
                    <form onSubmit={handleProfileUpdate}>
                      <CardHeader>
                        <CardTitle>Volunteer Preferences</CardTitle>
                        <CardDescription>Update your volunteer skills and availability</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="experience" className="text-gray-700">
                              Years of Recruiting Experience
                            </Label>
                            <Select
                              value={profileData.experience}
                              onValueChange={(value) => handleSelectChange("experience", value)}
                            >
                              <SelectTrigger id="experience" className="border-gray-200 focus:ring-[#26a69a]">
                                <SelectValue placeholder="Select experience" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0-1">Less than 1 year</SelectItem>
                                <SelectItem value="1-3">1-3 years</SelectItem>
                                <SelectItem value="3-5">3-5 years</SelectItem>
                                <SelectItem value="5-10">5-10 years</SelectItem>
                                <SelectItem value="10+">10+ years</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-700">Areas of Expertise</Label>
                            <div className="flex flex-wrap gap-2 mb-2">
                              {profileData.skills.map((skill) => (
                                <Badge
                                  key={skill}
                                  className="bg-[#e6f7f5] text-[#26a69a] hover:bg-[#d4f0ed] flex items-center gap-1"
                                >
                                  {skill}
                                  <button
                                    type="button"
                                    onClick={() => removeSkill(skill)}
                                    className="ml-1 rounded-full hover:bg-[#26a69a] hover:text-white h-4 w-4 inline-flex items-center justify-center"
                                  >
                                    ×
                                  </button>
                                </Badge>
                              ))}
                            </div>
                            <div className="flex gap-2">
                              <Input
                                id="newSkill"
                                name="newSkill"
                                value={profileData.newSkill}
                                onChange={handleInputChange}
                                placeholder="Add a new skill..."
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a]"
                              />
                              <Button
                                type="button"
                                onClick={addSkill}
                                variant="outline"
                                className="border-gray-200 text-gray-700 hover:bg-gray-50"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="availability" className="text-gray-700">
                              Availability (Hours per week)
                            </Label>
                            <Select
                              value={profileData.availability}
                              onValueChange={(value) => handleSelectChange("availability", value)}
                            >
                              <SelectTrigger id="availability" className="border-gray-200 focus:ring-[#26a69a]">
                                <SelectValue placeholder="Select availability" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1-2 hours/week">1-2 hours per week</SelectItem>
                                <SelectItem value="3-5 hours/week">3-5 hours per week</SelectItem>
                                <SelectItem value="5-10 hours/week">5-10 hours per week</SelectItem>
                                <SelectItem value="as-needed">As needed basis</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label className="text-gray-700">Available Days</Label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                                <Button
                                  key={day}
                                  type="button"
                                  variant={profileData.availableDays.includes(day) ? "default" : "outline"}
                                  className={
                                    profileData.availableDays.includes(day)
                                      ? "bg-[#26a69a] hover:bg-[#1e8e82] text-white"
                                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                                  }
                                  onClick={() => toggleAvailableDay(day)}
                                >
                                  {day}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="submit"
                          className="bg-[#26a69a] hover:bg-[#1e8e82] text-white"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications">
                  <Card className="border-0 shadow-md">
                    <form onSubmit={handleProfileUpdate}>
                      <CardHeader>
                        <CardTitle>Notification Preferences</CardTitle>
                        <CardDescription>Manage how you receive notifications</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-gray-700">Email Notifications</Label>
                              <p className="text-sm text-gray-500">Receive notifications via email</p>
                            </div>
                            <Switch
                              checked={profileData.notifications.email}
                              onCheckedChange={(checked) => handleSwitchChange("email", checked)}
                              className="data-[state=checked]:bg-[#26a69a]"
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label className="text-gray-700">SMS Notifications</Label>
                              <p className="text-sm text-gray-500">Receive notifications via text message</p>
                            </div>
                            <Switch
                              checked={profileData.notifications.sms}
                              onCheckedChange={(checked) => handleSwitchChange("sms", checked)}
                              className="data-[state=checked]:bg-[#26a69a]"
                            />
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            <h3 className="text-lg font-medium text-gray-800 mb-4">Notification Types</h3>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label className="text-gray-700">Appointment Reminders</Label>
                                  <p className="text-sm text-gray-500">Notifications about upcoming appointments</p>
                                </div>
                                <Switch
                                  checked={profileData.notifications.appointments}
                                  onCheckedChange={(checked) => handleSwitchChange("appointments", checked)}
                                  className="data-[state=checked]:bg-[#26a69a]"
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label className="text-gray-700">Match Notifications</Label>
                                  <p className="text-sm text-gray-500">Notifications about new candidate matches</p>
                                </div>
                                <Switch
                                  checked={profileData.notifications.matches}
                                  onCheckedChange={(checked) => handleSwitchChange("matches", checked)}
                                  className="data-[state=checked]:bg-[#26a69a]"
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                  <Label className="text-gray-700">Newsletter</Label>
                                  <p className="text-sm text-gray-500">Receive monthly newsletter and updates</p>
                                </div>
                                <Switch
                                  checked={profileData.notifications.newsletter}
                                  onCheckedChange={(checked) => handleSwitchChange("newsletter", checked)}
                                  className="data-[state=checked]:bg-[#26a69a]"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          type="submit"
                          className="bg-[#26a69a] hover:bg-[#1e8e82] text-white"
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
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a] pr-10"
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
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a] pr-10"
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
                                className="border-gray-200 focus:border-[#26a69a] focus:ring-[#26a69a] pr-10"
                              />
                              <Lock className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex flex-col items-start">
                        <Button
                          type="submit"
                          className="bg-[#26a69a] hover:bg-[#1e8e82] text-white"
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

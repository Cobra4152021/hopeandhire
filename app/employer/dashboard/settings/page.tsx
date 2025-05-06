"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Key, Lock, Mail, Shield, User } from "lucide-react"

export default function SettingsPage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [notificationSettings, setNotificationSettings] = useState({
    newApplications: true,
    applicationUpdates: true,
    messages: true,
    jobExpiration: true,
    marketingEmails: false,
  })
  const { toast } = useToast()

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          setUserData({
            ...userData,
            name: "John Smith",
            email: "john.smith@example.com",
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing settings page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNotificationChange = (name: string, checked: boolean) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: checked }))
  }

  const handleUpdateProfile = async () => {
    setSaving(true)

    try {
      // In a real app, we would update the user profile in Supabase
      // const { error } = await supabase.auth.updateUser({
      //   data: { name: userData.name }
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (userData.newPassword !== userData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation password must match.",
        variant: "destructive",
      })
      return
    }

    setSaving(true)

    try {
      // In a real app, we would update the password in Supabase
      // const { error } = await supabase.auth.updateUser({
      //   password: userData.newPassword
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setUserData({
        ...userData,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })

      toast({
        title: "Password updated",
        description: "Your password has been changed successfully.",
      })
    } catch (error) {
      console.error("Error changing password:", error)
      toast({
        title: "Error",
        description: "There was an error changing your password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNotifications = async () => {
    setSaving(true)

    try {
      // In a real app, we would save notification settings to Supabase
      // const { error } = await supabase.from('notification_settings').upsert({
      //   user_id: user.id,
      //   ...notificationSettings
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Notification settings updated",
        description: "Your notification preferences have been saved.",
      })
    } catch (error) {
      console.error("Error saving notification settings:", error)
      toast({
        title: "Error",
        description: "There was an error saving your notification settings. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-sm" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <User className="h-4 w-4" />
                    </span>
                    <Input
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Mail className="h-4 w-4" />
                    </span>
                    <Input
                      id="email"
                      name="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      className="rounded-l-none"
                      disabled
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">To change your email address, please contact support.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleUpdateProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Password Settings */}
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Key className="h-4 w-4" />
                    </span>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={userData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Your current password"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Lock className="h-4 w-4" />
                    </span>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={userData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Your new password"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <Shield className="h-4 w-4" />
                    </span>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={userData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your new password"
                      className="rounded-l-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleChangePassword} disabled={saving}>
                  {saving ? "Updating..." : "Change Password"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Control which notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="newApplications">New Applications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when new applications are submitted
                      </p>
                    </div>
                    <Switch
                      id="newApplications"
                      checked={notificationSettings.newApplications}
                      onCheckedChange={(checked) => handleNotificationChange("newApplications", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="applicationUpdates">Application Updates</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when applications are updated
                      </p>
                    </div>
                    <Switch
                      id="applicationUpdates"
                      checked={notificationSettings.applicationUpdates}
                      onCheckedChange={(checked) => handleNotificationChange("applicationUpdates", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="messages">Messages</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications for new messages from candidates
                      </p>
                    </div>
                    <Switch
                      id="messages"
                      checked={notificationSettings.messages}
                      onCheckedChange={(checked) => handleNotificationChange("messages", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="jobExpiration">Job Expiration</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications when your job postings are about to expire
                      </p>
                    </div>
                    <Switch
                      id="jobExpiration"
                      checked={notificationSettings.jobExpiration}
                      onCheckedChange={(checked) => handleNotificationChange("jobExpiration", checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="marketingEmails">Marketing Emails</Label>
                      <p className="text-sm text-muted-foreground">Receive updates about new features and promotions</p>
                    </div>
                    <Switch
                      id="marketingEmails"
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(checked) => handleNotificationChange("marketingEmails", checked)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveNotifications} disabled={saving}>
                  {saving ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

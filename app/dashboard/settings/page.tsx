'use client';

import type React from 'react';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Bell, Shield, CreditCard } from 'lucide-react';

export default function SettingsPage() {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    // Simulate update
    setTimeout(() => {
      setIsUpdating(false);
      setIsUpdated(true);

      // Reset notification
      setTimeout(() => {
        setIsUpdated(false);
      }, 3000);
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      {isUpdated && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          Settings updated successfully!
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 md:w-auto">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden md:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden md:inline">Billing</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue="Doe" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        defaultValue="john.doe@example.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue="(555) 123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue="San Francisco, CA" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        placeholder="Tell us about yourself"
                        defaultValue="Experienced professional with a background in marketing and communications."
                        rows={4}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="bg-teal text-white hover:bg-teal-dark"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Update Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Picture</CardTitle>
                <CardDescription>Update your profile picture</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/stylized-letters-jd.png" alt="John Doe" />
                  <AvatarFallback className="text-xl">JD</AvatarFallback>
                </Avatar>

                <div className="flex flex-col gap-2 w-full">
                  <Button variant="outline" className="w-full">
                    Upload New Picture
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-500 hover:text-red-700"
                  >
                    Remove Picture
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-messages" className="font-medium">
                        New Messages
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for new messages
                      </p>
                    </div>
                    <Switch id="email-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="email-applications"
                        className="font-medium"
                      >
                        Job Applications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive email notifications for job application updates
                      </p>
                    </div>
                    <Switch id="email-applications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label
                        htmlFor="email-appointments"
                        className="font-medium"
                      >
                        Appointment Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Receive email reminders for upcoming appointments
                      </p>
                    </div>
                    <Switch id="email-appointments" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-messages" className="font-medium">
                        New Messages
                      </Label>
                      <p className="text-sm text-gray-500">
                        Show in-app notifications for new messages
                      </p>
                    </div>
                    <Switch id="app-messages" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-applications" className="font-medium">
                        Job Applications
                      </Label>
                      <p className="text-sm text-gray-500">
                        Show in-app notifications for job application updates
                      </p>
                    </div>
                    <Switch id="app-applications" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="app-appointments" className="font-medium">
                        Appointment Reminders
                      </Label>
                      <p className="text-sm text-gray-500">
                        Show in-app reminders for upcoming appointments
                      </p>
                    </div>
                    <Switch id="app-appointments" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notification Frequency</h3>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Email Digest Frequency</Label>
                  <Select defaultValue="daily">
                    <SelectTrigger id="frequency">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                className="bg-teal text-white hover:bg-teal-dark"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? 'Saving...' : 'Save Preferences'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button
                    type="submit"
                    className="bg-teal text-white hover:bg-teal-dark"
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Update Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">
                      Protect your account with 2FA
                    </p>
                  </div>
                  <Switch id="2fa" />
                </div>
                <Button variant="outline" className="w-full">
                  Set Up Two-Factor Authentication
                </Button>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Login Sessions</CardTitle>
                <CardDescription>
                  Manage your active sessions and sign out from other devices
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-gray-500">
                        San Francisco, CA • Chrome on Windows • Active now
                      </p>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Current
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">Mobile App</p>
                      <p className="text-sm text-gray-500">
                        San Francisco, CA • iOS App • Last active 2 hours ago
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                    >
                      Sign Out
                    </Button>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-700"
                >
                  Sign Out From All Devices
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Manage your billing information and subscription
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Current Plan</h3>
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-medium text-lg">Free Plan</p>
                      <p className="text-sm text-gray-500">
                        Basic features for individual use
                      </p>
                    </div>
                    <Button className="bg-teal text-white hover:bg-teal-dark">
                      Upgrade Plan
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-teal-light/20 flex items-center justify-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-teal"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm">Up to 5 job applications</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-teal-light/20 flex items-center justify-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-teal"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm">Basic resume review</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-teal-light/20 flex items-center justify-center mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3 w-3 text-teal"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-sm">Email support</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Method</h3>
                <Button variant="outline" className="w-full md:w-auto">
                  Add Payment Method
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Billing History</h3>
                <p className="text-sm text-gray-500">
                  No billing history available.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { Building2, MapPin, Globe, Phone, Mail, Upload } from "lucide-react"

export default function CompanyProfilePage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [companyData, setCompanyData] = useState({
    name: "",
    website: "",
    industry: "",
    size: "",
    founded: "",
    description: "",
    mission: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    email: "",
    logo: "",
    coverImage: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
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
          setCompanyData({
            name: "Acme Corporation",
            website: "https://www.acmecorp.com",
            industry: "Technology",
            size: "50-100",
            founded: "2010",
            description:
              "Acme Corporation is a leading technology company specializing in innovative software solutions for businesses of all sizes. We help our clients streamline their operations, improve efficiency, and drive growth through cutting-edge technology.",
            mission:
              "Our mission is to empower businesses with technology that simplifies complex processes and enables them to focus on what they do best.",
            address: "123 Main Street",
            city: "San Francisco",
            state: "CA",
            zip: "94105",
            country: "United States",
            phone: "(555) 123-4567",
            email: "info@acmecorp.com",
            logo: "",
            coverImage: "",
            facebook: "https://facebook.com/acmecorp",
            twitter: "https://twitter.com/acmecorp",
            linkedin: "https://linkedin.com/company/acmecorp",
            instagram: "https://instagram.com/acmecorp",
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing company profile page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCompanyData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      // In a real app, we would save to Supabase here
      // const { error } = await supabase.from('companies').update(companyData).eq('id', companyId)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Profile updated",
        description: "Your company profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Error saving company profile:", error)
      toast({
        title: "Error",
        description: "There was an error updating your company profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Company Profile</h1>
        <p className="text-muted-foreground">Manage your company information and branding</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-full max-w-sm" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <Tabs defaultValue="general">
          <TabsList>
            <TabsTrigger value="general">General Information</TabsTrigger>
            <TabsTrigger value="contact">Contact Details</TabsTrigger>
            <TabsTrigger value="branding">Branding</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
          </TabsList>

          {/* General Information */}
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Basic details about your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={companyData.name}
                    onChange={handleInputChange}
                    placeholder="Your company name"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Globe className="h-4 w-4" />
                      </span>
                      <Input
                        id="website"
                        name="website"
                        value={companyData.website}
                        onChange={handleInputChange}
                        placeholder="https://www.example.com"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      name="industry"
                      value={companyData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g. Technology, Healthcare, Finance"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="size">Company Size</Label>
                    <Input
                      id="size"
                      name="size"
                      value={companyData.size}
                      onChange={handleInputChange}
                      placeholder="e.g. 1-10, 11-50, 51-200"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="founded">Founded Year</Label>
                    <Input
                      id="founded"
                      name="founded"
                      value={companyData.founded}
                      onChange={handleInputChange}
                      placeholder="e.g. 2010"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={companyData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your company..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mission">Mission Statement</Label>
                  <Textarea
                    id="mission"
                    name="mission"
                    value={companyData.mission}
                    onChange={handleInputChange}
                    placeholder="Your company's mission..."
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Contact Details */}
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>How job seekers can reach your company</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <Input
                      id="address"
                      name="address"
                      value={companyData.address}
                      onChange={handleInputChange}
                      placeholder="Street address"
                      className="rounded-l-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={companyData.city}
                      onChange={handleInputChange}
                      placeholder="City"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      name="state"
                      value={companyData.state}
                      onChange={handleInputChange}
                      placeholder="State or Province"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP/Postal Code</Label>
                    <Input
                      id="zip"
                      name="zip"
                      value={companyData.zip}
                      onChange={handleInputChange}
                      placeholder="ZIP or Postal Code"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      name="country"
                      value={companyData.country}
                      onChange={handleInputChange}
                      placeholder="Country"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                        <Phone className="h-4 w-4" />
                      </span>
                      <Input
                        id="phone"
                        name="phone"
                        value={companyData.phone}
                        onChange={handleInputChange}
                        placeholder="Phone number"
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
                        value={companyData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="rounded-l-none"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Branding */}
          <TabsContent value="branding">
            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>Upload your company logo and cover image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Company Logo</Label>
                  <div className="flex items-center gap-4">
                    <div className="h-24 w-24 rounded-md border border-dashed border-input flex items-center justify-center bg-muted">
                      {companyData.logo ? (
                        <img
                          src={companyData.logo || "/placeholder.svg"}
                          alt="Company Logo"
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <Building2 className="h-10 w-10 text-muted-foreground" />
                      )}
                    </div>
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" /> Upload Logo
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Recommended size: 200x200px. Max file size: 2MB.</p>
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="h-40 w-full rounded-md border border-dashed border-input flex items-center justify-center bg-muted">
                    {companyData.coverImage ? (
                      <img
                        src={companyData.coverImage || "/placeholder.svg"}
                        alt="Cover Image"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-4">
                        <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Drag and drop or click to upload a cover image</p>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">Recommended size: 1200x400px. Max file size: 5MB.</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Social Media */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media</CardTitle>
                <CardDescription>Connect your social media accounts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input
                    id="facebook"
                    name="facebook"
                    value={companyData.facebook}
                    onChange={handleInputChange}
                    placeholder="https://facebook.com/yourcompany"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input
                    id="twitter"
                    name="twitter"
                    value={companyData.twitter}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/yourcompany"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    value={companyData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/company/yourcompany"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    name="instagram"
                    value={companyData.instagram}
                    onChange={handleInputChange}
                    placeholder="https://instagram.com/yourcompany"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

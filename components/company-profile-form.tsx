"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface CompanyProfileFormProps {
  initialData?: any
  userId: string
}

export function CompanyProfileForm({ initialData, userId }: CompanyProfileFormProps) {
  const router = useRouter()
  const supabase = createClientClient()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    website: initialData?.website || "",
    industry: initialData?.industry || "",
    size: initialData?.size || "",
    location: initialData?.location || "",
    description: initialData?.description || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (initialData) {
        // Update existing company
        const { error } = await supabase.from("companies").update(formData).eq("id", initialData.id)

        if (error) throw error
      } else {
        // Create new company
        const { error } = await supabase.from("companies").insert([
          {
            ...formData,
            user_id: userId,
          },
        ])

        if (error) throw error
      }

      toast.success("Company profile saved successfully")
      router.refresh()
    } catch (error) {
      console.error("Error saving company profile:", error)
      toast.error("Failed to save company profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Company Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" type="url" value={formData.website} onChange={handleChange} />
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input id="industry" name="industry" value={formData.industry} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="size">Company Size</Label>
          <Input
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
            placeholder="e.g. 1-10, 11-50, 51-200, 201-500, 500+"
          />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="description">Company Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Company Profile"}
      </Button>
    </form>
  )
}

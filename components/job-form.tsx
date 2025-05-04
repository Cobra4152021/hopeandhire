"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClientClient } from "@/utils/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

interface JobFormProps {
  initialData?: any
  companyId: string
}

export function JobForm({ initialData, companyId }: JobFormProps) {
  const router = useRouter()
  const supabase = createClientClient()

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    location: initialData?.location || "",
    job_type: initialData?.job_type || "full-time",
    salary_range: initialData?.salary_range || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements || "",
    benefits: initialData?.benefits || "",
    status: initialData?.status || "active",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (initialData) {
        // Update existing job
        const { error } = await supabase.from("jobs").update(formData).eq("id", initialData.id)

        if (error) throw error

        toast.success("Job updated successfully")
      } else {
        // Create new job
        const { error } = await supabase.from("jobs").insert([
          {
            ...formData,
            company_id: companyId,
          },
        ])

        if (error) throw error

        toast.success("Job created successfully")
      }

      router.push("/employer/dashboard/jobs")
    } catch (error) {
      console.error("Error saving job:", error)
      toast.error("Failed to save job")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="title">Job Title</Label>
          <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            placeholder="City, State or Remote"
          />
        </div>

        <div>
          <Label htmlFor="job_type">Job Type</Label>
          <Select value={formData.job_type} onValueChange={(value) => handleSelectChange("job_type", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select job type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">Full-time</SelectItem>
              <SelectItem value="part-time">Part-time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="temporary">Temporary</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="salary_range">Salary Range (Optional)</Label>
          <Input
            id="salary_range"
            name="salary_range"
            value={formData.salary_range}
            onChange={handleChange}
            placeholder="e.g. $50,000 - $70,000"
          />
        </div>

        <div>
          <Label htmlFor="description">Job Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div>
          <Label htmlFor="requirements">Requirements</Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={5}
            placeholder="List the requirements for this position"
          />
        </div>

        <div>
          <Label htmlFor="benefits">Benefits (Optional)</Label>
          <Textarea
            id="benefits"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            rows={5}
            placeholder="List the benefits offered with this position"
          />
        </div>

        <div className="space-y-2">
          <Label>Job Status</Label>
          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status === "active"}
              onCheckedChange={(checked) => handleSelectChange("status", checked ? "active" : "draft")}
            />
            <Label htmlFor="status">
              {formData.status === "active" ? "Active (Visible to candidates)" : "Draft (Hidden from candidates)"}
            </Label>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/employer/dashboard/jobs")}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Job" : "Create Job"}
        </Button>
      </div>
    </form>
  )
}

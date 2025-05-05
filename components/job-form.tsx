"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import createClientClient from "@/utils/supabase/client"
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
    salary_min: initialData?.salary_min || "",
    salary_max: initialData?.salary_max || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements?.join("\n") || "",
    benefits: initialData?.benefits?.join("\n") || "",
    status: initialData?.status || "active",
    company_id: companyId,
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
      // Process requirements and benefits as arrays
      const processedData = {
        ...formData,
        requirements: formData.requirements.split("\n").filter(Boolean),
        benefits: formData.benefits.split("\n").filter(Boolean),
        salary_min: formData.salary_min ? Number(formData.salary_min) : 0,
        salary_max: formData.salary_max ? Number(formData.salary_max) : 0,
      }

      if (initialData) {
        // Update existing job
        const { error } = await supabase.from("job_listings").update(processedData).eq("id", initialData.id)

        if (error) throw error

        toast.success("Job updated successfully")
      } else {
        // Create new job
        const { error } = await supabase.from("job_listings").insert([processedData])

        if (error) throw error

        toast.success("Job created successfully")
      }

      router.push("/employer/dashboard/jobs")
      router.refresh()
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

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="salary_min">Minimum Salary</Label>
            <Input
              id="salary_min"
              name="salary_min"
              type="number"
              value={formData.salary_min}
              onChange={handleChange}
              placeholder="e.g. 50000"
            />
          </div>
          <div>
            <Label htmlFor="salary_max">Maximum Salary</Label>
            <Input
              id="salary_max"
              name="salary_max"
              type="number"
              value={formData.salary_max}
              onChange={handleChange}
              placeholder="e.g. 70000"
            />
          </div>
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
          <Label htmlFor="requirements">Requirements (one per line)</Label>
          <Textarea
            id="requirements"
            name="requirements"
            value={formData.requirements}
            onChange={handleChange}
            rows={5}
            placeholder="List the requirements for this position, one per line"
          />
        </div>

        <div>
          <Label htmlFor="benefits">Benefits (one per line)</Label>
          <Textarea
            id="benefits"
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            rows={5}
            placeholder="List the benefits offered with this position, one per line"
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

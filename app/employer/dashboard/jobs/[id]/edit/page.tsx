"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/lib/supabase"
import { Loader2, Save, ArrowLeft } from "lucide-react"

export default function EditJobPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isRemote, setIsRemote] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    employment_type: "full_time",
    salary_min: "",
    salary_max: "",
    benefits: "",
    requirements: "",
    status: "draft",
  })

  useEffect(() => {
    async function fetchJob() {
      try {
        const rawId = params.id
        const jobId = Array.isArray(rawId) ? rawId[0] : rawId
        if (!jobId) throw new Error("Job ID is required")

        const { data: { user } } = await supabase.auth.getUser()
        if (!user) throw new Error("You must be logged in to edit job details")

        const { data, error } = await supabase.from("job_listings").select("*").eq("id", jobId).single()
        if (error) throw error
        if (!data) throw new Error("Job not found")

        setFormData({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          employment_type: data.job_type || "full_time",
          salary_min: data.salary_min?.toString() || "",
          salary_max: data.salary_max?.toString() || "",
          benefits: Array.isArray(data.benefits) ? data.benefits.join("\n") : "",
          requirements: Array.isArray(data.requirements) ? data.requirements.join("\n") : "",
          status: data.status || "draft",
        })

        setIsRemote(data.is_remote || false)
      } catch (error) {
        console.error("Error fetching job:", error)
        toast({
          title: "Error loading job",
          description: error instanceof Error ? error.message : "There was a problem loading the job details.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [params.id, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    if (name === "status") {
      handleStatusChange(value)
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleStatusChange = (value: string) => {
    if (formData.status !== "active" && value === "active") {
      if (window.confirm("Are you sure you want to publish this job posting?")) {
        setFormData((prev) => ({ ...prev, status: value }))
      }
    } else if (formData.status === "active" && value !== "active") {
      if (window.confirm("Are you sure you want to unpublish this job posting?")) {
        setFormData((prev) => ({ ...prev, status: value }))
      }
    } else {
      setFormData((prev) => ({ ...prev, status: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      if (Number(formData.salary_min) > Number(formData.salary_max) && formData.salary_max) {
        toast({
          title: "Invalid salary range",
          description: "Minimum salary cannot be greater than maximum salary.",
          variant: "destructive",
        })
        setIsSaving(false)
        return
      }

      const rawId = params.id
      const jobId = Array.isArray(rawId) ? rawId[0] : rawId
      if (!jobId) throw new Error("Job ID is required")

      const requirements = formData.requirements.split("\n").filter(Boolean)
      const benefits = formData.benefits.split("\n").filter(Boolean)

      const { error } = await supabase
        .from("job_listings")
        .update({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          is_remote: isRemote,
          job_type: formData.employment_type,
          salary_min: formData.salary_min ? Number.parseFloat(formData.salary_min) : 0,
          salary_max: formData.salary_max ? Number.parseFloat(formData.salary_max) : 0,
          benefits,
          requirements,
          status: formData.status as "draft" | "active" | "closed",
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)

      if (error) throw error

      toast({
        title: "Job updated successfully",
        description:
          formData.status === "active"
            ? "Your job posting is now live and visible to candidates."
            : "Your job posting has been saved as a draft.",
      })

      router.push(`/employer/dashboard/jobs/${jobId}`)
    } catch (error) {
      toast({
        title: "Error updating job",
        description: error instanceof Error ? error.message : "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Job</CardTitle>
          <CardDescription>Update your job posting below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="employment_type">Employment Type</Label>
            <Select 
              value={formData.employment_type} 
              onValueChange={(value: string) => handleSelectChange("employment_type", value)}
            >
              <SelectTrigger id="employment_type">
                <SelectValue placeholder="Select employment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">Full Time</SelectItem>
                <SelectItem value="part_time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="is_remote" checked={isRemote} onCheckedChange={setIsRemote} />
            <Label htmlFor="is_remote">Remote</Label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salary_min">Min Salary</Label>
              <Input id="salary_min" name="salary_min" type="number" value={formData.salary_min} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="salary_max">Max Salary</Label>
              <Input id="salary_max" name="salary_max" type="number" value={formData.salary_max} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="benefits">Benefits</Label>
            <Textarea 
              id="benefits" 
              name="benefits" 
              value={formData.benefits} 
              onChange={handleChange} 
              placeholder="Enter each benefit on a new line"
            />
          </div>
          <div>
            <Label htmlFor="requirements">Requirements</Label>
            <Textarea 
              id="requirements" 
              name="requirements" 
              value={formData.requirements} 
              onChange={handleChange} 
              placeholder="Enter each requirement on a new line"
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: string) => handleSelectChange("status", value)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Save Changes
        </Button>
      </div>
    </form>
  )
}

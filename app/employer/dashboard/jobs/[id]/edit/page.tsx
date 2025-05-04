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
        const jobId = params.id

        if (!jobId) {
          throw new Error("Job ID is required")
        }

        // Get current user
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          throw new Error("You must be logged in to edit job details")
        }

        // Fetch job details
        const { data, error } = await supabase.from("job_listings").select("*").eq("id", jobId).single()

        if (error) throw error
        if (!data) throw new Error("Job not found")

        // Format requirements and benefits for the form
        const requirementsText = Array.isArray(data.requirements) ? data.requirements.join("\n") : ""
        const benefitsText = Array.isArray(data.benefits) ? data.benefits.join("\n") : ""

        setFormData({
          title: data.title || "",
          description: data.description || "",
          location: data.location || "",
          employment_type: data.job_type || "full_time",
          salary_min: data.salary_min?.toString() || "",
          salary_max: data.salary_max?.toString() || "",
          benefits: benefitsText,
          requirements: requirementsText,
          status: data.status || "draft",
        })

        setIsRemote(data.is_remote || false)
      } catch (error) {
        console.error("Error fetching job:", error)
        toast({
          title: "Error loading job",
          description: error.message || "There was a problem loading the job details.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchJob()
  }, [params.id, toast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      const jobId = params.id

      if (!jobId) {
        throw new Error("Job ID is required")
      }

      // Process requirements and benefits as arrays
      const requirements = formData.requirements.split("\n").filter(Boolean)
      const benefits = formData.benefits.split("\n").filter(Boolean)

      // Update job posting
      const { error } = await supabase
        .from("job_listings")
        .update({
          title: formData.title,
          description: formData.description,
          location: formData.location,
          is_remote: isRemote,
          job_type: formData.employment_type,
          salary_min: Number.parseInt(formData.salary_min) || 0,
          salary_max: Number.parseInt(formData.salary_max) || 0,
          benefits: benefits,
          requirements: requirements,
          status: formData.status,
          updated_at: new Date().toISOString(),
        })
        .eq("id", jobId)

      if (error) {
        throw error
      }

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
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
      console.error(error)
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Edit Job Posting</h1>
          <p className="text-muted-foreground">Update the details of your job posting.</p>
        </div>
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>Basic information about the position you're hiring for.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Warehouse Associate"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the role, responsibilities, and ideal candidate..."
                className="min-h-32"
                required
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Chicago, IL"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="employment_type">Employment Type</Label>
                <Select
                  name="employment_type"
                  value={formData.employment_type}
                  onValueChange={(value) => handleSelectChange("employment_type", value)}
                  required
                >
                  <SelectTrigger id="employment_type">
                    <SelectValue placeholder="Select employment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full_time">Full-time</SelectItem>
                    <SelectItem value="part_time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="is_remote" checked={isRemote} onCheckedChange={setIsRemote} />
              <Label htmlFor="is_remote">Remote work available</Label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compensation & Benefits</CardTitle>
            <CardDescription>Details about salary range and benefits offered.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="salary_min">Minimum Salary (USD)</Label>
                <Input
                  id="salary_min"
                  name="salary_min"
                  type="number"
                  value={formData.salary_min}
                  onChange={handleChange}
                  placeholder="e.g. 40000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="salary_max">Maximum Salary (USD)</Label>
                <Input
                  id="salary_max"
                  name="salary_max"
                  type="number"
                  value={formData.salary_max}
                  onChange={handleChange}
                  placeholder="e.g. 60000"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="benefits">Benefits (One per line)</Label>
              <Textarea
                id="benefits"
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="e.g. Health insurance
401(k) with company match
Paid time off
Professional development"
                className="min-h-20"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Requirements & Qualifications</CardTitle>
            <CardDescription>Skills, experience, and qualifications needed for this role.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements (One per line)</Label>
              <Textarea
                id="requirements"
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="e.g. High school diploma or equivalent
1+ years of warehouse experience
Ability to lift up to 50 pounds
Valid driver's license"
                className="min-h-32"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Publishing Options</CardTitle>
            <CardDescription>Choose whether to publish this job now or save as a draft.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="status_draft"
                  name="status_option"
                  value="draft"
                  checked={formData.status === "draft"}
                  onChange={() => handleSelectChange("status", "draft")}
                  className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="status_draft">Save as Draft</Label>
                  <p className="text-sm text-muted-foreground">
                    Save this job posting but don't publish it yet. You can edit and publish it later.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="status_active"
                  name="status_option"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={() => handleSelectChange("status", "active")}
                  className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="status_active">Publish Now</Label>
                  <p className="text-sm text-muted-foreground">
                    Make this job posting visible to candidates immediately.
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="status_closed"
                  name="status_option"
                  value="closed"
                  checked={formData.status === "closed"}
                  onChange={() => handleSelectChange("status", "closed")}
                  className="h-4 w-4 rounded-full border-gray-300 text-primary focus:ring-primary"
                />
                <div>
                  <Label htmlFor="status_closed">Close Job</Label>
                  <p className="text-sm text-muted-foreground">
                    Mark this job as closed and no longer accepting applications.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving} className="flex items-center gap-2">
            {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {formData.status === "active"
              ? "Update & Publish"
              : formData.status === "draft"
                ? "Save as Draft"
                : "Update Job"}
          </Button>
        </div>
      </form>
    </div>
  )
}

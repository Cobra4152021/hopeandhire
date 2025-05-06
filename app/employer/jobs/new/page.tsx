"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react"

export default function NewJobPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    department: "",
    type: "",
    salary: "",
    description: "",
    requirements: ["", ""],
    benefits: ["", ""],
    skills: ["", ""],
    status: "draft",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleArrayChange = (field: "requirements" | "benefits" | "skills", index: number, value: string) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray[index] = value
      return { ...prev, [field]: newArray }
    })
  }

  const addArrayItem = (field: "requirements" | "benefits" | "skills") => {
    setFormData((prev) => {
      return { ...prev, [field]: [...prev[field], ""] }
    })
  }

  const removeArrayItem = (field: "requirements" | "benefits" | "skills", index: number) => {
    setFormData((prev) => {
      const newArray = [...prev[field]]
      newArray.splice(index, 1)
      return { ...prev, [field]: newArray }
    })
  }

  const handleSubmit = async (e: React.FormEvent, saveAsDraft = false) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.location || !formData.type) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Filter out empty array items
    const cleanedFormData = {
      ...formData,
      requirements: formData.requirements.filter((item) => item.trim() !== ""),
      benefits: formData.benefits.filter((item) => item.trim() !== ""),
      skills: formData.skills.filter((item) => item.trim() !== ""),
      status: saveAsDraft ? "draft" : "active",
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: saveAsDraft ? "Job saved as draft" : "Job posted successfully",
        description: saveAsDraft
          ? "Your job has been saved as a draft and can be published later."
          : "Your job posting is now live and visible to candidates.",
      })

      // Redirect to dashboard
      router.push("/employer/dashboard")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error saving your job posting. Please try again.",
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
            <h1 className="text-2xl font-bold text-gray-800">Post a New Job</h1>
            <p className="text-gray-600">Create a new job listing to find qualified candidates</p>
          </div>

          <Card className="border-0 shadow-md">
            <form onSubmit={(e) => handleSubmit(e, false)}>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>Provide information about the position</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-700">
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Warehouse Associate"
                      className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-700">
                      Location <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. San Francisco, CA"
                      className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department" className="text-gray-700">
                      Department
                    </Label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      placeholder="e.g. Operations"
                      className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="type" className="text-gray-700">
                      Job Type <span className="text-red-500">*</span>
                    </Label>
                    <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)} required>
                      <SelectTrigger id="type" className="border-gray-200 focus:ring-[#f2b01e]">
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

                  <div className="space-y-2">
                    <Label htmlFor="salary" className="text-gray-700">
                      Salary Range
                    </Label>
                    <Input
                      id="salary"
                      name="salary"
                      value={formData.salary}
                      onChange={handleInputChange}
                      placeholder="e.g. $18-22/hour"
                      className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700">
                    Job Description <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe the responsibilities and duties of the position..."
                    className="min-h-[120px] border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">Requirements</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => addArrayItem("requirements")}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add Requirement
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.requirements.map((req, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={req}
                          onChange={(e) => handleArrayChange("requirements", index, e.target.value)}
                          placeholder={`Requirement ${index + 1}`}
                          className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                        />
                        {formData.requirements.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-gray-200 text-gray-700 hover:bg-gray-50"
                            onClick={() => removeArrayItem("requirements", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">Skills Needed</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => addArrayItem("skills")}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add Skill
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.skills.map((skill, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={skill}
                          onChange={(e) => handleArrayChange("skills", index, e.target.value)}
                          placeholder={`Skill ${index + 1}`}
                          className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                        />
                        {formData.skills.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-gray-200 text-gray-700 hover:bg-gray-50"
                            onClick={() => removeArrayItem("skills", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-700">Benefits</Label>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 border-gray-200 text-gray-700 hover:bg-gray-50"
                      onClick={() => addArrayItem("benefits")}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Add Benefit
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {formData.benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={benefit}
                          onChange={(e) => handleArrayChange("benefits", index, e.target.value)}
                          placeholder={`Benefit ${index + 1}`}
                          className="border-gray-200 focus:border-[#f2b01e] focus:ring-[#f2b01e]"
                        />
                        {formData.benefits.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-10 w-10 border-gray-200 text-gray-700 hover:bg-gray-50"
                            onClick={() => removeArrayItem("benefits", index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                  onClick={(e) => handleSubmit(e, true)}
                  disabled={isSubmitting}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save as Draft
                </Button>
                <Button type="submit" className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" disabled={isSubmitting}>
                  {isSubmitting ? "Posting..." : "Post Job"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function JobsPage() {
  const searchParams = useSearchParams()
  const companyFilter = searchParams.get("company")

  const [searchTerm, setSearchTerm] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")

  // Mock data for jobs
  const jobs = [
    {
      id: 1,
      title: "Software Developer",
      company: {
        id: 1,
        name: "TechCorp Solutions",
        logo: "/abstract-tc.png",
      },
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$70,000 - $90,000",
      posted: "2 days ago",
      description:
        "We're looking for a software developer to join our team. Experience with JavaScript and React is preferred.",
      requirements: ["1+ years of programming experience", "Knowledge of JavaScript", "Familiarity with React"],
      remote: true,
      industry: "Technology",
    },
    {
      id: 2,
      title: "Construction Worker",
      company: {
        id: 2,
        name: "BuildRight Construction",
        logo: "/abstract-blue-circles.png",
      },
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$45,000 - $55,000",
      posted: "1 week ago",
      description: "Join our construction team. We provide on-the-job training for motivated individuals.",
      requirements: ["Physical stamina", "Reliable transportation", "Willingness to learn"],
      remote: false,
      industry: "Construction",
    },
    {
      id: 3,
      title: "Landscape Technician",
      company: {
        id: 3,
        name: "GreenLeaf Landscaping",
        logo: "/green-leaf-close-up.png",
      },
      location: "Portland, OR",
      type: "Full-time",
      salary: "$35,000 - $45,000",
      posted: "3 days ago",
      description: "Join our landscaping team. Experience is helpful but not required.",
      requirements: ["Valid driver's license", "Physical stamina", "Attention to detail"],
      remote: false,
      industry: "Landscaping",
    },
    {
      id: 4,
      title: "Line Cook",
      company: {
        id: 4,
        name: "Culinary Creations",
        logo: "/intertwined-circles.png",
      },
      location: "Austin, TX",
      type: "Full-time",
      salary: "$30,000 - $40,000",
      posted: "5 days ago",
      description: "Join our kitchen team. Previous cooking experience is helpful but not required.",
      requirements: ["Food handling knowledge", "Ability to work in fast-paced environment", "Team player"],
      remote: false,
      industry: "Food Service",
    },
    {
      id: 5,
      title: "Warehouse Associate",
      company: {
        id: 5,
        name: "Metro Logistics",
        logo: "/machine-learning-concept.png",
      },
      location: "Atlanta, GA",
      type: "Full-time",
      salary: "$32,000 - $38,000",
      posted: "1 day ago",
      description: "Join our warehouse team. We offer competitive pay and benefits.",
      requirements: ["Ability to lift 50 lbs", "Basic computer skills", "Attention to detail"],
      remote: false,
      industry: "Logistics",
    },
    {
      id: 6,
      title: "Patient Care Assistant",
      company: {
        id: 6,
        name: "Horizon Healthcare",
        logo: "/double-h-monogram.png",
      },
      location: "Boston, MA",
      type: "Full-time",
      salary: "$35,000 - $45,000",
      posted: "4 days ago",
      description: "Join our healthcare team. Training provided for the right candidates.",
      requirements: ["Compassionate attitude", "Reliable transportation", "Willingness to learn"],
      remote: false,
      industry: "Healthcare",
    },
  ]

  // Get unique industries for the filter
  const industries = ["all", ...new Set(jobs.map((job) => job.industry))]

  // Filter jobs based on search term, industry, and company
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesIndustry = industryFilter === "all" || job.industry === industryFilter

    const matchesCompany = !companyFilter || job.company.id.toString() === companyFilter

    return matchesSearch && matchesIndustry && matchesCompany
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold">Available Jobs</h1>

        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />

          <Select value={industryFilter} onValueChange={setIndustryFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry === "all" ? "All Industries" : industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {companyFilter && (
        <div className="bg-muted p-4 rounded-lg">
          <p className="font-medium">
            Showing jobs for: {jobs.find((job) => job.company.id.toString() === companyFilter)?.company.name}
          </p>
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={() => (window.location.href = "/volunteer/dashboard/jobs")}
          >
            Clear filter
          </Button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{job.title}</h3>
                      <p className="text-muted-foreground">{job.company.name}</p>
                    </div>
                    {job.company.logo && (
                      <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                        <img
                          src={job.company.logo || "/placeholder.svg"}
                          alt={`${job.company.name} logo`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Location:</span> {job.location}
                      {job.remote && <Badge variant="outline">Remote</Badge>}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Type:</span> {job.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Salary:</span> {job.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-medium">Posted:</span> {job.posted}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm">{job.description}</p>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-medium">Requirements:</h4>
                    <ul className="mt-1 list-disc pl-5 text-sm">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button>View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-2 text-center py-10">
            <p className="text-muted-foreground">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  )
}

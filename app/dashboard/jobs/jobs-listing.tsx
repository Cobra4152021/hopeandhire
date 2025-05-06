"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Clock, Building, Filter, Plus, Search, ArrowUpDown } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Sample job data
const sampleJobs = [
  {
    id: 1,
    title: "Software Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$90,000 - $120,000",
    posted: "2 days ago",
    description:
      "We are looking for a skilled software developer with experience in React, Node.js, and cloud platforms.",
    requirements: [
      "3+ years of experience with React",
      "Experience with Node.js and Express",
      "Familiarity with AWS or Azure",
      "Bachelor's degree in Computer Science or related field",
    ],
    applications: 12,
    featured: true,
  },
  {
    id: 2,
    title: "Marketing Specialist",
    company: "Growth Marketing Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$65,000 - $85,000",
    posted: "1 week ago",
    description: "Join our marketing team to develop and implement marketing strategies for our clients.",
    requirements: [
      "2+ years of marketing experience",
      "Experience with social media campaigns",
      "Strong analytical skills",
      "Bachelor's degree in Marketing or related field",
    ],
    applications: 8,
    featured: false,
  },
  {
    id: 3,
    title: "Customer Service Representative",
    company: "Support Solutions",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$20 - $25 per hour",
    posted: "3 days ago",
    description: "Provide excellent customer service via phone and email to resolve customer inquiries and issues.",
    requirements: [
      "1+ year of customer service experience",
      "Excellent communication skills",
      "Problem-solving abilities",
      "High school diploma or equivalent",
    ],
    applications: 15,
    featured: false,
  },
  {
    id: 4,
    title: "Warehouse Associate",
    company: "Logistics Pro",
    location: "Atlanta, GA",
    type: "Full-time",
    salary: "$18 - $22 per hour",
    posted: "5 days ago",
    description: "Responsible for receiving, storing, and shipping products in our warehouse facility.",
    requirements: [
      "Previous warehouse experience preferred",
      "Ability to lift up to 50 lbs",
      "Forklift certification a plus",
      "High school diploma or equivalent",
    ],
    applications: 20,
    featured: true,
  },
  {
    id: 5,
    title: "Administrative Assistant",
    company: "Executive Office Solutions",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$45,000 - $55,000",
    posted: "1 day ago",
    description:
      "Provide administrative support to executives, including scheduling, correspondence, and file management.",
    requirements: [
      "2+ years of administrative experience",
      "Proficiency in Microsoft Office",
      "Excellent organizational skills",
      "Associate's degree or higher preferred",
    ],
    applications: 10,
    featured: false,
  },
]

export default function JobsListingPage() {
  const [jobs, setJobs] = useState(sampleJobs)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newJob, setNewJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    salary: "",
    description: "",
  })

  // Filter and sort jobs
  const filteredJobs = jobs
    .filter((job) => {
      // Search filter
      const matchesSearch =
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Job type filter
      const matchesType = filterType === "all" || job.type === filterType

      // Featured filter
      const matchesFeatured = !showFeaturedOnly || job.featured

      return matchesSearch && matchesType && matchesFeatured
    })
    .sort((a, b) => {
      // Sort by newest, applications, or salary
      if (sortBy === "newest") {
        return a.id < b.id ? 1 : -1 // Assuming higher ID means newer
      } else if (sortBy === "applications") {
        return a.applications < b.applications ? 1 : -1
      } else if (sortBy === "salary") {
        // Simple salary comparison (in a real app, would need better parsing)
        const aValue = Number.parseInt(a.salary.replace(/\D/g, ""))
        const bValue = Number.parseInt(b.salary.replace(/\D/g, ""))
        return aValue < bValue ? 1 : -1
      }
      return 0
    })

  const handleAddJob = () => {
    const newJobObj = {
      id: jobs.length + 1,
      ...newJob,
      posted: "Just now",
      requirements: [],
      applications: 0,
      featured: false,
    }

    setJobs([newJobObj, ...jobs])
    setIsDialogOpen(false)
    setNewJob({
      title: "",
      company: "",
      location: "",
      type: "Full-time",
      salary: "",
      description: "",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Listings</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and view all job opportunities</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-teal text-white hover:bg-teal-dark">
                <Plus className="mr-2 h-4 w-4" /> Add New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Add New Job Listing</DialogTitle>
                <DialogDescription>Fill in the details to create a new job listing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Job Title
                  </Label>
                  <Input
                    id="title"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="company" className="text-right">
                    Company
                  </Label>
                  <Input
                    id="company"
                    value={newJob.company}
                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newJob.location}
                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Job Type
                  </Label>
                  <Select value={newJob.type} onValueChange={(value) => setNewJob({ ...newJob, type: value })}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select job type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="salary" className="text-right">
                    Salary Range
                  </Label>
                  <Input
                    id="salary"
                    value={newJob.salary}
                    onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                    placeholder="e.g. $50,000 - $70,000"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddJob} className="bg-teal text-white hover:bg-teal-dark">
                  Add Job
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{filterType === "all" ? "All Job Types" : `${filterType} Jobs`}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Job Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4 text-gray-400" />
                  <span>
                    Sort by:{" "}
                    {sortBy === "newest"
                      ? "Newest"
                      : sortBy === "applications"
                        ? "Most Applications"
                        : "Highest Salary"}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="applications">Most Applications</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="featured"
              checked={showFeaturedOnly}
              onCheckedChange={(checked) => setShowFeaturedOnly(!!checked)}
              className="mr-2 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
            />
            <Label htmlFor="featured" className="cursor-pointer">
              Featured jobs only
            </Label>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          filteredJobs.map((job) => (
            <Card
              key={job.id}
              className={`overflow-hidden transition-all hover:shadow-md ${
                job.featured ? "border-l-4 border-l-yellow" : ""
              }`}
            >
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                        {job.featured && <Badge className="ml-2 bg-yellow text-dark-text">Featured</Badge>}
                      </div>
                      <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <Building className="mr-1 h-4 w-4" />
                          {job.company}
                        </div>
                        <div className="flex items-center mr-4">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center mr-4">
                          <Briefcase className="mr-1 h-4 w-4" />
                          {job.type}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="mr-4 text-sm">
                        <span className="font-medium text-gray-900">{job.applications}</span> applications
                      </div>
                      <Link href={`/dashboard/jobs/${job.id}`}>
                        <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-600 text-sm">{job.description}</p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-50">
                      {job.salary}
                    </Badge>
                    {job.requirements.slice(0, 2).map((req, index) => (
                      <Badge key={index} variant="outline" className="bg-gray-50">
                        {req}
                      </Badge>
                    ))}
                    {job.requirements.length > 2 && (
                      <Badge variant="outline" className="bg-gray-50">
                        +{job.requirements.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-teal text-white hover:bg-teal-dark">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

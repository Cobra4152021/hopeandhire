"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Briefcase, MapPin, Building, DollarSign, Search, Filter } from "lucide-react"
import Link from "next/link"

// Mock data for job listings
const mockJobs = [
  {
    id: "1",
    title: "Warehouse Associate",
    company: "LogisticsPro",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$18-22/hr",
    description:
      "Seeking reliable warehouse associates to join our growing team. Previous experience preferred but not required.",
    requirements: ["Valid driver's license", "Ability to lift 50 lbs", "High school diploma or equivalent"],
    postedDate: "2023-10-15",
    tags: ["Warehouse", "Entry-Level", "Benefits"],
  },
  {
    id: "2",
    title: "Customer Service Representative",
    company: "TechSupport Inc",
    location: "Remote",
    type: "Full-time",
    salary: "$17-20/hr",
    description: "Join our customer service team providing technical support to customers via phone and email.",
    requirements: ["Strong communication skills", "Basic computer knowledge", "Customer service experience a plus"],
    postedDate: "2023-10-18",
    tags: ["Remote", "Customer Service", "Technology"],
  },
  {
    id: "3",
    title: "Kitchen Staff",
    company: "Fresh Eats Restaurant Group",
    location: "Atlanta, GA",
    type: "Part-time",
    salary: "$16-19/hr",
    description:
      "Looking for energetic kitchen staff for our busy restaurant. Training provided for motivated individuals.",
    requirements: [
      "Flexible schedule",
      "Ability to work in fast-paced environment",
      "Food handler certification a plus",
    ],
    postedDate: "2023-10-20",
    tags: ["Food Service", "Flexible Hours", "Training Provided"],
  },
  {
    id: "4",
    title: "Construction Laborer",
    company: "BuildRight Construction",
    location: "Dallas, TX",
    type: "Full-time",
    salary: "$20-25/hr",
    description: "Construction laborers needed for commercial building projects. Experience with basic tools required.",
    requirements: ["Physical stamina", "Reliable transportation", "Safety-conscious mindset"],
    postedDate: "2023-10-17",
    tags: ["Construction", "Physical Work", "Benefits"],
  },
  {
    id: "5",
    title: "Administrative Assistant",
    company: "Global Services LLC",
    location: "Phoenix, AZ",
    type: "Full-time",
    salary: "$19-22/hr",
    description:
      "Administrative assistant needed to support our office operations with scheduling, filing, and customer service.",
    requirements: ["Proficient in Microsoft Office", "Excellent organizational skills", "Professional phone manner"],
    postedDate: "2023-10-19",
    tags: ["Office Work", "Entry-Level", "Professional"],
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [locationFilter, setLocationFilter] = useState("")
  const [jobTypeFilter, setJobTypeFilter] = useState("")
  const [filteredJobs, setFilteredJobs] = useState(mockJobs)

  const handleSearch = () => {
    const filtered = mockJobs.filter((job) => {
      const matchesSearch =
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesLocation = locationFilter === "" || job.location.toLowerCase().includes(locationFilter.toLowerCase())

      const matchesType = jobTypeFilter === "" || job.type === jobTypeFilter

      return matchesSearch && matchesLocation && matchesType
    })

    setFilteredJobs(filtered)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setLocationFilter("")
    setJobTypeFilter("")
    setFilteredJobs(mockJobs)
  }

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Find Your Next Opportunity</h1>

        {/* Search and filters */}
        <div className="bg-muted/30 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title or keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Input
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="pl-3"
            />
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Temporary">Temporary</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleSearch}>
              <Search className="mr-2 h-4 w-4" /> Search Jobs
            </Button>
            <Button variant="outline" onClick={resetFilters}>
              <Filter className="mr-2 h-4 w-4" /> Reset Filters
            </Button>
          </div>
        </div>

        {/* Job listings */}
        <div className="space-y-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{job.title}</CardTitle>
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
                    <div className="flex items-center">
                      <Building className="mr-1 h-4 w-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="mr-1 h-4 w-4" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      Posted: {new Date(job.postedDate).toLocaleDateString()}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link href={`/jobs/${job.id}`}>
                    <Button variant="outline">View Details</Button>
                  </Link>
                  <Link href={`/jobs/${job.id}/apply`}>
                    <Button>Apply Now</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No jobs found</h3>
              <p className="text-muted-foreground">Try adjusting your search filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

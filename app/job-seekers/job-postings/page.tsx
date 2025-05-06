"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Search, Filter, Building, ChevronDown } from "lucide-react"

// Sample job data
const jobListings = [
  {
    id: 1,
    title: "Warehouse Associate",
    company: "Global Distribution Inc.",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$18-22/hour",
    posted: "2 days ago",
    description:
      "Looking for reliable warehouse associates to join our team. Previous experience helpful but not required. Training provided.",
    requirements: ["High school diploma or equivalent", "Ability to lift up to 50 lbs", "Basic computer skills"],
    fairChance: true,
    category: "Logistics",
    logo: "/company-logo-1.png",
  },
  // Other job listings...
]

export default function JobPostingsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [fairChanceOnly, setFairChanceOnly] = useState(true)
  const [filtersVisible, setFiltersVisible] = useState(false)

  // Filter jobs based on search and filters
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "" || job.category === selectedCategory
    const matchesType = selectedType === "" || job.type === selectedType
    const matchesFairChance = !fairChanceOnly || job.fairChance

    return matchesSearch && matchesCategory && matchesType && matchesFairChance
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="bg-light-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <Image
                src="/logo.png"
                alt="Hope and Hire Logo"
                width={150}
                height={60}
                className="h-auto"
                priority
                quality={90}
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-dark-text">
              Job <span className="text-teal">Postings</span>
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Browse through our curated list of job opportunities from fair-chance employers.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search for jobs by title, company, or keywords"
                className="pl-10 pr-4 py-2 border-gray-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle Button */}
            <div className="flex justify-center mb-4">
              <Button
                variant="outline"
                className="border-gray-300 text-gray-700"
                onClick={() => setFiltersVisible(!filtersVisible)}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${filtersVisible ? "rotate-180" : ""}`} />
              </Button>
            </div>

            {/* Filter Options */}
            {filtersVisible && (
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium mb-1 block">
                      Job Category
                    </Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="Administrative">Administrative</SelectItem>
                        <SelectItem value="Customer Service">Customer Service</SelectItem>
                        <SelectItem value="Food Service">Food Service</SelectItem>
                        <SelectItem value="Logistics">Logistics</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Construction/Trades">Construction/Trades</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-sm font-medium mb-1 block">
                      Job Type
                    </Label>
                    <Select value={selectedType} onValueChange={setSelectedType}>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="All Types" />
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

                  <div className="flex items-center">
                    <div className="flex items-center space-x-2 mt-6">
                      <Checkbox
                        id="fairChance"
                        checked={fairChanceOnly}
                        onCheckedChange={(checked) => setFairChanceOnly(checked as boolean)}
                      />
                      <Label htmlFor="fairChance" className="text-sm font-medium">
                        Fair Chance Employers Only
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-12 bg-white flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"}
              </p>
            </div>

            {/* Job Cards */}
            <div className="space-y-6">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        {/* Company Logo */}
                        <div className="bg-gray-50 p-6 flex items-center justify-center md:w-1/5">
                          <div className="w-16 h-16 relative">
                            <Image
                              src={job.logo || "/placeholder.svg"}
                              alt={`${job.company} logo`}
                              width={64}
                              height={64}
                              className="object-contain"
                              loading="lazy"
                              sizes="64px"
                            />
                          </div>
                        </div>

                        {/* Job Details */}
                        <div className="p-6 md:w-4/5">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-dark-text">{job.title}</h3>
                              <div className="flex items-center mt-1">
                                <Building className="h-4 w-4 text-gray-500 mr-1" />
                                <span className="text-gray-700">{job.company}</span>
                              </div>
                            </div>
                            <div className="mt-2 md:mt-0">
                              {job.fairChance && <Badge className="bg-teal text-white">Fair Chance Employer</Badge>}
                            </div>
                          </div>

                          <p className="text-gray-600 mb-4">{job.description}</p>

                          <div className="flex flex-wrap gap-3 mb-4">
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{job.type}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>Posted {job.posted}</span>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h4 className="font-medium text-sm mb-2">Requirements:</h4>
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                              {job.requirements.map((req, index) => (
                                <li key={index}>{req}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="bg-teal text-white hover:bg-teal-dark">Apply Now</Button>
                            <Button variant="outline" className="border-gray-300">
                              Save Job
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 mb-4">No jobs match your current filters.</p>
                  <Button
                    variant="outline"
                    className="border-teal text-teal"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("")
                      setSelectedType("")
                      setFairChanceOnly(false)
                    }}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-light-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4 text-dark-text">Don't see what you're looking for?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Create a profile to get personalized job recommendations and be notified when new opportunities match your
            skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Create Your Profile</Button>
            </Link>
            <Link href="/job-seekers">
              <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                Explore Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

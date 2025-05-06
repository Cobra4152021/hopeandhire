"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { Filter, Search, ArrowUpDown, Calendar, Clock, Building, User } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample applications data
const sampleApplications = [
  {
    id: 1,
    jobTitle: "Software Developer",
    company: "TechCorp Solutions",
    candidate: {
      id: 1,
      name: "Michael Johnson",
      avatar: "/stylized-letters-mj.png",
    },
    status: "Screening",
    appliedDate: "May 5, 2023",
    lastUpdated: "2 days ago",
    matchScore: 92,
  },
  {
    id: 2,
    jobTitle: "Marketing Specialist",
    company: "Growth Marketing Inc.",
    candidate: {
      id: 2,
      name: "Sarah Williams",
      avatar: "/stylized-letters-sw.png",
    },
    status: "Interview",
    appliedDate: "May 3, 2023",
    lastUpdated: "1 day ago",
    matchScore: 88,
  },
  {
    id: 3,
    jobTitle: "Customer Service Representative",
    company: "Support Solutions",
    candidate: {
      id: 3,
      name: "David Chen",
      avatar: "/stylized-letters-dc.png",
    },
    status: "Offer",
    appliedDate: "April 28, 2023",
    lastUpdated: "12 hours ago",
    matchScore: 85,
  },
  {
    id: 4,
    jobTitle: "Warehouse Associate",
    company: "Logistics Pro",
    candidate: {
      id: 4,
      name: "Emily Rodriguez",
      avatar: "/stylized-letters-er.png",
    },
    status: "New",
    appliedDate: "May 6, 2023",
    lastUpdated: "5 hours ago",
    matchScore: 78,
  },
  {
    id: 5,
    jobTitle: "Administrative Assistant",
    company: "Executive Office Solutions",
    candidate: {
      id: 5,
      name: "James Wilson",
      avatar: "/stylized-letters-jw.png",
    },
    status: "Rejected",
    appliedDate: "April 25, 2023",
    lastUpdated: "1 week ago",
    matchScore: 75,
  },
]

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(sampleApplications)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  // Filter and sort applications
  const filteredApplications = applications
    .filter((application) => {
      // Search filter
      const matchesSearch =
        application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.candidate.name.toLowerCase().includes(searchTerm.toLowerCase())

      // Status filter
      const matchesStatus = filterStatus === "all" || application.status === filterStatus

      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      // Sort by recent, match score, or application date
      if (sortBy === "recent") {
        // Simple sort by ID (higher is more recent)
        return b.id - a.id
      } else if (sortBy === "match") {
        return b.matchScore - a.matchScore
      } else if (sortBy === "date") {
        // Simple string comparison for dates
        return a.appliedDate.localeCompare(b.appliedDate)
      }
      return 0
    })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "Screening":
        return "bg-yellow-light/50 text-yellow-dark"
      case "Interview":
        return "bg-teal-light/50 text-teal-dark"
      case "Offer":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage job applications</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4 text-gray-400" />
                  <span>{filterStatus === "all" ? "All Statuses" : `${filterStatus} Applications`}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Screening">Screening</SelectItem>
                <SelectItem value="Interview">Interview</SelectItem>
                <SelectItem value="Offer">Offer</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
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
                    {sortBy === "recent" ? "Most Recent" : sortBy === "match" ? "Match Score" : "Application Date"}
                  </span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="match">Match Score</SelectItem>
                <SelectItem value="date">Application Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Applications Listing */}
      <div className="space-y-4">
        {filteredApplications.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
            <p className="text-gray-500">No applications found matching your criteria.</p>
          </div>
        ) : (
          filteredApplications.map((application) => (
            <Card key={application.id} className="overflow-hidden transition-all hover:shadow-md">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{application.jobTitle}</h3>
                        <Badge className={`ml-2 ${getStatusColor(application.status)}`}>{application.status}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                          <Building className="mr-1 h-4 w-4" />
                          {application.company}
                        </div>
                        <div className="flex items-center mr-4">
                          <Calendar className="mr-1 h-4 w-4" />
                          Applied: {application.appliedDate}
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-1 h-4 w-4" />
                          Updated: {application.lastUpdated}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center">
                      <div className="flex items-center mr-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            application.matchScore >= 90
                              ? "bg-green-100 text-green-800"
                              : application.matchScore >= 80
                                ? "bg-teal-light/20 text-teal"
                                : "bg-yellow-light/20 text-yellow-dark"
                          }`}
                        >
                          {application.matchScore}%
                        </div>
                        <span className="ml-2 text-sm text-gray-500">Match</span>
                      </div>
                      <Link href={`/dashboard/applications/${application.id}`}>
                        <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500 mr-2">Candidate:</span>
                    </div>
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage
                          src={application.candidate.avatar || "/placeholder.svg"}
                          alt={application.candidate.name}
                        />
                        <AvatarFallback className="bg-teal-light/20 text-teal text-xs">
                          {application.candidate.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Link
                        href={`/dashboard/candidates/${application.candidate.id}`}
                        className="text-sm text-teal hover:underline"
                      >
                        {application.candidate.name}
                      </Link>
                    </div>
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

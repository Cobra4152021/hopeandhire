"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import {
  CalendarIcon,
  Clock,
  FileText,
  Filter,
  Search,
  User,
  Briefcase,
  PlusCircle,
  Edit,
  Eye,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function EmployerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("jobs")

  // Sample data for job listings
  const jobListings = [
    {
      id: 1,
      title: "Warehouse Associate",
      location: "San Francisco, CA",
      department: "Operations",
      type: "Full-time",
      status: "Active",
      postedDate: "2023-05-15",
      applicants: 12,
      matches: 3,
      salary: "$18-22/hour",
    },
    {
      id: 2,
      title: "Administrative Assistant",
      location: "San Francisco, CA",
      department: "Administration",
      type: "Full-time",
      status: "Active",
      postedDate: "2023-05-10",
      applicants: 8,
      matches: 2,
      salary: "$20-24/hour",
    },
    {
      id: 3,
      title: "Delivery Driver",
      location: "Oakland, CA",
      department: "Logistics",
      type: "Full-time",
      status: "Draft",
      postedDate: "2023-05-18",
      applicants: 0,
      matches: 0,
      salary: "$19-23/hour",
    },
    {
      id: 4,
      title: "Customer Service Representative",
      location: "San Francisco, CA",
      department: "Customer Support",
      type: "Part-time",
      status: "Closed",
      postedDate: "2023-04-20",
      applicants: 15,
      matches: 4,
      salary: "$17-20/hour",
    },
  ]

  // Sample data for candidates
  const candidates = [
    {
      id: 1,
      name: "Michael Johnson",
      position: "Warehouse Associate",
      status: "Matched",
      matchedBy: "Sarah Williams (Volunteer)",
      matchDate: "2023-05-18",
      skills: ["Inventory Management", "Forklift Operation", "Shipping/Receiving"],
      notes:
        "Strong candidate with relevant warehouse experience. Has forklift certification and excellent references from previous employers.",
      contact: {
        email: "michael.johnson@example.com",
        phone: "(555) 123-4567",
      },
    },
    {
      id: 2,
      name: "Lisa Chen",
      position: "Administrative Assistant",
      status: "Interview Scheduled",
      matchedBy: "David Rodriguez (Volunteer)",
      matchDate: "2023-05-16",
      interviewDate: "2023-05-25",
      skills: ["MS Office", "Data Entry", "Customer Service", "Filing"],
      notes:
        "Excellent organizational skills and attention to detail. Previous experience in a similar role. Available to start immediately.",
      contact: {
        email: "lisa.chen@example.com",
        phone: "(555) 987-6543",
      },
    },
    {
      id: 3,
      name: "James Wilson",
      position: "Warehouse Associate",
      status: "Matched",
      matchedBy: "Sarah Williams (Volunteer)",
      matchDate: "2023-05-17",
      skills: ["Inventory Control", "Shipping/Receiving", "Team Leadership"],
      notes:
        "Experienced in warehouse operations with a focus on inventory management. Strong work ethic and reliable.",
      contact: {
        email: "james.wilson@example.com",
        phone: "(555) 456-7890",
      },
    },
    {
      id: 4,
      name: "Maria Garcia",
      position: "Administrative Assistant",
      status: "Hired",
      matchedBy: "David Rodriguez (Volunteer)",
      matchDate: "2023-05-01",
      hireDate: "2023-05-15",
      skills: ["MS Office", "Scheduling", "Communication", "Organization"],
      notes:
        "Excellent fit for the role. Strong communication skills and experience with office administration. Started on May 15th.",
      contact: {
        email: "maria.garcia@example.com",
        phone: "(555) 234-5678",
      },
    },
  ]

  // Filter job listings based on search query and status filter
  const filteredJobs = jobListings.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || job.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesStatus
  })

  // Filter candidates based on search query
  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Employer Dashboard</h1>
              <p className="text-gray-600">Welcome back! Manage your job listings and view matched candidates.</p>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[240px] justify-start text-left font-normal border-gray-200",
                      !date && "text-gray-500",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-500" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="rounded-md border border-gray-200"
                  />
                </PopoverContent>
              </Popover>
              <Button className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                <Link href="/employer/jobs/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Post New Job
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Active Job Listings</CardTitle>
                <CardDescription>Currently open positions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {jobListings.filter((job) => job.status === "Active").length}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {jobListings.reduce((total, job) => total + (job.status === "Active" ? job.applicants : 0), 0)} total
                  applicants
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Matched Candidates</CardTitle>
                <CardDescription>Candidates matched to your jobs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {candidates.filter((c) => c.status === "Matched" || c.status === "Interview Scheduled").length}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  {candidates.filter((c) => c.status === "Hired").length} candidates hired
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Interviews</CardTitle>
                <CardDescription>Scheduled for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">
                  {candidates.filter((c) => c.status === "Interview Scheduled").length}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Next interview:{" "}
                  {candidates
                    .filter((c) => c.status === "Interview Scheduled")
                    .map((c) => format(new Date(c.interviewDate), "MMM d"))[0] || "None"}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="jobs" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="jobs" className="data-[state=active]:bg-[#fff8e1] data-[state=active]:text-[#f2b01e]">
                Job Listings
              </TabsTrigger>
              <TabsTrigger
                value="candidates"
                className="data-[state=active]:bg-[#fff8e1] data-[state=active]:text-[#f2b01e]"
              >
                Matched Candidates
              </TabsTrigger>
            </TabsList>

            {/* Job Listings Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search jobs by title, location, or department..."
                    className="pl-8 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                    <Filter className="mr-2 h-4 w-4 text-gray-500" />
                    More Filters
                  </Button>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredJobs.length > 0 ? (
                  filteredJobs.map((job) => (
                    <Card key={job.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <div className="bg-[#fff8e1] p-3 rounded-full w-12 h-12 flex items-center justify-center">
                            <Briefcase className="h-6 w-6 text-[#f2b01e]" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline" className="border-gray-200 text-gray-700">
                                {job.department}
                              </Badge>
                              <Badge variant="outline" className="border-gray-200 text-gray-700">
                                {job.type}
                              </Badge>
                              <Badge variant="outline" className="border-gray-200 text-gray-700">
                                {job.salary}
                              </Badge>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={cn(
                                "text-white",
                                job.status === "Active"
                                  ? "bg-green-500"
                                  : job.status === "Draft"
                                    ? "bg-gray-500"
                                    : "bg-red-500",
                              )}
                            >
                              {job.status}
                            </Badge>
                            <div className="text-sm text-gray-500">
                              Posted: {format(new Date(job.postedDate), "MMM d, yyyy")}
                            </div>
                            <div className="text-sm text-gray-500">
                              {job.applicants} applicants • {job.matches} matches
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            asChild
                          >
                            <Link href={`/employer/jobs/${job.id}`}>
                              <Eye className="mr-2 h-4 w-4 text-gray-500" />
                              View
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            asChild
                          >
                            <Link href={`/employer/jobs/${job.id}/edit`}>
                              <Edit className="mr-2 h-4 w-4 text-gray-500" />
                              Edit
                            </Link>
                          </Button>
                          {job.status !== "Closed" && (
                            <Button
                              size="sm"
                              className={
                                job.status === "Draft"
                                  ? "bg-[#f2b01e] hover:bg-[#e0a31c] text-white"
                                  : "bg-red-500 hover:bg-red-600 text-white"
                              }
                            >
                              {job.status === "Draft" ? "Publish" : "Close"}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No job listings found matching your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Candidates Tab */}
            <TabsContent value="candidates" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search candidates by name, position, or skills..."
                    className="pl-8 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                  <Filter className="mr-2 h-4 w-4 text-gray-500" />
                  Filter
                </Button>
              </div>

              <div className="grid gap-4">
                {filteredCandidates.length > 0 ? (
                  filteredCandidates.map((candidate) => (
                    <Card key={candidate.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <Avatar className="h-12 w-12 bg-[#fff8e1] text-[#f2b01e]">
                            <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                              <div>
                                <h3 className="font-semibold text-lg text-gray-800">{candidate.name}</h3>
                                <p className="text-gray-600">{candidate.position}</p>
                              </div>
                              <Badge
                                className={cn(
                                  "text-white w-fit",
                                  candidate.status === "Matched"
                                    ? "bg-[#f2b01e]"
                                    : candidate.status === "Interview Scheduled"
                                      ? "bg-[#26a69a]"
                                      : "bg-green-500",
                                )}
                              >
                                {candidate.status}
                              </Badge>
                            </div>

                            <div className="mt-2 text-sm text-gray-600">
                              <p>
                                Matched by {candidate.matchedBy} on{" "}
                                {format(new Date(candidate.matchDate), "MMM d, yyyy")}
                              </p>
                              {candidate.interviewDate && (
                                <p className="mt-1">
                                  Interview scheduled for{" "}
                                  {format(new Date(candidate.interviewDate), "MMMM d, yyyy 'at' h:mm a")}
                                </p>
                              )}
                              {candidate.hireDate && (
                                <p className="mt-1">Hired on {format(new Date(candidate.hireDate), "MMMM d, yyyy")}</p>
                              )}
                            </div>

                            <div className="flex flex-wrap gap-1 mt-3">
                              {candidate.skills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100">
                              <h4 className="font-medium text-gray-700 mb-1">Recruiter Notes:</h4>
                              <p className="text-gray-600 text-sm">{candidate.notes}</p>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-4">
                              <div className="flex items-center">
                                <Mail className="h-4 w-4 mr-2 text-gray-500" />
                                <a
                                  href={`mailto:${candidate.contact.email}`}
                                  className="text-sm text-[#26a69a] hover:underline"
                                >
                                  {candidate.contact.email}
                                </a>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2 text-gray-500" />
                                <a
                                  href={`tel:${candidate.contact.phone}`}
                                  className="text-sm text-[#26a69a] hover:underline"
                                >
                                  {candidate.contact.phone}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            asChild
                          >
                            <Link href={`/employer/candidates/${candidate.id}`}>
                              <User className="mr-2 h-4 w-4 text-gray-500" />
                              View Profile
                            </Link>
                          </Button>
                          {candidate.status === "Matched" && (
                            <Button size="sm" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white">
                              <Clock className="mr-2 h-4 w-4" />
                              Schedule Interview
                            </Button>
                          )}
                          {candidate.status === "Interview Scheduled" && (
                            <Button size="sm" className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white">
                              <FileText className="mr-2 h-4 w-4" />
                              Add Interview Notes
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No candidates found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

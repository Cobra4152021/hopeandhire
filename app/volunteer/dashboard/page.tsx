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
import { CalendarIcon, Clock, FileText, Filter, MessageSquare, Search, User, Users } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function VolunteerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")

  // Sample data for job seekers
  const jobSeekers = [
    {
      id: 1,
      name: "Michael Johnson",
      location: "San Francisco, CA",
      skills: ["Customer Service", "Warehouse", "Forklift Operation"],
      status: "Ready for placement",
      lastActivity: "2 days ago",
      appointments: 2,
    },
    {
      id: 2,
      name: "Sarah Williams",
      location: "Oakland, CA",
      skills: ["Administrative", "Data Entry", "MS Office"],
      status: "Resume review needed",
      lastActivity: "1 week ago",
      appointments: 0,
    },
    {
      id: 3,
      name: "David Rodriguez",
      location: "San Jose, CA",
      skills: ["Construction", "Carpentry", "Electrical"],
      status: "Interview preparation",
      lastActivity: "3 days ago",
      appointments: 1,
    },
    {
      id: 4,
      name: "Lisa Chen",
      location: "San Francisco, CA",
      skills: ["Food Service", "Hospitality", "Customer Service"],
      status: "Ready for placement",
      lastActivity: "5 days ago",
      appointments: 3,
    },
  ]

  // Sample data for job listings
  const jobListings = [
    {
      id: 1,
      title: "Warehouse Associate",
      company: "Bay Area Distribution",
      location: "San Francisco, CA",
      industry: "Logistics",
      type: "Full-time",
      skills: ["Inventory Management", "Forklift Operation", "Shipping/Receiving"],
      postedDate: "2023-05-15",
    },
    {
      id: 2,
      title: "Administrative Assistant",
      company: "Tech Solutions Inc.",
      location: "San Jose, CA",
      industry: "Technology",
      type: "Full-time",
      skills: ["MS Office", "Data Entry", "Customer Service"],
      postedDate: "2023-05-10",
    },
    {
      id: 3,
      title: "Construction Helper",
      company: "BuildRight Construction",
      location: "Oakland, CA",
      industry: "Construction",
      type: "Full-time",
      skills: ["Physical Stamina", "Basic Tools", "Safety Protocols"],
      postedDate: "2023-05-12",
    },
    {
      id: 4,
      title: "Kitchen Staff",
      company: "Fresh Eats Restaurant",
      location: "San Francisco, CA",
      industry: "Hospitality",
      type: "Part-time",
      skills: ["Food Preparation", "Sanitation", "Customer Service"],
      postedDate: "2023-05-14",
    },
  ]

  // Sample data for appointments
  const appointments = [
    {
      id: 1,
      jobSeeker: "Michael Johnson",
      type: "Mock Interview",
      date: "2023-05-25",
      time: "10:00 AM",
      status: "Upcoming",
    },
    {
      id: 2,
      jobSeeker: "Sarah Williams",
      type: "Resume Review",
      date: "2023-05-26",
      time: "2:00 PM",
      status: "Upcoming",
    },
    {
      id: 3,
      jobSeeker: "David Rodriguez",
      type: "Job Placement",
      date: "2023-05-24",
      time: "11:30 AM",
      status: "Upcoming",
    },
    {
      id: 4,
      jobSeeker: "Lisa Chen",
      type: "Follow-up",
      date: "2023-05-20",
      time: "3:00 PM",
      status: "Completed",
    },
  ]

  // Filter job seekers based on search query
  const filteredJobSeekers = jobSeekers.filter(
    (seeker) =>
      seeker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seeker.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Filter job listings based on filters
  const filteredJobListings = jobListings.filter((job) => {
    const matchesIndustry = industryFilter === "all" || job.industry === industryFilter
    const matchesLocation = locationFilter === "all" || job.location.includes(locationFilter)
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesIndustry && matchesLocation && matchesSearch
  })

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold">Volunteer Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
            </div>
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-[240px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              <Button>
                <Clock className="mr-2 h-4 w-4" />
                Schedule
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Job Seekers</CardTitle>
                <CardDescription>Total job seekers in your queue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobSeekers.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Available Jobs</CardTitle>
                <CardDescription>Open positions for placement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{jobListings.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Appointments</CardTitle>
                <CardDescription>Scheduled for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{appointments.filter((a) => a.status === "Upcoming").length}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="job-seekers" className="space-y-4">
            <TabsList>
              <TabsTrigger value="job-seekers">Job Seekers</TabsTrigger>
              <TabsTrigger value="job-listings">Job Listings</TabsTrigger>
              <TabsTrigger value="appointments">Appointments</TabsTrigger>
            </TabsList>

            {/* Job Seekers Tab */}
            <TabsContent value="job-seekers" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search job seekers by name or skills..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </div>

              <div className="grid gap-4">
                {filteredJobSeekers.length > 0 ? (
                  filteredJobSeekers.map((seeker) => (
                    <Card key={seeker.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>{getInitials(seeker.name)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg">{seeker.name}</h3>
                            <p className="text-muted-foreground text-sm">{seeker.location}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {seeker.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={cn(
                                seeker.status === "Ready for placement"
                                  ? "bg-green-500"
                                  : seeker.status === "Resume review needed"
                                    ? "bg-blue-500"
                                    : "bg-yellow-500",
                              )}
                            >
                              {seeker.status}
                            </Badge>
                            <div className="text-xs text-muted-foreground">Last activity: {seeker.lastActivity}</div>
                            <div className="text-xs text-muted-foreground">
                              {seeker.appointments} appointment{seeker.appointments !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/volunteer/job-seekers/${seeker.id}`}>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/volunteer/job-seekers/${seeker.id}/schedule`}>
                              <Clock className="mr-2 h-4 w-4" />
                              Schedule
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No job seekers found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Job Listings Tab */}
            <TabsContent value="job-listings" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search jobs by title, company, or skills..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="Oakland">Oakland</SelectItem>
                      <SelectItem value="San Jose">San Jose</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredJobListings.length > 0 ? (
                  filteredJobListings.map((job) => (
                    <Card key={job.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg">{job.title}</h3>
                            <p className="text-muted-foreground">
                              {job.company} • {job.location}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline">{job.industry}</Badge>
                              <Badge variant="outline">{job.type}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {job.skills.map((skill, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <div className="text-sm text-muted-foreground">
                              Posted: {format(new Date(job.postedDate), "MMM d, yyyy")}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end mt-4 gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/volunteer/jobs/${job.id}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" asChild>
                            <Link href={`/volunteer/jobs/${job.id}/match`}>
                              <Users className="mr-2 h-4 w-4" />
                              Match Candidates
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No job listings found matching your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
                <Button asChild>
                  <Link href="/volunteer/schedule">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule New
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg">{appointment.type}</h3>
                          <p className="text-muted-foreground">With {appointment.jobSeeker}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                            <span>{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                            <Clock className="h-4 w-4 text-muted-foreground ml-2" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge className={appointment.status === "Upcoming" ? "bg-blue-500" : "bg-green-500"}>
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 gap-2">
                        {appointment.status === "Upcoming" ? (
                          <>
                            <Button variant="outline" size="sm">
                              Reschedule
                            </Button>
                            <Button size="sm" asChild>
                              <Link href={`/volunteer/appointments/${appointment.id}`}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Prepare
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/volunteer/appointments/${appointment.id}`}>
                              <FileText className="mr-2 h-4 w-4" />
                              View Notes
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

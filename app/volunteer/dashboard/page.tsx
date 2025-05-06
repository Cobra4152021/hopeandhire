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
  MessageSquare,
  Search,
  User,
  Users,
  Building,
  MapPin,
  Briefcase,
  CalendarPlus2Icon as CalendarIcon2,
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function VolunteerDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [searchQuery, setSearchQuery] = useState("")
  const [industryFilter, setIndustryFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [skillsFilter, setSkillsFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("job-seekers")

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
      bio: "Experienced warehouse worker with 5+ years in logistics and inventory management.",
      availability: "Immediate",
      preferredIndustries: ["Logistics", "Retail", "Manufacturing"],
      education: "High School Diploma",
      certifications: ["Forklift Operator License", "OSHA Safety"],
    },
    {
      id: 2,
      name: "Sarah Williams",
      location: "Oakland, CA",
      skills: ["Administrative", "Data Entry", "MS Office"],
      status: "Resume review needed",
      lastActivity: "1 week ago",
      appointments: 0,
      bio: "Detail-oriented administrative professional seeking office support roles.",
      availability: "2 weeks",
      preferredIndustries: ["Office Administration", "Healthcare", "Education"],
      education: "Associate's Degree in Business",
      certifications: ["Microsoft Office Specialist"],
    },
    {
      id: 3,
      name: "David Rodriguez",
      location: "San Jose, CA",
      skills: ["Construction", "Carpentry", "Electrical"],
      status: "Interview preparation",
      lastActivity: "3 days ago",
      appointments: 1,
      bio: "Skilled construction worker with experience in residential and commercial projects.",
      availability: "Immediate",
      preferredIndustries: ["Construction", "Maintenance", "Manufacturing"],
      education: "Trade School - Carpentry",
      certifications: ["OSHA 10", "Electrical Safety"],
    },
    {
      id: 4,
      name: "Lisa Chen",
      location: "San Francisco, CA",
      skills: ["Food Service", "Hospitality", "Customer Service"],
      status: "Ready for placement",
      lastActivity: "5 days ago",
      appointments: 3,
      bio: "Experienced food service professional with excellent customer service skills.",
      availability: "1 week",
      preferredIndustries: ["Hospitality", "Retail", "Food Service"],
      education: "Culinary Arts Certificate",
      certifications: ["Food Handler's Permit", "Alcohol Service"],
    },
    {
      id: 5,
      name: "James Wilson",
      location: "Berkeley, CA",
      skills: ["IT Support", "Computer Repair", "Networking"],
      status: "Ready for placement",
      lastActivity: "1 day ago",
      appointments: 2,
      bio: "Tech-savvy professional with experience in IT support and computer repair.",
      availability: "2 weeks",
      preferredIndustries: ["Technology", "Retail", "Education"],
      education: "IT Technical Certificate",
      certifications: ["CompTIA A+", "Network+"],
    },
    {
      id: 6,
      name: "Maria Garcia",
      location: "San Francisco, CA",
      skills: ["Healthcare", "CNA", "Patient Care"],
      status: "Interview preparation",
      lastActivity: "4 days ago",
      appointments: 1,
      bio: "Compassionate healthcare worker with experience in patient care and medical settings.",
      availability: "Immediate",
      preferredIndustries: ["Healthcare", "Senior Care", "Medical Office"],
      education: "Certified Nursing Assistant",
      certifications: ["CNA License", "CPR/First Aid"],
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
      salary: "$18-22/hour",
      description:
        "Looking for experienced warehouse associates to join our team. Responsibilities include receiving shipments, managing inventory, and preparing orders for shipment.",
      requirements: ["High school diploma or equivalent", "1+ year warehouse experience", "Forklift certification"],
      benefits: ["Health insurance", "401(k) matching", "Paid time off"],
      matches: 3,
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
      salary: "$20-24/hour",
      description:
        "Administrative assistant needed to support our growing team. Duties include managing calendars, coordinating meetings, and handling correspondence.",
      requirements: ["Associate's degree preferred", "Proficiency in Microsoft Office", "Strong organizational skills"],
      benefits: ["Health and dental insurance", "Flexible schedule", "Professional development"],
      matches: 2,
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
      salary: "$22-26/hour",
      description:
        "Entry-level construction helper needed for residential and commercial projects. Will assist skilled tradespeople and learn various aspects of construction.",
      requirements: ["Reliable transportation", "Ability to lift 50+ lbs", "Willingness to learn"],
      benefits: ["On-the-job training", "Advancement opportunities", "Paid overtime"],
      matches: 1,
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
      salary: "$17-20/hour",
      description:
        "Busy restaurant seeking kitchen staff for food preparation, cooking, and cleaning. Experience preferred but willing to train the right candidate.",
      requirements: ["Food handler's permit", "Flexible availability including weekends", "Team player attitude"],
      benefits: ["Employee meals", "Flexible scheduling", "Growth opportunities"],
      matches: 2,
    },
    {
      id: 5,
      title: "IT Support Technician",
      company: "Global Tech Services",
      location: "San Francisco, CA",
      industry: "Technology",
      type: "Full-time",
      skills: ["Technical Support", "Troubleshooting", "Customer Service"],
      postedDate: "2023-05-16",
      salary: "$24-28/hour",
      description:
        "IT support technician needed to provide technical assistance to customers and resolve hardware/software issues.",
      requirements: ["Technical certification preferred", "Problem-solving skills", "Customer service orientation"],
      benefits: ["Comprehensive benefits package", "Professional development", "Remote work options"],
      matches: 1,
    },
    {
      id: 6,
      title: "Healthcare Aide",
      company: "Sunshine Senior Living",
      location: "Oakland, CA",
      industry: "Healthcare",
      type: "Full-time",
      skills: ["Patient Care", "Medication Management", "First Aid"],
      postedDate: "2023-05-13",
      salary: "$19-23/hour",
      description:
        "Seeking compassionate healthcare aides to assist seniors with daily activities, medication management, and personal care in a residential facility.",
      requirements: ["CNA certification", "1+ year experience in healthcare", "CPR certification"],
      benefits: ["Health insurance", "Paid training", "Career advancement"],
      matches: 1,
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
      notes: "Preparing for warehouse position interview. Focus on situational questions and safety protocols.",
    },
    {
      id: 2,
      jobSeeker: "Sarah Williams",
      type: "Resume Review",
      date: "2023-05-26",
      time: "2:00 PM",
      status: "Upcoming",
      notes: "Initial resume review. Need to highlight administrative skills and improve formatting.",
    },
    {
      id: 3,
      jobSeeker: "David Rodriguez",
      type: "Job Placement",
      date: "2023-05-24",
      time: "11:30 AM",
      status: "Upcoming",
      notes: "Discussing potential match with BuildRight Construction. Review qualifications and prepare introduction.",
    },
    {
      id: 4,
      jobSeeker: "Lisa Chen",
      type: "Follow-up",
      date: "2023-05-20",
      time: "3:00 PM",
      status: "Completed",
      notes:
        "Reviewed interview feedback. Candidate performed well but needs to work on specific examples of customer service experience.",
    },
    {
      id: 5,
      jobSeeker: "James Wilson",
      type: "Mock Interview",
      date: "2023-05-27",
      time: "1:00 PM",
      status: "Upcoming",
      notes: "Preparing for IT support role. Focus on technical troubleshooting scenarios and customer interaction.",
    },
    {
      id: 6,
      jobSeeker: "Maria Garcia",
      type: "Job Placement",
      date: "2023-05-28",
      time: "9:30 AM",
      status: "Upcoming",
      notes: "Discussing potential match with Sunshine Senior Living. Review healthcare certifications and experience.",
    },
  ]

  // Filter job seekers based on search query and filters
  const filteredJobSeekers = jobSeekers.filter((seeker) => {
    const matchesSearch =
      seeker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seeker.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      seeker.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSkills =
      skillsFilter === "all" || seeker.skills.some((skill) => skill.toLowerCase().includes(skillsFilter.toLowerCase()))

    const matchesStatus = statusFilter === "all" || seeker.status === statusFilter

    return matchesSearch && matchesSkills && matchesStatus
  })

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

  // Get upcoming appointments
  const upcomingAppointments = appointments.filter((appointment) => appointment.status === "Upcoming")

  // Get today's appointments
  const todaysDate = new Date().toISOString().split("T")[0]
  const todaysAppointments = appointments.filter(
    (appointment) => appointment.date === todaysDate && appointment.status === "Upcoming",
  )

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Volunteer Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
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
              <Button className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                <Link href="/volunteer/schedule">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Link>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Job Seekers</CardTitle>
                <CardDescription>Total job seekers in your queue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{jobSeekers.length}</div>
                <div className="text-sm text-gray-500 mt-1">
                  {jobSeekers.filter((s) => s.status === "Ready for placement").length} ready for placement
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Available Jobs</CardTitle>
                <CardDescription>Open positions for placement</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{jobListings.length}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Across {new Set(jobListings.map((job) => job.industry)).size} industries
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Upcoming Appointments</CardTitle>
                <CardDescription>Scheduled for the next 7 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-800">{upcomingAppointments.length}</div>
                <div className="text-sm text-gray-500 mt-1">{todaysAppointments.length} scheduled for today</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="job-seekers" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger
                value="job-seekers"
                className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
              >
                Job Seekers
              </TabsTrigger>
              <TabsTrigger
                value="job-listings"
                className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
              >
                Job Listings
              </TabsTrigger>
              <TabsTrigger
                value="appointments"
                className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
              >
                Appointments
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                className="data-[state=active]:bg-[#e6f7f5] data-[state=active]:text-[#26a69a]"
              >
                Calendar
              </TabsTrigger>
            </TabsList>

            {/* Job Seekers Tab */}
            <TabsContent value="job-seekers" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search job seekers by name, skills, or location..."
                    className="pl-8 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <Select value={skillsFilter} onValueChange={setSkillsFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200">
                      <SelectValue placeholder="Filter by skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Skills</SelectItem>
                      <SelectItem value="Customer Service">Customer Service</SelectItem>
                      <SelectItem value="Warehouse">Warehouse</SelectItem>
                      <SelectItem value="Administrative">Administrative</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Food Service">Food Service</SelectItem>
                      <SelectItem value="IT Support">IT Support</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="Ready for placement">Ready for placement</SelectItem>
                      <SelectItem value="Resume review needed">Resume review needed</SelectItem>
                      <SelectItem value="Interview preparation">Interview preparation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredJobSeekers.length > 0 ? (
                  filteredJobSeekers.map((seeker) => (
                    <Card key={seeker.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <Avatar className="h-12 w-12 bg-[#e6f7f5] text-[#26a69a]">
                            <AvatarFallback>{getInitials(seeker.name)}</AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-gray-800">{seeker.name}</h3>
                            <div className="flex items-center text-gray-600 text-sm">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {seeker.location}
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {seeker.skills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  variant="secondary"
                                  className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                                >
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <Badge
                              className={cn(
                                "text-white",
                                seeker.status === "Ready for placement"
                                  ? "bg-green-500"
                                  : seeker.status === "Resume review needed"
                                    ? "bg-[#26a69a]"
                                    : "bg-[#f2b01e]",
                              )}
                            >
                              {seeker.status}
                            </Badge>
                            <div className="text-xs text-gray-500">Last activity: {seeker.lastActivity}</div>
                            <div className="text-xs text-gray-500">
                              {seeker.appointments} appointment{seeker.appointments !== 1 ? "s" : ""}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">{seeker.bio}</p>
                              <div className="mt-2">
                                <span className="font-medium text-gray-700">Education:</span>{" "}
                                <span className="text-gray-600">{seeker.education}</span>
                              </div>
                            </div>
                            <div>
                              <div className="mb-1">
                                <span className="font-medium text-gray-700">Availability:</span>{" "}
                                <span className="text-gray-600">{seeker.availability}</span>
                              </div>
                              <div className="mb-1">
                                <span className="font-medium text-gray-700">Preferred Industries:</span>{" "}
                                <span className="text-gray-600">{seeker.preferredIndustries.join(", ")}</span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Certifications:</span>{" "}
                                <span className="text-gray-600">{seeker.certifications.join(", ")}</span>
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
                            <Link href={`/volunteer/job-seekers/${seeker.id}`}>
                              <User className="mr-2 h-4 w-4 text-gray-500" />
                              View Profile
                            </Link>
                          </Button>
                          <Button size="sm" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
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
                    <p className="text-gray-500">No job seekers found matching your search.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Job Listings Tab */}
            <TabsContent value="job-listings" className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search jobs by title, company, or skills..."
                    className="pl-8 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Logistics">Logistics</SelectItem>
                      <SelectItem value="Construction">Construction</SelectItem>
                      <SelectItem value="Hospitality">Hospitality</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-[180px] border-gray-200">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="San Francisco">San Francisco</SelectItem>
                      <SelectItem value="Oakland">Oakland</SelectItem>
                      <SelectItem value="San Jose">San Jose</SelectItem>
                      <SelectItem value="Berkeley">Berkeley</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4">
                {filteredJobListings.length > 0 ? (
                  filteredJobListings.map((job) => (
                    <Card key={job.id} className="border-0 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                          <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center">
                            <Building className="h-6 w-6 text-[#26a69a]" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-gray-800">{job.title}</h3>
                            <p className="text-gray-600">
                              {job.company} • {job.location}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <Badge variant="outline" className="border-gray-200 text-gray-700">
                                {job.industry}
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
                            <div className="text-sm text-gray-500">
                              Posted: {format(new Date(job.postedDate), "MMM d, yyyy")}
                            </div>
                            <Badge className="bg-[#f2b01e] text-white">
                              {job.matches} potential {job.matches === 1 ? "match" : "matches"}
                            </Badge>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">{job.description}</p>
                            </div>
                            <div>
                              <div className="mb-2">
                                <h4 className="font-medium text-gray-700 mb-1">Requirements:</h4>
                                <ul className="list-disc pl-5 text-gray-600 space-y-1">
                                  {job.requirements.map((req, i) => (
                                    <li key={i}>{req}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-700 mb-1">Skills:</h4>
                                <div className="flex flex-wrap gap-1">
                                  {job.skills.map((skill, i) => (
                                    <Badge
                                      key={i}
                                      variant="secondary"
                                      className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    >
                                      {skill}
                                    </Badge>
                                  ))}
                                </div>
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
                            <Link href={`/volunteer/jobs/${job.id}`}>
                              <FileText className="mr-2 h-4 w-4 text-gray-500" />
                              View Details
                            </Link>
                          </Button>
                          <Button size="sm" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
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
                    <p className="text-gray-500">No job listings found matching your criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Appointments Tab */}
            <TabsContent value="appointments" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h3>
                <Button className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                  <Link href="/volunteer/schedule">
                    <Clock className="mr-2 h-4 w-4" />
                    Schedule New
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4">
                {appointments.map((appointment) => (
                  <Card key={appointment.id} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                        <div
                          className={cn(
                            "p-3 rounded-full w-12 h-12 flex items-center justify-center",
                            appointment.status === "Upcoming" ? "bg-[#e6f7f5]" : "bg-gray-100",
                          )}
                        >
                          {appointment.type === "Mock Interview" ? (
                            <Users className="h-6 w-6 text-[#26a69a]" />
                          ) : appointment.type === "Resume Review" ? (
                            <FileText className="h-6 w-6 text-[#26a69a]" />
                          ) : appointment.type === "Job Placement" ? (
                            <Briefcase className="h-6 w-6 text-[#26a69a]" />
                          ) : (
                            <MessageSquare className="h-6 w-6 text-[#26a69a]" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg text-gray-800">{appointment.type}</h3>
                          <p className="text-gray-600">With {appointment.jobSeeker}</p>
                          <div className="flex items-center gap-2 mt-2 text-gray-600">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span>{format(new Date(appointment.date), "MMMM d, yyyy")}</span>
                            <Clock className="h-4 w-4 text-gray-500 ml-2" />
                            <span>{appointment.time}</span>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <Badge
                            className={cn(
                              "text-white",
                              appointment.status === "Upcoming" ? "bg-[#26a69a]" : "bg-green-500",
                            )}
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="text-sm text-gray-600">
                          <h4 className="font-medium text-gray-700 mb-1">Notes:</h4>
                          <p>{appointment.notes}</p>
                        </div>
                      </div>

                      <div className="flex justify-end mt-4 gap-2">
                        {appointment.status === "Upcoming" ? (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            >
                              Reschedule
                            </Button>
                            <Button size="sm" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                              <Link href={`/volunteer/appointments/${appointment.id}`}>
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Prepare
                              </Link>
                            </Button>
                          </>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                            asChild
                          >
                            <Link href={`/volunteer/appointments/${appointment.id}`}>
                              <FileText className="mr-2 h-4 w-4 text-gray-500" />
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

            {/* Calendar Tab */}
            <TabsContent value="calendar" className="space-y-4">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-800">Appointment Calendar</CardTitle>
                  <CardDescription>View and manage your scheduled appointments with job seekers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                    <div className="md:col-span-5 bg-white p-4 rounded-md border border-gray-200">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-gray-800">May 2023</h3>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50"
                          >
                            Today
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50 p-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m15 18-6-6 6-6" />
                            </svg>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-50 p-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Sun</div>
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Mon</div>
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Tue</div>
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Wed</div>
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Thu</div>
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Fri</div>
                        <div className="text-center text-sm font-medium text-gray-500 py-2">Sat</div>

                        {/* Calendar days - first week */}
                        <div className="text-center p-2 text-gray-400">30</div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          1
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          2
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          3
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          4
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          5
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          6
                        </div>

                        {/* Calendar days - second week */}
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          7
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          8
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          9
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          10
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          11
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          12
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          13
                        </div>

                        {/* Calendar days - third week */}
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          14
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          15
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          16
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          17
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          18
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          19
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          20
                        </div>

                        {/* Calendar days - fourth week with current day */}
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          21
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          22
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          23
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          24
                        </div>
                        <div className="text-center p-2 bg-[#26a69a] text-white rounded-md font-medium">25</div>
                        <div className="text-center p-2 border border-[#26a69a] text-[#26a69a] rounded-md font-medium">
                          26
                        </div>
                        <div className="text-center p-2 border border-[#26a69a] text-[#26a69a] rounded-md font-medium">
                          27
                        </div>

                        {/* Calendar days - fifth week */}
                        <div className="text-center p-2 border border-[#26a69a] text-[#26a69a] rounded-md font-medium">
                          28
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          29
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          30
                        </div>
                        <div className="text-center p-2 border border-transparent rounded-md hover:bg-gray-50 cursor-pointer">
                          31
                        </div>
                        <div className="text-center p-2 text-gray-400">1</div>
                        <div className="text-center p-2 text-gray-400">2</div>
                        <div className="text-center p-2 text-gray-400">3</div>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <div className="bg-white p-4 rounded-md border border-gray-200 h-full">
                        <h3 className="font-medium text-gray-800 mb-4">Appointments for May 25, 2023</h3>
                        <div className="space-y-3">
                          <div className="p-3 rounded-md bg-[#e6f7f5] border border-[#26a69a]/20">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">10:00 AM - 11:00 AM</p>
                                <p className="text-[#26a69a]">Mock Interview</p>
                              </div>
                              <Badge className="bg-[#26a69a]">Upcoming</Badge>
                            </div>
                            <p className="text-gray-600 mt-1">Michael Johnson</p>
                          </div>

                          <div className="p-3 rounded-md bg-gray-50 border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">1:00 PM - 2:00 PM</p>
                                <p className="text-gray-600">Available</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-gray-200 text-gray-700 hover:bg-gray-50"
                              >
                                Schedule
                              </Button>
                            </div>
                          </div>

                          <div className="p-3 rounded-md bg-gray-50 border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">3:00 PM - 4:00 PM</p>
                                <p className="text-gray-600">Available</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-gray-200 text-gray-700 hover:bg-gray-50"
                              >
                                Schedule
                              </Button>
                            </div>
                          </div>

                          <div className="p-3 rounded-md bg-gray-50 border border-gray-200">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-gray-800">4:30 PM - 5:30 PM</p>
                                <p className="text-gray-600">Available</p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-7 text-xs border-gray-200 text-gray-700 hover:bg-gray-50"
                              >
                                Schedule
                              </Button>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <Button className="w-full bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                            <Link href="/volunteer/schedule">
                              <CalendarIcon2 className="mr-2 h-4 w-4" />
                              Add Availability
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  )
}

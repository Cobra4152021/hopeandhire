"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { CheckCircle2, Clock, Download, Eye, MoreHorizontal, Search, XCircle } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplicationsPage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [jobFilter, setJobFilter] = useState("all")

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          setApplications([
            {
              id: 1,
              candidateName: "John Doe",
              candidateEmail: "john.doe@example.com",
              jobTitle: "Senior Software Developer",
              jobId: 1,
              status: "new",
              appliedDate: "2023-05-20",
              resumeUrl: "#",
              coverLetter: "I am excited to apply for this position...",
            },
            {
              id: 2,
              candidateName: "Jane Smith",
              candidateEmail: "jane.smith@example.com",
              jobTitle: "Senior Software Developer",
              jobId: 1,
              status: "reviewing",
              appliedDate: "2023-05-19",
              resumeUrl: "#",
              coverLetter: "With my 5 years of experience in software development...",
            },
            {
              id: 3,
              candidateName: "Michael Johnson",
              candidateEmail: "michael.j@example.com",
              jobTitle: "Marketing Specialist",
              jobId: 2,
              status: "interviewed",
              appliedDate: "2023-05-18",
              resumeUrl: "#",
              coverLetter: "I believe my background in digital marketing...",
            },
            {
              id: 4,
              candidateName: "Emily Williams",
              candidateEmail: "emily.w@example.com",
              jobTitle: "Marketing Specialist",
              jobId: 2,
              status: "rejected",
              appliedDate: "2023-05-17",
              resumeUrl: "#",
              coverLetter: "I am writing to express my interest in the Marketing Specialist position...",
            },
            {
              id: 5,
              candidateName: "David Brown",
              candidateEmail: "david.b@example.com",
              jobTitle: "Customer Support Representative",
              jobId: 3,
              status: "offered",
              appliedDate: "2023-05-16",
              resumeUrl: "#",
              coverLetter: "I am applying for the Customer Support position...",
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing applications page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJob = jobFilter === "all" || app.jobId.toString() === jobFilter
    return matchesSearch && matchesJob
  })

  const newApplications = filteredApplications.filter((app) => app.status === "new")
  const reviewingApplications = filteredApplications.filter((app) => app.status === "reviewing")
  const interviewedApplications = filteredApplications.filter((app) => app.status === "interviewed")
  const offeredApplications = filteredApplications.filter((app) => app.status === "offered")
  const rejectedApplications = filteredApplications.filter((app) => app.status === "rejected")

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-500">New</Badge>
      case "reviewing":
        return <Badge className="bg-yellow-500">Reviewing</Badge>
      case "interviewed":
        return <Badge className="bg-purple-500">Interviewed</Badge>
      case "offered":
        return <Badge className="bg-green-500">Offered</Badge>
      case "rejected":
        return <Badge variant="secondary">Rejected</Badge>
      default:
        return null
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const ApplicationCard = ({ application }: { application: any }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{getInitials(application.candidateName)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{application.candidateName}</CardTitle>
              <CardDescription>{application.candidateEmail}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/employer/dashboard/applications/${application.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" /> Download Resume
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CheckCircle2 className="mr-2 h-4 w-4" /> Mark as Reviewed
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <XCircle className="mr-2 h-4 w-4" /> Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium">Applied for</div>
            <div className="text-sm">{application.jobTitle}</div>
          </div>
          <div className="flex flex-wrap gap-2">
            {getStatusBadge(application.status)}
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              Applied {formatDate(application.appliedDate)}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Cover Letter</div>
            <p className="text-sm line-clamp-2 text-muted-foreground">{application.coverLetter}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/employer/dashboard/applications/${application.id}`}>View Application</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/employer/dashboard/candidates/${application.id}`}>View Candidate</Link>
        </Button>
      </CardFooter>
    </Card>
  )

  // Get unique jobs for the filter
  const jobs = [...new Set(applications.map((app) => ({ id: app.jobId, title: app.jobTitle })))].reduce(
    (acc, job) => {
      if (!acc.find((j) => j.id === job.id)) {
        acc.push(job)
      }
      return acc
    },
    [] as { id: number; title: string }[],
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Applications</h1>
        <p className="text-muted-foreground">Manage and review job applications</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={jobFilter} onValueChange={setJobFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by job" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Jobs</SelectItem>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id.toString()}>
                {job.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : (
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All ({filteredApplications.length})</TabsTrigger>
            <TabsTrigger value="new">New ({newApplications.length})</TabsTrigger>
            <TabsTrigger value="reviewing">Reviewing ({reviewingApplications.length})</TabsTrigger>
            <TabsTrigger value="interviewed">Interviewed ({interviewedApplications.length})</TabsTrigger>
            <TabsTrigger value="offered">Offered ({offeredApplications.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedApplications.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredApplications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No applications found.</p>
            )}
          </TabsContent>
          <TabsContent value="new" className="mt-6">
            {newApplications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {newApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No new applications found.</p>
            )}
          </TabsContent>
          <TabsContent value="reviewing" className="mt-6">
            {reviewingApplications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {reviewingApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No applications under review.</p>
            )}
          </TabsContent>
          <TabsContent value="interviewed" className="mt-6">
            {interviewedApplications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {interviewedApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No interviewed candidates found.</p>
            )}
          </TabsContent>
          <TabsContent value="offered" className="mt-6">
            {offeredApplications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {offeredApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No offered candidates found.</p>
            )}
          </TabsContent>
          <TabsContent value="rejected" className="mt-6">
            {rejectedApplications.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {rejectedApplications.map((application) => (
                  <ApplicationCard key={application.id} application={application} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No rejected applications found.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

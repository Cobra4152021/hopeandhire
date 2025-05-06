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
import { Clock, Edit, Eye, MoreHorizontal, Plus, Trash2, Users } from "lucide-react"

export default function JobsPage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          setJobs([
            {
              id: 1,
              title: "Senior Software Developer",
              location: "New York, NY",
              type: "Full-time",
              status: "active",
              posted: "2023-05-15",
              expires: "2023-06-15",
              applications: 12,
              description: "We are looking for a senior software developer with experience in React and Node.js.",
            },
            {
              id: 2,
              title: "Marketing Specialist",
              location: "Remote",
              type: "Full-time",
              status: "active",
              posted: "2023-05-10",
              expires: "2023-06-10",
              applications: 8,
              description: "Join our marketing team to help grow our brand and reach new customers.",
            },
            {
              id: 3,
              title: "Customer Support Representative",
              location: "Chicago, IL",
              type: "Part-time",
              status: "active",
              posted: "2023-05-05",
              expires: "2023-06-05",
              applications: 7,
              description: "Provide excellent customer support via phone, email, and chat.",
            },
            {
              id: 4,
              title: "UX Designer",
              location: "San Francisco, CA",
              type: "Contract",
              status: "draft",
              posted: null,
              expires: null,
              applications: 0,
              description: "Design user experiences for our web and mobile applications.",
            },
            {
              id: 5,
              title: "Data Analyst",
              location: "Boston, MA",
              type: "Full-time",
              status: "expired",
              posted: "2023-04-01",
              expires: "2023-05-01",
              applications: 15,
              description: "Analyze data to help us make better business decisions.",
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing jobs page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const activeJobs = filteredJobs.filter((job) => job.status === "active")
  const draftJobs = filteredJobs.filter((job) => job.status === "draft")
  const expiredJobs = filteredJobs.filter((job) => job.status === "expired")

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
      case "active":
        return <Badge className="bg-green-500">Active</Badge>
      case "draft":
        return <Badge variant="outline">Draft</Badge>
      case "expired":
        return <Badge variant="secondary">Expired</Badge>
      default:
        return null
    }
  }

  const JobCard = ({ job }: { job: any }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <CardDescription className="mt-1">
              {job.location} • {job.type}
            </CardDescription>
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
                <Link href={`/employer/dashboard/jobs/${job.id}`}>
                  <Eye className="mr-2 h-4 w-4" /> View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/employer/dashboard/jobs/${job.id}/edit`}>
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {getStatusBadge(job.status)}
          {job.status !== "draft" && (
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              {job.status === "active" ? `Expires ${formatDate(job.expires)}` : `Expired ${formatDate(job.expires)}`}
            </div>
          )}
        </div>
        <p className="text-sm line-clamp-2 mb-4">{job.description}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-1 h-4 w-4" />
          {job.applications} application{job.applications !== 1 && "s"}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/employer/dashboard/jobs/${job.id}`}>View Details</Link>
        </Button>
        {job.status === "active" && (
          <Button asChild size="sm">
            <Link href={`/employer/dashboard/jobs/${job.id}/applications`}>View Applications</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Job Postings</h1>
          <p className="text-muted-foreground">Manage your job listings</p>
        </div>
        <Button asChild>
          <Link href="/employer/dashboard/jobs/create">
            <Plus className="mr-2 h-4 w-4" /> Post a Job
          </Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-md"
        />
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      ) : (
        <Tabs defaultValue="active">
          <TabsList>
            <TabsTrigger value="active">Active ({activeJobs.length})</TabsTrigger>
            <TabsTrigger value="draft">Drafts ({draftJobs.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired ({expiredJobs.length})</TabsTrigger>
            <TabsTrigger value="all">All ({filteredJobs.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="mt-6">
            {activeJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {activeJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No active job postings found.</p>
            )}
          </TabsContent>
          <TabsContent value="draft" className="mt-6">
            {draftJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {draftJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No draft job postings found.</p>
            )}
          </TabsContent>
          <TabsContent value="expired" className="mt-6">
            {expiredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {expiredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No expired job postings found.</p>
            )}
          </TabsContent>
          <TabsContent value="all" className="mt-6">
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No job postings found.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

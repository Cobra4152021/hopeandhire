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
import { Briefcase, Download, Eye, Mail, MapPin, MoreHorizontal, Phone, Search, Star } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CandidatesPage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [candidates, setCandidates] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          setCandidates([
            {
              id: 1,
              name: "John Doe",
              email: "john.doe@example.com",
              phone: "(555) 123-4567",
              location: "New York, NY",
              status: "active",
              tags: ["React", "Node.js", "TypeScript"],
              experience: "5 years",
              education: "Bachelor's in Computer Science",
              applications: 2,
              notes: "Strong technical skills, good communication",
              resumeUrl: "#",
              starred: true,
            },
            {
              id: 2,
              name: "Jane Smith",
              email: "jane.smith@example.com",
              phone: "(555) 987-6543",
              location: "San Francisco, CA",
              status: "interviewing",
              tags: ["Marketing", "Social Media", "Content Creation"],
              experience: "3 years",
              education: "Bachelor's in Marketing",
              applications: 1,
              notes: "Creative thinker, excellent writing skills",
              resumeUrl: "#",
              starred: false,
            },
            {
              id: 3,
              name: "Michael Johnson",
              email: "michael.j@example.com",
              phone: "(555) 456-7890",
              location: "Chicago, IL",
              status: "hired",
              tags: ["Customer Service", "Communication", "Problem Solving"],
              experience: "2 years",
              education: "Associate's in Business",
              applications: 1,
              notes: "Great people skills, previous retail experience",
              resumeUrl: "#",
              starred: true,
            },
            {
              id: 4,
              name: "Emily Williams",
              email: "emily.w@example.com",
              phone: "(555) 234-5678",
              location: "Boston, MA",
              status: "rejected",
              tags: ["Marketing", "Graphic Design", "Adobe Suite"],
              experience: "4 years",
              education: "Bachelor's in Graphic Design",
              applications: 1,
              notes: "Strong portfolio, but not enough experience for the role",
              resumeUrl: "#",
              starred: false,
            },
            {
              id: 5,
              name: "David Brown",
              email: "david.b@example.com",
              phone: "(555) 876-5432",
              location: "Austin, TX",
              status: "active",
              tags: ["Customer Support", "Technical Writing", "Zendesk"],
              experience: "1 year",
              education: "Bachelor's in English",
              applications: 1,
              notes: "Enthusiastic, quick learner",
              resumeUrl: "#",
              starred: false,
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing candidates page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  const filteredCandidates = candidates.filter((candidate) => {
    const matchesSearch =
      candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      candidate.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = statusFilter === "all" || candidate.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const activeCandidates = filteredCandidates.filter((candidate) => candidate.status === "active")
  const interviewingCandidates = filteredCandidates.filter((candidate) => candidate.status === "interviewing")
  const hiredCandidates = filteredCandidates.filter((candidate) => candidate.status === "hired")
  const rejectedCandidates = filteredCandidates.filter((candidate) => candidate.status === "rejected")
  const starredCandidates = filteredCandidates.filter((candidate) => candidate.starred)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-blue-500">Active</Badge>
      case "interviewing":
        return <Badge className="bg-yellow-500">Interviewing</Badge>
      case "hired":
        return <Badge className="bg-green-500">Hired</Badge>
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

  const toggleStar = (id: number) => {
    setCandidates(
      candidates.map((candidate) => (candidate.id === id ? { ...candidate, starred: !candidate.starred } : candidate)),
    )
  }

  const CandidateCard = ({ candidate }: { candidate: any }) => (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarFallback>{getInitials(candidate.name)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{candidate.name}</CardTitle>
              <CardDescription>{candidate.experience} experience</CardDescription>
            </div>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleStar(candidate.id)}
              className={candidate.starred ? "text-yellow-500" : "text-muted-foreground"}
            >
              <Star className="h-5 w-5" fill={candidate.starred ? "currentColor" : "none"} />
              <span className="sr-only">{candidate.starred ? "Unstar" : "Star"} candidate</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href={`/employer/dashboard/candidates/${candidate.id}`}>
                    <Eye className="mr-2 h-4 w-4" /> View Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/employer/dashboard/messages?candidate=${candidate.id}`}>
                    <Mail className="mr-2 h-4 w-4" /> Send Message
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" /> Download Resume
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {getStatusBadge(candidate.status)}
            <Badge variant="outline" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" /> {candidate.applications} application
              {candidate.applications !== 1 && "s"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="truncate">{candidate.email}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{candidate.phone}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground col-span-2">
              <MapPin className="h-4 w-4" />
              <span>{candidate.location}</span>
            </div>
          </div>

          <div>
            <div className="text-sm font-medium mb-1">Skills</div>
            <div className="flex flex-wrap gap-1">
              {candidate.tags.map((tag: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {candidate.notes && (
            <div>
              <div className="text-sm font-medium mb-1">Notes</div>
              <p className="text-sm text-muted-foreground line-clamp-2">{candidate.notes}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link href={`/employer/dashboard/candidates/${candidate.id}`}>View Profile</Link>
        </Button>
        <Button asChild size="sm">
          <Link href={`/employer/dashboard/candidates/${candidate.id}/applications`}>View Applications</Link>
        </Button>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Candidates</h1>
        <p className="text-muted-foreground">Manage and track job applicants</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search candidates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="interviewing">Interviewing</SelectItem>
            <SelectItem value="hired">Hired</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
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
            <TabsTrigger value="all">All ({filteredCandidates.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeCandidates.length})</TabsTrigger>
            <TabsTrigger value="interviewing">Interviewing ({interviewingCandidates.length})</TabsTrigger>
            <TabsTrigger value="hired">Hired ({hiredCandidates.length})</TabsTrigger>
            <TabsTrigger value="starred">Starred ({starredCandidates.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-6">
            {filteredCandidates.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No candidates found.</p>
            )}
          </TabsContent>
          <TabsContent value="active" className="mt-6">
            {activeCandidates.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {activeCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No active candidates found.</p>
            )}
          </TabsContent>
          <TabsContent value="interviewing" className="mt-6">
            {interviewingCandidates.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {interviewingCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No candidates in the interview process.</p>
            )}
          </TabsContent>
          <TabsContent value="hired" className="mt-6">
            {hiredCandidates.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {hiredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No hired candidates found.</p>
            )}
          </TabsContent>
          <TabsContent value="starred" className="mt-6">
            {starredCandidates.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {starredCandidates.map((candidate) => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No starred candidates found.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

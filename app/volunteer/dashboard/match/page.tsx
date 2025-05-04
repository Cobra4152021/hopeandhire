"use client"

import { useState } from "react"
import { Check, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
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

// Mock data for candidates
const candidates = [
  {
    id: 1,
    name: "James Wilson",
    skills: ["Customer Service", "Inventory Management", "Communication"],
    experience: "3 years retail",
    interests: "Retail, Warehouse",
    availability: "Immediate",
    location: "Chicago, IL",
    status: "Ready for placement",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    skills: ["Food Preparation", "Team Coordination", "Bilingual (Spanish)"],
    experience: "2 years food service",
    interests: "Food Service, Hospitality",
    availability: "Two weeks notice",
    location: "Chicago, IL",
    status: "In training",
  },
  {
    id: 3,
    name: "Robert Johnson",
    skills: ["Forklift Operation", "Shipping/Receiving", "Inventory Control"],
    experience: "4 years warehouse",
    interests: "Logistics, Manufacturing",
    availability: "Immediate",
    location: "Evanston, IL",
    status: "Ready for placement",
  },
]

// Mock data for jobs
const jobs = [
  {
    id: 101,
    title: "Warehouse Associate",
    company: "LogiTech Solutions",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$18-22/hr",
    requirements: ["Valid driver's license", "Able to lift 50 lbs", "Forklift experience a plus"],
    description:
      "Seeking reliable warehouse associates for our growing distribution center. Responsibilities include picking, packing, and shipping orders.",
  },
  {
    id: 102,
    title: "Kitchen Staff",
    company: "Fresh Start Catering",
    location: "Chicago, IL",
    type: "Part-time",
    salary: "$16-19/hr",
    requirements: ["Food handler certification (or willing to obtain)", "Reliable transportation"],
    description:
      "Join our kitchen team preparing meals for corporate events and community programs. Flexible scheduling available.",
  },
  {
    id: 103,
    title: "Retail Associate",
    company: "Second Chance Boutique",
    location: "Evanston, IL",
    type: "Full-time",
    salary: "$17-20/hr",
    requirements: ["Customer service experience preferred", "Cash handling experience"],
    description:
      "Help customers find products, operate POS system, and maintain store appearance. Supportive team environment.",
  },
]

export default function MatchPage() {
  const [searchCandidate, setSearchCandidate] = useState("")
  const [searchJob, setSearchJob] = useState("")
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [selectedJob, setSelectedJob] = useState(null)
  const [matchDialogOpen, setMatchDialogOpen] = useState(false)
  const [notes, setNotes] = useState("")

  const filteredCandidates = candidates.filter(
    (candidate) =>
      candidate.name.toLowerCase().includes(searchCandidate.toLowerCase()) ||
      candidate.skills.some((skill) => skill.toLowerCase().includes(searchCandidate.toLowerCase())) ||
      candidate.location.toLowerCase().includes(searchCandidate.toLowerCase()),
  )

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.company.toLowerCase().includes(searchJob.toLowerCase()) ||
      job.location.toLowerCase().includes(searchJob.toLowerCase()),
  )

  const handleMatch = () => {
    // In a real application, this would send the match data to a backend
    alert(`Match created between ${selectedCandidate.name} and ${selectedJob.title} at ${selectedJob.company}`)
    setMatchDialogOpen(false)
    setNotes("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Match Candidates with Jobs</h1>
        <p className="text-muted-foreground mt-2">Select a candidate and a job to create a match recommendation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Candidates Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Candidates</CardTitle>
            <CardDescription>Select a candidate to match with a job opportunity</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search candidates..."
                value={searchCandidate}
                onChange={(e) => setSearchCandidate(e.target.value)}
                className="h-9"
              />
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="w-4 h-4" />
                Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedCandidate?.id === candidate.id ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                onClick={() => setSelectedCandidate(candidate)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{candidate.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {candidate.location} • {candidate.availability}
                    </p>
                  </div>
                  {selectedCandidate?.id === candidate.id && <Check className="w-5 h-5 text-primary" />}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {candidate.skills.map((skill, i) => (
                    <Badge key={i} variant="outline" className="bg-primary/5">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <p className="mt-2 text-sm">{candidate.experience}</p>
                <p className="mt-1 text-sm text-muted-foreground">Interests: {candidate.interests}</p>
                <div className="mt-2">
                  <Badge variant={candidate.status === "Ready for placement" ? "default" : "secondary"}>
                    {candidate.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Jobs Section */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Job Opportunities</CardTitle>
            <CardDescription>Select a job to match with a candidate</CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchJob}
                onChange={(e) => setSearchJob(e.target.value)}
                className="h-9"
              />
              <Select>
                <SelectTrigger className="w-[180px] h-9">
                  <SelectValue placeholder="All locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="chicago">Chicago, IL</SelectItem>
                  <SelectItem value="evanston">Evanston, IL</SelectItem>
                  <SelectItem value="all">All locations</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${selectedJob?.id === job.id ? "bg-primary/10 border-primary" : "hover:bg-muted"}`}
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{job.title}</h3>
                    <p className="text-sm">{job.company}</p>
                  </div>
                  {selectedJob?.id === job.id && <Check className="w-5 h-5 text-primary" />}
                </div>
                <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{job.location}</span>
                  <span>•</span>
                  <span>{job.type}</span>
                  <span>•</span>
                  <span>{job.salary}</span>
                </div>
                <p className="mt-2 text-sm">{job.description}</p>
                <div className="mt-2">
                  <p className="text-sm font-medium">Requirements:</p>
                  <ul className="text-sm list-disc pl-5">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Dialog open={matchDialogOpen} onOpenChange={setMatchDialogOpen}>
          <DialogTrigger asChild>
            <Button
              size="lg"
              disabled={!selectedCandidate || !selectedJob}
              onClick={() => selectedCandidate && selectedJob && setMatchDialogOpen(true)}
            >
              Create Match Recommendation
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Confirm Match Recommendation</DialogTitle>
              <DialogDescription>
                You are about to recommend a match between this candidate and job opportunity.
              </DialogDescription>
            </DialogHeader>

            {selectedCandidate && selectedJob && (
              <>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="candidate">Candidate</Label>
                    <div id="candidate" className="p-2 border rounded-md">
                      <p className="font-medium">{selectedCandidate.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedCandidate.skills.join(", ")}</p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="job">Job Opportunity</Label>
                    <div id="job" className="p-2 border rounded-md">
                      <p className="font-medium">{selectedJob.title}</p>
                      <p className="text-sm">
                        {selectedJob.company} • {selectedJob.location}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Match Notes</Label>
                    <Textarea
                      id="notes"
                      placeholder="Add any notes about why this is a good match..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setMatchDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleMatch}>Confirm Match</Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

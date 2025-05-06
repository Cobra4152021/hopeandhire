"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { ArrowLeft, Building, Briefcase, MapPin, Search, CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export default function JobMatchPage({ params }: { params: { id: string } }) {
  const jobId = params.id
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([])
  const [notes, setNotes] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  // Sample job data
  const job = {
    id: jobId,
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
  }

  // Sample job seekers data
  const jobSeekers = [
    {
      id: "1",
      name: "Michael Johnson",
      location: "San Francisco, CA",
      skills: ["Customer Service", "Warehouse", "Forklift Operation"],
      status: "Ready for placement",
      lastActivity: "2 days ago",
      appointments: 2,
      bio: "Experienced warehouse worker with 5+ years in logistics and inventory management.",
      availability: "Immediate",
      matchScore: 92,
      matchReasons: ["Forklift certified", "Warehouse experience", "Location match"],
      concerns: [],
    },
    {
      id: "2",
      name: "James Wilson",
      location: "Oakland, CA",
      skills: ["Inventory Management", "Shipping/Receiving", "Data Entry"],
      status: "Ready for placement",
      lastActivity: "3 days ago",
      appointments: 1,
      bio: "Detail-oriented worker with experience in inventory management and shipping/receiving.",
      availability: "2 weeks",
      matchScore: 85,
      matchReasons: ["Inventory experience", "Shipping/Receiving experience"],
      concerns: ["Commute distance"],
    },
    {
      id: "3",
      name: "Lisa Chen",
      location: "San Francisco, CA",
      skills: ["Customer Service", "Data Entry", "Retail"],
      status: "Ready for placement",
      lastActivity: "5 days ago",
      appointments: 3,
      bio: "Reliable worker with strong customer service skills seeking warehouse opportunities.",
      availability: "1 week",
      matchScore: 70,
      matchReasons: ["Customer service skills", "Location match"],
      concerns: ["No forklift certification", "Limited warehouse experience"],
    },
    {
      id: "4",
      name: "David Rodriguez",
      location: "San Jose, CA",
      skills: ["Construction", "Carpentry", "Physical Labor"],
      status: "Interview preparation",
      lastActivity: "3 days ago",
      appointments: 1,
      bio: "Hard worker with construction background looking to transition to warehouse work.",
      availability: "Immediate",
      matchScore: 65,
      matchReasons: ["Physical capabilities", "Immediate availability"],
      concerns: ["No warehouse experience", "Long commute", "No forklift certification"],
    },
  ]

  // Filter job seekers based on search query
  const filteredJobSeekers = jobSeekers.filter(
    (seeker) =>
      seeker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seeker.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      seeker.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleCheckCandidate = (candidateId: string) => {
    setSelectedCandidates((prev) =>
      prev.includes(candidateId) ? prev.filter((id) => id !== candidateId) : [...prev, candidateId],
    )
  }

  const handleNotesChange = (candidateId: string, value: string) => {
    setNotes((prev) => ({ ...prev, [candidateId]: value }))
  }

  const handleSubmit = async () => {
    if (selectedCandidates.length === 0) {
      toast({
        title: "No candidates selected",
        description: "Please select at least one candidate to match with this job.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Candidates matched successfully",
        description: `${selectedCandidates.length} candidate(s) have been matched with this job.`,
      })

      // Reset selection
      setSelectedCandidates([])
      setNotes({})
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error matching candidates. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="outline" size="sm" className="mb-4 border-gray-200 text-gray-700 hover:bg-gray-50" asChild>
              <Link href="/volunteer/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Match Candidates to Job</h1>
            <p className="text-gray-600">Find suitable candidates for this position based on skills and experience.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm sticky top-24">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold text-gray-800">Job Details</CardTitle>
                  <CardDescription>Review the job requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
                      <Building className="h-5 w-5 text-[#26a69a] mr-2" />
                      <h3 className="font-semibold text-gray-800">{job.company}</h3>
                    </div>
                    <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mt-1">
                      <Briefcase className="h-3.5 w-3.5 mr-1" />
                      {job.type} • {job.salary}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="outline" className="border-gray-200 text-gray-700">
                      {job.industry}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Description:</h4>
                    <p className="text-gray-600 text-sm">{job.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Required Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.map((skill, i) => (
                        <Badge key={i} className="bg-[#e6f7f5] text-[#26a69a] hover:bg-[#d4f0ed]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Requirements:</h4>
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Benefits:</h4>
                    <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
                      {job.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search candidates by name, skills, or location..."
                    className="pl-8 border-gray-200"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {filteredJobSeekers.map((seeker) => (
                  <Card key={seeker.id} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`select-${seeker.id}`}
                          checked={selectedCandidates.includes(seeker.id)}
                          onCheckedChange={() => handleCheckCandidate(seeker.id)}
                          className="mt-1 border-gray-300 data-[state=checked]:bg-[#26a69a] data-[state=checked]:border-[#26a69a]"
                        />

                        <div className="flex-1">
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
                                    className={cn(
                                      "text-xs",
                                      job.skills.includes(skill)
                                        ? "bg-[#e6f7f5] text-[#26a69a]"
                                        : "bg-gray-100 text-gray-700",
                                    )}
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
                                  seeker.matchScore >= 80
                                    ? "bg-green-500"
                                    : seeker.matchScore >= 60
                                      ? "bg-[#f2b01e]"
                                      : "bg-gray-500",
                                )}
                              >
                                {seeker.matchScore}% Match
                              </Badge>
                              <div className="text-xs text-gray-500">Availability: {seeker.availability}</div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-medium text-gray-700 mb-1">Match Strengths:</h4>
                                <ul className="space-y-1">
                                  {seeker.matchReasons.map((reason, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-600">
                                      <CheckCircle2 className="h-3.5 w-3.5 mr-1.5 text-green-500" />
                                      {reason}
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {seeker.concerns.length > 0 && (
                                <div>
                                  <h4 className="font-medium text-gray-700 mb-1">Potential Concerns:</h4>
                                  <ul className="space-y-1">
                                    {seeker.concerns.map((concern, i) => (
                                      <li key={i} className="flex items-center text-sm text-gray-600">
                                        <XCircle className="h-3.5 w-3.5 mr-1.5 text-red-500" />
                                        {concern}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            {selectedCandidates.includes(seeker.id) && (
                              <div className="mt-4">
                                <Label htmlFor={`notes-${seeker.id}`} className="text-gray-700 mb-1 block">
                                  Notes for Employer:
                                </Label>
                                <Textarea
                                  id={`notes-${seeker.id}`}
                                  placeholder="Add any notes about this candidate for the employer..."
                                  value={notes[seeker.id] || ""}
                                  onChange={(e) => handleNotesChange(seeker.id, e.target.value)}
                                  className="border-gray-200 focus:ring-[#26a69a] text-sm"
                                  rows={3}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {filteredJobSeekers.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No candidates found matching your search criteria.</p>
                  </div>
                )}
              </div>

              {selectedCandidates.length > 0 && (
                <div className="mt-6 bg-white p-4 rounded-md border border-gray-200 sticky bottom-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">
                        {selectedCandidates.length} candidate{selectedCandidates.length !== 1 ? "s" : ""} selected
                      </p>
                      <p className="text-sm text-gray-600">
                        Selected candidates will be notified about this job opportunity.
                      </p>
                    </div>
                    <Button
                      className="bg-[#26a69a] hover:bg-[#1e8e82] text-white"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Matches"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

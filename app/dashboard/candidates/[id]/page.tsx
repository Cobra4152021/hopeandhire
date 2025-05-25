"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Briefcase,
  MapPin,
  GraduationCap,
  Mail,
  Phone,
  Globe,
  ChevronLeft,
  Edit,
  Download,
  Calendar,
  FileText,
  Star,
  Clock,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

// Sample candidate data
const candidateData = {
  id: 1,
  name: "Michael Johnson",
  title: "Senior Frontend Developer",
  email: "michael.johnson@example.com",
  phone: "(555) 123-4567",
  website: "michaeljohnson.dev",
  location: "San Francisco, CA",
  experience: "8 years",
  education: "B.S. Computer Science, Stanford University",
  status: "Available",
  avatar: "/team-member-1.jpg",
  bio: "Experienced frontend developer with a passion for creating intuitive user interfaces and optimizing web performance. Skilled in modern JavaScript frameworks and design systems.",
  skills: [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Node.js", level: 85 },
    { name: "GraphQL", level: 80 },
    { name: "UI/UX Design", level: 75 },
    { name: "AWS", level: 70 },
  ],
  workHistory: [
    {
      company: "TechCorp Solutions",
      position: "Senior Frontend Developer",
      duration: "2020 - Present",
      description:
        "Lead frontend development for multiple web applications, implementing React, TypeScript, and GraphQL. Improved site performance by 40% through code optimization.",
    },
    {
      company: "WebDev Inc.",
      position: "Frontend Developer",
      duration: "2017 - 2020",
      description:
        "Developed responsive web applications using React and Redux. Collaborated with designers to implement UI/UX improvements.",
    },
    {
      company: "StartUp Tech",
      position: "Junior Developer",
      duration: "2015 - 2017",
      description:
        "Built and maintained client websites using JavaScript, HTML, and CSS. Assisted in the development of internal tools.",
    },
  ],
  education: [
    {
      institution: "Stanford University",
      degree: "B.S. Computer Science",
      duration: "2011 - 2015",
      description: "Graduated with honors. Specialized in Human-Computer Interaction.",
    },
  ],
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      date: "2021",
    },
    {
      name: "Professional Frontend Developer",
      issuer: "Frontend Masters",
      date: "2019",
    },
  ],
  matchScore: 95,
  lastActive: "2 days ago",
  featured: true,
  notes: [
    {
      date: "May 5, 2023",
      author: "Sarah Thompson",
      content:
        "Had an initial screening call with Michael. Very impressive technical knowledge and communication skills. Would be a great fit for the TechCorp Senior Developer role.",
    },
    {
      date: "May 10, 2023",
      author: "David Lee",
      content:
        "Reviewed portfolio projects. Clean code, well-documented, and excellent UI design. Recommended for technical interview.",
    },
  ],
  jobMatches: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      matchScore: 95,
      status: "Recommended",
    },
    {
      id: 2,
      title: "Full Stack Developer",
      company: "Innovative Tech",
      matchScore: 88,
      status: "Potential Match",
    },
    {
      id: 3,
      title: "UI Engineer",
      company: "Design Systems Inc.",
      matchScore: 85,
      status: "Potential Match",
    },
  ],
}

export default function CandidateDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const router = useRouter()

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => router.push("/dashboard/candidates")} className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Candidates
        </Button>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex items-start">
            <Avatar className="h-16 w-16">
              <AvatarImage src={candidateData.avatar || "/placeholder.svg"} alt={candidateData.name} />
              <AvatarFallback className="bg-teal-light/20 text-teal text-xl">
                {candidateData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <div className="flex items-center flex-wrap gap-2">
                <h1 className="text-2xl font-bold text-gray-900">{candidateData.name}</h1>
                {candidateData.featured && <Badge className="bg-yellow text-dark-text">Featured</Badge>}
                <Badge
                  className={
                    candidateData.status === "Available"
                      ? "bg-green-100 text-green-800"
                      : candidateData.status === "Interviewing"
                        ? "bg-yellow-light/50 text-yellow-dark"
                        : "bg-blue-100 text-blue-800"
                  }
                >
                  {candidateData.status}
                </Badge>
              </div>
              <p className="text-gray-600">{candidateData.title}</p>
              <div className="flex flex-wrap gap-y-2 text-sm text-gray-500 mt-2">
                <div className="flex items-center mr-4">
                  <MapPin className="mr-1 h-4 w-4" />
                  {candidateData.location}
                </div>
                <div className="flex items-center mr-4">
                  <Briefcase className="mr-1 h-4 w-4" />
                  {candidateData.experience}
                </div>
                <div className="flex items-center mr-4">
                  <GraduationCap className="mr-1 h-4 w-4" />
                  {candidateData.education}
                </div>
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  Last active: {candidateData.lastActive}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
            <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
            <Button className="bg-teal text-white hover:bg-teal-dark">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Interview
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="profile">
            <TabsList className="mb-4">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="matches">Job Matches</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                      <p className="text-gray-700">{candidateData.bio}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                      <div className="space-y-3">
                        {candidateData.skills.map((skill, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                              <span className="text-sm text-gray-500">{skill.level}%</span>
                            </div>
                            <Progress
                              value={skill.level}
                              className="h-2"
                              indicatorClassName={
                                skill.level >= 90 ? "bg-green-600" : skill.level >= 80 ? "bg-teal" : "bg-yellow"
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Certifications</h3>
                      <div className="space-y-3">
                        {candidateData.certifications.map((cert, index) => (
                          <div key={index} className="flex items-start border-l-2 border-teal pl-4 py-1">
                            <div>
                              <h4 className="font-medium text-gray-900">{cert.name}</h4>
                              <p className="text-sm text-gray-500">
                                {cert.issuer} • {cert.date}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="experience">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Work Experience</h3>
                      <div className="space-y-6">
                        {candidateData.workHistory.map((job, index) => (
                          <div key={index} className="border-l-2 border-teal pl-4">
                            <h4 className="font-medium text-gray-900">{job.position}</h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {job.company} • {job.duration}
                            </p>
                            <p className="text-gray-700">{job.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Education</h3>
                      <div className="space-y-6">
                        {candidateData.education.map((edu, index) => (
                          <div key={index} className="border-l-2 border-yellow pl-4">
                            <h4 className="font-medium text-gray-900">{edu.degree}</h4>
                            <p className="text-sm text-gray-500 mb-2">
                              {edu.institution} • {edu.duration}
                            </p>
                            <p className="text-gray-700">{edu.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="matches">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Recommended Job Matches</h3>
                    {candidateData.jobMatches.map((job) => (
                      <div
                        key={job.id}
                        className="flex flex-col md:flex-row md:items-center md:justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div>
                          <h4 className="font-medium text-gray-900">{job.title}</h4>
                          <p className="text-sm text-gray-500">{job.company}</p>
                        </div>
                        <div className="mt-4 md:mt-0 flex flex-wrap items-center gap-3">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                job.matchScore >= 90
                                  ? "bg-green-100 text-green-800"
                                  : job.matchScore >= 80
                                    ? "bg-teal-light/20 text-teal"
                                    : "bg-yellow-light/20 text-yellow-dark"
                              }`}
                            >
                              {job.matchScore}%
                            </div>
                            <span className="ml-2 text-sm text-gray-500">Match</span>
                          </div>
                          <Badge
                            className={
                              job.status === "Recommended"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-light/50 text-yellow-dark"
                            }
                          >
                            {job.status}
                          </Badge>
                          <Link href={`/dashboard/jobs/${job.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-teal text-teal hover:bg-teal hover:text-white"
                            >
                              View Job
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 text-center">
                      <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                        Find More Matches
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Notes & Comments</h3>
                    <Button className="bg-teal text-white hover:bg-teal-dark">Add Note</Button>
                  </div>
                  <div className="space-y-4">
                    {candidateData.notes.map((note, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-gray-50">
                        <div className="flex justify-between mb-2">
                          <span className="font-medium text-gray-900">{note.author}</span>
                          <span className="text-sm text-gray-500">{note.date}</span>
                        </div>
                        <p className="text-gray-700">{note.content}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-teal mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{candidateData.email}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-teal mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{candidateData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-5 w-5 text-teal mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Website</p>
                    <p className="font-medium text-gray-900">{candidateData.website}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Candidate Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                    <Star className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Match Score</p>
                    <div className="flex items-center">
                      <p className="font-semibold text-gray-900 mr-2">{candidateData.matchScore}%</p>
                      <Progress value={candidateData.matchScore} className="h-2 w-20" indicatorClassName="bg-teal" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow-light/20 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-yellow" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Resume</p>
                    <p className="font-semibold text-gray-900">
                      <Link href="#" className="text-teal hover:underline">
                        View Resume
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-light/20 flex items-center justify-center mr-3">
                    <Briefcase className="h-5 w-5 text-teal" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-semibold text-gray-900">{candidateData.status}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark">Send Message</Button>
                  <Button variant="outline" className="w-full">
                    Add to Shortlist
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

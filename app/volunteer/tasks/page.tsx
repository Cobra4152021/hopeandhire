"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, User, MapPin, Search, Filter, CheckCircle } from "lucide-react"
import Link from "next/link"

// Mock data for tasks
const mockTasks = [
  {
    id: "1",
    title: "Resume Review",
    type: "Resume",
    status: "Available",
    candidateName: "James Wilson",
    location: "Chicago, IL",
    dueDate: "2023-11-15",
    estimatedTime: "30-45 min",
    description: "Review and provide feedback on a resume for an entry-level warehouse position.",
    skills: ["Resume Writing", "Warehouse Experience"],
  },
  {
    id: "2",
    title: "Mock Interview",
    type: "Interview",
    status: "Available",
    candidateName: "Sarah Johnson",
    location: "Remote",
    dueDate: "2023-11-18",
    estimatedTime: "45-60 min",
    description: "Conduct a mock interview for a customer service position and provide feedback.",
    skills: ["Interview Skills", "Customer Service"],
  },
  {
    id: "3",
    title: "Cover Letter Review",
    type: "Cover Letter",
    status: "Available",
    candidateName: "Michael Brown",
    location: "Atlanta, GA",
    dueDate: "2023-11-20",
    estimatedTime: "20-30 min",
    description: "Review and provide feedback on a cover letter for a construction position.",
    skills: ["Writing", "Construction Industry"],
  },
  {
    id: "4",
    title: "Career Coaching",
    type: "Coaching",
    status: "Available",
    candidateName: "Lisa Garcia",
    location: "Remote",
    dueDate: "2023-11-22",
    estimatedTime: "60 min",
    description: "Provide career guidance and advice for someone transitioning to the healthcare field.",
    skills: ["Career Coaching", "Healthcare Industry"],
  },
  {
    id: "5",
    title: "LinkedIn Profile Review",
    type: "Profile",
    status: "Available",
    candidateName: "David Chen",
    location: "Remote",
    dueDate: "2023-11-25",
    estimatedTime: "30 min",
    description: "Review and provide feedback on a LinkedIn profile for a job seeker in the tech industry.",
    skills: ["LinkedIn", "Social Media", "Tech Industry"],
  },
]

export default function VolunteerTasksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [filteredTasks, setFilteredTasks] = useState(mockTasks)
  const [claimedTasks, setClaimedTasks] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("available")

  const handleSearch = () => {
    const filtered = mockTasks.filter((task) => {
      const matchesSearch =
        searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.candidateName.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesType = typeFilter === "" || task.type === typeFilter

      return matchesSearch && matchesType
    })

    setFilteredTasks(filtered)
  }

  const resetFilters = () => {
    setSearchTerm("")
    setTypeFilter("")
    setFilteredTasks(mockTasks)
  }

  const handleClaimTask = (taskId: string) => {
    setClaimedTasks([...claimedTasks, taskId])
  }

  const handleReleaseTask = (taskId: string) => {
    setClaimedTasks(claimedTasks.filter((id) => id !== taskId))
  }

  const availableTasks = filteredTasks.filter((task) => !claimedTasks.includes(task.id))
  const myTasks = filteredTasks.filter((task) => claimedTasks.includes(task.id))

  return (
    <div className="container py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Volunteer Tasks</h1>

        <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="available">Available Tasks</TabsTrigger>
              <TabsTrigger value="my-tasks">My Tasks ({myTasks.length})</TabsTrigger>
            </TabsList>
            <div className="flex gap-2">
              <Link href="/volunteer/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
              <Link href="/volunteer/profile">
                <Button>My Profile</Button>
              </Link>
            </div>
          </div>

          <TabsContent value="available">
            {/* Search and filters */}
            <div className="bg-muted/30 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search tasks"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Task Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Resume">Resume Review</SelectItem>
                    <SelectItem value="Cover Letter">Cover Letter</SelectItem>
                    <SelectItem value="Interview">Mock Interview</SelectItem>
                    <SelectItem value="Coaching">Career Coaching</SelectItem>
                    <SelectItem value="Profile">Profile Review</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button onClick={handleSearch} className="flex-1">
                    <Search className="mr-2 h-4 w-4" /> Search
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    <Filter className="mr-2 h-4 w-4" /> Reset
                  </Button>
                </div>
              </div>
            </div>

            {/* Task listings */}
            <div className="space-y-6">
              {availableTasks.length > 0 ? (
                availableTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{task.title}</CardTitle>
                        <Badge>{task.type}</Badge>
                      </div>
                      <CardDescription>
                        <div className="flex flex-wrap gap-4 text-sm mt-2">
                          <div className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            {task.candidateName}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {task.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {task.estimatedTime}
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{task.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {task.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href={`/volunteer/tasks/${task.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                      <Button onClick={() => handleClaimTask(task.id)}>Claim Task</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">No tasks found</h3>
                  <p className="text-muted-foreground">Try adjusting your search filters</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="my-tasks">
            <div className="space-y-6">
              {myTasks.length > 0 ? (
                myTasks.map((task) => (
                  <Card key={task.id} className="overflow-hidden hover:shadow-md transition-shadow border-primary/20">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{task.title}</CardTitle>
                        <Badge variant="outline" className="bg-primary/10">
                          <CheckCircle className="mr-1 h-4 w-4" /> Claimed
                        </Badge>
                      </div>
                      <CardDescription>
                        <div className="flex flex-wrap gap-4 text-sm mt-2">
                          <div className="flex items-center">
                            <User className="mr-1 h-4 w-4" />
                            {task.candidateName}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="mr-1 h-4 w-4" />
                            {task.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-4 w-4" />
                            {task.estimatedTime}
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{task.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {task.skills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => handleReleaseTask(task.id)}>
                        Release Task
                      </Button>
                      <Link href={`/volunteer/tasks/${task.id}/complete`}>
                        <Button>Complete Task</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium mb-2">You haven't claimed any tasks yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Browse available tasks and claim ones that match your skills and interests.
                  </p>
                  <Button onClick={() => setActiveTab("available")}>Browse Tasks</Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

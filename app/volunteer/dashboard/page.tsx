"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, Users, Briefcase, Calendar, ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function VolunteerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard
  const stats = [
    {
      title: "Total Candidates",
      value: "24",
      change: "+12%",
      icon: <Users className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Active Jobs",
      value: "42",
      change: "+8%",
      icon: <Briefcase className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Successful Matches",
      value: "18",
      change: "+16%",
      icon: <Activity className="h-4 w-4 text-muted-foreground" />,
    },
    {
      title: "Upcoming Interviews",
      value: "7",
      change: "+3%",
      icon: <Calendar className="h-4 w-4 text-muted-foreground" />,
    },
  ]

  const recentActivity = [
    {
      id: 1,
      action: "New candidate profile created",
      time: "2 hours ago",
    },
    {
      id: 2,
      action: "Matched John Doe with TechCorp",
      time: "Yesterday",
    },
    {
      id: 3,
      action: "Interview scheduled for Sarah with BuildRight Construction",
      time: "2 days ago",
    },
    {
      id: 4,
      action: "New job posting from GreenLeaf Landscaping",
      time: "3 days ago",
    },
  ]

  const upcomingTasks = [
    {
      id: 1,
      task: "Review new candidate profiles",
      due: "Today",
    },
    {
      id: 2,
      task: "Follow up on interview feedback",
      due: "Tomorrow",
    },
    {
      id: 3,
      task: "Update candidate skills database",
      due: "This week",
    },
  ]

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Link
            href="/volunteer/dashboard/match"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Match Candidates
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  {stat.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Matches</CardTitle>
                <CardDescription>Your recent candidate-employer matches</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">John Doe → TechCorp</p>
                      <p className="text-sm text-muted-foreground">Software Developer Position</p>
                    </div>
                    <div className="ml-auto font-medium">Yesterday</div>
                  </div>
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Sarah Johnson → BuildRight Construction</p>
                      <p className="text-sm text-muted-foreground">Administrative Assistant</p>
                    </div>
                    <div className="ml-auto font-medium">2 days ago</div>
                  </div>
                  <div className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Michael Smith → GreenLeaf Landscaping</p>
                      <p className="text-sm text-muted-foreground">Landscape Technician</p>
                    </div>
                    <div className="ml-auto font-medium">Last week</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Access important sections quickly</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Link
                  href="/volunteer/dashboard/candidates"
                  className="flex items-center p-3 text-sm rounded-lg hover:bg-muted"
                >
                  <Users className="mr-2 h-4 w-4" />
                  <span>Manage Candidates</span>
                </Link>
                <Link
                  href="/volunteer/dashboard/jobs"
                  className="flex items-center p-3 text-sm rounded-lg hover:bg-muted"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <span>Browse Jobs</span>
                </Link>
                <Link
                  href="/volunteer/dashboard/companies"
                  className="flex items-center p-3 text-sm rounded-lg hover:bg-muted"
                >
                  <Activity className="mr-2 h-4 w-4" />
                  <span>View Companies</span>
                </Link>
                <Link
                  href="/volunteer/dashboard/match"
                  className="flex items-center p-3 text-sm rounded-lg hover:bg-muted"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>Match Candidates</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.action}</p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">{item.time}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {upcomingTasks.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">{item.task}</p>
                    </div>
                    <div className="ml-auto font-medium text-sm text-muted-foreground">Due: {item.due}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

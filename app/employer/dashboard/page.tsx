"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  BarChart3,
  BriefcaseBusiness,
  FileText,
  MailOpen,
  Plus,
  Users,
  UserCheck,
  Clock,
  Building2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

export default function EmployerDashboard() {
  const [supabase, setSupabase] = useState<any>(null)
  const [dashboardData, setDashboardData] = useState({
    activeJobs: 0,
    totalApplications: 0,
    newApplications: 0,
    totalCandidates: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          setDashboardData({
            activeJobs: 3,
            totalApplications: 27,
            newApplications: 5,
            totalCandidates: 18,
          })
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing dashboard:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  // Recent activities - this would come from the database in a real app
  const recentActivities = [
    {
      id: 1,
      type: "application",
      title: "New application for Senior Developer",
      time: "2 hours ago",
      icon: MailOpen,
    },
    {
      id: 2,
      type: "job",
      title: "Job posting 'Marketing Specialist' expires soon",
      time: "1 day ago",
      icon: Clock,
    },
    {
      id: 3,
      type: "candidate",
      title: "John Doe accepted your interview invitation",
      time: "2 days ago",
      icon: UserCheck,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <Button asChild>
          <Link href="/employer/dashboard/jobs/create">
            <Plus className="mr-2 h-4 w-4" /> Post a Job
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
            <Skeleton className="h-32" />
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Active Job Postings</CardTitle>
                <BriefcaseBusiness className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.activeJobs}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.activeJobs > 0 ? "Currently active jobs" : "No active jobs"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalApplications}</div>
                <p className="text-xs text-muted-foreground">
                  {dashboardData.newApplications > 0
                    ? `${dashboardData.newApplications} new in the last week`
                    : "No new applications"}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Candidates</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData.totalCandidates}</div>
                <p className="text-xs text-muted-foreground">Total candidates in your pipeline</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Application Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardData.activeJobs > 0
                    ? `${(dashboardData.totalApplications / dashboardData.activeJobs).toFixed(1)}`
                    : "0"}
                </div>
                <p className="text-xs text-muted-foreground">Average applications per job</p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Activity and Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
                <Skeleton className="h-12" />
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <activity.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
                {recentActivities.length === 0 && <p className="text-sm text-muted-foreground">No recent activities</p>}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/employer/dashboard/jobs/create">
                <Plus className="mr-2 h-4 w-4" /> Post a New Job
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/employer/dashboard/applications">
                <FileText className="mr-2 h-4 w-4" /> Review Applications
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/employer/dashboard/company">
                <Building2 className="mr-2 h-4 w-4" /> Update Company Profile
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/employer/dashboard/analytics">
                <BarChart3 className="mr-2 h-4 w-4" /> View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

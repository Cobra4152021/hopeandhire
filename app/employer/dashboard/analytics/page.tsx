"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

export default function AnalyticsPage() {
  const [supabase, setSupabase] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState("30days")

  // Sample data - in a real app, this would come from the database
  const [applicationData, setApplicationData] = useState<any[]>([])
  const [jobPerformanceData, setJobPerformanceData] = useState<any[]>([])
  const [statusData, setStatusData] = useState<any[]>([])
  const [sourceData, setSourceData] = useState<any[]>([])

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { createClientSupabaseClient } = await import("@/lib/supabase")
        const supabaseClient = createClientSupabaseClient()
        setSupabase(supabaseClient)

        // In a real app, we would fetch actual data from Supabase
        // For now, we'll simulate loading and then set some sample data
        setTimeout(() => {
          // Application trend data
          setApplicationData([
            { name: "Week 1", applications: 12 },
            { name: "Week 2", applications: 19 },
            { name: "Week 3", applications: 15 },
            { name: "Week 4", applications: 27 },
            { name: "Week 5", applications: 32 },
            { name: "Week 6", applications: 24 },
            { name: "Week 7", applications: 29 },
            { name: "Week 8", applications: 35 },
          ])

          // Job performance data
          setJobPerformanceData([
            { name: "Senior Software Developer", applications: 20, views: 150 },
            { name: "Marketing Specialist", applications: 15, views: 120 },
            { name: "Customer Support", applications: 7, views: 80 },
            { name: "UX Designer", applications: 0, views: 45 },
            { name: "Data Analyst", applications: 15, views: 110 },
          ])

          // Application status data
          setStatusData([
            { name: "New", value: 12, color: "#3b82f6" },
            { name: "Reviewing", value: 8, color: "#eab308" },
            { name: "Interviewed", value: 5, color: "#8b5cf6" },
            { name: "Offered", value: 3, color: "#22c55e" },
            { name: "Rejected", value: 7, color: "#6b7280" },
          ])

          // Application source data
          setSourceData([
            { name: "Company Website", value: 15, color: "#3b82f6" },
            { name: "Job Boards", value: 25, color: "#8b5cf6" },
            { name: "Referrals", value: 10, color: "#22c55e" },
            { name: "Social Media", value: 5, color: "#eab308" },
            { name: "Other", value: 3, color: "#6b7280" },
          ])

          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error initializing analytics page:", error)
        setLoading(false)
      }
    }

    initializeSupabase()
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your job postings and application performance</p>
      </div>

      <Tabs value={timeframe} onValueChange={setTimeframe}>
        <TabsList>
          <TabsTrigger value="7days">Last 7 Days</TabsTrigger>
          <TabsTrigger value="30days">Last 30 Days</TabsTrigger>
          <TabsTrigger value="90days">Last 90 Days</TabsTrigger>
          <TabsTrigger value="alltime">All Time</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading ? (
        <div className="space-y-6">
          <Skeleton className="h-[300px] w-full" />
          <div className="grid gap-6 md:grid-cols-2">
            <Skeleton className="h-[300px]" />
            <Skeleton className="h-[300px]" />
          </div>
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Application Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Application Trend</CardTitle>
              <CardDescription>Number of applications received over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={applicationData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="applications" stroke="#3b82f6" activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Job Performance and Application Status */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Job Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Job Performance</CardTitle>
                <CardDescription>Applications vs. views by job posting</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={jobPerformanceData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="views" fill="#8b5cf6" name="Views" />
                      <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Application Status Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>Breakdown of applications by status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name) => [value, name]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Source Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Application Sources</CardTitle>
              <CardDescription>Where your applications are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sourceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [value, name]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

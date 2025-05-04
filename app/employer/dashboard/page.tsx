import Link from "next/link"
import { createServerClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { EmployerDashboardHeader } from "@/components/employer-dashboard-header"
import { EmployerDashboardSidebar } from "@/components/employer-dashboard-sidebar"

export default async function EmployerDashboard() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get company profile
  const { data: company } = await supabase.from("companies").select("*").eq("user_id", user?.id).single()

  // Get job listings
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .eq("company_id", company?.id || "")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen">
      <EmployerDashboardSidebar />
      <div className="flex-1">
        <EmployerDashboardHeader />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Employer Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Job Listings</CardTitle>
                <CardDescription>Manage your job postings</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{jobs?.length || 0}</p>
                <div className="mt-4">
                  <Link href="/employer/dashboard/jobs">
                    <Button variant="outline" className="w-full">
                      View Jobs
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Review candidate applications</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
                <div className="mt-4">
                  <Link href="/employer/dashboard/applications">
                    <Button variant="outline" className="w-full">
                      View Applications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Company Profile</CardTitle>
                <CardDescription>Manage your company information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{company ? "Complete" : "Incomplete"}</p>
                <div className="mt-4">
                  <Link href="/employer/dashboard/profile">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4">
                <Link href="/employer/dashboard/jobs/create">
                  <Button>Post a New Job</Button>
                </Link>
                <Link href="/employer/dashboard/profile">
                  <Button variant="outline">Update Company Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}

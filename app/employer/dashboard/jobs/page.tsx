import Link from "next/link"
import { createServerClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployerDashboardHeader } from "@/components/employer-dashboard-header"
import { EmployerDashboardSidebar } from "@/components/employer-dashboard-sidebar"
import { JobsTable } from "@/components/jobs-table"

export default async function JobsPage() {
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Job Listings</h1>
            <Link href="/employer/dashboard/jobs/create">
              <Button>Post a New Job</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Job Listings</CardTitle>
            </CardHeader>
            <CardContent>
              {jobs && jobs.length > 0 ? (
                <JobsTable jobs={jobs} />
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You haven't posted any jobs yet</p>
                  <Link href="/employer/dashboard/jobs/create">
                    <Button>Post Your First Job</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

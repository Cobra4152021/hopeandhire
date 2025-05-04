import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployerDashboardHeader } from "@/components/employer-dashboard-header"
import { EmployerDashboardSidebar } from "@/components/employer-dashboard-sidebar"
import { JobForm } from "@/components/job-form"

export default async function CreateJobPage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?next=/employer/dashboard/jobs/create")
  }

  // Get company profile
  const { data: company } = await supabase.from("companies").select("*").eq("user_id", user.id).single()

  if (!company) {
    redirect("/employer/dashboard/profile?message=Please complete your company profile first")
  }

  return (
    <div className="flex min-h-screen">
      <EmployerDashboardSidebar />
      <div className="flex-1">
        <EmployerDashboardHeader />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>

          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
              <CardDescription>Fill out the form below to create a new job listing</CardDescription>
            </CardHeader>
            <CardContent>
              <JobForm companyId={company.id} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

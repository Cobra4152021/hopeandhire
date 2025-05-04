import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmployerDashboardHeader } from "@/components/employer-dashboard-header"
import { EmployerDashboardSidebar } from "@/components/employer-dashboard-sidebar"
import { CompanyProfileForm } from "@/components/company-profile-form"

export default async function CompanyProfilePage() {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?next=/employer/dashboard/profile")
  }

  // Get company profile
  const { data: company } = await supabase.from("companies").select("*").eq("user_id", user.id).single()

  return (
    <div className="flex min-h-screen">
      <EmployerDashboardSidebar />
      <div className="flex-1">
        <EmployerDashboardHeader />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">Company Profile</h1>

          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Update your company details to attract the right candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <CompanyProfileForm initialData={company} userId={user.id} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

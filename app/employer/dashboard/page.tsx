import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function EmployerDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-muted-foreground">Manage your job listings and applicants</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Job Listings</CardTitle>
            <CardDescription>Manage your active job listings</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have 0 active job listings.</p>
            <Button asChild>
              <Link href="/employer/dashboard/jobs">View Jobs</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
            <CardDescription>Review job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have 0 pending applications.</p>
            <Button asChild>
              <Link href="/employer/dashboard/applicants">View Applicants</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Company Profile</CardTitle>
            <CardDescription>Update your company information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Complete your profile to attract more applicants.</p>
            <Button asChild>
              <Link href="/employer/dashboard/profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Authentication Test</CardTitle>
            <CardDescription>Test the authentication system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Test Supabase authentication functionality.</p>
            <Button asChild>
              <Link href="/employer/dashboard/test-auth">Test Auth</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

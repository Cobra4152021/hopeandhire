import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Briefcase, Calendar, MessageSquare, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">Welcome back! Here's an overview of your activities and impact.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-teal text-white hover:bg-teal-dark">View All Activities</Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-teal-light/20 mr-4">
                <Users className="h-6 w-6 text-teal" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Candidates</p>
                <p className="text-2xl font-bold text-gray-900">128</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-light/20 mr-4">
                <Briefcase className="h-6 w-6 text-yellow" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Jobs</p>
                <p className="text-2xl font-bold text-gray-900">42</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-teal-light/20 mr-4">
                <Calendar className="h-6 w-6 text-teal" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Appointments</p>
                <p className="text-2xl font-bold text-gray-900">15</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 rounded-full bg-yellow-light/20 mr-4">
                <MessageSquare className="h-6 w-6 text-yellow" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Messages</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Upcoming */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-teal pl-4 py-2">
                <p className="text-sm text-gray-500">Today at 10:30 AM</p>
                <p className="font-medium">Resume review completed for James Wilson</p>
              </div>
              <div className="border-l-4 border-yellow pl-4 py-2">
                <p className="text-sm text-gray-500">Yesterday at 2:15 PM</p>
                <p className="font-medium">Mock interview conducted with Maria Garcia</p>
              </div>
              <div className="border-l-4 border-teal pl-4 py-2">
                <p className="text-sm text-gray-500">Yesterday at 11:00 AM</p>
                <p className="font-medium">New job posting: Software Developer at TechCorp</p>
              </div>
              <div className="border-l-4 border-yellow pl-4 py-2">
                <p className="text-sm text-gray-500">May 3, 2023</p>
                <p className="font-medium">Career counseling session with Robert Johnson</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/dashboard/activity"
                className="text-teal hover:text-teal-dark text-sm font-medium flex items-center"
              >
                View all activity
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>Your scheduled meetings and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-teal-light/10 rounded-lg">
                <div>
                  <p className="font-medium">Resume Review: David Lee</p>
                  <p className="text-sm text-gray-500">Tomorrow, 10:00 AM - 10:30 AM</p>
                </div>
                <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
                  Join
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-yellow-light/10 rounded-lg">
                <div>
                  <p className="font-medium">Mock Interview: Sarah Thompson</p>
                  <p className="text-sm text-gray-500">May 8, 2023, 2:00 PM - 3:00 PM</p>
                </div>
                <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
                  Join
                </Button>
              </div>

              <div className="flex justify-between items-center p-3 bg-teal-light/10 rounded-lg">
                <div>
                  <p className="font-medium">Employer Meeting: TechCorp</p>
                  <p className="text-sm text-gray-500">May 10, 2023, 11:00 AM - 12:00 PM</p>
                </div>
                <Button variant="outline" size="sm" className="border-teal text-teal hover:bg-teal hover:text-white">
                  Join
                </Button>
              </div>
            </div>
            <div className="mt-4">
              <Link
                href="/dashboard/schedule"
                className="text-teal hover:text-teal-dark text-sm font-medium flex items-center"
              >
                View full schedule
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

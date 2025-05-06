import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Calendar, FileText, MessageSquare, Users, Award, CheckCircle2, Clock } from "lucide-react"

export const metadata = {
  title: "Volunteer Opportunities | HopeAndHire",
  description:
    "Make a difference as a volunteer recruiter by helping formerly incarcerated individuals find meaningful employment.",
  keywords: "volunteer recruiter, second chance hiring, job placement, resume review, interview coaching",
}

export default function VolunteerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden bg-[#f8faf9]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-4 py-1 rounded-full bg-[#e6f7f5] text-[#26a69a] text-sm">
                  Make a meaningful impact
                </span>
                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  Share your recruiting expertise
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight text-gray-800">
                Volunteer as a <span className="text-[#26a69a]">Recruiter</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Use your recruiting skills to help formerly incarcerated individuals find meaningful employment and
                rebuild their lives.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                  <Link href="/volunteer/register">Become a Volunteer</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#26a69a] text-[#26a69a] hover:bg-[#e6f7f5]"
                  asChild
                >
                  <Link href="/volunteer/login">Volunteer Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">How You Can Help</h2>
              <p className="text-gray-600 mt-4">
                As a volunteer recruiter, you'll play a crucial role in connecting job seekers with employment
                opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-gray-800">Resume Review</CardTitle>
                  <CardDescription className="text-gray-600">
                    Help job seekers create professional resumes that highlight their skills and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Review and provide feedback on resumes, helping job seekers present themselves effectively to
                    potential employers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-gray-800">Job Matching</CardTitle>
                  <CardDescription className="text-gray-600">
                    Match job seekers with appropriate employment opportunities based on their skills and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Use your recruiting expertise to identify suitable job openings and connect candidates with
                    employers open to second-chance hiring.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-gray-800">Interview Coaching</CardTitle>
                  <CardDescription className="text-gray-600">
                    Prepare job seekers for interviews through mock sessions and feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Conduct practice interviews, provide constructive feedback, and help candidates develop confidence
                    in their interview skills.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f8faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Volunteer Dashboard</h2>
              <p className="text-gray-600 mt-4">
                Our volunteer dashboard provides all the tools you need to make a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800">Job Seeker Profiles</CardTitle>
                  <CardDescription className="text-gray-600">
                    Access detailed profiles of job seekers to understand their skills and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">View work history and skills</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">Access education and certifications</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">Review career goals and preferences</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">Filter by skills and location</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#26a69a] text-[#26a69a] hover:bg-[#e6f7f5]"
                    asChild
                  >
                    <Link href="/volunteer/login">View Sample Profile</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-gray-800">Job Listings</CardTitle>
                  <CardDescription className="text-gray-600">
                    Browse available job opportunities from second-chance employers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">Filter by industry and location</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">Match jobs to candidate skills</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">View employer requirements</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span className="text-gray-600">Recommend candidates for positions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="outline"
                    className="w-full border-[#26a69a] text-[#26a69a] hover:bg-[#e6f7f5]"
                    asChild
                  >
                    <Link href="/volunteer/login">View Sample Listings</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Appointment Calendar</h2>
              <p className="text-gray-600 mt-4">
                Schedule and manage appointments with job seekers for resume reviews, mock interviews, and career
                coaching.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Calendar className="h-12 w-12 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-center text-gray-800">Flexible Scheduling System</CardTitle>
                  <CardDescription className="text-center text-gray-600">
                    Our calendar system makes it easy to schedule and manage appointments with job seekers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">For Volunteers</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Set your availability</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Receive appointment notifications</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Manage your volunteer schedule</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Track your volunteer hours</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">For Job Seekers</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Book appointments with volunteers</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Receive reminders for upcoming sessions</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Reschedule if needed</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                          <span className="text-gray-600">Provide feedback after sessions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                    <Link href="/volunteer/register">Become a Volunteer</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#f8faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Volunteer Recognition</h2>
              <p className="text-gray-600 mt-4">We celebrate the dedication and impact of our volunteer recruiters.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="border-t-4 border-t-[#26a69a] border-r-0 border-l-0 border-b-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <Award className="h-6 w-6 text-[#26a69a]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Achievement Badges</h3>
                      <p className="text-sm text-gray-500">Earn recognition for your impact</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Earn digital badges for milestones like completing 10 resume reviews or helping 5 job seekers secure
                    employment.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="bg-[#e6f7f5] p-2 rounded-full">
                      <CheckCircle2 className="h-5 w-5 text-[#26a69a]" />
                    </div>
                    <div className="bg-[#e6f7f5] p-2 rounded-full">
                      <Clock className="h-5 w-5 text-[#26a69a]" />
                    </div>
                    <div className="bg-[#e6f7f5] p-2 rounded-full">
                      <Users className="h-5 w-5 text-[#26a69a]" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-[#f2b01e] border-r-0 border-l-0 border-b-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#fff8e1] p-3 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <Users className="h-6 w-6 text-[#f2b01e]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Volunteer Spotlight</h3>
                      <p className="text-sm text-gray-500">Featured volunteer stories</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Each month, we highlight a volunteer who has gone above and beyond in helping job seekers find
                    meaningful employment.
                  </p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gray-200 mr-2"></div>
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">Sarah Johnson</p>
                      <p className="text-gray-500">April Volunteer of the Month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-[#26a69a] border-r-0 border-l-0 border-b-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mr-3">
                      <Calendar className="h-6 w-6 text-[#26a69a]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Impact Tracking</h3>
                      <p className="text-sm text-gray-500">Measure your contribution</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Track the tangible impact of your volunteer work, including resumes reviewed, interviews conducted,
                    and job placements made.
                  </p>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Resumes Reviewed</span>
                      <span className="font-medium text-gray-800">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Mock Interviews</span>
                      <span className="font-medium text-gray-800">12</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Job Placements</span>
                      <span className="font-medium text-gray-800">8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[#26a69a] text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8">
                Join our community of volunteer recruiters and help change lives through meaningful employment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-white text-[#26a69a] hover:bg-gray-100" asChild>
                  <Link href="/volunteer/register">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-[#1e8e82]" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

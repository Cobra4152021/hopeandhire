import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Calendar, FileText, MessageSquare, Users } from "lucide-react"

export default function VolunteerPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Make a Difference as a Volunteer Recruiter
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                Use your recruiting skills to help formerly incarcerated individuals find meaningful employment and
                rebuild their lives.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/volunteer/register">Become a Volunteer</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <Link href="/volunteer/login">Volunteer Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">How You Can Help</h2>
              <p className="text-muted-foreground mt-4">
                As a volunteer recruiter, you'll play a crucial role in connecting job seekers with employment
                opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Resume Review</CardTitle>
                  <CardDescription>
                    Help job seekers create professional resumes that highlight their skills and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Review and provide feedback on resumes, helping job seekers present themselves effectively to
                    potential employers.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Job Matching</CardTitle>
                  <CardDescription>
                    Match job seekers with appropriate employment opportunities based on their skills and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Use your recruiting expertise to identify suitable job openings and connect candidates with
                    employers open to second-chance hiring.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Interview Coaching</CardTitle>
                  <CardDescription>
                    Prepare job seekers for interviews through mock sessions and feedback.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Conduct practice interviews, provide constructive feedback, and help candidates develop confidence
                    in their interview skills.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">Volunteer Dashboard</h2>
              <p className="text-muted-foreground mt-4">
                Our volunteer dashboard provides all the tools you need to make a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Job Seeker Profiles</CardTitle>
                  <CardDescription>
                    Access detailed profiles of job seekers to understand their skills and experience.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>View work history and skills</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Access education and certifications</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Review career goals and preferences</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Filter by skills and location</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/volunteer/login">View Sample Profile</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Listings</CardTitle>
                  <CardDescription>Browse available job opportunities from second-chance employers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Filter by industry and location</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Match jobs to candidate skills</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>View employer requirements</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Recommend candidates for positions</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/volunteer/login">View Sample Listings</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">Appointment Calendar</h2>
              <p className="text-muted-foreground mt-4">
                Schedule and manage appointments with job seekers for resume reviews, mock interviews, and career
                coaching.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                    <Calendar className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-center">Flexible Scheduling System</CardTitle>
                  <CardDescription className="text-center">
                    Our calendar system makes it easy to schedule and manage appointments with job seekers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-2">For Volunteers</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Set your availability</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Receive appointment notifications</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Manage your volunteer schedule</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Track your volunteer hours</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-medium mb-2">For Job Seekers</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Book appointments with volunteers</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Receive reminders for upcoming sessions</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Reschedule if needed</span>
                        </li>
                        <li className="flex items-center">
                          <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                          <span>Provide feedback after sessions</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="/volunteer/register">Become a Volunteer</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8">
                Join our community of volunteer recruiters and help change lives through meaningful employment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/volunteer/register">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
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

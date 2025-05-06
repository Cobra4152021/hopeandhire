import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Award, Calendar, FileText, HandHelping, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                Empowering Second Chances Through Meaningful Employment
              </h1>
              <p className="text-xl max-w-2xl mx-auto">
                HopeAndHire connects formerly incarcerated individuals with career mentors, recruiters, and
                second-chance employers to create pathways to stable employment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/volunteer/register">Become a Volunteer</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent" asChild>
                  <Link href="/employer/register">For Employers</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">How HopeAndHire Works</h2>
              <p className="text-muted-foreground mt-4">
                Our platform connects job seekers, volunteers, and employers to create meaningful employment
                opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>For Organizations</CardTitle>
                  <CardDescription>
                    Nonprofits and case managers submit requests for job seekers needing support.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Submit requests for resume reviews</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Schedule mock interviews</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Request job placement assistance</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Track client progress in real-time</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <HandHelping className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>For Volunteers</CardTitle>
                  <CardDescription>
                    Recruiters and HR professionals volunteer their expertise to help job seekers.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Review and improve resumes</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Conduct mock interviews</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Provide career coaching</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Match candidates with job opportunities</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>For Employers</CardTitle>
                  <CardDescription>
                    Companies committed to second-chance hiring post jobs and find qualified candidates.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Post job opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Access pre-screened candidates</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Receive tax incentive guidance</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-primary" />
                      <span>Support community reintegration</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">Our Impact</h2>
              <p className="text-muted-foreground mt-4">
                Together, we're creating pathways to employment and reducing recidivism.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">200+</p>
                <p className="text-muted-foreground">Job Seekers Supported</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">50+</p>
                <p className="text-muted-foreground">Volunteer Recruiters</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">75+</p>
                <p className="text-muted-foreground">Job Placements</p>
              </div>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-primary">25+</p>
                <p className="text-muted-foreground">Employer Partners</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">Key Features</h2>
              <p className="text-muted-foreground mt-4">
                Our platform provides all the tools needed to support successful employment transitions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <FileText className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Resume Assistance</h3>
                <p className="text-muted-foreground">
                  Professional resume reviews and improvements to help job seekers stand out.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Mock Interviews</h3>
                <p className="text-muted-foreground">
                  Practice interviews with feedback to build confidence and skills.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Calendar className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Appointment Scheduling</h3>
                <p className="text-muted-foreground">
                  Easy-to-use calendar system for booking sessions with volunteer recruiters.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Award className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Job Matching</h3>
                <p className="text-muted-foreground">
                  Intelligent matching of job seekers with appropriate employment opportunities.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <HandHelping className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Career Coaching</h3>
                <p className="text-muted-foreground">
                  Personalized guidance on career paths, skill development, and job search strategies.
                </p>
              </div>

              <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-card">
                <Users className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">Employer Resources</h3>
                <p className="text-muted-foreground">
                  Tools and guidance for companies interested in second-chance hiring.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold">Success Stories</h2>
              <p className="mt-4 opacity-90">Hear from those who have experienced the impact of HopeAndHire.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-primary-foreground text-foreground">
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "After my release, finding work seemed impossible. HopeAndHire connected me with a recruiter who
                    helped polish my resume and prepare for interviews. I'm now employed full-time in construction and
                    rebuilding my life."
                  </p>
                  <div>
                    <p className="font-semibold">Michael J.</p>
                    <p className="text-sm text-muted-foreground">Job Seeker</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground text-foreground">
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "Volunteering with HopeAndHire has been incredibly rewarding. Using my recruiting skills to help
                    people get back on their feet has made a tangible difference in my community."
                  </p>
                  <div>
                    <p className="font-semibold">Sarah W.</p>
                    <p className="text-sm text-muted-foreground">Volunteer Recruiter</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary-foreground text-foreground">
                <CardContent className="pt-6">
                  <p className="italic mb-4">
                    "As an employer, we've found some of our most dedicated team members through HopeAndHire. The
                    candidates come prepared and motivated, and the tax incentives are an added bonus."
                  </p>
                  <div>
                    <p className="font-semibold">David R.</p>
                    <p className="text-sm text-muted-foreground">Employer Partner</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8">
                Join our community and help create pathways to employment for those who need a second chance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/volunteer/register">Become a Volunteer</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/employer/register">Hire Talent</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/about">Learn More</Link>
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

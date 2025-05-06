import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { ArrowRight, Award, BadgeCheck, Building, FileCheck, HandHelping, Users } from "lucide-react"

export const metadata = {
  title: "For Employers | HopeAndHire",
  description:
    "Partner with HopeAndHire to hire qualified, pre-screened candidates and support second-chance employment opportunities.",
  keywords: "second chance hiring, employer partnership, job placement, workforce readiness, tax incentives",
}

export default function EmployerPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-[#f8faf9]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-800">
                Hire Qualified Candidates with <span className="text-[#f2b01e]">Purpose</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Partner with HopeAndHire to access pre-screened, job-ready candidates while supporting second-chance
                employment opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                  <Link href="/employer/register">Become an Employer Partner</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#26a69a] text-[#26a69a] hover:bg-[#e6f7f5]"
                  asChild
                >
                  <Link href="/employer/login">Employer Login</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Benefits of Second-Chance Hiring</h2>
              <p className="text-gray-600 mt-4">
                Discover how hiring formerly incarcerated individuals can benefit your business and community.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Dedicated Workforce</h3>
                  <p className="text-gray-600 mb-4">
                    Second-chance hires often demonstrate higher loyalty and lower turnover rates than traditional
                    hires.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Higher retention rates</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Increased employee loyalty</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Strong work ethic</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Tax Incentives</h3>
                  <p className="text-gray-600 mb-4">
                    Take advantage of federal and state tax incentives designed to encourage second-chance hiring.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Work Opportunity Tax Credit (WOTC)</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Federal Bonding Program</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>State-specific incentives</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <HandHelping className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">Community Impact</h3>
                  <p className="text-gray-600 mb-4">
                    Make a positive impact on your community by reducing recidivism and supporting reintegration.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Strengthen local communities</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Enhance corporate social responsibility</span>
                    </li>
                    <li className="flex items-center">
                      <ArrowRight className="h-4 w-4 mr-2 text-[#26a69a]" />
                      <span>Reduce public assistance costs</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-[#f8faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
              <p className="text-gray-600 mt-4">
                Our streamlined process makes it easy to find qualified candidates for your open positions.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <Card className="border-0 shadow-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-xl">Register</CardTitle>
                  <CardDescription>Create your employer account</CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-2">
                  <p className="text-gray-600">
                    Sign up as an employer partner and complete your company profile with details about your business
                    and hiring needs.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <FileCheck className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-xl">Post Jobs</CardTitle>
                  <CardDescription>List your open positions</CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-2">
                  <p className="text-gray-600">
                    Create detailed job listings with requirements, responsibilities, and qualifications for each open
                    position.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-xl">Review Candidates</CardTitle>
                  <CardDescription>Evaluate pre-screened applicants</CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-2">
                  <p className="text-gray-600">
                    Browse profiles of job-ready candidates who have been pre-screened and matched to your positions by
                    our volunteer recruiters.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardHeader className="text-center pb-2">
                  <div className="mx-auto bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <BadgeCheck className="h-6 w-6 text-[#26a69a]" />
                  </div>
                  <CardTitle className="text-xl">Hire</CardTitle>
                  <CardDescription>Onboard qualified talent</CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-2">
                  <p className="text-gray-600">
                    Interview candidates, make hiring decisions, and receive ongoing support from our team throughout
                    the onboarding process.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Employer Success Stories</h2>
              <p className="text-gray-600 mt-4">
                Hear from businesses that have partnered with HopeAndHire to find dedicated employees.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#e6f7f5] p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <Building className="h-5 w-5 text-[#26a69a]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Bay Area Construction</h3>
                      <p className="text-sm text-gray-500">General Contractor</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "We've hired five employees through HopeAndHire, and they've been some of our most dedicated team
                    members. The pre-screening process ensures we get candidates who are truly ready to work."
                  </p>
                  <p className="font-medium text-gray-800">Michael Torres</p>
                  <p className="text-sm text-gray-500">HR Director</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#e6f7f5] p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <Building className="h-5 w-5 text-[#26a69a]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Green Valley Logistics</h3>
                      <p className="text-sm text-gray-500">Warehouse & Distribution</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "The tax incentives alone made partnering with HopeAndHire worthwhile, but the quality of candidates
                    has been the real benefit. Our retention rates have improved significantly."
                  </p>
                  <p className="font-medium text-gray-800">Jennifer Lee</p>
                  <p className="text-sm text-gray-500">Operations Manager</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="bg-[#e6f7f5] p-2 rounded-full w-10 h-10 flex items-center justify-center mr-3">
                      <Building className="h-5 w-5 text-[#26a69a]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Fresh Start Cafe</h3>
                      <p className="text-sm text-gray-500">Food Service</p>
                    </div>
                  </div>
                  <p className="italic text-gray-600 mb-4">
                    "As a small business, we were hesitant at first, but HopeAndHire made the process simple. Our
                    kitchen staff hired through the program has shown incredible work ethic and gratitude."
                  </p>
                  <p className="font-medium text-gray-800">David Rodriguez</p>
                  <p className="text-sm text-gray-500">Owner</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-[#f8faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8 text-gray-600">
                Join our network of employer partners and gain access to qualified, motivated candidates while making a
                positive impact on your community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                  <Link href="/employer/register">Become an Employer Partner</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#26a69a] text-[#26a69a] hover:bg-[#e6f7f5]"
                  asChild
                >
                  <Link href="/contact">Contact Our Team</Link>
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

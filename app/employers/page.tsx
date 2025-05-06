import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Briefcase, Users, Award, BarChart } from "lucide-react"

export default function EmployersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-yellow-light/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-text">Find Qualified, Motivated Talent</h1>
              <p className="text-lg mb-8 text-gray-600">
                Connect with pre-screened candidates who are ready to contribute to your organization's success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/employers/register">
                  <Button className="bg-yellow text-dark-text hover:bg-yellow-dark">Hire Job-Ready Candidates</Button>
                </Link>
                <Link href="/employers/login">
                  <Button variant="outline" className="border-yellow text-yellow hover:bg-yellow hover:text-dark-text">
                    Employer Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/employer-interview.png"
                alt="Employer interviewing a candidate"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Employer Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Why Partner With Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover the advantages of hiring through Hope and Hire.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-yellow">
              <CardContent className="pt-8">
                <div className="rounded-full bg-yellow-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-yellow h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Pre-Screened Candidates</h3>
                <p className="text-gray-600 mb-4">
                  Access a pool of qualified candidates who have been vetted and prepared for success.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Skills-matched to your requirements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Interview-ready with professional resumes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Motivated and committed to success</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Award className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Ongoing Support</h3>
                <p className="text-gray-600 mb-4">
                  We provide continued assistance to ensure successful employment outcomes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Post-hire check-ins and support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Resources for workplace integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Dedicated employer relationship manager</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow">
              <CardContent className="pt-8">
                <div className="rounded-full bg-yellow-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <BarChart className="text-yellow h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Social Impact</h3>
                <p className="text-gray-600 mb-4">
                  Demonstrate your commitment to community development and second chances.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Enhance your corporate social responsibility</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Build a diverse and inclusive workforce</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">How It Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our streamlined process makes it easy to find and hire qualified candidates.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full bg-yellow text-dark-text w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Register</h3>
              <p className="text-gray-600">Create an employer account and complete your company profile.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-yellow text-dark-text w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Post Jobs</h3>
              <p className="text-gray-600">Submit your job openings with detailed requirements and qualifications.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-yellow text-dark-text w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Review Candidates</h3>
              <p className="text-gray-600">Browse pre-screened candidates matched to your job requirements.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-yellow text-dark-text w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Hire & Support</h3>
              <p className="text-gray-600">Interview, hire, and receive ongoing support for successful outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Employer Success Stories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from employers who have found valuable team members through Hope and Hire.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-teal" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-text">TechCorp Solutions</h3>
                    <p className="text-gray-500">Software Development Company</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-teal pl-4 italic text-gray-600 mb-4">
                  "Working with Hope and Hire has transformed our hiring process. The candidates we've hired are not
                  only skilled but also incredibly motivated. The ongoing support has ensured smooth transitions for
                  everyone involved."
                </blockquote>
                <p className="font-medium">- Sarah Johnson, HR Director</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-light/20 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-yellow" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-text">GreenLeaf Manufacturing</h3>
                    <p className="text-gray-500">Sustainable Products Manufacturer</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-yellow pl-4 italic text-gray-600 mb-4">
                  "We've hired five employees through Hope and Hire, and each one has exceeded our expectations. The
                  pre-screening process saved us valuable time, and the quality of candidates has been consistently
                  high."
                </blockquote>
                <p className="font-medium">- Michael Chen, Operations Manager</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-yellow-light/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Ready to Find Your Next Great Hire?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of employers committed to creating opportunities and building stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/employers/register">
              <Button className="bg-yellow text-dark-text hover:bg-yellow-dark">Post a Job</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-yellow text-yellow hover:bg-yellow hover:text-dark-text">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

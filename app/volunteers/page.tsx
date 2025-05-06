import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, FileText, Users } from "lucide-react"

export default function VolunteersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-teal text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Make a Difference as a Volunteer</h1>
              <p className="text-lg mb-8">
                Share your professional expertise to help job seekers build skills, confidence, and connections.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button className="bg-white text-teal hover:bg-gray-100">Become a Volunteer</Button>
                </Link>
                <Link href="/login">
                  <Button className="bg-teal-dark text-white hover:bg-teal-dark/90">Volunteer Login</Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/volunteer-mentoring.jpg"
                alt="Volunteer mentoring a job seeker"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
                priority
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Volunteer Opportunities</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Choose how you'd like to contribute based on your skills and availability.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Resume Review</h3>
                <p className="text-gray-600 mb-4">
                  Help job seekers create professional resumes that highlight their skills and experience.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">1-2 hours per week</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Remote or in-person options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">HR or recruiting experience helpful</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow">
              <CardContent className="pt-8">
                <div className="rounded-full bg-yellow-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-yellow h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Mock Interviews</h3>
                <p className="text-gray-600 mb-4">
                  Conduct practice interviews and provide constructive feedback to build confidence.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">1-hour sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Virtual or in-person options</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Hiring or management experience preferred</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Calendar className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Career Coaching</h3>
                <p className="text-gray-600 mb-4">
                  Provide guidance on career paths, job search strategies, and professional development.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">2-4 hours per month</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Ongoing mentorship opportunity</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">5+ years professional experience recommended</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Volunteer Benefits */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Why Volunteer With Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Volunteering with Hope and Hire offers meaningful benefits for both you and our job seekers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Benefits for Volunteers</CardTitle>
                <CardDescription>What you'll gain from the experience</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Professional Development</p>
                      <p className="text-gray-600">Enhance your mentoring, leadership, and communication skills</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Networking Opportunities</p>
                      <p className="text-gray-600">Connect with other professionals across various industries</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Community Impact</p>
                      <p className="text-gray-600">Make a tangible difference in people's lives and communities</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Recognition</p>
                      <p className="text-gray-600">Receive acknowledgment for your contributions and impact</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Support for You</CardTitle>
                <CardDescription>How we help you succeed as a volunteer</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Comprehensive Training</p>
                      <p className="text-gray-600">Access to resources and guidance to help you be effective</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Flexible Scheduling</p>
                      <p className="text-gray-600">Choose when and how often you volunteer to fit your lifestyle</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Dedicated Coordinator</p>
                      <p className="text-gray-600">A staff member to support your volunteer experience</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-dark-text">Volunteer Community</p>
                      <p className="text-gray-600">Connect with other volunteers through events and forums</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Ready to Make an Impact?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of volunteers and help create pathways to meaningful employment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button className="bg-teal text-white hover:bg-teal-dark">Become a Volunteer</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

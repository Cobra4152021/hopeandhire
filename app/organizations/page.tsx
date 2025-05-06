import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Users, Building, HandHelping } from "lucide-react"

export default function OrganizationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo Section - Centrally positioned below header */}
      <div className="flex justify-center py-8 bg-white">
        <Image src="/logo.png" alt="Hope and Hire Logo" width={200} height={80} className="h-auto" priority />
      </div>

      {/* Hero Section */}
      <section className="bg-teal text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Support Your Clients' Journey to Employment</h1>
              <p className="text-lg mb-8">
                Partner with Hope and Hire to provide your clients with access to job readiness resources, employer
                connections, and volunteer support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/organizations/register">
                  <Button className="bg-white text-teal hover:bg-gray-100">Become a Partner</Button>
                </Link>
                <Link href="/organizations/login">
                  <Button className="bg-teal-dark text-white hover:bg-teal-dark/90">Partner Login</Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/diverse-professionals-meeting.png"
                alt="Organization partners in a meeting"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Partner Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Why Partner With Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Hope and Hire offers comprehensive support for organizations serving individuals seeking employment.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Expanded Resources</h3>
                <p className="text-gray-600 mb-4">
                  Access a network of volunteers, employers, and resources to enhance your existing programs.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Professional volunteer network</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Job readiness curriculum</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Employer partnerships</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow">
              <CardContent className="pt-8">
                <div className="rounded-full bg-yellow-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="text-yellow h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Employer Connections</h3>
                <p className="text-gray-600 mb-4">
                  Connect your clients with employers committed to providing second chances and meaningful employment.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Direct employer referrals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Industry-specific opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Ongoing employment support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <HandHelping className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Comprehensive Support</h3>
                <p className="text-gray-600 mb-4">
                  Provide your clients with holistic support throughout their employment journey.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Resume and interview preparation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Career counseling and planning</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Post-employment mentorship</span>
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
            Our partnership process is designed to seamlessly integrate with your existing programs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Partner Registration</h3>
              <p className="text-gray-600">Complete our partnership application and meet with our team.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Client Referrals</h3>
              <p className="text-gray-600">Refer your clients to our platform for job readiness services.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Collaborative Support</h3>
              <p className="text-gray-600">Work together with our team to provide comprehensive client support.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Ongoing Partnership</h3>
              <p className="text-gray-600">Maintain communication and collaboration for continued success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Partner Success Stories</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from organizations that have partnered with Hope and Hire to support their clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Community Reentry Services</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-teal pl-4 italic text-gray-600 mb-4">
                  "Partnering with Hope and Hire has significantly enhanced our ability to support clients transitioning
                  back into the workforce. The volunteer network and employer connections have been invaluable resources
                  for our organization."
                </blockquote>
                <p className="font-medium">- Maria Rodriguez, Executive Director</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Second Chance Coalition</CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-yellow pl-4 italic text-gray-600 mb-4">
                  "Our partnership with Hope and Hire has opened doors for our clients that were previously closed. The
                  comprehensive support system ensures that individuals receive the guidance they need throughout their
                  employment journey."
                </blockquote>
                <p className="font-medium">- James Wilson, Program Director</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-light/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Ready to Partner With Us?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our network of organizations committed to creating pathways to employment for individuals seeking
            second chances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/organizations/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Become a Partner</Button>
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

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Building, Users, Handshake } from "lucide-react"

export default function OrganizationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-teal-light/20 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-text">
                Partner With Us to Support Your Clients
              </h1>
              <p className="text-lg mb-8 text-gray-600">
                Connect your clients with our network of volunteers and employers to enhance their employment
                opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://www.hopeandhire.net/login">
                  <Button className="bg-teal text-white hover:bg-teal-dark">Become a Partner</Button>
                </Link>
                <Link href="https://www.hopeandhire.net/login">
                  <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                    Organization Login
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src="/organization-meeting.png"
                alt="Organization team meeting"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Organization Benefits */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Why Partner With Us</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Discover how a partnership with Hope and Hire can benefit your organization and clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Enhanced Client Services</h3>
                <p className="text-gray-600 mb-4">
                  Expand your service offerings with specialized employment support for your clients.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Professional resume development</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Interview preparation and coaching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Direct connections to employers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow">
              <CardContent className="pt-8">
                <div className="rounded-full bg-yellow-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Building className="text-yellow h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Resource Network</h3>
                <p className="text-gray-600 mb-4">
                  Access our extensive network of volunteers, employers, and support resources.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Skilled volunteer professionals</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Employer partnerships across industries</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Training and educational materials</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-teal">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Handshake className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-dark-text">Collaborative Impact</h3>
                <p className="text-gray-600 mb-4">
                  Join a community dedicated to creating meaningful employment opportunities.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Shared success metrics and reporting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Community of practice participation</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Joint funding and grant opportunities</span>
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
            Our partnership process is designed to be straightforward and impactful.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Partner</h3>
              <p className="text-gray-600">Complete our partnership application and meet with our team.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Refer</h3>
              <p className="text-gray-600">Connect your clients to our employment readiness services.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Support</h3>
              <p className="text-gray-600">Collaborate with our team to provide comprehensive support.</p>
            </div>

            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Succeed</h3>
              <p className="text-gray-600">Celebrate client successes and strengthen our partnership.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Partner Testimonials</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Hear from organizations that have partnered with Hope and Hire.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-teal-light/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-teal" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-text">Community Reentry Alliance</h3>
                    <p className="text-gray-500">Reentry Support Organization</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-teal pl-4 italic text-gray-600 mb-4">
                  "Our partnership with Hope and Hire has significantly enhanced our ability to support clients in their
                  employment journey. The specialized resources and employer connections have been invaluable to our
                  program participants."
                </blockquote>
                <p className="font-medium">- James Wilson, Executive Director</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-light/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-yellow" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-dark-text">Pathway to Success</h3>
                    <p className="text-gray-500">Workforce Development Agency</p>
                  </div>
                </div>
                <blockquote className="border-l-4 border-yellow pl-4 italic text-gray-600 mb-4">
                  "The collaborative approach of Hope and Hire has allowed us to offer comprehensive employment services
                  to our clients. Their volunteer network provides expertise that complements our existing programs
                  perfectly."
                </blockquote>
                <p className="font-medium">- Maria Rodriguez, Program Director</p>
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
            <Link href="https://www.hopeandhire.net/login">
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

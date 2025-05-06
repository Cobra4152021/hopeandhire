import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Logo */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo positioned in the light green section - priority loading for above-the-fold */}
            <div className="flex justify-center mb-8">
              <Image
                src="/logo.png"
                alt="Hope and Hire Logo"
                width={200}
                height={80}
                className="h-auto"
                priority
                quality={90}
              />
            </div>

            <div className="flex justify-center space-x-4 mb-6">
              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
                Empowering second chances
              </span>
              <span className="bg-teal-light/20 text-teal px-4 py-2 rounded-full text-sm">
                Building bridges to opportunity
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-dark-text">
              Bridging the Gap from
              <span className="text-teal"> Hope </span>
              to
              <span className="text-yellow"> Hire</span>
            </h1>

            <p className="text-lg mb-12 text-gray-600 max-w-3xl mx-auto">
              Empowering individuals with second chances through workforce readiness and meaningful employment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/organizations">
                <Button className="bg-teal text-white hover:bg-teal-dark">Support Your Clients</Button>
              </Link>
              <Link href="/volunteers">
                <Button variant="outline" className="border-gray-300 hover:bg-gray-100">
                  Start Volunteering
                </Button>
              </Link>
              <Link href="/employers">
                <Button className="bg-yellow text-dark-text hover:bg-yellow-dark">Hire Job-Ready Candidates</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-center text-gray-600 mb-2">Resumes Written</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={3250} duration={5000} />
                </p>
                <p className="text-center text-gray-500 text-sm">Professional resumes created</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-center text-gray-600 mb-2">Interviews Conducted</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={1875} duration={5000} />
                </p>
                <p className="text-center text-gray-500 text-sm">Mock interviews with feedback</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-center text-gray-600 mb-2">Job Placements Made</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={925} duration={5000} />
                </p>
                <p className="text-center text-gray-500 text-sm">Successful career placements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Our Impact</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Together, we're creating meaningful change in the lives of formerly incarcerated individuals.
          </p>

          {/* Top Contributors */}
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4 text-dark-text">Top Contributors</h2>
            <p className="text-center text-gray-600 mb-12">
              Recognizing the volunteers who are making a difference in our community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monthly Leaders */}
              <Card className="border-t-4 border-teal">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Trophy className="text-teal mr-2" />
                    <h3 className="text-xl font-bold text-dark-text">Monthly Leaders</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src="/team-member-1.jpg"
                            alt="Sarah Johnson"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-gray-500">HR Director</p>
                        </div>
                      </div>
                      <div className="bg-teal-light/20 text-teal text-sm px-3 py-1 rounded-full">42 resumes</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src="/team-member-2.jpg"
                            alt="Michael Chen"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Michael Chen</p>
                          <p className="text-sm text-gray-500">Recruiter</p>
                        </div>
                      </div>
                      <div className="bg-teal-light/20 text-teal text-sm px-3 py-1 rounded-full">37 resumes</div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src="/team-member-3.jpg"
                            alt="David Rodriguez"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">David Rodriguez</p>
                          <p className="text-sm text-gray-500">Career Coach</p>
                        </div>
                      </div>
                      <div className="bg-teal-light/20 text-teal text-sm px-3 py-1 rounded-full">29 resumes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yearly Leaders */}
              <Card className="border-t-4 border-yellow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Trophy className="text-yellow mr-2" />
                    <h3 className="text-xl font-bold text-dark-text">Yearly Leaders</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src="/team-member-4.png"
                            alt="Jennifer Williams"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Jennifer Williams</p>
                          <p className="text-sm text-gray-500">HR Manager</p>
                        </div>
                      </div>
                      <div className="bg-yellow-light/30 text-yellow-dark text-sm px-3 py-1 rounded-full">
                        312 resumes
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src="/team-member-5.png"
                            alt="Robert Taylor"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Robert Taylor</p>
                          <p className="text-sm text-gray-500">Talent Acquisition</p>
                        </div>
                      </div>
                      <div className="bg-yellow-light/30 text-yellow-dark text-sm px-3 py-1 rounded-full">
                        287 resumes
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src="/team-member-6.jpg"
                            alt="Lisa Martinez"
                            width={40}
                            height={40}
                            className="object-cover"
                            loading="lazy"
                            sizes="40px"
                          />
                        </div>
                        <div>
                          <p className="font-medium">Lisa Martinez</p>
                          <p className="text-sm text-gray-500">Career Specialist</p>
                        </div>
                      </div>
                      <div className="bg-yellow-light/30 text-yellow-dark text-sm px-3 py-1 rounded-full">
                        253 resumes
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Ready to Make a Difference?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of volunteers, employers, and organizations committed to creating second chances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Get Started Today</Button>
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

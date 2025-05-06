import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "HopeAndHire - Empowering Second Chances Through Employment",
  description:
    "HopeAndHire connects formerly incarcerated individuals with career mentors, recruiters, and second-chance employers to create pathways to stable employment.",
  keywords: "second chance hiring, formerly incarcerated, job placement, workforce readiness, reentry programs",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden bg-[#f8faf9]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col items-center justify-center mb-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0420.jpg-wy3FfcXdG3optf3BZuZ8p2DRfx2tND.jpeg"
                alt="HopeAndHire Logo"
                width={240}
                height={140}
                className="mb-6"
                priority
              />
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  Empowering second chances
                </span>
                <span className="px-4 py-1 rounded-full bg-[#e6f7f5] text-[#26a69a] text-sm">
                  Building bridges to opportunity
                </span>
              </div>
            </div>

            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-gray-800">
                Bridging the Gap from <span className="text-[#26a69a]">Hope</span> to{" "}
                <span className="text-[#f2b01e]">Hire</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Empowering individuals with second chances through workforce readiness and meaningful employment.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                  <Link href="/organizations">Support Your Clients</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white border-gray-200 hover:bg-gray-50 text-gray-800"
                  asChild
                >
                  <Link href="/volunteer">Start Volunteering</Link>
                </Button>
                <Button size="lg" className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                  <Link href="/employer/register">Hire Job-Ready Candidates</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Resumes Written</h3>
                  <p className="text-5xl font-bold text-[#26a69a] mb-2">3,250</p>
                  <p className="text-gray-500">Professional resumes created</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Interviews Conducted</h3>
                  <p className="text-5xl font-bold text-[#26a69a] mb-2">1,875</p>
                  <p className="text-gray-500">Mock interviews with feedback</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-medium text-gray-600 mb-2">Job Placements Made</h3>
                  <p className="text-5xl font-bold text-[#26a69a] mb-2">925</p>
                  <p className="text-gray-500">Successful career placements</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-[#f8faf9]">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">How HopeAndHire Works</h2>
              <p className="text-gray-600 mt-4">
                Our platform connects job seekers, volunteers, and employers to create meaningful employment
                opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#26a69a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-users"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">For Organizations</h3>
                  <p className="text-gray-600 mb-4">
                    Nonprofits and case managers submit requests for job seekers needing support.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Submit requests for resume reviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Schedule mock interviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Request job placement assistance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#26a69a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-helping-hand"
                    >
                      <path d="M11 5c.5-2.5 4.343-2.657 4-0.5" />
                      <path d="M11 3a2 2 0 1 0 4 0" />
                      <path d="M14.5 17.5 18 20l1-1.5-3.5-3.5" />
                      <path d="M13 20c-3.5 0-7-3-7.5-7" />
                      <path d="M9 12.5 7 10l-1.5 1.5 2 2.5 1.5-1.5Z" />
                      <path d="M9 12.5c-.5-3.5 3-7 7-7.5" />
                      <path d="M13 5.5 15.5 3l1.5 1.5-3 3-1-2Z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">For Volunteers</h3>
                  <p className="text-gray-600 mb-4">
                    Recruiters and HR professionals volunteer their expertise to help job seekers.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Review and improve resumes</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Conduct mock interviews</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Provide career coaching</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <div className="bg-[#e6f7f5] p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#26a69a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-award"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">For Employers</h3>
                  <p className="text-gray-600 mb-4">
                    Companies committed to second-chance hiring post jobs and find qualified candidates.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Post job opportunities</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Access pre-screened candidates</span>
                    </li>
                    <li className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#26a69a"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                      <span>Receive tax incentive guidance</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Contributors Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Top Contributors</h2>
              <p className="text-gray-600 mt-4">
                Recognizing the volunteers who are making a difference in our community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="border-t-4 border-t-[#26a69a] border-r-0 border-l-0 border-b-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#26a69a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M8.21 13.89 7 23l9-9-8.99-9L7.2 13.9" />
                      <path d="M13.32 13.9 14.5 23l-9-9 8.99-9 .7 8.9" />
                      <path d="m16 16 6-6" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800">Monthly Leaders</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#e6f7f5] text-[#26a69a] rounded-full mr-3 text-sm">
                          🏆
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">Sarah Johnson</p>
                          <p className="text-sm text-gray-500">HR Director</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#e6f7f5] text-[#26a69a] rounded-full text-sm">42 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#e6f7f5] text-[#26a69a] rounded-full mr-3 text-sm">
                          🏆
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">Michael Chen</p>
                          <p className="text-sm text-gray-500">Recruiter</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#e6f7f5] text-[#26a69a] rounded-full text-sm">37 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#e6f7f5] text-[#26a69a] rounded-full mr-3 text-sm">
                          🏆
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">David Rodriguez</p>
                          <p className="text-sm text-gray-500">Career Coach</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#e6f7f5] text-[#26a69a] rounded-full text-sm">29 resumes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-[#f2b01e] border-r-0 border-l-0 border-b-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#f2b01e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M12 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M20 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" />
                      <path d="M4 12a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
                      <path d="M16 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M8 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                      <path d="M16 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-800">Yearly Leaders</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#fff8e1] text-[#f2b01e] rounded-full mr-3 text-sm">
                          🏆
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">Jennifer Williams</p>
                          <p className="text-sm text-gray-500">HR Manager</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#fff8e1] text-[#f2b01e] rounded-full text-sm">312 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#fff8e1] text-[#f2b01e] rounded-full mr-3 text-sm">
                          🏆
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">Robert Taylor</p>
                          <p className="text-sm text-gray-500">Talent Acquisition</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#fff8e1] text-[#f2b01e] rounded-full text-sm">287 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="w-8 h-8 flex items-center justify-center bg-[#fff8e1] text-[#f2b01e] rounded-full mr-3 text-sm">
                          🏆
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">Lisa Martinez</p>
                          <p className="text-sm text-gray-500">Career Specialist</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-[#fff8e1] text-[#f2b01e] rounded-full text-sm">253 resumes</span>
                    </div>
                  </div>
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
                Join our community and help create pathways to employment for those who need a second chance.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-[#26a69a] hover:bg-[#1e8e82] text-white" asChild>
                  <Link href="/volunteer/register">Become a Volunteer</Link>
                </Button>
                <Button size="lg" className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                  <Link href="/employer/register">Hire Talent</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#26a69a] text-[#26a69a] hover:bg-[#e6f7f5]"
                  asChild
                >
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

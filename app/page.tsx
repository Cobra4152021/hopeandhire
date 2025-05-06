import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Counter } from "@/components/counter"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hope and Hire - Bridging the Gap from Hope to Hire",
  description: "Empowering individuals with second chances through workforce readiness and meaningful employment",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="flex flex-wrap justify-center gap-4 mb-6">
                <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm">
                  Empowering second chances
                </span>
                <span className="bg-brand-teal-100 text-brand-teal-700 px-4 py-2 rounded-full text-sm">
                  Building bridges to opportunity
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
                Bridging the Gap from <span className="text-brand-teal-500">Hope</span> to{" "}
                <span className="text-brand-yellow-500">Hire</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mb-12">
                Empowering individuals with second chances through workforce readiness and meaningful employment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/organizations"
                  className="bg-brand-teal-500 hover:bg-brand-teal-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Support Your Clients
                </Link>
                <Link
                  href="/volunteers"
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Start Volunteering
                </Link>
                <Link
                  href="/employers"
                  className="bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Hire Job-Ready Candidates
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">Our Impact</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
              Together, we're creating meaningful change in the lives of formerly incarcerated individuals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Counter end={3250} label="Resumes Written" sublabel="Professional resumes created" />
              <Counter end={1875} label="Interviews Conducted" sublabel="Mock interviews with feedback" />
              <Counter end={925} label="Job Placements Made" sublabel="Successful career placements" />
            </div>
          </div>
        </section>

        {/* Top Contributors Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">Top Contributors</h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
              Recognizing the volunteers who are making a difference in our community.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-brand-teal-500">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-teal-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-brand-teal-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold ml-3 text-gray-800">Monthly Leaders</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src="/profile-sarah.png"
                        alt="Sarah Johnson"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Sarah Johnson</p>
                        <p className="text-sm text-gray-500">HR Director</p>
                      </div>
                    </div>
                    <span className="bg-brand-teal-50 text-brand-teal-600 px-3 py-1 rounded-full text-sm">
                      42 resumes
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src="/profile-michael.png"
                        alt="Michael Chen"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Michael Chen</p>
                        <p className="text-sm text-gray-500">Recruiter</p>
                      </div>
                    </div>
                    <span className="bg-brand-teal-50 text-brand-teal-600 px-3 py-1 rounded-full text-sm">
                      37 resumes
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src="/profile-david.png"
                        alt="David Rodriguez"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">David Rodriguez</p>
                        <p className="text-sm text-gray-500">Career Coach</p>
                      </div>
                    </div>
                    <span className="bg-brand-teal-50 text-brand-teal-600 px-3 py-1 rounded-full text-sm">
                      29 resumes
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-brand-yellow-500">
                <div className="flex items-center mb-6">
                  <div className="bg-brand-yellow-100 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-brand-yellow-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold ml-3 text-gray-800">Yearly Leaders</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src="/profile-jennifer.png"
                        alt="Jennifer Williams"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Jennifer Williams</p>
                        <p className="text-sm text-gray-500">HR Manager</p>
                      </div>
                    </div>
                    <span className="bg-brand-yellow-50 text-brand-yellow-600 px-3 py-1 rounded-full text-sm">
                      312 resumes
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src="/profile-robert.png"
                        alt="Robert Taylor"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Robert Taylor</p>
                        <p className="text-sm text-gray-500">Talent Acquisition</p>
                      </div>
                    </div>
                    <span className="bg-brand-yellow-50 text-brand-yellow-600 px-3 py-1 rounded-full text-sm">
                      287 resumes
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Image
                        src="/profile-lisa.png"
                        alt="Lisa Martinez"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-800">Lisa Martinez</p>
                        <p className="text-sm text-gray-500">Career Specialist</p>
                      </div>
                    </div>
                    <span className="bg-brand-yellow-50 text-brand-yellow-600 px-3 py-1 rounded-full text-sm">
                      253 resumes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-brand-teal-500 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join our community of volunteers, employers, and organizations committed to creating second chances.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/volunteers"
                className="bg-white text-brand-teal-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Become a Volunteer
              </Link>
              <Link
                href="/employers"
                className="bg-brand-yellow-500 text-white hover:bg-brand-yellow-600 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Hire Candidates
              </Link>
              <Link
                href="/donate"
                className="bg-transparent text-white border border-white hover:bg-brand-teal-600 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

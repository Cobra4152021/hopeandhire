import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hope and Hire - Connecting Job Seekers with Opportunities",
  description:
    "A platform dedicated to helping job seekers find meaningful employment through volunteer recruiter assistance",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-teal-500 to-teal-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Connecting Job Seekers with Opportunities</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Hope and Hire bridges the gap between job seekers and employers through volunteer recruiter assistance.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/volunteer"
                className="bg-white text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Volunteer as a Recruiter
              </Link>
              <Link
                href="/employer"
                className="bg-teal-800 text-white hover:bg-teal-900 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Post a Job
              </Link>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">For Job Seekers</h3>
                <p className="text-gray-600">
                  Get personalized assistance with your resume, interview preparation, and job matching from experienced
                  volunteer recruiters.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">For Employers</h3>
                <p className="text-gray-600">
                  Post job opportunities and connect with qualified candidates who have been vetted and prepared by our
                  volunteer recruiters.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">For Volunteers</h3>
                <p className="text-gray-600">
                  Use your recruiting expertise to help job seekers improve their resumes, prepare for interviews, and
                  find suitable employment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <img src="/diverse-group.png" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-800">John D.</h3>
                    <p className="text-gray-600 text-sm">Software Developer</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The volunteer recruiter helped me revamp my resume and prepare for technical interviews. Within a
                  month, I landed a job at a great tech company. I'm incredibly grateful for the support I received."
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <img src="/diverse-woman-portrait.png" alt="Profile" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="font-semibold text-gray-800">Sarah M.</h3>
                    <p className="text-gray-600 text-sm">Marketing Specialist</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "After being laid off, I was struggling to find a new position. The mock interviews and feedback I
                  received from my volunteer recruiter gave me the confidence I needed. I'm now working at a company I
                  love."
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link
                href="/success-stories"
                className="text-teal-600 hover:text-teal-700 font-medium inline-flex items-center"
              >
                View More Success Stories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-teal-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Whether you're looking for a job, hiring talent, or want to volunteer your expertise, Hope and Hire is
              here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/schedule"
                className="bg-white text-teal-700 hover:bg-teal-50 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Schedule an Appointment
              </Link>
              <Link
                href="/contact"
                className="bg-transparent text-white border border-white hover:bg-teal-700 px-6 py-3 rounded-md font-medium transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

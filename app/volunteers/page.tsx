import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Volunteers - Hope and Hire",
  description: "Volunteer your recruiting skills to help job seekers find meaningful employment",
}

export default function VolunteersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                <span className="px-4 py-1 rounded-full bg-brand-teal-100 text-brand-teal-700 text-sm">
                  Make a meaningful impact
                </span>
                <span className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                  Share your recruiting expertise
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Volunteer as a <span className="text-brand-teal-500">Recruiter</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Use your recruiting skills to help job seekers find meaningful employment and rebuild their lives.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/volunteers/register"
                  className="bg-brand-teal-500 hover:bg-brand-teal-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Become a Volunteer
                </Link>
                <Link
                  href="/volunteers/login"
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Volunteer Login
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">How You Can Help</h2>
              <p className="text-gray-600 mt-4">
                As a volunteer recruiter, you'll play a crucial role in connecting job seekers with employment
                opportunities.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-brand-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Resume Review</h3>
                <p className="text-gray-600">
                  Help job seekers create professional resumes that highlight their skills and experience, while
                  addressing potential gaps in employment.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-brand-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Interview Coaching</h3>
                <p className="text-gray-600">
                  Conduct mock interviews and provide feedback to help job seekers build confidence and prepare for
                  tough questions about their background.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <div className="bg-brand-teal-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
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
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Job Matching</h3>
                <p className="text-gray-600">
                  Match job seekers with appropriate employment opportunities based on their skills, experience, and
                  career goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-brand-teal-500 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8">
                Join our community of volunteer recruiters and help change lives through meaningful employment.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/volunteers/register"
                  className="bg-white text-brand-teal-700 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Sign Up Now
                </Link>
                <Link
                  href="/contact"
                  className="bg-transparent text-white border border-white hover:bg-brand-teal-600 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

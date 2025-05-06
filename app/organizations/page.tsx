import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "For Organizations - Hope and Hire",
  description: "Partner with Hope and Hire to support your clients in finding meaningful employment",
}

export default function OrganizationsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Partner with <span className="text-brand-teal-500">Hope</span> and{" "}
                <span className="text-brand-yellow-500">Hire</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Support your clients in finding meaningful employment and building sustainable futures.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-brand-teal-500 hover:bg-brand-teal-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Become a Partner
                </Link>
                <Link
                  href="/organizations/resources"
                  className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  View Resources
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">How We Support Organizations</h2>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="bg-brand-teal-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
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
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Job Placement Services</h3>
                    <p className="text-gray-600">
                      We connect your clients with employers who are committed to second-chance hiring, providing
                      opportunities for meaningful employment.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brand-teal-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Workforce Readiness Training</h3>
                    <p className="text-gray-600">
                      Our volunteer recruiters provide resume assistance, interview preparation, and job search
                      strategies to help your clients succeed.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brand-teal-100 p-3 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
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
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-800">Employer Network</h3>
                    <p className="text-gray-600">
                      Access our growing network of employers who are committed to inclusive hiring practices and
                      creating opportunities for second chances.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-gray-800">Partner With Us</h2>
              <p className="text-xl text-gray-600 mb-8">
                Join our network of community organizations, reentry programs, and social service agencies to help your
                clients find meaningful employment.
              </p>
              <Link
                href="/contact"
                className="bg-brand-teal-500 hover:bg-brand-teal-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Donate - Hope and Hire",
  description: "Support Hope and Hire's mission to connect job seekers with meaningful employment opportunities",
}

export default function DonatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Support Our <span className="text-brand-teal-500">Mission</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Your donation helps us connect job seekers with meaningful employment opportunities and create second
                chances.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-t-4 border-t-brand-teal-500">
                  <CardHeader>
                    <CardTitle>One-Time Donation</CardTitle>
                    <CardDescription>Support our mission with a one-time gift</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="border-brand-teal-500 text-brand-teal-700">
                        $25
                      </Button>
                      <Button variant="outline" className="border-brand-teal-500 text-brand-teal-700">
                        $50
                      </Button>
                      <Button variant="outline" className="border-brand-teal-500 text-brand-teal-700">
                        $100
                      </Button>
                      <Button variant="outline" className="border-brand-teal-500 text-brand-teal-700">
                        $250
                      </Button>
                    </div>
                    <Button className="w-full bg-brand-teal-500 hover:bg-brand-teal-600 text-white">Donate Now</Button>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-brand-yellow-500 md:transform md:-translate-y-4 md:scale-105 shadow-lg">
                  <CardHeader>
                    <CardTitle>Monthly Giving</CardTitle>
                    <CardDescription>Become a sustaining supporter</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <Button variant="outline" className="border-brand-yellow-500 text-brand-yellow-700">
                        $10/mo
                      </Button>
                      <Button variant="outline" className="border-brand-yellow-500 text-brand-yellow-700">
                        $25/mo
                      </Button>
                      <Button variant="outline" className="border-brand-yellow-500 text-brand-yellow-700">
                        $50/mo
                      </Button>
                      <Button variant="outline" className="border-brand-yellow-500 text-brand-yellow-700">
                        $100/mo
                      </Button>
                    </div>
                    <Button className="w-full bg-brand-yellow-500 hover:bg-brand-yellow-600 text-white">
                      Become a Monthly Donor
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-t-4 border-t-gray-500">
                  <CardHeader>
                    <CardTitle>Corporate Giving</CardTitle>
                    <CardDescription>Partner with us as a business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      Support our mission through corporate donations, matching gifts, or sponsorships.
                    </p>
                    <Button className="w-full bg-gray-700 hover:bg-gray-800 text-white">Contact Us</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-16 bg-gray-50 p-8 rounded-lg">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Impact</h2>
                <p className="text-gray-600 mb-6">
                  Your donation directly supports our programs and services, including:
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="flex gap-3">
                    <div className="bg-brand-teal-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-brand-teal-600"
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
                    <div>
                      <h3 className="font-medium text-gray-800">Resume Assistance</h3>
                      <p className="text-sm text-gray-600">Professional resume creation and review</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-brand-teal-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-brand-teal-600"
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
                    <div>
                      <h3 className="font-medium text-gray-800">Interview Preparation</h3>
                      <p className="text-sm text-gray-600">Mock interviews and coaching</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="bg-brand-teal-100 p-2 rounded-full h-10 w-10 flex items-center justify-center shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-brand-teal-600"
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
                      <h3 className="font-medium text-gray-800">Job Placement</h3>
                      <p className="text-sm text-gray-600">Connecting candidates with employers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

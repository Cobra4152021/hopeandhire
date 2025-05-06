import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <div className="flex flex-wrap justify-center gap-4">
                <span className="inline-block px-4 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
                  Empowering second chances
                </span>
                <span className="inline-block px-4 py-1 rounded-full text-sm bg-teal-100 text-teal-700">
                  Building bridges to opportunity
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-center">
                Bridging the Gap from <span className="text-teal-600">Hope</span> to{" "}
                <span className="text-amber-500">Hire</span>
              </h1>

              <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mt-6">
                Empowering individuals with second chances through workforce readiness and meaningful employment.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Button className="bg-teal-600 hover:bg-teal-700">Support Your Clients</Button>
              <Button variant="outline">Start Volunteering</Button>
              <Button className="bg-amber-500 hover:bg-amber-600">Hire Job-Ready Candidates</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Statistics Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Resumes Written</h3>
                <p className="text-5xl font-bold text-teal-600 mb-2">3,250</p>
                <p className="text-gray-600">Professional resumes created</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Interviews Conducted</h3>
                <p className="text-5xl font-bold text-teal-600 mb-2">1,875</p>
                <p className="text-gray-600">Mock interviews with feedback</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-medium mb-2">Job Placements Made</h3>
                <p className="text-5xl font-bold text-teal-600 mb-2">925</p>
                <p className="text-gray-600">Successful career placements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Impact</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 mt-4">
              Together, we're creating meaningful change in the lives of formerly incarcerated individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Top Contributors Section */}
      <section className="w-full py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Top Contributors</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 mt-4">
              Recognizing the volunteers who are making a difference in our community.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-4xl">
              <Card className="border-t-4 border-t-teal-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-amber-500 mr-2">🏆</span>
                    <h3 className="text-xl font-bold">Monthly Leaders</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-2">👤</span>
                        <div>
                          <p className="font-medium">Sarah Johnson</p>
                          <p className="text-sm text-gray-600">HR Director</p>
                        </div>
                      </div>
                      <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">42 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-2">👤</span>
                        <div>
                          <p className="font-medium">Michael Chen</p>
                          <p className="text-sm text-gray-600">Recruiter</p>
                        </div>
                      </div>
                      <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">37 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-amber-500 mr-2">👤</span>
                        <div>
                          <p className="font-medium">David Rodriguez</p>
                          <p className="text-sm text-gray-600">Career Coach</p>
                        </div>
                      </div>
                      <span className="bg-teal-100 text-teal-800 text-xs px-3 py-1 rounded-full">29 resumes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-t-amber-500">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <span className="text-teal-500 mr-2">🏆</span>
                    <h3 className="text-xl font-bold">Yearly Leaders</h3>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-teal-500 mr-2">👤</span>
                        <div>
                          <p className="font-medium">Jennifer Williams</p>
                          <p className="text-sm text-gray-600">HR Manager</p>
                        </div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">312 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-teal-500 mr-2">👤</span>
                        <div>
                          <p className="font-medium">Robert Taylor</p>
                          <p className="text-sm text-gray-600">Talent Acquisition</p>
                        </div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">287 resumes</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-teal-500 mr-2">👤</span>
                        <div>
                          <p className="font-medium">Lisa Martinez</p>
                          <p className="text-sm text-gray-600">Career Specialist</p>
                        </div>
                      </div>
                      <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded-full">253 resumes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-6 bg-gray-100">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image src="/logo.png" alt="Hope and Hire Logo" width={30} height={30} />
              <span className="font-semibold">Hope&Hire</span>
            </div>
            <div className="text-sm text-gray-500">© {new Date().getFullYear()} Hope&Hire. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </main>
  )
}

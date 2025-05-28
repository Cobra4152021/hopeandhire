import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, FileText, Briefcase, GraduationCap, Calendar, Users } from 'lucide-react';

export default function JobSeekersPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo positioned in the light green section */}
            <div className="flex justify-center mb-12">
              <Image
                src="/logo.png"
                alt="Hope and Hire Logo"
                width={200}
                height={80}
                className="h-auto"
                priority
              />
            </div>

            <div className="flex justify-center mb-8">
              <span className="bg-teal-light/20 text-teal px-6 py-2 rounded-full text-sm font-medium">
                Your journey to employment
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Resources for <span className="text-teal">Job Seekers</span>
            </h1>

            <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-3xl mx-auto">
              We&apos;re dedicated to helping you navigate your path to meaningful employment with
              resources, support, and opportunities tailored to your unique journey.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/job-seekers/job-postings">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal text-white hover:bg-teal-dark"
                >
                  Browse Job Postings
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-gray-300 hover:bg-gray-50"
                >
                  Create Your Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12">
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="skills">Skills Development</TabsTrigger>
              <TabsTrigger value="success">Success Stories</TabsTrigger>
            </TabsList>

            {/* Resources Tab */}
            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card>
                  <CardHeader className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Resume Building</CardTitle>
                      <CardDescription className="mt-2">
                        Create a professional resume that highlights your skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          One-on-one resume review with professionals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Templates designed for various industries
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Guidance on addressing employment gaps
                        </span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full mt-6 border-teal text-teal hover:bg-teal hover:text-white"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Interview Preparation</CardTitle>
                      <CardDescription className="mt-2">
                        Practice and prepare for job interviews
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Mock interviews with industry professionals
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">
                          Strategies for discussing your background
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Feedback and coaching to improve</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full mt-6 border-teal text-teal hover:bg-teal hover:text-white"
                    >
                      Schedule Practice
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Job Search Strategies</CardTitle>
                      <CardDescription className="mt-2">
                        Find opportunities that match your skills
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Access to fair-chance employers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Personalized job matching service</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Guidance on application processes</span>
                      </li>
                    </ul>
                    <Link href="/job-seekers/job-postings" className="block w-full">
                      <Button className="w-full mt-6 bg-teal text-white hover:bg-teal-dark">
                        View Job Postings
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills Development Tab */}
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">Skills Assessment</CardTitle>
                    <CardDescription className="mt-2">
                      Identify your strengths and areas for growth
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Our skills assessment tool helps you identify your current skills and areas
                      where you can develop to become more competitive in the job market.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Training Programs</CardTitle>
                    <CardDescription>
                      Develop new skills through our partner programs
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="h-5 w-5 text-teal mr-2" />
                          <h4 className="font-medium">Digital Skills Certificate</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Learn essential computer skills for the modern workplace.
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>8 weeks, part-time</span>
                        </div>
                      </div>

                      <div className="border-b pb-4">
                        <div className="flex items-center mb-2">
                          <GraduationCap className="h-5 w-5 text-teal mr-2" />
                          <h4 className="font-medium">Customer Service Training</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Develop skills for customer-facing roles across industries.
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>4 weeks, part-time</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center mb-2">
                          <GraduationCap className="h-5 w-5 text-teal mr-2" />
                          <h4 className="font-medium">Trades Apprenticeship</h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Hands-on training in construction, electrical, and more.
                        </p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Varies by program</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-6 border-teal text-teal hover:bg-teal hover:text-white"
                    >
                      View All Programs
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Success Stories Tab */}
            <TabsContent value="success">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-dark-text mb-2">
                    Real Stories of Transformation
                  </h2>
                  <p className="text-gray-600">
                    Read about individuals who have successfully navigated their journey to
                    employment.
                  </p>
                </div>

                <div className="space-y-8">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <Image
                            src="/success-story-1.jpg"
                            alt="Michael's Success Story"
                            width={300}
                            height={300}
                            className="rounded-lg object-cover w-full h-64 md:h-full"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h3 className="text-xl font-bold text-dark-text mb-2">
                            Michael&apos;s Journey
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            From warehouse worker to IT specialist
                          </p>
                          <p className="mb-4">
                            &quot;After my release, I struggled to find employment that would accept
                            my background. Hope and Hire connected me with a tech training program
                            that saw my potential beyond my past. Today, I work as an IT support
                            specialist for a company that values my skills and dedication.&quot;
                          </p>
                          <div className="bg-light-bg p-3 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">Michael&apos;s Path:</h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-teal mr-2 shrink-0" />
                                <span>Completed digital skills certificate</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-teal mr-2 shrink-0" />
                                <span>Received resume and interview coaching</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-teal mr-2 shrink-0" />
                                <span>Connected with fair-chance employer</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-1/3">
                          <Image
                            src="/success-story-2.jpg"
                            alt="Jasmine's Success Story"
                            width={300}
                            height={300}
                            className="rounded-lg object-cover w-full h-64 md:h-full"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h3 className="text-xl font-bold text-dark-text mb-2">
                            Jasmine&apos;s Story
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Building a career in healthcare administration
                          </p>
                          <p className="mb-4">
                            &quot;I was determined to build a better life, but didn&apos;t know
                            where to start. The mentors at Hope and Hire helped me identify my
                            strengths and guided me through training for a healthcare administration
                            role. Now I have stability, growth potential, and pride in what I do
                            every day.&quot;
                          </p>
                          <div className="bg-light-bg p-3 rounded-lg">
                            <h4 className="font-medium text-sm mb-1">Jasmine&apos;s Path:</h4>
                            <ul className="text-sm space-y-1">
                              <li className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-teal mr-2 shrink-0" />
                                <span>Participated in skills assessment</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-teal mr-2 shrink-0" />
                                <span>Completed healthcare admin certification</span>
                              </li>
                              <li className="flex items-center">
                                <CheckCircle className="h-3 w-3 text-teal mr-2 shrink-0" />
                                <span>Matched with employer through job fair</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center mt-8">
                  <Button className="bg-teal text-white hover:bg-teal-dark">
                    Share Your Success Story
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Peer Support Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-dark-text mb-4">Peer Support Community</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Connect with others who understand your journey and can offer advice, encouragement,
                and insights.
              </p>
            </div>

            <Card>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-dark-text mb-4">Community Forums</h3>
                    <p className="mb-4">
                      Join discussions on topics ranging from job search strategies to workplace
                      success stories.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 shrink-0" />
                        <span>Get advice from peers who&apos;ve been in your shoes</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 shrink-0" />
                        <span>Share your experiences and help others</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 shrink-0" />
                        <span>Moderated by experienced career coaches</span>
                      </li>
                    </ul>
                    <Button className="bg-teal text-white hover:bg-teal-dark">
                      Join the Community
                    </Button>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-dark-text mb-4">Mentorship Program</h3>
                    <p className="mb-4">
                      Connect one-on-one with a mentor who can provide personalized guidance on your
                      career journey.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 shrink-0" />
                        <span>Matched based on your career goals and industry</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 shrink-0" />
                        <span>Regular check-ins to track your progress</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 shrink-0" />
                        <span>Many mentors have similar life experiences</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="border-teal text-teal hover:bg-teal hover:text-white"
                    >
                      Request a Mentor
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Ready to Start Your Journey?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Create your profile today to access all our resources and connect with opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Create Your Profile</Button>
            </Link>
            <Link href="/job-seekers/job-postings">
              <Button
                variant="outline"
                className="border-teal text-teal hover:bg-teal hover:text-white"
              >
                Browse Job Postings
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

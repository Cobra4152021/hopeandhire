import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle, FileText, Briefcase, GraduationCap, Calendar, Users, Star, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Job Seekers - Resources & Opportunities',
  description: 'Access comprehensive resources, job opportunities, and professional support designed to help you succeed in your career journey with Hope and Hire.',
};

export default function JobSeekersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-light/20 via-white to-teal/5 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-teal-light/20 text-teal px-4 py-2 rounded-full text-sm font-medium">
                  Your Journey to Success
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Resources for <span className="text-teal">Job Seekers</span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                We're dedicated to helping you navigate your path to meaningful employment with
                resources, support, and opportunities tailored to your unique journey.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/job-seekers/job-postings">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-teal text-white hover:bg-teal-dark transition-all duration-300"
                  >
                    Browse Job Postings
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-teal text-teal hover:bg-teal hover:text-white transition-all duration-300"
                  >
                    Create Your Profile
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <Image
                  src="/job-seeker-success.jpg"
                  alt="Job seeker celebrating success"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-teal/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">How We Support You</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive services are designed to help you build skills, confidence, and connections
              that lead to meaningful employment opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <FileText className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Resume Building</h3>
                <p className="text-gray-600 mb-4">
                  Create a professional resume that highlights your skills and experience effectively.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">One-on-one resume review</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Industry-specific templates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Gap addressing strategies</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8">
                <div className="rounded-full bg-yellow-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Users className="text-yellow h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Interview Preparation</h3>
                <p className="text-gray-600 mb-4">
                  Practice and prepare for job interviews with professional guidance and feedback.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Mock interviews with pros</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Background discussion strategies</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-yellow h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Confidence building coaching</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8">
                <div className="rounded-full bg-teal-light/20 w-12 h-12 flex items-center justify-center mb-4">
                  <Briefcase className="text-teal h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Job Matching</h3>
                <p className="text-gray-600 mb-4">
                  Connect with employers who value skills and are committed to fair-chance hiring.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Fair-chance employers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Personalized matching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="text-teal h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">Application support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Comprehensive Support</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our full range of services designed to support you at every stage of your career journey.
            </p>
          </div>

          <Tabs defaultValue="resources" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 bg-white">
              <TabsTrigger value="resources" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Resources
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Skills Development
              </TabsTrigger>
              <TabsTrigger value="success" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Success Stories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="resources">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center">
                      <FileText className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Professional Resume Review</CardTitle>
                      <CardDescription className="mt-2">
                        Get expert feedback on your resume from industry professionals
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Personalized one-on-one sessions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Industry-specific formatting</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">ATS optimization guidance</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-teal text-teal hover:bg-teal hover:text-white transition-all duration-300"
                    >
                      Schedule Review
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center">
                      <Users className="h-6 w-6 text-yellow" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Interview Coaching</CardTitle>
                      <CardDescription className="mt-2">
                        Practice interviews and receive constructive feedback
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Mock interview sessions</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Behavioral question prep</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Confidence building techniques</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white transition-all duration-300"
                    >
                      Book Practice Session
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-teal" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">Job Search Support</CardTitle>
                      <CardDescription className="mt-2">
                        Strategic guidance for finding and applying to positions
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Curated job opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Application tracking support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Networking strategies</span>
                      </li>
                    </ul>
                    <Link href="/job-seekers/job-postings" className="block w-full">
                      <Button className="w-full bg-teal text-white hover:bg-teal-dark transition-all duration-300">
                        View Job Opportunities
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <GraduationCap className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Professional Development</CardTitle>
                    <CardDescription>
                      Build skills that employers value in today's competitive market
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Digital literacy workshops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Communication skills training</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Industry-specific certifications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Financial literacy education</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-teal text-teal hover:bg-teal hover:text-white"
                    >
                      Explore Training
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-yellow" />
                    </div>
                    <CardTitle className="text-xl">Ongoing Support</CardTitle>
                    <CardDescription>
                      Continuous guidance throughout your employment journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Monthly check-in calls</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Career advancement planning</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Workplace navigation support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 shrink-0" />
                        <span className="text-gray-600">Emergency support services</span>
                      </li>
                    </ul>
                    <Button
                      variant="outline"
                      className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white"
                    >
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="success">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 mb-4">
                      "Hope and Hire helped me build confidence and land my first job in five years. 
                      The interview coaching was incredible - I felt prepared and confident."
                    </blockquote>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Marcus T.</p>
                      <p className="text-gray-500">Now employed at Local Warehouse</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 mb-4">
                      "The resume help was exactly what I needed. My volunteer mentor showed me 
                      how to highlight my skills and address my employment gap positively."
                    </blockquote>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Sarah M.</p>
                      <p className="text-gray-500">Administrative Assistant</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-gray-600 mb-4">
                      "I thought no one would give me a chance, but Hope and Hire connected me 
                      with an employer who saw my potential. I'm grateful every day."
                    </blockquote>
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">David R.</p>
                      <p className="text-gray-500">Construction Coordinator</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of job seekers who have found meaningful employment through our comprehensive support services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-white text-teal hover:bg-gray-100">
                Get Started Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/job-seekers/job-postings">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-teal"
              >
                Browse Jobs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

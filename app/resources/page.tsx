import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Users, 
  Building, 
  Heart, 
  Download, 
  BookOpen, 
  Calendar, 
  DollarSign,
  CheckCircle,
  ArrowRight,
  ExternalLink,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Resources & Support',
  description: 'Access comprehensive resources, guides, and tools to support job seekers, employers, volunteers, and organizations in creating meaningful employment opportunities.',
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-light/20 via-white to-yellow/5 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-yellow-light/20 text-yellow px-4 py-2 rounded-full text-sm font-medium">
                  Comprehensive Support
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Resources & <span className="text-yellow">Support Center</span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                Access comprehensive resources, guides, and tools designed to support success 
                across our entire community of job seekers, employers, volunteers, and organizations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/job-seekers">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-yellow text-white hover:bg-yellow-dark transition-all duration-300"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-yellow text-yellow hover:bg-yellow hover:text-white transition-all duration-300"
                  >
                    Get Support
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <Image
                  src="/resources-hub.jpg"
                  alt="Resources and support materials"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                  priority
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow/10 to-transparent rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Quick Access Resources</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find the resources you need based on your role in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 text-center">
                <div className="rounded-full bg-teal-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                  <FileText className="text-teal group-hover:text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Job Seekers</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Resume templates, interview guides, and job search strategies
                </p>
                <Link href="/job-seekers" className="block w-full">
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark transition-all duration-300">
                    Explore Resources
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 text-center">
                <div className="rounded-full bg-yellow-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow group-hover:text-white transition-all duration-300">
                  <Building className="text-yellow group-hover:text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Employers</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Hiring guides, tax incentives, and best practices for inclusive employment
                </p>
                <Link href="/employers" className="block w-full">
                  <Button className="w-full bg-yellow text-white hover:bg-yellow-dark transition-all duration-300">
                    Access Tools
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 text-center">
                <div className="rounded-full bg-teal-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                  <Heart className="text-teal group-hover:text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Volunteers</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Training materials, mentorship guides, and volunteer resources
                </p>
                <Link href="/volunteers" className="block w-full">
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark transition-all duration-300">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-yellow shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="pt-8 text-center">
                <div className="rounded-full bg-yellow-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4 group-hover:bg-yellow group-hover:text-white transition-all duration-300">
                  <Users className="text-yellow group-hover:text-white h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">Organizations</h3>
                <p className="text-gray-600 mb-4 text-sm">
                  Partnership resources, client tools, and program development guides
                </p>
                <Link href="/organizations" className="block w-full">
                  <Button className="w-full bg-yellow text-white hover:bg-yellow-dark transition-all duration-300">
                    Learn More
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Comprehensive Resource Library</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our full collection of guides, templates, and support materials
            </p>
          </div>

          <Tabs defaultValue="career" className="w-full">
            <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-4 mb-12 bg-white">
              <TabsTrigger value="career" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Career Development
              </TabsTrigger>
              <TabsTrigger value="business" className="data-[state=active]:bg-yellow data-[state=active]:text-white">
                Business Resources
              </TabsTrigger>
              <TabsTrigger value="training" className="data-[state=active]:bg-teal data-[state=active]:text-white">
                Training & Skills
              </TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-yellow data-[state=active]:text-white">
                Community Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="career">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <FileText className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Resume Templates</CardTitle>
                    <CardDescription>
                      Professional resume templates for various industries
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">ATS-optimized formats</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Industry-specific examples</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Gap addressing strategies</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Templates
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center mb-4">
                      <Target className="h-6 w-6 text-yellow" />
                    </div>
                    <CardTitle className="text-xl">Interview Preparation</CardTitle>
                    <CardDescription>
                      Complete guide to acing your next interview
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Common question responses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">STAR method examples</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Virtual interview tips</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <TrendingUp className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Career Planning</CardTitle>
                    <CardDescription>
                      Strategic career development and advancement tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Goal setting worksheets</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Skills assessment tools</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Industry research guides</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                      <Calendar className="mr-2 h-4 w-4" />
                      Plan Your Career
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="business">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center mb-4">
                      <DollarSign className="h-6 w-6 text-yellow" />
                    </div>
                    <CardTitle className="text-xl">Tax Incentives</CardTitle>
                    <CardDescription>
                      Financial benefits for hiring from our community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Work Opportunity Tax Credit</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Federal bonding program</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">State-specific incentives</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Legal Compliance</CardTitle>
                    <CardDescription>
                      Fair hiring practices and legal requirements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">EEOC guidelines</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Background check policies</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Ban the box information</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                      <Download className="mr-2 h-4 w-4" />
                      Download Guide
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-yellow" />
                    </div>
                    <CardTitle className="text-xl">Onboarding Best Practices</CardTitle>
                    <CardDescription>
                      Successful integration strategies for new hires
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">First-day checklists</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Mentorship programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">90-day integration plans</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="training">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <BookOpen className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Skills Development Programs</CardTitle>
                    <CardDescription>
                      Comprehensive training opportunities and certifications
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Digital literacy courses</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Industry certifications</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Soft skills workshops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Financial literacy training</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                      View Programs
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center mb-4">
                      <Calendar className="h-6 w-6 text-yellow" />
                    </div>
                    <CardTitle className="text-xl">Workshops & Events</CardTitle>
                    <CardDescription>
                      Regular training sessions and networking opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Weekly job search workshops</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Monthly networking events</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Industry-specific meetups</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">Virtual and in-person options</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white">
                      View Calendar
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <Heart className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Peer Support</CardTitle>
                    <CardDescription>
                      Connect with others who understand your journey
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Support groups</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Mentorship matching</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Online forums</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                      Join Community
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-yellow-light/20 flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-yellow" />
                    </div>
                    <CardTitle className="text-xl">Emergency Support</CardTitle>
                    <CardDescription>
                      Crisis resources and immediate assistance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">24/7 crisis hotline</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Financial assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-yellow mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Mental health resources</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-yellow text-yellow hover:bg-yellow hover:text-white">
                      Get Help Now
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-lg">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-teal-light/20 flex items-center justify-center mb-4">
                      <Users className="h-6 w-6 text-teal" />
                    </div>
                    <CardTitle className="text-xl">Partner Organizations</CardTitle>
                    <CardDescription>
                      Local organizations and service providers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Reentry programs</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Housing assistance</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-teal mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 text-sm">Healthcare services</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                      Find Resources
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Additional Support?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Our team is here to help you find the resources you need. Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-white text-teal hover:bg-gray-100">
                Contact Support
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/faq">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-teal"
              >
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

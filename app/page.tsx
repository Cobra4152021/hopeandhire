import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy } from 'lucide-react';
import { AnimatedCounter } from '@/components/animated-counter';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hope and Hire - Building Better Futures',
  description:
    'Empowering individuals with second chances through workforce readiness and meaningful employment. Join our mission to bridge the gap from hope to hire.',
  keywords:
    'second chances, employment, workforce readiness, job placement, career development, reentry support',
  openGraph: {
    title: 'Hope and Hire - Building Better Futures',
    description:
      'Empowering individuals with second chances through workforce readiness and meaningful employment.',
    images: [
      {
        url: '/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'Hope and Hire Logo',
      },
    ],
  },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section with Grid Layout */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <div className="grid grid-cols-3 mb-12 w-full max-w-3xl mx-auto rounded-2xl shadow-lg border border-gray-200 overflow-hidden bg-white">
              <div className="h-48 md:h-64">
                <img
                  src="/612x612.jpg"
                  alt="Diverse workers left"
                  className="h-full w-full object-cover object-right"
                  loading="lazy"
                />
              </div>
              <div className="flex items-center justify-center bg-white px-4">
                <Image
                  src="/logo.png"
                  alt="Hope and Hire Logo"
                  width={200}
                  height={80}
                  className="h-auto w-full object-contain"
                  priority
                  quality={90}
                />
              </div>
              <div className="h-48 md:h-64">
                <img
                  src="/1612x612.jpg"
                  alt="Diverse workers right"
                  className="h-full w-full object-cover object-left"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm font-medium">
                Empowering second chances
              </span>
              <span className="bg-teal-light/20 text-teal px-4 py-2 rounded-full text-sm font-medium">
                Building bridges to opportunity
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
              Bridging the Gap from
              <span className="text-teal"> Hope </span>
              to
              <span className="text-yellow"> Hire</span>
            </h1>

            <p className="text-lg md:text-xl mb-12 text-gray-600 max-w-3xl mx-auto">
              Empowering individuals with second chances through workforce readiness and meaningful employment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/organizations">
                <Button size="lg" className="w-full sm:w-auto bg-teal text-white hover:bg-teal-dark">
                  Support Your Clients
                </Button>
              </Link>
              <Link href="/volunteers">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-300 hover:bg-gray-50">
                  Start Volunteering
                </Button>
              </Link>
              <Link href="/employers">
                <Button size="lg" className="w-full sm:w-auto bg-yellow text-dark-text hover:bg-yellow-dark">
                  Hire Job-Ready Candidates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-center text-gray-600 mb-2 text-lg font-medium">Resumes Written</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={3250} duration={5000} />
                </p>
                <p className="text-center text-gray-500">Professional resumes created</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-center text-gray-600 mb-2 text-lg font-medium">Interviews Conducted</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={1875} duration={5000} />
                </p>
                <p className="text-center text-gray-500">Mock interviews with feedback</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardContent className="p-8">
                <h3 className="text-center text-gray-600 mb-2 text-lg font-medium">Job Placements Made</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={925} duration={5000} />
                </p>
                <p className="text-center text-gray-500">Successful career placements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Impact</h2>
            <p className="text-lg text-gray-600">
              Together, we're creating meaningful change in the lives of formerly incarcerated individuals.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Top Contributors</h2>
              <p className="text-lg text-gray-600">
                Recognizing the volunteers who are making a difference in our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-t-4 border-teal">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Trophy className="text-teal mr-2" />
                    <h3 className="text-xl font-bold text-dark-text">Monthly Leaders</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Johnson', role: 'HR Director', image: '/team-member-1.jpg', count: 42 },
                      { name: 'Michael Chen', role: 'Recruiter', image: '/team-member-2.jpg', count: 37 },
                      { name: 'David Rodriguez', role: 'Career Coach', image: '/team-member-3.jpg', count: 29 },
                    ].map((person, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image src={person.image} alt={person.name} width={40} height={40} className="object-cover" loading="lazy" sizes="40px" />
                          </div>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="bg-teal-light/20 text-teal text-sm px-3 py-1 rounded-full">{person.count} resumes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-yellow">
                <CardContent className="p-6">
                  <div className="flex items-center mb-6">
                    <Trophy className="text-yellow mr-2" />
                    <h3 className="text-xl font-bold text-dark-text">Yearly Leaders</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Jennifer Williams', role: 'HR Manager', image: '/team-member-4.png', count: 312 },
                      { name: 'Robert Taylor', role: 'Talent Acquisition', image: '/team-member-5.png', count: 287 },
                      { name: 'Lisa Martinez', role: 'Career Specialist', image: '/team-member-6.jpg', count: 253 },
                    ].map((person, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                            <Image src={person.image} alt={person.name} width={40} height={40} className="object-cover" loading="lazy" sizes="40px" />
                          </div>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="bg-yellow-light/30 text-yellow-dark text-sm px-3 py-1 rounded-full">{person.count} resumes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto grid gap-6 text-center">
            <h2 className="text-3xl font-bold text-dark-text">Ready to Make a Difference?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of volunteers, employers, and organizations committed to creating second chances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-teal text-white hover:bg-teal-dark">Get Started Today</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

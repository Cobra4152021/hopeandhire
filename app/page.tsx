import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, FileText, Users, Briefcase, Star, ArrowRight, Mail, CheckCircle, Heart, Target } from 'lucide-react';
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
      {/* Hero Section with Teal Gradient */}
      <section className="bg-gradient-to-br from-teal-light/20 via-white to-yellow-light/10 py-12 md:py-20 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="grid grid-cols-3 mb-12 w-full max-w-3xl mx-auto rounded-2xl shadow-xl border border-teal/20 overflow-hidden bg-white/95 backdrop-blur-sm">
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
              <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-4 py-2 rounded-full text-sm font-medium border border-gray-200">
                Empowering second chances
              </span>
              <span className="bg-teal/10 text-teal px-4 py-2 rounded-full text-sm font-medium border border-teal/20">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
              <Link href="/organizations">
                <Button size="lg" className="w-full bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl transition-all duration-300">
                  Support Your Clients
                </Button>
              </Link>
              <Link href="/volunteers">
                <Button size="lg" variant="outline" className="w-full border-2 border-teal text-teal hover:bg-teal hover:text-white shadow-md hover:shadow-lg transition-all duration-300">
                  Start Volunteering
                </Button>
              </Link>
              <Link href="/employers">
                <Button size="lg" className="w-full bg-yellow text-dark-text hover:bg-yellow-dark shadow-lg hover:shadow-xl transition-all duration-300">
                  Hire Job-Ready Candidates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats with enhanced cards and animated icons */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-teal group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <FileText className="h-12 w-12 text-teal group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-center text-gray-600 mb-2 text-lg font-medium">Resumes Written</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={3250} duration={5000} />
                </p>
                <p className="text-center text-gray-500">Professional resumes created</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-yellow group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Users className="h-12 w-12 text-yellow group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-center text-gray-600 mb-2 text-lg font-medium">Interviews Conducted</h3>
                <p className="text-center text-teal text-5xl font-bold mb-2">
                  <AnimatedCounter end={1875} duration={5000} />
                </p>
                <p className="text-center text-gray-500">Mock interviews with feedback</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-teal-dark group">
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">
                  <Briefcase className="h-12 w-12 text-teal-dark group-hover:scale-110 transition-transform duration-300" />
                </div>
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

      {/* Success Stories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-lg text-gray-600">
              Real transformations from our community members who found their path to meaningful employment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-teal/10 to-teal/5 p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-teal mr-2" />
                    <span className="text-sm font-medium text-teal">Success Story</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Marcus Johnson</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    "After 8 years, I thought no one would give me a chance. Hope & Hire helped me build confidence and land a job in construction management."
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-semibold text-red-600">Unemployed</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-semibold text-teal">Site Manager</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-yellow/10 to-yellow/5 p-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-6 w-6 text-yellow mr-2" />
                    <span className="text-sm font-medium text-yellow">Success Story</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">Sarah Williams</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    "The interview coaching was a game-changer. I went from nervous to confident and secured my dream job in healthcare administration."
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-semibold text-red-600">Multiple Rejections</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-semibold text-teal">Healthcare Admin</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-teal-dark/10 to-teal-dark/5 p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-teal-dark mr-2" />
                    <span className="text-sm font-medium text-teal-dark">Success Story</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">James Rodriguez</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    "From day laborer to restaurant owner. The business mentorship program helped me start my own catering company."
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-semibold text-red-600">Day Labor</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-semibold text-teal">Business Owner</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-teal/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">What People Say</h2>
            <p className="text-lg text-gray-600">
              Hear from volunteers, employers, and job seekers about their experience with Hope & Hire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Volunteering with Hope & Hire has been incredibly rewarding. Seeing candidates land their dream jobs makes every session worthwhile."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal/20 flex items-center justify-center mr-3">
                    <span className="text-teal font-bold">EM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Emily Martinez</p>
                    <p className="text-sm text-gray-500">Volunteer Resume Coach</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "Hope & Hire connected us with amazing talent. These candidates bring unique perspectives and strong work ethic to our team."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-yellow/20 flex items-center justify-center mr-3">
                    <span className="text-yellow-dark font-bold">DT</span>
                  </div>
                  <div>
                    <p className="font-semibold">David Thompson</p>
                    <p className="text-sm text-gray-500">HR Director, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "The support I received was life-changing. Not just job placement, but genuine care for my success and growth as a person."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-teal-dark/20 flex items-center justify-center mr-3">
                    <span className="text-teal-dark font-bold">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold">Alex Lopez</p>
                    <p className="text-sm text-gray-500">Manufacturing Specialist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact with teal background */}
      <section className="py-16 bg-gradient-to-br from-teal/5 to-teal-light/10">
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
              <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
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
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-teal/20">
                            <Image src={person.image} alt={person.name} width={40} height={40} className="object-cover" loading="lazy" sizes="40px" />
                          </div>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="bg-teal/10 text-teal text-sm px-3 py-1 rounded-full border border-teal/20">{person.count} resumes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-yellow shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
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
                          <div className="w-10 h-10 rounded-full overflow-hidden mr-3 ring-2 ring-yellow/20">
                            <Image src={person.image} alt={person.name} width={40} height={40} className="object-cover" loading="lazy" sizes="40px" />
                          </div>
                          <div>
                            <p className="font-medium">{person.name}</p>
                            <p className="text-sm text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="bg-yellow/20 text-yellow-dark text-sm px-3 py-1 rounded-full border border-yellow/30">{person.count} resumes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-16 bg-gradient-to-r from-teal to-teal-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <Mail className="h-16 w-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="text-teal-light text-lg mb-8">
              Get the latest success stories, volunteer opportunities, and impact updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-yellow focus:outline-none"
              />
              <Button className="bg-yellow text-dark-text hover:bg-yellow-dark px-6 py-3 font-semibold">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-teal-light text-sm mt-4">
              No spam, unsubscribe anytime. Your email helps us build a stronger community.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced design */}
      <section className="py-16 bg-gradient-to-r from-white via-teal/5 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-6 text-center">
            <h2 className="text-3xl font-bold text-dark-text">Ready to Make a Difference?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Join our community of volunteers, employers, and organizations committed to creating second chances.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl transition-all duration-300">Get Started Today</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="border-2 border-teal text-teal hover:bg-teal hover:text-white shadow-md hover:shadow-lg transition-all duration-300">
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

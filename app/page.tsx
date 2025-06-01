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
            <div className="grid grid-cols-3 mb-8 md:mb-12 w-full max-w-3xl mx-auto rounded-2xl shadow-xl border border-teal/20 overflow-hidden bg-white/95 backdrop-blur-sm">
              <div className="h-40 md:h-48 lg:h-64 relative">
                <Image
                  src="/612x612.jpg"
                  alt="Diverse workers collaborating"
                  fill
                  className="object-cover object-right"
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 300px, 400px"
                  priority
                />
              </div>
              <div className="flex items-center justify-center bg-white px-2 md:px-4">
                <Image
                  src="/logo.png"
                  alt="Hope and Hire Logo"
                  width={200}
                  height={80}
                  className="h-auto w-full object-contain"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 150px, 200px"
                />
              </div>
              <div className="h-40 md:h-48 lg:h-64 relative">
                <Image
                  src="/1612x612.jpg"
                  alt="Professional team meeting"
                  fill
                  className="object-cover object-left"
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 300px, 400px"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 mb-6 md:mb-8">
              <span className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-gray-200">
                Empowering second chances
              </span>
              <span className="bg-teal/10 text-teal px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium border border-teal/20">
                Building bridges to opportunity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 text-gray-900 leading-tight">
              Bridging the Gap from
              <span className="text-teal"> Hope </span>
              to
              <span className="text-yellow"> Hire</span>
            </h1>

            <p className="text-base md:text-lg lg:text-xl mb-8 md:mb-12 text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Empowering individuals with second chances through workforce readiness and meaningful employment.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 justify-center max-w-4xl mx-auto">
              <Link href="/organizations" className="w-full">
                <Button 
                  size="lg" 
                  className="w-full bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation active:scale-95 text-sm md:text-base py-3 md:py-4"
                >
                  Support Your Clients
                </Button>
              </Link>
              <Link href="/volunteers" className="w-full">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="w-full border-2 border-teal text-teal hover:bg-teal hover:text-white shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation active:scale-95 text-sm md:text-base py-3 md:py-4"
                >
                  Start Volunteering
                </Button>
              </Link>
              <Link href="/employers" className="w-full sm:col-span-2 lg:col-span-1">
                <Button 
                  size="lg" 
                  className="w-full bg-yellow text-dark-text hover:bg-yellow-dark shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation active:scale-95 text-sm md:text-base py-3 md:py-4"
                >
                  Hire Job-Ready Candidates
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats with enhanced cards and animated icons */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-teal group">
              <CardContent className="p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <FileText className="h-10 w-10 md:h-12 md:w-12 text-teal group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-center text-gray-600 mb-2 text-base md:text-lg font-medium">Resumes Written</h3>
                <p className="text-center text-teal text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  <AnimatedCounter end={67} duration={3000} />
                </p>
                <p className="text-center text-gray-500 text-sm md:text-base">Professional resumes created</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-yellow group">
              <CardContent className="p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <Users className="h-10 w-10 md:h-12 md:w-12 text-yellow group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-center text-gray-600 mb-2 text-base md:text-lg font-medium">Interviews Conducted</h3>
                <p className="text-center text-teal text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  <AnimatedCounter end={34} duration={3000} />
                </p>
                <p className="text-center text-gray-500 text-sm md:text-base">Mock interviews with feedback</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-t-4 border-teal-dark group">
              <CardContent className="p-6 md:p-8">
                <div className="flex justify-center mb-4">
                  <Briefcase className="h-10 w-10 md:h-12 md:w-12 text-teal-dark group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-center text-gray-600 mb-2 text-base md:text-lg font-medium">Job Placements Made</h3>
                <p className="text-center text-teal text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
                  <AnimatedCounter end={15} duration={3000} />
                </p>
                <p className="text-center text-gray-500 text-sm md:text-base">Successful career placements</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Success Stories</h2>
            <p className="text-base md:text-lg text-gray-600">
              Real transformations from our community members who found their path to meaningful employment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-teal/10 to-teal/5 p-4 md:p-6">
                  <div className="flex items-center mb-4">
                    <Heart className="h-5 w-5 md:h-6 md:w-6 text-teal mr-2" />
                    <span className="text-xs md:text-sm font-medium text-teal">Success Story</span>
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2">Marcus Johnson</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    "After 8 years, I thought no one would give me a chance. Hope & Hire helped me build confidence and land a job in construction management."
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-semibold text-red-600 text-sm">Unemployed</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-semibold text-teal text-sm">Site Manager</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-yellow/10 to-yellow/5 p-4 md:p-6">
                  <div className="flex items-center mb-4">
                    <Target className="h-5 w-5 md:h-6 md:w-6 text-yellow mr-2" />
                    <span className="text-xs md:text-sm font-medium text-yellow">Success Story</span>
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2">Sarah Williams</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    "The interview coaching was a game-changer. I went from nervous to confident and secured my dream job in healthcare administration."
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-semibold text-red-600 text-sm">Multiple Rejections</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-semibold text-teal text-sm">Healthcare Admin</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden md:col-span-2 lg:col-span-1">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-teal-dark/10 to-teal-dark/5 p-4 md:p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-teal-dark mr-2" />
                    <span className="text-xs md:text-sm font-medium text-teal-dark">Success Story</span>
                  </div>
                  <h3 className="font-bold text-base md:text-lg mb-2">James Rodriguez</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    "From day laborer to restaurant owner. The business mentorship program helped me start my own catering company."
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Before</p>
                      <p className="font-semibold text-red-600 text-sm">Day Labor</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">After</p>
                      <p className="font-semibold text-teal text-sm">Business Owner</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-gray-50 to-teal/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">What People Say</h2>
            <p className="text-base md:text-lg text-gray-600">
              Hear from volunteers, employers, and job seekers about their experience with Hope & Hire.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic text-sm md:text-base leading-relaxed">
                  "Volunteering with Hope & Hire has been incredibly rewarding. Seeing candidates land their dream jobs makes every session worthwhile."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal/20 flex items-center justify-center mr-3">
                    <span className="text-teal font-bold text-sm">EM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Emily Martinez</p>
                    <p className="text-xs md:text-sm text-gray-500">Volunteer Resume Coach</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic text-sm md:text-base leading-relaxed">
                  "Hope & Hire connected us with amazing talent. These candidates bring unique perspectives and strong work ethic to our team."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-yellow/20 flex items-center justify-center mr-3">
                    <span className="text-yellow-dark font-bold text-sm">DT</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">David Thompson</p>
                    <p className="text-xs md:text-sm text-gray-500">HR Director, TechCorp</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 md:col-span-3 lg:col-span-1">
              <CardContent className="p-4 md:p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 md:h-5 md:w-5 text-yellow fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic text-sm md:text-base leading-relaxed">
                  "The support I received was life-changing. Not just job placement, but genuine care for my success and growth as a person."
                </p>
                <div className="flex items-center">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-teal-dark/20 flex items-center justify-center mr-3">
                    <span className="text-teal-dark font-bold text-sm">AL</span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm md:text-base">Alex Lopez</p>
                    <p className="text-xs md:text-sm text-gray-500">Manufacturing Specialist</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Impact with teal background */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-teal/5 to-teal-light/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Our Impact</h2>
            <p className="text-base md:text-lg text-gray-600">
              Together, we're creating meaningful change in the lives of formerly incarcerated individuals.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">Top Contributors</h2>
              <p className="text-base md:text-lg text-gray-600">
                Recognizing the volunteers who are making a difference in our community.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center mb-6">
                    <Trophy className="text-teal mr-2 h-5 w-5 md:h-6 md:w-6" />
                    <h3 className="text-lg md:text-xl font-bold text-dark-text">Monthly Leaders</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Sarah Johnson', role: 'HR Director', image: '/team-member-1.jpg', count: 42 },
                      { name: 'Michael Chen', role: 'Recruiter', image: '/team-member-2.jpg', count: 37 },
                      { name: 'David Rodriguez', role: 'Career Coach', image: '/team-member-3.jpg', count: 29 },
                    ].map((person, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden mr-3 ring-2 ring-teal/20 relative">
                            <Image 
                              src={person.image} 
                              alt={person.name} 
                              fill
                              className="object-cover" 
                              sizes="(max-width: 768px) 32px, 40px"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm md:text-base">{person.name}</p>
                            <p className="text-xs md:text-sm text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="bg-teal/10 text-teal text-xs md:text-sm px-2 md:px-3 py-1 rounded-full border border-teal/20">{person.count} resumes</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-yellow shadow-lg hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center mb-6">
                    <Trophy className="text-yellow mr-2 h-5 w-5 md:h-6 md:w-6" />
                    <h3 className="text-lg md:text-xl font-bold text-dark-text">Yearly Leaders</h3>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Jennifer Williams', role: 'HR Manager', image: '/team-member-4.jpg', count: 312 },
                      { name: 'Robert Taylor', role: 'Talent Acquisition', image: '/team-member-5.jpg', count: 287 },
                      { name: 'Lisa Martinez', role: 'Career Specialist', image: '/team-member-6.jpg', count: 253 },
                    ].map((person, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full overflow-hidden mr-3 ring-2 ring-yellow/20 relative">
                            <Image 
                              src={person.image} 
                              alt={person.name} 
                              fill
                              className="object-cover" 
                              sizes="(max-width: 768px) 32px, 40px"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm md:text-base">{person.name}</p>
                            <p className="text-xs md:text-sm text-gray-500">{person.role}</p>
                          </div>
                        </div>
                        <div className="bg-yellow/20 text-yellow-dark text-xs md:text-sm px-2 md:px-3 py-1 rounded-full border border-yellow/30">{person.count} resumes</div>
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
      <section className="py-12 md:py-16 bg-gradient-to-r from-teal to-teal-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <Mail className="h-12 w-12 md:h-16 md:w-16 text-white mx-auto mb-4 md:mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="text-teal-light text-base md:text-lg mb-6 md:mb-8 leading-relaxed">
              Get the latest success stories, volunteer opportunities, and impact updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-yellow focus:outline-none text-sm md:text-base"
                aria-label="Email address for newsletter"
              />
              <Button className="bg-yellow text-dark-text hover:bg-yellow-dark px-4 md:px-6 py-3 font-semibold touch-manipulation active:scale-95 text-sm md:text-base">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-teal-light text-xs md:text-sm mt-4">
              No spam, unsubscribe anytime. Your email helps us build a stronger community.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section with enhanced design */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-white via-teal/5 to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto grid grid-cols-1 gap-4 md:gap-6 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-dark-text">Ready to Make a Difference?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Join our community of volunteers, employers, and organizations committed to creating second chances.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button className="w-full bg-teal text-white hover:bg-teal-dark shadow-lg hover:shadow-xl transition-all duration-300 touch-manipulation active:scale-95 text-sm md:text-base py-3">
                  Get Started Today
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-2 border-teal text-teal hover:bg-teal hover:text-white shadow-md hover:shadow-lg transition-all duration-300 touch-manipulation active:scale-95 text-sm md:text-base py-3">
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

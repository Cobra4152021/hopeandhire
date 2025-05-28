import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, Briefcase, GraduationCap, BarChart } from 'lucide-react';

const services = [
  {
    title: 'Resume Review',
    description: 'Professional resume review and optimization to help you stand out to employers.',
    icon: FileText,
    href: '/services/resume-review',
    color: 'bg-teal-light/20',
    textColor: 'text-teal',
  },
  {
    title: 'Interview Coaching',
    description:
      'Personalized interview preparation and practice to help you succeed in job interviews.',
    icon: Users,
    href: '/services/interview-coaching',
    color: 'bg-yellow-light/20',
    textColor: 'text-yellow',
  },
  {
    title: 'Career Counseling',
    description: 'Guidance and support to help you identify and pursue your career goals.',
    icon: GraduationCap,
    href: '/services/career-counseling',
    color: 'bg-teal-light/20',
    textColor: 'text-teal',
  },
  {
    title: 'Job Matching',
    description:
      'Connecting you with employers who are looking for candidates with your skills and experience.',
    icon: Briefcase,
    href: '/services/job-matching',
    color: 'bg-yellow-light/20',
    textColor: 'text-yellow',
  },
  {
    title: 'Skills Development',
    description:
      "Workshops and training to help you develop the skills needed for today's workforce.",
    icon: BarChart,
    href: '/services/skills-development',
    color: 'bg-teal-light/20',
    textColor: 'text-teal',
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo Section - Centrally positioned below header */}
      <div className="flex justify-center py-8 bg-white">
        <Image
          src="/logo.png"
          alt="Hope and Hire Logo"
          width={200}
          height={80}
          className="h-auto"
          priority
        />
      </div>

      {/* Hero Section */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-text">Our Services</h1>
            <p className="text-lg mb-8 text-gray-600">
              Hope and Hire offers a range of services to help job seekers prepare for, find, and
              succeed in meaningful employment opportunities.
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div
                    className={`${service.color} p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                  >
                    <service.icon className={`h-6 w-6 ${service.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-dark-text">{service.title}</h3>
                  <p className="text-gray-600 mb-6 flex-grow">{service.description}</p>
                  <Link href={service.href}>
                    <Button
                      variant="outline"
                      className="w-full border-teal text-teal hover:bg-teal hover:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                At Hope and Hire, we understand that finding meaningful employment can be
                challenging, especially for individuals facing barriers such as justice involvement,
                gaps in employment history, or other obstacles.
              </p>
              <p className="text-gray-600 mb-4">
                Our services are designed to address these challenges by providing personalized
                support, professional guidance, and connections to employers who are committed to
                providing second chances.
              </p>
              <p className="text-gray-600 mb-4">
                We work with each individual to identify their strengths, address areas for growth,
                and develop a personalized plan for achieving their employment goals.
              </p>
              <p className="text-gray-600">
                Through our network of volunteer professionals and employer partners, we provide the
                resources, support, and opportunities needed to build a sustainable career.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/diverse-professionals-meeting.png"
                alt="Hope and Hire team helping job seekers"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6 text-dark-text">Eligibility</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our services are available to individuals who face barriers to employment and are
            committed to building a stable career.
          </p>
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-4">
                  Hope and Hire primarily serves individuals who:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-gray-600">
                  <li>Have justice involvement or criminal records</li>
                  <li>Have significant gaps in employment history</li>
                  <li>Are in recovery from substance use disorders</li>
                  <li>Are experiencing homelessness or housing instability</li>
                  <li>Face other significant barriers to employment</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  If you&apos;re unsure about your eligibility, please{' '}
                  <Link href="/contact" className="text-teal hover:underline">
                    contact us
                  </Link>{' '}
                  to discuss your situation. We&apos;re committed to helping as many individuals as
                  possible find pathways to meaningful employment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Ready to Get Started?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the first step toward your career goals by registering for our services today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Register Now</Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                className="border-teal text-teal hover:bg-teal hover:text-white"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

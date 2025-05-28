import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Hope and Hire',
  description:
    "Learn about Hope and Hire's mission, story, values, and team. We are dedicated to empowering individuals with second chances through workforce readiness and meaningful employment opportunities.",
  openGraph: {
    title: 'About Us | Hope and Hire',
    description:
      "Learn about Hope and Hire's mission, story, values, and team. We are dedicated to empowering individuals with second chances through workforce readiness and meaningful employment opportunities.",
    images: [
      {
        url: '/diverse-professionals-meeting.png',
        width: 500,
        height: 400,
        alt: 'Hope and Hire team meeting',
      },
    ],
  },
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Ken Lomba',
      role: 'Executive Director',
      image: '/Ken.jpg',
      bio: 'Ken is a seasoned union leader with over 10 years of workforce development experience. He rebuilt a struggling union into a powerful force and has led successful nonprofit efforts to expand job opportunities for underserved communities.',
    },
    {
      name: 'Mark Lu',
      role: 'Director of Employer Relations',
      image: '/stylized-letters-mc.png',
      bio: 'Mark brings extensive experience in corporate partnerships and job placement, helping to build our network of employer partners.',
    },
    {
      name: 'Terry Uyeda',
      role: 'Volunteer Program Manager',
      image: '/Terry_Uyeda.jpg',
      bio: 'Terry, a military veteran and community advocate, coordinates our volunteer program to ensure job seekers receive compassionate, effective support. He&apos;s dedicated to public safety and helping others build better futures.',
    },
    {
      name: 'Open',
      role: 'Career Services Director',
      image: '/stylized-letters-dr.png',
      bio: 'We are seeking a dedicated professional to oversee our career services programs, bringing expertise in career counseling and job readiness training.',
    },
  ];

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
          quality={90}
        />
      </div>

      {/* Hero Section */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-text">Our Mission</h1>
            <p className="text-lg mb-8 text-gray-600">
              Hope and Hire is dedicated to empowering individuals with second chances through
              workforce readiness and meaningful employment opportunities. We believe that everyone
              deserves the opportunity to build a stable and fulfilling career.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-dark-text">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Hope and Hire was founded in March of 2025 by a group of professionals who
                recognized the significant barriers to employment faced by individuals with justice
                involvement, gaps in employment history, and other challenges.
              </p>
              <p className="text-gray-600 mb-4">
                What began as a small volunteer initiative has grown into a comprehensive program
                that connects job seekers with volunteer professionals, supportive employers, and
                community resources.
              </p>
              <p className="text-gray-600">
                Today, Hope and Hire serves hundreds of job seekers annually, providing resume
                assistance, interview coaching, career counseling, and job matching services to help
                individuals build sustainable careers.
              </p>
              <p className="text-gray-600 mt-4">
                The Hope and Hire rehabilitation program was created by the charitable nonprofit{' '}
                <a
                  href="https://protectingsanfrancisco.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal hover:underline"
                >
                  Protecting San Francisco
                </a>
                , an organization formed by deputy sheriffs and community members dedicated to
                giving back to San Francisco and enhancing public safety. Our mission with Hope and
                Hire is to assist incarcerated and formerly incarcerated individuals in successfully
                re-entering society by providing pathways to employment. By supporting job readiness
                and placement, we help participants reintegrate productively and lawfully, reducing
                recidivism and strengthening our community.
              </p>
            </div>
            <div className="hidden md:block">
              <Image
                src="/diverse-professionals-meeting.png"
                alt="Hope and Hire team meeting"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
                loading="eager"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-t-4 border-teal">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-dark-text">Dignity and Respect</h3>
                <p className="text-gray-600">
                  We believe in treating every individual with dignity and respect, recognizing
                  their inherent worth and potential regardless of their past experiences or current
                  circumstances.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-yellow">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-dark-text">Opportunity and Growth</h3>
                <p className="text-gray-600">
                  We are committed to creating opportunities for growth and development, empowering
                  individuals to build skills, confidence, and connections that lead to sustainable
                  employment.
                </p>
              </CardContent>
            </Card>
            <Card className="border-t-4 border-teal">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 text-dark-text">
                  Community and Collaboration
                </h3>
                <p className="text-gray-600">
                  We believe in the power of community and collaboration, working together with
                  volunteers, employers, organizations, and job seekers to create pathways to
                  meaningful employment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                      <Image
                        src={member.image || '/placeholder.svg'}
                        alt={member.name}
                        width={96}
                        height={96}
                        className="object-cover"
                        loading="lazy"
                        sizes="96px"
                      />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-dark-text">{member.name}</h3>
                  <p className="text-teal font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 text-dark-text">Our Impact</h2>
          <p className="text-gray-600 mb-12 max-w-3xl mx-auto">
            Since our founding, Hope and Hire has made a significant impact in the lives of job
            seekers and the broader community.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-teal text-5xl font-bold mb-2">3,250+</p>
              <p className="text-gray-600">Resumes created and optimized</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-teal text-5xl font-bold mb-2">1,875+</p>
              <p className="text-gray-600">Mock interviews conducted</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-teal text-5xl font-bold mb-2">925+</p>
              <p className="text-gray-600">Successful job placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">Join Our Mission</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're a job seeker, volunteer, employer, or organization, there are many ways
            to get involved with Hope and Hire.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Get Started Today</Button>
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

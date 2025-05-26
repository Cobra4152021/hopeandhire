import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQPage() {
  const faqs = [
    {
      category: 'For Job Seekers',
      questions: [
        {
          question: 'How can Hope and Hire help me find employment?',
          answer:
            'Hope and Hire connects you with volunteer professionals who provide resume assistance, interview coaching, and job search strategies. We also partner with employers committed to providing meaningful employment opportunities.',
        },
        {
          question: 'What services are available to job seekers?',
          answer:
            'Our services include resume writing assistance, mock interviews, career counseling, job matching, and skills development workshops. All services are provided at no cost to eligible job seekers.',
        },
        {
          question: 'How do I qualify for Hope and Hire services?',
          answer:
            'Our services are primarily designed for individuals facing barriers to employment, including those with justice involvement, gaps in employment history, or other challenges. Contact us or register on our platform to determine your eligibility.',
        },
        {
          question: 'Is there a cost for job seekers to use Hope and Hire?',
          answer:
            'No, all of our services are provided at no cost to job seekers. Our mission is to remove barriers to employment, not create new ones.',
        },
      ],
    },
    {
      category: 'For Volunteers',
      questions: [
        {
          question: 'What volunteer opportunities are available?',
          answer:
            'Volunteers can contribute in various ways, including resume review, mock interviews, career coaching, job search strategy sessions, and mentorship. You can choose opportunities based on your skills and availability.',
        },
        {
          question: 'How much time do I need to commit as a volunteer?',
          answer:
            'Volunteer commitments are flexible. You can contribute as little as 1-2 hours per week or month, depending on your availability. We offer both one-time and ongoing volunteer opportunities.',
        },
        {
          question: 'Do I need specific qualifications to volunteer?',
          answer:
            "While professional experience in HR, recruiting, or career services is helpful for certain roles, it's not required for all volunteer positions. We value diverse skills and perspectives and provide training for all volunteers.",
        },
        {
          question: 'How do I get started as a volunteer?',
          answer:
            'Register on our platform, complete a brief orientation, and select the volunteer opportunities that match your interests and availability. Our team will guide you through the process and provide necessary resources.',
        },
      ],
    },
    {
      category: 'For Employers',
      questions: [
        {
          question: 'Why should my company partner with Hope and Hire?',
          answer:
            "Partnering with Hope and Hire gives you access to pre-screened, job-ready candidates who are motivated to succeed. You'll also receive ongoing support to ensure successful employment outcomes and demonstrate your commitment to community development.",
        },
        {
          question: 'What support does Hope and Hire provide to employers?',
          answer:
            'We provide pre-screening of candidates, matching based on skills and requirements, post-hire check-ins, resources for workplace integration, and a dedicated employer relationship manager to support your hiring needs.',
        },
        {
          question: 'How do I post job openings on Hope and Hire?',
          answer:
            'Register as an employer on our platform, complete your company profile, and submit your job openings with detailed requirements. Our team will help match qualified candidates to your positions.',
        },
        {
          question:
            'Is there a cost for employers to use Hope and Hire services?',
          answer:
            'Our basic services are provided at no cost to employers. We may offer premium services for a fee, but our primary goal is to create successful employment matches that benefit both employers and job seekers.',
        },
      ],
    },
    {
      category: 'For Partner Organizations',
      questions: [
        {
          question: 'How can my organization partner with Hope and Hire?',
          answer:
            "Organizations can partner with us by referring clients, collaborating on programming, sharing resources, or providing financial support. Contact us to discuss partnership opportunities tailored to your organization's goals.",
        },
        {
          question:
            'What types of organizations does Hope and Hire partner with?',
          answer:
            'We partner with a diverse range of organizations, including community-based organizations, reentry programs, workforce development agencies, educational institutions, and government agencies that serve individuals facing barriers to employment.',
        },
        {
          question: 'What are the benefits of partnering with Hope and Hire?',
          answer:
            'Partners gain access to our volunteer network, employer connections, job readiness curriculum, and collaborative support to enhance their existing programs and improve employment outcomes for their clients.',
        },
        {
          question: 'How do I refer clients to Hope and Hire?',
          answer:
            "Partner organizations can refer clients through our online referral system or by contacting our partnership team directly. We'll work with you to ensure a smooth transition and comprehensive support for your clients.",
        },
      ],
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
        />
      </div>

      {/* Hero Section */}
      <section className="bg-light-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-dark-text">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600">
              Find answers to common questions about Hope and Hire&apos;s
              services and how we support job seekers, volunteers, employers,
              and partner organizations.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, index) => (
              <div key={index} className="mb-10">
                <h2 className="text-2xl font-bold mb-6 text-teal">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${index}-${faqIndex}`}
                      className="border rounded-lg p-2"
                    >
                      <AccordionTrigger className="text-left font-medium text-dark-text hover:text-teal">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 pt-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-12 bg-light-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-dark-text">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            We&apos;re here to help. Contact our team for more information about
            our services and how we can support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-teal text-white hover:bg-teal-dark">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

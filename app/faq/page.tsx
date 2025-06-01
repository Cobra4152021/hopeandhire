'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FileText, Users, Building, Heart, HelpCircle, Mail, Phone, ArrowRight, Search } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      category: 'For Job Seekers',
      icon: FileText,
      color: 'teal',
      questions: [
        {
          question: 'How can Hope and Hire help me find employment?',
          answer:
            'Hope and Hire connects you with volunteer professionals who provide resume assistance, interview coaching, and job search strategies. We also partner with employers committed to providing meaningful employment opportunities to individuals with diverse backgrounds.',
        },
        {
          question: 'What services are available to job seekers?',
          answer:
            'Our comprehensive services include professional resume writing assistance, mock interviews with feedback, career counseling, personalized job matching, skills development workshops, and ongoing support throughout your employment journey. All services are provided at no cost to eligible participants.',
        },
        {
          question: 'How do I qualify for Hope and Hire services?',
          answer:
            'Our services are designed for individuals facing barriers to employment, including those with justice involvement, significant gaps in employment history, or other challenges. We welcome anyone committed to building a better future. Contact us or register on our platform to determine your eligibility and get started.',
        },
        {
          question: 'Is there a cost for job seekers to use Hope and Hire?',
          answer:
            'No, all of our core services are provided completely free of charge to job seekers. Our mission is to remove barriers to employment, not create new ones. We believe everyone deserves access to quality career support regardless of their financial situation.',
        },
        {
          question: 'How long does the job search process typically take?',
          answer:
            'The timeline varies depending on individual circumstances, industry, and local job market conditions. Some participants find employment within a few weeks, while others may take several months. Our team provides ongoing support throughout your journey, and we focus on finding the right fit rather than rushing the process.',
        },
      ],
    },
    {
      category: 'For Volunteers',
      icon: Heart,
      color: 'yellow',
      questions: [
        {
          question: 'What volunteer opportunities are available?',
          answer:
            'Volunteers can contribute in various meaningful ways, including resume review and writing assistance, conducting mock interviews, providing career coaching, facilitating job search strategy sessions, offering mentorship, and sharing industry-specific expertise. You can choose opportunities that match your skills, experience, and availability.',
        },
        {
          question: 'How much time do I need to commit as a volunteer?',
          answer:
            'Volunteer commitments are completely flexible to accommodate your schedule. You can contribute as little as 1-2 hours per week or month, depending on your availability. We offer both one-time opportunities (like resume reviews) and ongoing commitments (like mentorship relationships). You control your level of involvement.',
        },
        {
          question: 'Do I need specific qualifications to volunteer?',
          answer:
            'While professional experience in HR, recruiting, or career services is helpful for certain roles, it\'s not required for all volunteer positions. We value diverse skills, perspectives, and life experiences. Many of our most effective volunteers bring expertise from various industries and backgrounds. We provide comprehensive training and ongoing support for all volunteers.',
        },
        {
          question: 'How do I get started as a volunteer?',
          answer:
            'Getting started is simple: register on our platform, complete a brief orientation session, select volunteer opportunities that interest you, and we\'ll provide necessary training and resources. Our volunteer coordinator will guide you through the process and help you find the best way to make an impact.',
        },
        {
          question: 'What support do volunteers receive?',
          answer:
            'All volunteers receive comprehensive training, ongoing support from our team, access to resources and templates, regular check-ins, and opportunities for feedback and improvement. We also provide recognition for your contributions and opportunities to connect with other volunteers in our community.',
        },
      ],
    },
    {
      category: 'For Employers',
      icon: Building,
      color: 'teal',
      questions: [
        {
          question: 'Why should my company partner with Hope and Hire?',
          answer:
            'Partnering with Hope and Hire gives you access to pre-screened, motivated, job-ready candidates who bring unique perspectives and strong work ethic. You\'ll receive ongoing support to ensure successful employment outcomes, demonstrate your commitment to community development, and may qualify for valuable tax incentives.',
        },
        {
          question: 'What support does Hope and Hire provide to employers?',
          answer:
            'We provide comprehensive employer support including candidate pre-screening and matching, interview preparation assistance, onboarding guidance, post-hire check-ins for 90 days, workplace integration resources, and a dedicated employer relationship manager. We\'re your partner in creating successful long-term employment relationships.',
        },
        {
          question: 'How do I post job openings with Hope and Hire?',
          answer:
            'Register as an employer on our platform, complete your company profile with information about your culture and values, and submit detailed job postings. Our team reviews each posting and actively works to match qualified candidates to your positions, handling initial screening to save you time.',
        },
        {
          question: 'Is there a cost for employers to use Hope and Hire services?',
          answer:
            'Our basic matching and support services are provided at no cost to employers. We believe in creating win-win situations for both employers and job seekers. While we may offer premium services in the future, our primary goal is to facilitate successful employment matches that benefit everyone involved.',
        },
        {
          question: 'What types of positions work best with your candidates?',
          answer:
            'Our candidates succeed in a wide variety of roles across many industries, from entry-level to skilled positions. Common successful placements include warehouse and logistics, customer service, administrative roles, retail, food service, construction, manufacturing, and healthcare support. We focus on matching skills and interests rather than limiting opportunities.',
        },
      ],
    },
    {
      category: 'For Partner Organizations',
      icon: Users,
      color: 'yellow',
      questions: [
        {
          question: 'How can my organization partner with Hope and Hire?',
          answer:
            'Organizations can partner with us in several ways: referring clients for services, collaborating on programming and events, sharing resources and expertise, providing space for workshops, offering specialized training, or providing financial support. We customize partnerships to align with your organization\'s mission and capabilities.',
        },
        {
          question: 'What types of organizations does Hope and Hire work with?',
          answer:
            'We partner with a diverse range of organizations including community-based nonprofits, reentry programs, workforce development agencies, educational institutions, social service organizations, faith-based groups, government agencies, and any organization that serves individuals facing employment barriers.',
        },
        {
          question: 'What are the benefits of partnering with Hope and Hire?',
          answer:
            'Partners gain access to our extensive volunteer network, employer connections, evidence-based curriculum, training resources, and collaborative support to enhance existing programs. You can expand service offerings to clients, improve employment outcomes, access new funding opportunities, and join a community of practice focused on employment success.',
        },
        {
          question: 'How do I refer clients to Hope and Hire?',
          answer:
            'Partner organizations can refer clients through our secure online referral system, by contacting our partnership team directly, or through joint intake processes we establish together. We work closely with you to ensure seamless transitions and comprehensive support for your clients throughout their journey.',
        },
        {
          question: 'Do you provide training for partner organization staff?',
          answer:
            'Yes, we offer training and professional development opportunities for partner organization staff on topics like employment readiness, motivational interviewing, case management best practices, and trauma-informed approaches. We believe in building capacity across our entire network.',
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-light/20 via-white to-teal/5 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <span className="bg-teal-light/20 text-teal px-4 py-2 rounded-full text-sm font-medium">
                  Get Answers Fast
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
                Frequently Asked <span className="text-teal">Questions</span>
              </h1>

              <p className="text-lg md:text-xl mb-8 text-gray-600 leading-relaxed">
                Find answers to common questions about Hope and Hire's services and how we 
                support job seekers, volunteers, employers, and partner organizations in our community.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-teal text-white hover:bg-teal-dark transition-all duration-300"
                  >
                    Ask a Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/resources">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-teal text-teal hover:bg-teal hover:text-white transition-all duration-300"
                  >
                    Browse Resources
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="relative">
                <Image
                  src="/faq-support.jpg"
                  alt="FAQ and support illustration"
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

      {/* Quick Help Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Quick Help by Category</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Jump to the section that's most relevant to you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {faqs.map((category, index) => {
              const IconComponent = category.icon;
              const isYellow = category.color === 'yellow';
              
              return (
                <Card key={index} className={`border-t-4 ${isYellow ? 'border-yellow' : 'border-teal'} shadow-lg hover:shadow-xl transition-all duration-300 group`}>
                  <CardContent className="pt-8 text-center">
                    <div className={`rounded-full ${isYellow ? 'bg-yellow-light/20 group-hover:bg-yellow' : 'bg-teal-light/20 group-hover:bg-teal'} w-16 h-16 flex items-center justify-center mx-auto mb-4 transition-all duration-300`}>
                      <IconComponent className={`${isYellow ? 'text-yellow group-hover:text-white' : 'text-teal group-hover:text-white'} h-8 w-8 transition-all duration-300`} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{category.category}</h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {category.questions.length} frequently asked questions
                    </p>
                    <a href={`#category-${index}`}>
                      <Button 
                        variant="outline" 
                        className={`w-full ${isYellow ? 'border-yellow text-yellow hover:bg-yellow' : 'border-teal text-teal hover:bg-teal'} hover:text-white transition-all duration-300`}
                      >
                        View Questions
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {faqs.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              const isYellow = category.color === 'yellow';
              
              return (
                <div key={categoryIndex} id={`category-${categoryIndex}`} className="mb-12">
                  <div className="flex items-center mb-8">
                    <div className={`rounded-full ${isYellow ? 'bg-yellow-light/20' : 'bg-teal-light/20'} w-12 h-12 flex items-center justify-center mr-4`}>
                      <IconComponent className={`${isYellow ? 'text-yellow' : 'text-teal'} h-6 w-6`} />
                    </div>
                    <h2 className={`text-3xl font-bold ${isYellow ? 'text-yellow' : 'text-teal'}`}>
                      {category.category}
                    </h2>
                  </div>
                  
                  <Card className="bg-white shadow-lg">
                    <CardContent className="p-6">
                      <Accordion type="single" collapsible className="space-y-4">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border rounded-lg px-4 py-2 hover:bg-gray-50 transition-all duration-200"
                          >
                            <AccordionTrigger className={`text-left font-semibold text-gray-900 hover:${isYellow ? 'text-yellow' : 'text-teal'} transition-colors duration-200 no-underline hover:no-underline`}>
                              <div className="flex items-start">
                                <HelpCircle className={`${isYellow ? 'text-yellow' : 'text-teal'} h-5 w-5 mr-3 mt-0.5 flex-shrink-0`} />
                                <span className="text-left">{faq.question}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600 pt-4 pb-2 ml-8 leading-relaxed">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Additional Help & Resources</h2>
              <p className="text-lg text-gray-600">
                Can't find what you're looking for? We're here to help in multiple ways.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="rounded-full bg-teal-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Search className="text-teal h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Resource Library</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Explore our comprehensive collection of guides, templates, and tools
                  </p>
                  <Link href="/resources" className="block w-full">
                    <Button className="w-full bg-teal text-white hover:bg-teal-dark transition-all duration-300">
                      Browse Resources
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-yellow shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="rounded-full bg-yellow-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="text-yellow h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Contact Support</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Get personalized help from our experienced support team
                  </p>
                  <Link href="/contact" className="block w-full">
                    <Button className="w-full bg-yellow text-white hover:bg-yellow-dark transition-all duration-300">
                      Get in Touch
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-t-4 border-teal shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-8 text-center">
                  <div className="rounded-full bg-teal-light/20 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="text-teal h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Phone Support</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Speak directly with our team for immediate assistance
                  </p>
                  <a href="tel:415-696-2428" className="block w-full">
                    <Button className="w-full bg-teal text-white hover:bg-teal-dark transition-all duration-300">
                      Call Now
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gradient-to-br from-teal to-teal-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            We're here to help. Contact our team for more information about our services and 
            how we can support you on your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-white text-teal hover:bg-gray-100">
                Contact Us
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-teal"
              >
                Get Started
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-md mx-auto">
              <div className="flex items-center justify-center">
                <Mail className="h-5 w-5 mr-2" />
                <span className="text-sm">info@hopeandhire.net</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-5 w-5 mr-2" />
                <span className="text-sm">415-696-2428</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

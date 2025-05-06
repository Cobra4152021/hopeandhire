import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

// Define service data
const services = {
  "resume-review": {
    title: "Resume Review",
    description: "Professional resume review and optimization to help you stand out to employers.",
    image: "/resume-review.png",
    features: [
      "One-on-one resume review with a professional volunteer",
      "Tailored feedback and recommendations",
      "ATS-friendly formatting and optimization",
      "Industry-specific keyword suggestions",
      "Follow-up review after revisions",
    ],
    benefits: [
      "Increase your chances of getting past applicant tracking systems",
      "Highlight your skills and experience effectively",
      "Address gaps in employment history strategically",
      "Receive guidance from professionals in your target industry",
      "Build confidence in your job application materials",
    ],
  },
  "interview-coaching": {
    title: "Interview Coaching",
    description: "Personalized interview preparation and practice to help you succeed in job interviews.",
    image: "/interview-coaching.png",
    features: [
      "Mock interviews with industry professionals",
      "Personalized feedback on your responses",
      "Guidance on answering difficult questions",
      "Body language and communication coaching",
      "Industry-specific interview preparation",
    ],
    benefits: [
      "Build confidence in your interview skills",
      "Learn how to effectively communicate your value",
      "Practice answering challenging questions",
      "Receive feedback from experienced professionals",
      "Reduce interview anxiety through preparation",
    ],
  },
  "career-counseling": {
    title: "Career Counseling",
    description: "Guidance and support to help you identify and pursue your career goals.",
    image: "/career-counseling.png",
    features: [
      "One-on-one career counseling sessions",
      "Skills and interests assessment",
      "Career path exploration and planning",
      "Goal setting and action planning",
      "Ongoing support and accountability",
    ],
    benefits: [
      "Gain clarity on your career goals and options",
      "Identify transferable skills and strengths",
      "Develop a realistic career plan",
      "Navigate career transitions effectively",
      "Build confidence in your career decisions",
    ],
  },
  "job-matching": {
    title: "Job Matching",
    description: "Connecting you with employers who are looking for candidates with your skills and experience.",
    image: "/job-matching.png",
    features: [
      "Personalized job matching based on your skills and goals",
      "Access to employers committed to second chances",
      "Job application support and follow-up",
      "Interview preparation for specific opportunities",
      "Post-placement support and coaching",
    ],
    benefits: [
      "Access opportunities that may not be publicly advertised",
      "Connect with employers who understand your background",
      "Receive support throughout the application process",
      "Increase your chances of finding meaningful employment",
      "Build relationships with supportive employers",
    ],
  },
  "skills-development": {
    title: "Skills Development",
    description: "Workshops and training to help you develop the skills needed for today's workforce.",
    image: "/skills-development.png",
    features: [
      "Industry-relevant skills training",
      "Digital literacy and computer skills",
      "Professional communication workshops",
      "Job search and networking skills",
      "Industry-specific certifications",
    ],
    benefits: [
      "Develop in-demand skills for your target industry",
      "Increase your marketability to employers",
      "Build confidence in your abilities",
      "Address skills gaps in your background",
      "Demonstrate commitment to professional growth",
    ],
  },
}

export default function ServicePage({ params }: { params: { service: string } }) {
  const service = services[params.service as keyof typeof services]

  // If service doesn't exist, return 404
  if (!service) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo Section - Centrally positioned below header */}
      <div className="flex justify-center py-8 bg-white">
        <Image src="/logo.png" alt="Hope and Hire Logo" width={200} height={80} className="h-auto" priority />
      </div>

      {/* Hero Section */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-dark-text">{service.title}</h1>
              <p className="text-lg mb-8 text-gray-600">{service.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/register">
                  <Button className="bg-teal text-white hover:bg-teal-dark">Get Started</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <Image
                src={service.image || "/placeholder.svg"}
                alt={service.title}
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-dark-text">Service Features</h3>
                <ul className="space-y-4">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-teal mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6 text-dark-text">Benefits</h3>
                <ul className="space-y-4">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-yellow mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Register</h3>
              <p className="text-gray-600">Create an account and complete your profile to get started.</p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Schedule</h3>
              <p className="text-gray-600">Book a session with one of our professional volunteers.</p>
            </div>
            <div className="text-center">
              <div className="rounded-full bg-teal text-white w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold mb-2 text-dark-text">Succeed</h3>
              <p className="text-gray-600">Receive personalized support and take steps toward your career goals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-dark-text">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <blockquote className="border-l-4 border-teal pl-4 italic text-gray-600 mb-4">
                  "The {service.title.toLowerCase()} service at Hope and Hire was instrumental in helping me secure my
                  current position. The personalized support and guidance made all the difference in my job search."
                </blockquote>
                <p className="font-medium">- Michael R., Program Participant</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <blockquote className="border-l-4 border-yellow pl-4 italic text-gray-600 mb-4">
                  "I was struggling to find employment due to gaps in my work history. The {service.title.toLowerCase()}{" "}
                  service helped me address these challenges effectively and present myself confidently to employers."
                </blockquote>
                <p className="font-medium">- Sarah T., Program Participant</p>
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
            Take the first step toward your career goals with our {service.title.toLowerCase()} service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button className="bg-teal text-white hover:bg-teal-dark">Register Now</Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

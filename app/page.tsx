import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, Building2, Handshake, CheckCircle, UserPlus } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Hope and Hire - Empowering Job Seekers",
  description: "Connecting job seekers with opportunities and employers with talent.",
  keywords: ["job search", "employment", "career", "hiring", "job seekers"],
  openGraph: {
    title: "Hope and Hire - Empowering Job Seekers",
    description: "Connecting job seekers with opportunities and employers with talent.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hope and Hire",
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Logo */}
      <section className="bg-light-bg py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <Image src="/logo.png" alt="Hope and Hire Logo" width={200} height={80} className="h-auto mb-8" priority />
            <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-6">
              Empowering Job Seekers, <br />
              Connecting Employers
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              We bridge the gap between talented individuals and meaningful employment opportunities. Our platform
              provides comprehensive support for job seekers and connects employers with qualified candidates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-teal text-white hover:bg-teal-dark">
                <Link href="/register">Get Started</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Trophy className="h-8 w-8 text-teal" />
                </div>
                <div className="text-center">
                  <AnimatedCounter end={500} duration={2} className="text-3xl font-bold text-dark-text" />
                  <p className="text-gray-600 mt-2">Jobs Posted</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-teal" />
                </div>
                <div className="text-center">
                  <AnimatedCounter end={1000} duration={2} className="text-3xl font-bold text-dark-text" />
                  <p className="text-gray-600 mt-2">Active Job Seekers</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-teal" />
                </div>
                <div className="text-center">
                  <AnimatedCounter end={50} duration={2} className="text-3xl font-bold text-dark-text" />
                  <p className="text-gray-600 mt-2">Partner Companies</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-light-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-dark-text mb-12">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                    <UserPlus className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-text">For Job Seekers</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Resume building and optimization</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Interview preparation and coaching</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Career counseling and guidance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                    <Building2 className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-text">For Employers</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Access to qualified candidates</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Streamlined hiring process</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Diversity and inclusion support</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="bg-teal-light/20 p-3 rounded-full mr-4">
                    <Handshake className="h-6 w-6 text-teal" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-text">Our Commitment</h3>
                </div>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Personalized support</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Continuous improvement</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-teal mr-2 mt-0.5 flex-shrink-0" />
                    <span>Long-term success focus</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our community of job seekers and employers working together to create meaningful employment
            opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="secondary" className="bg-white text-teal hover:bg-gray-100">
              <Link href="/register">Get Started</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-teal-dark">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

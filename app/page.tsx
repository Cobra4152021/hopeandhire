import Image from "next/image"
import Link from "next/link"
import { AnimatedCounter } from "@/components/animated-counter"
import { ensureAbsoluteUrl } from "@/lib/image-url"

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8 flex justify-center">
            <Image
              src={ensureAbsoluteUrl("/diverse-professionals-meeting.png") || "/placeholder.svg"}
              alt="Diverse professionals in a meeting"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>

          <div className="flex justify-center gap-4 mb-6">
            <span className="bg-gray-200 text-gray-700 px-4 py-1 rounded-full text-sm">Empowering second chances</span>
            <span className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm">
              Building bridges to opportunity
            </span>
          </div>

          <h1 className="text-5xl font-bold mb-6">
            Bridging the Gap from <span className="text-teal-500">Hope</span> to{" "}
            <span className="text-amber-500">Hire</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Empowering individuals with second chances through workforce readiness and meaningful employment.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/organizations"
              className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Support Your Clients
            </Link>
            <Link
              href="/volunteers"
              className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Start Volunteering
            </Link>
            <Link
              href="/employers"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Hire Job-Ready Candidates
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <h3 className="text-gray-600 mb-2">Resumes Written</h3>
              <AnimatedCounter end={0} className="text-5xl font-bold text-teal-500" />
              <p className="text-gray-500">Professional resumes created</p>
            </div>
            <div>
              <h3 className="text-gray-600 mb-2">Interviews Conducted</h3>
              <AnimatedCounter end={0} className="text-5xl font-bold text-teal-500" />
              <p className="text-gray-500">Mock interviews with feedback</p>
            </div>
            <div>
              <h3 className="text-gray-600 mb-2">Job Placements Made</h3>
              <AnimatedCounter end={0} className="text-5xl font-bold text-teal-500" />
              <p className="text-gray-500">Successful career placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src={ensureAbsoluteUrl("/resume-review.png") || "/placeholder.svg"}
                  alt="Resume Review"
                  width={300}
                  height={200}
                  className="rounded-md w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resume Building</h3>
              <p className="text-gray-600 mb-4">
                Professional resume creation and optimization to highlight skills and experience.
              </p>
              <Link href="/services/resume-building" className="text-teal-500 hover:text-teal-700 font-medium">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src={ensureAbsoluteUrl("/interview-coaching.png") || "/placeholder.svg"}
                  alt="Interview Coaching"
                  width={300}
                  height={200}
                  className="rounded-md w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interview Preparation</h3>
              <p className="text-gray-600 mb-4">
                Mock interviews and coaching to build confidence and improve interview skills.
              </p>
              <Link href="/services/interview-preparation" className="text-teal-500 hover:text-teal-700 font-medium">
                Learn more →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">
                <Image
                  src={ensureAbsoluteUrl("/skills-development.png") || "/placeholder.svg"}
                  alt="Skills Development"
                  width={300}
                  height={200}
                  className="rounded-md w-full h-40 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Skills Development</h3>
              <p className="text-gray-600 mb-4">
                Training and workshops to develop essential workplace and technical skills.
              </p>
              <Link href="/services/skills-development" className="text-teal-500 hover:text-teal-700 font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Success Stories</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Image
                  src={ensureAbsoluteUrl("/stylized-letters-mj.png") || "/placeholder.svg"}
                  alt="MJ"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Michael J.</h3>
                  <p className="text-gray-600 text-sm">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "The resume building and interview coaching services were instrumental in helping me secure a position
                as a software developer. The team's support and guidance made all the difference."
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <Image
                  src={ensureAbsoluteUrl("/stylized-letters-sw.png") || "/placeholder.svg"}
                  alt="SW"
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">Sarah W.</h3>
                  <p className="text-gray-600 text-sm">Administrative Assistant</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "After struggling to find employment, Hope and Hire helped me develop the skills and confidence I
                needed. Their holistic approach addressed all aspects of my job search."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of job seekers, employers, and volunteers to create meaningful opportunities and
            transform lives.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="bg-white text-teal-500 hover:bg-gray-100 px-6 py-3 rounded-md font-medium transition-colors"
            >
              Get Started Today
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-teal-600 text-white border border-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

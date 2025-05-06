import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FAQ - Hope and Hire",
  description: "Frequently asked questions about Hope and Hire",
}

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-teal-700">Frequently Asked Questions</h1>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
              <button className="w-full px-6 py-4 text-left font-medium text-teal-800 hover:bg-teal-50 transition-colors">
                What is Hope and Hire?
              </button>
              <div className="px-6 py-4 bg-teal-50 text-gray-700">
                <p>
                  Hope and Hire is a platform dedicated to connecting job seekers with employers and volunteer
                  recruiters who can help them find meaningful employment opportunities. Our mission is to provide hope
                  and support to those seeking employment through personalized assistance and resources.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
              <button className="w-full px-6 py-4 text-left font-medium text-teal-800 hover:bg-teal-50 transition-colors">
                How can I volunteer as a recruiter?
              </button>
              <div className="px-6 py-4 bg-teal-50 text-gray-700">
                <p>
                  To volunteer as a recruiter, visit our Volunteer page and complete the registration form. Once your
                  application is reviewed and approved, you'll gain access to our volunteer dashboard where you can help
                  job seekers with their resumes, conduct mock interviews, and match them with suitable job
                  opportunities.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
              <button className="w-full px-6 py-4 text-left font-medium text-teal-800 hover:bg-teal-50 transition-colors">
                I'm an employer. How can I post job opportunities?
              </button>
              <div className="px-6 py-4 bg-teal-50 text-gray-700">
                <p>
                  Employers can register on our platform through the Employers page. After creating an account, you'll
                  have access to our employer dashboard where you can post job opportunities, review applications, and
                  connect with potential candidates. Our volunteer recruiters can also help match qualified candidates
                  to your job postings.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
              <button className="w-full px-6 py-4 text-left font-medium text-teal-800 hover:bg-teal-50 transition-colors">
                How can job seekers benefit from Hope and Hire?
              </button>
              <div className="px-6 py-4 bg-teal-50 text-gray-700">
                <p>
                  Job seekers can access a variety of resources including resume reviews, mock interviews, and
                  personalized job matching services. You can also schedule appointments with our volunteer recruiters
                  who will provide guidance and support throughout your job search process. All services are provided at
                  no cost to job seekers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden border border-teal-100">
              <button className="w-full px-6 py-4 text-left font-medium text-teal-800 hover:bg-teal-50 transition-colors">
                Is Hope and Hire available internationally?
              </button>
              <div className="px-6 py-4 bg-teal-50 text-gray-700">
                <p>
                  Currently, Hope and Hire primarily serves job seekers and employers in the United States. However, we
                  are working on expanding our services to other countries. Stay tuned for updates on our international
                  expansion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

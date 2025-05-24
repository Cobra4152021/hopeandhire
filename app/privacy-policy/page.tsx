import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Logo Section - Centrally positioned below header */}
      <div className="flex justify-center py-8 bg-white">
        <Image src="/logo.png" alt="Hope and Hire Logo" width={200} height={80} className="h-auto" priority />
      </div>

      {/* Hero Section */}
      <section className="bg-light-bg py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-dark-text">Privacy Policy</h1>
            <p className="text-lg text-gray-600">Last Updated: May 5, 2023</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                Hope and Hire ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your information when you visit our website or use
                our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site or use our services.
              </p>

              <h2>Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>

              <h3>Personal Data</h3>
              <p>
                When you register for an account, apply for jobs, or use our services, we may collect personally
                identifiable information, such as:
              </p>
              <ul>
                <li>Name, email address, and phone number</li>
                <li>Employment history and educational background</li>
                <li>Skills, certifications, and professional qualifications</li>
                <li>Resume/CV and other application materials</li>
                <li>Login credentials</li>
              </ul>

              <h3>Usage Data</h3>
              <p>We may also collect information about how you access and use our website and services, including:</p>
              <ul>
                <li>IP address and browser type</li>
                <li>Pages you view and links you click</li>
                <li>Time spent on pages</li>
                <li>Device information</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul>
                <li>Provide, maintain, and improve our services</li>
                <li>Process job applications and match candidates with employers</li>
                <li>Communicate with you about our services, updates, and support</li>
                <li>Personalize your experience and deliver content relevant to your interests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Protect against, identify, and prevent fraud and other illegal activities</li>
              </ul>

              <h2>Disclosure of Your Information</h2>
              <p>We may share your information with:</p>
              <ul>
                <li>Employers and organizations when you apply for jobs or request to be connected</li>
                <li>Service providers who perform services on our behalf</li>
                <li>Professional advisors, such as lawyers, auditors, and insurers</li>
                <li>Government bodies when required by law</li>
              </ul>
              <p>We will not sell your personal information to third parties for marketing purposes.</p>

              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information from unauthorized
                access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or
                electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2>Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul>
                <li>The right to access and receive a copy of your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section
                below.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If you are a parent or guardian and believe your child has provided us with
                personal information, please contact us immediately.
              </p>

              <h2>Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>

              <h2>Contact Us</h2>
              <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
              <p>
                Hope and Hire
                <br />
                35 Gilbert Street
                <br />
                San Francisco CA 94103
                <br />
                Email: email@protectingsanfrancisco.com
                <br />
                Phone: 415-696-2428
              </p>
            </div>

            <div className="mt-12 text-center">
              <Link href="/">
                <Button className="bg-teal text-white hover:bg-teal-dark">Return to Home</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-dark-text">Privacy Policy</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600">Last Updated: May 5, 2023</p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">1. Introduction</h2>
          <p className="text-gray-600">
            Hope and Hire ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you visit our website hopeandhire.net,
            including any other media form, media channel, mobile website, or mobile application related or connected
            thereto (collectively, the "Site").
          </p>
          <p className="text-gray-600">
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access the Site.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">2. Information We Collect</h2>

          <h3 className="text-lg font-medium mt-6 mb-3 text-dark-text">Personal Data</h3>
          <p className="text-gray-600">
            We may collect personal information that you voluntarily provide to us when you register on the Site,
            express an interest in obtaining information about us or our products and services, participate in
            activities on the Site, or otherwise contact us. The personal information we collect may include:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>Name and contact information (email address, phone number, etc.)</li>
            <li>Employment history and professional qualifications</li>
            <li>Educational background</li>
            <li>Demographic information</li>
            <li>Payment information</li>
            <li>Other information you choose to provide</li>
          </ul>

          <h3 className="text-lg font-medium mt-6 mb-3 text-dark-text">Automatically Collected Information</h3>
          <p className="text-gray-600">
            When you access the Site, we may automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Access times</li>
            <li>Pages viewed</li>
            <li>Other browsing information</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">3. How We Use Your Information</h2>
          <p className="text-gray-600">We may use the information we collect for various purposes, including:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>Providing, maintaining, and improving our services</li>
            <li>Processing transactions and sending related information</li>
            <li>Responding to inquiries and providing customer support</li>
            <li>Sending administrative information</li>
            <li>Sending marketing and promotional communications</li>
            <li>Monitoring and analyzing usage and trends</li>
            <li>Protecting the security and integrity of our services</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">4. Disclosure of Your Information</h2>
          <p className="text-gray-600">We may share your information in the following situations:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>With service providers who perform services on our behalf</li>
            <li>With employers and organizations using our platform (with your consent)</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and the rights of others</li>
            <li>In connection with a business transaction such as a merger or acquisition</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">5. Your Privacy Rights</h2>
          <p className="text-gray-600">
            Depending on your location, you may have certain rights regarding your personal information, including:
          </p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>The right to access your personal information</li>
            <li>The right to correct inaccurate information</li>
            <li>The right to request deletion of your information</li>
            <li>The right to restrict or object to processing</li>
            <li>The right to data portability</li>
          </ul>
          <p className="text-gray-600">
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">6. Data Security</h2>
          <p className="text-gray-600">
            We implement appropriate technical and organizational measures to protect your personal information.
            However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">7. Changes to This Privacy Policy</h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. The updated version will be indicated by an updated
            "Last Updated" date. We encourage you to review this Privacy Policy frequently to stay informed about how we
            are protecting your information.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">8. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions or concerns about this Privacy Policy, please contact us at:
          </p>
          <p className="text-gray-600">
            Hope and Hire
            <br />
            123 Hope Street
            <br />
            Opportunity City
            <br />
            Email: privacy@hopeandhire.org
            <br />
            Phone: (555) 123-4567
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link href="/">
            <Button className="bg-teal text-white hover:bg-teal-dark">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

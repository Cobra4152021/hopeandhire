import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-dark-text">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600">Last Updated: May 5, 2023</p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">1. Agreement to Terms</h2>
          <p className="text-gray-600">
            These Terms of Service constitute a legally binding agreement made between you and Hope and Hire ("we,"
            "us," or "our"), concerning your access to and use of the hopeandhire.net website and any other media form,
            media channel, mobile website or mobile application related, linked, or otherwise connected thereto
            (collectively, the "Site").
          </p>
          <p className="text-gray-600">
            You agree that by accessing the Site, you have read, understood, and agree to be bound by all of these Terms
            of Service. If you do not agree with all of these Terms of Service, then you are expressly prohibited from
            using the Site and you must discontinue use immediately.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">2. Intellectual Property Rights</h2>
          <p className="text-gray-600">
            Unless otherwise indicated, the Site is our proprietary property and all source code, databases,
            functionality, software, website designs, audio, video, text, photographs, and graphics on the Site
            (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks")
            are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and
            various other intellectual property rights.
          </p>
          <p className="text-gray-600">
            The Content and Marks are provided on the Site "AS IS" for your information and personal use only. Except as
            expressly provided in these Terms of Service, no part of the Site and no Content or Marks may be copied,
            reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted,
            distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our
            express prior written permission.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">3. User Representations</h2>
          <p className="text-gray-600">By using the Site, you represent and warrant that:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>All registration information you submit will be true, accurate, current, and complete</li>
            <li>
              You will maintain the accuracy of such information and promptly update such registration information as
              necessary
            </li>
            <li>You have the legal capacity and you agree to comply with these Terms of Service</li>
            <li>You are not a minor in the jurisdiction in which you reside</li>
            <li>You will not access the Site through automated or non-human means</li>
            <li>You will not use the Site for any illegal or unauthorized purpose</li>
            <li>Your use of the Site will not violate any applicable law or regulation</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">4. User Registration</h2>
          <p className="text-gray-600">
            You may be required to register with the Site. You agree to keep your password confidential and will be
            responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a
            username you select if we determine, in our sole discretion, that such username is inappropriate, obscene,
            or otherwise objectionable.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">5. Prohibited Activities</h2>
          <p className="text-gray-600">
            You may not access or use the Site for any purpose other than that for which we make the Site available. The
            Site may not be used in connection with any commercial endeavors except those that are specifically endorsed
            or approved by us.
          </p>
          <p className="text-gray-600">As a user of the Site, you agree not to:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>
              Systematically retrieve data or other content from the Site to create or compile, directly or indirectly,
              a collection, compilation, database, or directory
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account
              information
            </li>
            <li>Circumvent, disable, or otherwise interfere with security-related features of the Site</li>
            <li>Use any information obtained from the Site in order to harass, abuse, or harm another person</li>
            <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
            <li>Use the Site in a manner inconsistent with any applicable laws or regulations</li>
            <li>
              Upload or transmit viruses, Trojan horses, or other material that interferes with any party's use of the
              Site
            </li>
            <li>Attempt to bypass any measures of the Site designed to prevent or restrict access</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">6. User Generated Contributions</h2>
          <p className="text-gray-600">
            The Site may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and
            other functionality, and may provide you with the opportunity to create, submit, post, display, transmit,
            perform, publish, distribute, or broadcast content and materials to us or on the Site, including but not
            limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal
            information or other material (collectively, "Contributions").
          </p>
          <p className="text-gray-600">
            Any Contributions you transmit to the Site will be treated as non-confidential and non-proprietary. By
            creating Contributions, you grant us a perpetual, non-exclusive, worldwide, royalty-free license to use,
            reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">7. Submissions</h2>
          <p className="text-gray-600">
            You acknowledge and agree that any questions, comments, suggestions, ideas, feedback, or other information
            regarding the Site ("Submissions") provided by you to us are non-confidential and shall become our sole
            property. We shall own exclusive rights, including all intellectual property rights, and shall be entitled
            to the unrestricted use and dissemination of these Submissions for any lawful purpose, commercial or
            otherwise, without acknowledgment or compensation to you.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">8. Site Management</h2>
          <p className="text-gray-600">We reserve the right, but not the obligation, to:</p>
          <ul className="list-disc pl-6 mt-2 mb-4 text-gray-600">
            <li>Monitor the Site for violations of these Terms of Service</li>
            <li>
              Take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms
              of Service
            </li>
            <li>Remove or refuse to post any Contributions for any or no reason in our sole discretion</li>
            <li>
              Terminate or deny access to and use of the Site to any person for any reason, in our sole discretion
            </li>
            <li>Modify or discontinue all or part of the Site without notice at any time</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">9. Modifications and Interruptions</h2>
          <p className="text-gray-600">
            We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at
            our sole discretion without notice. We also reserve the right to modify or discontinue all or part of the
            Site without notice at any time.
          </p>
          <p className="text-gray-600">
            We will not be liable to you or any third party for any modification, suspension, or discontinuance of the
            Site.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">10. Governing Law</h2>
          <p className="text-gray-600">
            These Terms of Service and your use of the Site are governed by and construed in accordance with the laws of
            the State of [State], applicable to agreements made and to be entirely performed within the State of
            [State], without regard to its conflict of law principles.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-dark-text">11. Contact Us</h2>
          <p className="text-gray-600">
            If you have questions or concerns about these Terms of Service, please contact us at:
          </p>
          <p className="text-gray-600">
            Hope and Hire
            <br />
            123 Hope Street
            <br />
            Opportunity City
            <br />
            Email: legal@hopeandhire.org
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

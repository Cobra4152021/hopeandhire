import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function TermsOfServicePage() {
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
            <h1 className="text-4xl font-bold mb-6 text-dark-text">Terms of Service</h1>
            <p className="text-lg text-gray-600">Last Updated: May 5, 2023</p>
          </div>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <h2>Introduction</h2>
              <p>
                Welcome to Hope and Hire. These Terms of Service (&quot;Terms&quot;) govern your
                access to and use of the Hope and Hire website and services. By accessing or using
                our services, you agree to be bound by these Terms. If you do not agree to these
                Terms, please do not use our services.
              </p>

              <h2>Definitions</h2>
              <p>Throughout these Terms, the following definitions apply:</p>
              <ul>
                <li>
                  &quot;Hope and Hire,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;
                  refers to Hope and Hire organization.
                </li>
                <li>
                  &quot;Services&quot; refers to the website, platform, and all services provided by
                  Hope and Hire.
                </li>
                <li>
                  &quot;User,&quot; &quot;you,&quot; or &quot;your&quot; refers to any individual or
                  entity that accesses or uses our Services.
                </li>
                <li>
                  &quot;Job Seeker&quot; refers to individuals using our Services to find employment
                  opportunities.
                </li>
                <li>
                  &quot;Employer&quot; refers to organizations or individuals using our Services to
                  find candidates.
                </li>
                <li>
                  &quot;Volunteer&quot; refers to individuals providing professional services
                  through our platform.
                </li>
                <li>
                  &quot;Organization&quot; refers to partner organizations that refer clients to our
                  Services.
                </li>
              </ul>

              <h2>Account Registration and Eligibility</h2>
              <p>
                To access certain features of our Services, you may need to register for an account.
                When you register, you agree to provide accurate, current, and complete information.
                You are responsible for maintaining the confidentiality of your account credentials
                and for all activities that occur under your account.
              </p>
              <p>
                You must be at least 18 years old to use our Services. By using our Services, you
                represent and warrant that you meet this eligibility requirement.
              </p>

              <h2>User Responsibilities</h2>
              <h3>All Users</h3>
              <p>As a user of our Services, you agree to:</p>
              <ul>
                <li>Comply with all applicable laws and regulations</li>
                <li>Provide accurate and truthful information</li>
                <li>Respect the privacy and rights of other users</li>
                <li>Use our Services in a manner consistent with their intended purpose</li>
                <li>Not engage in any activity that could harm, disable, or impair our Services</li>
              </ul>

              <h3>Job Seekers</h3>
              <p>As a Job Seeker, you additionally agree to:</p>
              <ul>
                <li>
                  Provide accurate information about your skills, experience, and qualifications
                </li>
                <li>Engage professionally with Employers, Volunteers, and Organizations</li>
                <li>
                  Attend scheduled appointments and interviews or provide timely notice of
                  cancellation
                </li>
              </ul>

              <h3>Employers</h3>
              <p>As an Employer, you additionally agree to:</p>
              <ul>
                <li>Provide accurate information about job opportunities and your organization</li>
                <li>Comply with all applicable employment laws and regulations</li>
                <li>Treat Job Seekers with respect and dignity</li>
                <li>Provide timely feedback on applications and interviews</li>
              </ul>

              <h3>Volunteers</h3>
              <p>As a Volunteer, you additionally agree to:</p>
              <ul>
                <li>Provide professional services to the best of your ability</li>
                <li>Maintain confidentiality of Job Seeker information</li>
                <li>Attend scheduled appointments or provide timely notice of cancellation</li>
              </ul>

              <h2>Prohibited Activities</h2>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul>
                <li>Violating any applicable laws or regulations</li>
                <li>Impersonating another person or entity</li>
                <li>Harassing, threatening, or intimidating other users</li>
                <li>Posting or sharing discriminatory, offensive, or inappropriate content</li>
                <li>
                  Attempting to gain unauthorized access to our systems or other users&apos;
                  accounts
                </li>
                <li>Using our Services for any illegal or unauthorized purpose</li>
                <li>Interfering with or disrupting the integrity or performance of our Services</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                Our Services and their contents, features, and functionality are owned by Hope and
                Hire and are protected by copyright, trademark, and other intellectual property
                laws. You may not reproduce, distribute, modify, create derivative works of,
                publicly display, publicly perform, republish, download, store, or transmit any of
                the material on our Services without our prior written consent.
              </p>

              <h2>User Content</h2>
              <p>
                You retain ownership of any content you submit to our Services (&quot;User
                Content&quot;). By submitting User Content, you grant us a non-exclusive, worldwide,
                royalty-free license to use, reproduce, modify, adapt, publish, translate, and
                distribute your User Content in connection with providing and promoting our
                Services.
              </p>
              <p>
                You represent and warrant that your User Content does not violate any third-party
                rights and complies with these Terms and all applicable laws.
              </p>

              <h2>Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT ANY
                WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED
                BY LAW, WE DISCLAIM ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES
                OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>

              <h2>Limitation of Liability</h2>
              <p>
                TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL HOPE AND HIRE BE LIABLE FOR
                ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF
                OR RELATING TO YOUR USE OF OR INABILITY TO USE OUR SERVICES.
              </p>

              <h2>Indemnification</h2>
              <p>
                You agree to indemnify, defend, and hold harmless Hope and Hire and its officers,
                directors, employees, agents, and affiliates from and against any and all claims,
                liabilities, damages, losses, costs, expenses, or fees (including reasonable
                attorneys&apos; fees) arising from or relating to your use of our Services, your
                User Content, or your violation of these Terms.
              </p>

              <h2>Termination</h2>
              <p>
                We may terminate or suspend your account and access to our Services at any time,
                without prior notice or liability, for any reason, including if you violate these
                Terms. Upon termination, your right to use our Services will immediately cease.
              </p>

              <h2>Changes to These Terms</h2>
              <p>
                We may update these Terms from time to time. We will notify you of any changes by
                posting the new Terms on this page and updating the &quot;Last Updated&quot; date.
                You are advised to review these Terms periodically for any changes.
              </p>

              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the
                state where Hope and Hire is headquartered, without regard to its conflict of law
                provisions.
              </p>

              <h2>Contact Us</h2>
              <p>If you have questions or concerns about these Terms, please contact us at:</p>
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
  );
}

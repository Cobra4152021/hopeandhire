import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Users, Shield, AlertTriangle, FileText, CheckCircle, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read Hope and Hire\'s terms of service. Understand your rights and responsibilities when using our platform to connect job seekers, employers, and volunteers.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These terms govern your use of Hope and Hire's platform and services. 
              By using our services, you agree to these terms and our commitment to creating second chances.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Overview */}
          <Card className="mb-8 border-l-4 border-l-teal shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start">
                <Scale className="h-8 w-8 text-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Hope and Hire</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Hope and Hire is a platform dedicated to empowering individuals with second chances through 
                    workforce readiness and meaningful employment. These Terms of Service outline the rules and 
                    guidelines for using our platform.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    By accessing or using our services, you agree to be bound by these terms. 
                    If you don't agree with any part of these terms, please don't use our services.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Definitions */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <FileText className="h-6 w-6 text-teal mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Key Definitions</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Hope and Hire</h3>
                    <p className="text-sm text-gray-600">
                      Refers to our organization, platform, website, and all related services.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Job Seekers</h3>
                    <p className="text-sm text-gray-600">
                      Individuals using our platform to find employment opportunities and career development services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Employers</h3>
                    <p className="text-sm text-gray-600">
                      Organizations and individuals using our platform to find qualified candidates for employment.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Volunteers</h3>
                    <p className="text-sm text-gray-600">
                      Professionals providing mentoring, coaching, and support services through our platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Organizations</h3>
                    <p className="text-sm text-gray-600">
                      Partner organizations, reentry programs, and nonprofits that refer clients to our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Services</h3>
                    <p className="text-sm text-gray-600">
                      All features, tools, and resources provided through our platform and website.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User Responsibilities */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Users className="h-6 w-6 text-teal mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">All Users</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Provide accurate and truthful information</li>
                      <li>• Comply with all applicable laws and regulations</li>
                      <li>• Respect the privacy and rights of other users</li>
                      <li>• Use services for their intended purpose</li>
                    </ul>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Maintain account security and confidentiality</li>
                      <li>• Report suspicious or inappropriate behavior</li>
                      <li>• Not engage in harmful or disruptive activities</li>
                      <li>• Follow community guidelines and standards</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Job Seekers</h3>
                  <ul className="text-sm text-gray-600 space-y-2 ml-4">
                    <li>• Provide accurate information about skills, experience, and qualifications</li>
                    <li>• Engage professionally with employers, volunteers, and organizations</li>
                    <li>• Attend scheduled appointments or provide timely notice of cancellation</li>
                    <li>• Use feedback constructively to improve job readiness</li>
                    <li>• Respect the time and expertise of volunteers and mentors</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Employers</h3>
                  <ul className="text-sm text-gray-600 space-y-2 ml-4">
                    <li>• Provide accurate information about job opportunities and requirements</li>
                    <li>• Comply with all employment laws and anti-discrimination regulations</li>
                    <li>• Treat all candidates with respect, dignity, and fairness</li>
                    <li>• Provide timely feedback on applications and interviews</li>
                    <li>• Honor commitments made to candidates and our platform</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Volunteers</h3>
                  <ul className="text-sm text-gray-600 space-y-2 ml-4">
                    <li>• Provide professional services to the best of your ability</li>
                    <li>• Maintain strict confidentiality of job seeker information</li>
                    <li>• Attend scheduled sessions or provide advance notice of changes</li>
                    <li>• Offer constructive, supportive feedback and guidance</li>
                    <li>• Respect boundaries and maintain professional relationships</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <AlertTriangle className="h-6 w-6 text-red-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Prohibited Activities</h2>
              </div>
              
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                <p className="text-sm text-red-800">
                  <strong>Zero Tolerance:</strong> We have zero tolerance for discrimination, harassment, 
                  or any behavior that undermines our mission of creating second chances.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Strictly Prohibited</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Discrimination based on criminal history, race, gender, or other protected characteristics</li>
                    <li>• Harassment, threats, or intimidation of any kind</li>
                    <li>• Sharing false, misleading, or fraudulent information</li>
                    <li>• Impersonating another person or organization</li>
                    <li>• Attempting unauthorized access to accounts or systems</li>
                    <li>• Using the platform for illegal activities</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Platform Misuse</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Posting inappropriate, offensive, or discriminatory content</li>
                    <li>• Spamming or sending unsolicited communications</li>
                    <li>• Interfering with platform functionality or security</li>
                    <li>• Scraping or unauthorized data collection</li>
                    <li>• Creating multiple accounts to circumvent restrictions</li>
                    <li>• Commercial use without explicit permission</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Platform Rules */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-teal mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Platform Rules & Guidelines</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Registration</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• You must be at least 18 years old to use our services</li>
                    <li>• One account per person; multiple accounts are not permitted</li>
                    <li>• You are responsible for maintaining account security</li>
                    <li>• Notify us immediately of any unauthorized account access</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Content and Communications</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• All content must be respectful, professional, and appropriate</li>
                    <li>• You retain ownership of content you submit</li>
                    <li>• We may review and moderate content for compliance</li>
                    <li>• Communications should be relevant to employment and career development</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Privacy and Confidentiality</h3>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Respect the privacy of all platform users</li>
                    <li>• Don't share personal information without consent</li>
                    <li>• Volunteers must maintain strict confidentiality</li>
                    <li>• Report privacy violations to our support team</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Intellectual Property */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Shield className="h-6 w-6 text-teal mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Our Content</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Hope and Hire owns all rights to our platform, including design, functionality, 
                    logos, trademarks, and proprietary content. You may not reproduce, distribute, 
                    or create derivative works without our written permission.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Your Content</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    You retain ownership of content you submit (resumes, profiles, messages). 
                    By submitting content, you grant us a license to use it for providing and 
                    improving our services, including sharing with potential employers when you apply for jobs.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Respect for Others' Rights</h3>
                  <p className="text-sm text-gray-600">
                    Don't submit content that infringes on others' intellectual property rights. 
                    We will respond to valid copyright infringement notices in accordance with applicable law.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Disclaimers and Limitations */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Disclaimers</h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">No Employment Guarantees</h3>
                  <p className="text-sm text-gray-600">
                    While we work hard to connect job seekers with opportunities, we cannot guarantee employment outcomes. 
                    Success depends on many factors including individual effort, market conditions, and employer decisions.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Platform Availability</h3>
                  <p className="text-sm text-gray-600">
                    We strive to maintain platform availability but cannot guarantee uninterrupted service. 
                    We may need to perform maintenance, updates, or address technical issues that temporarily affect access.
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Third-Party Content</h3>
                  <p className="text-sm text-gray-600">
                    Our platform may include links to third-party websites or services. 
                    We are not responsible for the content, privacy practices, or terms of these external sites.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Your Rights</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• You may close your account at any time</li>
                    <li>• Request data deletion upon account closure</li>
                    <li>• Download your data before closing your account</li>
                    <li>• Receive confirmation of account closure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Our Rights</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Suspend accounts for terms violations</li>
                    <li>• Terminate accounts for serious misconduct</li>
                    <li>• Remove content that violates our policies</li>
                    <li>• Provide notice when possible before termination</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-t-4 border-t-yellow">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About These Terms?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have questions about these terms of service, need clarification on any policies, 
                or want to report a violation, please contact our support team.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Legal Team</h3>
                    <p className="text-gray-600 text-sm">legal@hopeandhire.net</p>
                    <p className="text-gray-500 text-xs">For terms, compliance, and legal inquiries</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Support Team</h3>
                    <p className="text-gray-600 text-sm">415-696-2428</p>
                    <p className="text-gray-500 text-xs">Monday - Friday, 9 AM - 5 PM PST</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Mailing Address:</h4>
                <p className="text-sm text-gray-600">
                  Hope and Hire - Legal Department<br />
                  35 Gilbert Street<br />
                  San Francisco, CA 94103<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Terms Updates */}
          <div className="text-center p-6 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Terms Updates</h3>
            <p className="text-sm text-gray-600 mb-4">
              We may update these terms periodically to reflect changes in our services or applicable laws. 
              We'll notify you of significant changes and give you time to review before they take effect.
            </p>
            <p className="text-xs text-gray-500">
              These terms of service were last updated on {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
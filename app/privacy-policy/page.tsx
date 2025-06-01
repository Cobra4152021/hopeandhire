import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Lock, Users, Settings, FileText, AlertTriangle, Mail, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Hope and Hire protects your personal information and privacy. Comprehensive privacy policy covering data collection, usage, and your rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hope and Hire is committed to protecting your privacy and personal information. 
              This policy explains how we collect, use, and safeguard your data.
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
                <Shield className="h-8 w-8 text-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Privacy Matters</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    At Hope and Hire, protecting your privacy is fundamental to our mission of creating second chances. 
                    We believe that trust is earned through transparency, security, and respect for your personal information.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    This privacy policy describes how we collect, use, store, and protect your information when you 
                    use our website and services. We are committed to compliance with GDPR, CCPA, and other applicable privacy laws.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Information We Collect */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center mb-6">
                <Eye className="h-6 w-6 text-teal mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Information you provide directly when using our services:
                  </p>
                  <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                    <li>• <strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
                    <li>• <strong>Professional Information:</strong> Resume, work history, education, skills, certifications</li>
                    <li>• <strong>Account Information:</strong> Username, password, profile preferences</li>
                    <li>• <strong>Communication Data:</strong> Messages, feedback, support requests</li>
                    <li>• <strong>Application Materials:</strong> Cover letters, portfolio items, references</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Usage Information</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Information automatically collected when you use our website:
                  </p>
                  <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                    <li>• <strong>Device Information:</strong> IP address, browser type, operating system</li>
                    <li>• <strong>Usage Data:</strong> Pages visited, time spent, click patterns, search queries</li>
                    <li>• <strong>Location Data:</strong> General geographic location (city/state level)</li>
                    <li>• <strong>Cookies & Tracking:</strong> Session data, preferences, analytics information</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Third-Party Information</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Information we may receive from external sources:
                  </p>
                  <ul className="text-gray-600 space-y-1 ml-4 text-sm">
                    <li>• <strong>Partner Organizations:</strong> Referral information from reentry programs</li>
                    <li>• <strong>Background Check Providers:</strong> Employment verification (with consent)</li>
                    <li>• <strong>Social Media:</strong> Publicly available professional information</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="shadow-lg border-t-4 border-t-yellow">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Privacy?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                If you have questions about this privacy policy, want to exercise your rights, 
                or have concerns about how we handle your information, please contact our privacy team.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Privacy Officer</h3>
                    <p className="text-gray-600 text-sm">privacy@hopeandhire.net</p>
                    <p className="text-gray-500 text-xs">For privacy-related inquiries and requests</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone Support</h3>
                    <p className="text-gray-600 text-sm">415-696-2428</p>
                    <p className="text-gray-500 text-xs">Monday - Friday, 9 AM - 5 PM PST</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                <h4 className="font-semibold text-gray-800 mb-2">Mailing Address:</h4>
                <p className="text-sm text-gray-600">
                  Hope and Hire - Privacy Team<br />
                  35 Gilbert Street<br />
                  San Francisco, CA 94103<br />
                  United States
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
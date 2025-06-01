import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Eye, Ear, Hand, Brain, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Hope and Hire is committed to ensuring digital accessibility for people with disabilities. Learn about our accessibility features and how to request assistance.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Accessibility Statement
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hope and Hire is committed to ensuring digital accessibility for people with disabilities. 
              We continually improve the user experience for everyone.
            </p>
          </div>

          {/* Commitment */}
          <Card className="mb-8 border-l-4 border-l-teal shadow-lg">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-start">
                <CheckCircle className="h-8 w-8 text-teal mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    Hope and Hire is committed to ensuring that our website is accessible to the widest possible audience, 
                    regardless of circumstance and ability. We aim to adhere to the available standards and guidelines.
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    We believe that everyone deserves equal access to information and functionality, especially as we work 
                    to create second chances and opportunities for all individuals in our community.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Standards Compliance */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Standards and Guidelines</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">WCAG 2.1 Compliance</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA success criteria. 
                    These guidelines help make web content more accessible to people with disabilities.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Section 508</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Our website aims to comply with Section 508 of the Rehabilitation Act, ensuring accessibility 
                    for federal agencies and organizations receiving federal funding.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Accessibility Features */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Accessibility Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex items-start">
                  <Eye className="h-6 w-6 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Visual Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• High contrast color schemes</li>
                      <li>• Scalable text and images</li>
                      <li>• Alternative text for images</li>
                      <li>• Descriptive link text</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <Ear className="h-6 w-6 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Auditory Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Screen reader compatibility</li>
                      <li>• Audio descriptions when available</li>
                      <li>• Visual indicators for audio content</li>
                      <li>• No auto-playing audio</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <Hand className="h-6 w-6 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Motor Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Keyboard navigation support</li>
                      <li>• Touch-friendly interface</li>
                      <li>• Sufficient click target sizes</li>
                      <li>• No time-sensitive actions</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <Brain className="h-6 w-6 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Cognitive Accessibility</h3>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Clear and simple language</li>
                      <li>• Consistent navigation</li>
                      <li>• Error prevention and correction</li>
                      <li>• Logical content structure</li>
                    </ul>
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Known Issues */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Known Issues and Limitations</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                While we strive for full accessibility, we acknowledge that some areas of our website may not yet be fully accessible. 
                We are continuously working to improve these areas, including:
              </p>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li>• Some third-party embedded content may have limited accessibility</li>
                <li>• PDF documents are being updated to meet accessibility standards</li>
                <li>• Some interactive elements are being enhanced for better screen reader support</li>
              </ul>
            </CardContent>
          </Card>

          {/* Technical Specifications */}
          <Card className="mb-8 shadow-lg">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Compatible Technologies</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
                    <li>• Screen readers (JAWS, NVDA, VoiceOver)</li>
                    <li>• Voice recognition software</li>
                    <li>• Keyboard navigation</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-3">Testing Methods</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Automated accessibility testing tools</li>
                    <li>• Manual testing with assistive technologies</li>
                    <li>• User testing with people with disabilities</li>
                    <li>• Regular accessibility audits</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Feedback and Contact */}
          <Card className="shadow-lg border-t-4 border-t-yellow">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need Help or Have Feedback?</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We welcome your feedback on the accessibility of Hope and Hire. If you encounter any accessibility barriers 
                or need assistance accessing any content, please don't hesitate to contact us.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone Support</h3>
                    <p className="text-gray-600 text-sm">415-696-2428</p>
                    <p className="text-gray-500 text-xs">Monday - Friday, 9 AM - 5 PM PST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-teal mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email Support</h3>
                    <p className="text-gray-600 text-sm">accessibility@hopeandhire.net</p>
                    <p className="text-gray-500 text-xs">We typically respond within 1-2 business days</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-teal/5 rounded-lg border border-teal/20">
                <p className="text-sm text-gray-600">
                  <strong>Alternative formats:</strong> If you need this information in an alternative format 
                  (large print, audio, accessible electronic format), please contact us using the information above.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Last Updated */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              This accessibility statement was last updated on {new Date().toLocaleDateString('en-US', { 
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
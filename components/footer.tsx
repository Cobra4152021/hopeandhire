import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Hope and Hire</h3>
            <p className="mb-4 text-sm text-gray-600">
              Empowering individuals with second chances through workforce readiness and meaningful
              employment.
            </p>
            <div className="grid grid-cols-4 gap-4">
              <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-teal transition-colors">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-600 hover:text-teal transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-600 hover:text-teal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/volunteers"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Volunteers
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-teal transition-colors">
                  Employers
                </Link>
              </li>
              <li>
                <Link
                  href="/organizations"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Organizations
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-teal transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-teal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/resume-review"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Resume Review
                </Link>
              </li>
              <li>
                <Link
                  href="/services/interview-coaching"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Interview Coaching
                </Link>
              </li>
              <li>
                <Link
                  href="/services/career-counseling"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link
                  href="/services/job-matching"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Job Matching
                </Link>
              </li>
              <li>
                <Link
                  href="/services/skills-development"
                  className="text-gray-600 hover:text-teal transition-colors"
                >
                  Skills Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">35 Gilbert Street, San Francisco CA 94103</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-600">415-696-2428</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-400" />
                <span className="text-gray-600">email@protectingsanfrancisco.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Hope and Hire. All rights reserved.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 md:mt-0">
              <Link
                href="/privacy-policy"
                className="text-sm text-gray-500 hover:text-teal transition-colors text-center"
              >
              Privacy Policy
            </Link>
              <Link
                href="/terms-of-service"
                className="text-sm text-gray-500 hover:text-teal transition-colors text-center"
              >
              Terms of Service
            </Link>
              <Link
                href="/accessibility"
                className="text-sm text-gray-500 hover:text-teal transition-colors text-center"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Export both as default and named export
export default Footer;
export { Footer };

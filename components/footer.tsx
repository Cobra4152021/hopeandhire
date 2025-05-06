import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-light-bg">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-dark-text">Hope and Hire</h3>
            <p className="mb-4 text-gray-600">
              Empowering individuals with second chances through workforce readiness and meaningful employment.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-teal hover:text-teal-dark transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-teal hover:text-teal-dark transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-teal hover:text-teal-dark transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-teal hover:text-teal-dark transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-dark-text">Quick Links</h3>
            <ul className="space-y-2">
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
                <Link href="/volunteers" className="text-gray-600 hover:text-teal transition-colors">
                  Volunteers
                </Link>
              </li>
              <li>
                <Link href="/employers" className="text-gray-600 hover:text-teal transition-colors">
                  Employers
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
            <h3 className="text-xl font-bold mb-4 text-dark-text">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/resume-review" className="text-gray-600 hover:text-teal transition-colors">
                  Resume Review
                </Link>
              </li>
              <li>
                <Link href="/services/interview-coaching" className="text-gray-600 hover:text-teal transition-colors">
                  Interview Coaching
                </Link>
              </li>
              <li>
                <Link href="/services/career-counseling" className="text-gray-600 hover:text-teal transition-colors">
                  Career Counseling
                </Link>
              </li>
              <li>
                <Link href="/services/job-matching" className="text-gray-600 hover:text-teal transition-colors">
                  Job Matching
                </Link>
              </li>
              <li>
                <Link href="/services/skills-development" className="text-gray-600 hover:text-teal transition-colors">
                  Skills Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4 text-dark-text">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-teal" />
                <span className="text-gray-600">123 Hope Street, Opportunity City</span>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-teal" />
                <span className="text-gray-600">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-teal" />
                <span className="text-gray-600">info@hopeandhire.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">&copy; {new Date().getFullYear()} Hope and Hire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

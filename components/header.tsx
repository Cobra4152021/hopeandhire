"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="bg-gray-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-teal-600">HopeAndHire</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/organizations"
              className={`text-gray-700 hover:text-teal-600 ${
                pathname === "/organizations" ? "font-semibold text-teal-600" : ""
              }`}
            >
              For Organizations
            </Link>
            <Link
              href="/volunteers"
              className={`text-gray-700 hover:text-teal-600 ${
                pathname === "/volunteers" ? "font-semibold text-teal-600" : ""
              }`}
            >
              For Volunteers
            </Link>
            <Link
              href="/employers"
              className={`text-gray-700 hover:text-teal-600 ${
                pathname === "/employers" ? "font-semibold text-teal-600" : ""
              }`}
            >
              For Employers
            </Link>
            <Link
              href="/faq"
              className={`text-gray-700 hover:text-teal-600 ${pathname === "/faq" ? "font-semibold text-teal-600" : ""}`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 hover:text-teal-600 ${
                pathname === "/contact" ? "font-semibold text-teal-600" : ""
              }`}
            >
              Contact
            </Link>
            <Link
              href="/donate"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Donate
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-teal-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/organizations"
                className={`text-gray-700 hover:text-teal-600 ${
                  pathname === "/organizations" ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                For Organizations
              </Link>
              <Link
                href="/volunteers"
                className={`text-gray-700 hover:text-teal-600 ${
                  pathname === "/volunteers" ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                For Volunteers
              </Link>
              <Link
                href="/employers"
                className={`text-gray-700 hover:text-teal-600 ${
                  pathname === "/employers" ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                For Employers
              </Link>
              <Link
                href="/faq"
                className={`text-gray-700 hover:text-teal-600 ${
                  pathname === "/faq" ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className={`text-gray-700 hover:text-teal-600 ${
                  pathname === "/contact" ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/donate"
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

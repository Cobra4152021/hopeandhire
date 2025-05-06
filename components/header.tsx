"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold text-teal-600">Hope&Hire</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-gray-700 hover:text-teal-600 ${isActive("/") ? "font-semibold text-teal-600" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-gray-700 hover:text-teal-600 ${isActive("/about") ? "font-semibold text-teal-600" : ""}`}
            >
              About
            </Link>
            <Link
              href="/employer"
              className={`text-gray-700 hover:text-teal-600 ${
                isActive("/employer") ? "font-semibold text-teal-600" : ""
              }`}
            >
              Employers
            </Link>
            <Link
              href="/volunteer"
              className={`text-gray-700 hover:text-teal-600 ${
                isActive("/volunteer") ? "font-semibold text-teal-600" : ""
              }`}
            >
              Volunteers
            </Link>
            <Link
              href="/schedule"
              className={`text-gray-700 hover:text-teal-600 ${
                isActive("/schedule") ? "font-semibold text-teal-600" : ""
              }`}
            >
              Schedule
            </Link>
            <Link
              href="/contact"
              className={`text-gray-700 hover:text-teal-600 ${
                isActive("/contact") ? "font-semibold text-teal-600" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Login/Dashboard Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/employer/login"
              className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </Link>
            <Link
              href="/employer/dashboard"
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Dashboard
            </Link>
          </div>

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
                href="/"
                className={`text-gray-700 hover:text-teal-600 ${isActive("/") ? "font-semibold text-teal-600" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-gray-700 hover:text-teal-600 ${
                  isActive("/about") ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/employer"
                className={`text-gray-700 hover:text-teal-600 ${
                  isActive("/employer") ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Employers
              </Link>
              <Link
                href="/volunteer"
                className={`text-gray-700 hover:text-teal-600 ${
                  isActive("/volunteer") ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Volunteers
              </Link>
              <Link
                href="/schedule"
                className={`text-gray-700 hover:text-teal-600 ${
                  isActive("/schedule") ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Schedule
              </Link>
              <Link
                href="/contact"
                className={`text-gray-700 hover:text-teal-600 ${
                  isActive("/contact") ? "font-semibold text-teal-600" : ""
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 border-t border-gray-200 flex flex-col space-y-2">
                <Link
                  href="/employer/login"
                  className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/employer/dashboard"
                  className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md text-sm font-medium inline-block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

"'use client'

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"employer" | "volunteer" | null>(null)
  const pathname = usePathname()

  // Check if user is logged in
  useEffect(() => {
    // This is a simplified check - in a real app, you would check for a valid token
    const checkLoginStatus = () => {
      // Check if on employer dashboard or login page
      if (pathname?.includes("/employer/dashboard")) {
        setIsLoggedIn(true)
        setUserType("employer")
      }
      // Check if on volunteer dashboard or login page
      else if (pathname?.includes("/volunteer/dashboard")) {
        setIsLoggedIn(true)
        setUserType("volunteer")
      }
      // For demo purposes, also set logged in state based on login pages
      else if (pathname?.includes("/employer/login")) {
        setIsLoggedIn(false)
        setUserType("employer")
      } else if (pathname?.includes("/volunteer/login")) {
        setIsLoggedIn(false)
        setUserType("volunteer")
      } else {
        setIsLoggedIn(false)
        setUserType(null)
      }
    }

    checkLoginStatus()
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-teal-700">
            Hope and Hire
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/" ? "font-medium text-teal-700" : ""}`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/about" ? "font-medium text-teal-700" : ""}`}
            >
              About
            </Link>
            <Link
              href="/employer"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/employer" ? "font-medium text-teal-700" : ""}`}
            >
              Employers
            </Link>
            <Link
              href="/volunteer"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/volunteer" ? "font-medium text-teal-700" : ""}`}
            >
              Volunteers
            </Link>
            <Link
              href="/schedule"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/schedule" ? "font-medium text-teal-700" : ""}`}
            >
              Schedule
            </Link>
            <Link
              href="/faq"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/faq" ? "font-medium text-teal-700" : ""}`}
            >
              FAQ
            </Link>
            <Link
              href="/contact"
              className={`text-gray-600 hover:text-teal-700 ${pathname === "/contact" ? "font-medium text-teal-700" : ""}`}
            >
              Contact
            </Link>

            {isLoggedIn && userType === "employer" && (
              <Link
                href="/employer/dashboard"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {isLoggedIn && userType === "volunteer" && (
              <Link
                href="/volunteer/dashboard"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Dashboard
              </Link>
            )}

            {!isLoggedIn && userType === "employer" && (
              <Link
                href="/employer/login"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Login
              </Link>
            )}

            {!isLoggedIn && userType === "volunteer" && (
              <Link
                href="/volunteer/login"
                className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
              >
                Login
              </Link>
            )}

            {!isLoggedIn && !userType && (
              <div className="flex space-x-2">
                <Link
                  href="/employer/login"
                  className="px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition-colors"
                >
                  Employer Login
                </Link>
                <Link
                  href="/volunteer/login"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                >
                  Volunteer Login
                </Link>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600 focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/about" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/employer"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/employer" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                Employers
              </Link>
              <Link
                href="/volunteer"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/volunteer" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                Volunteers
              </Link>
              <Link
                href="/schedule"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/schedule" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                Schedule
              </Link>
              <Link
                href="/faq"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/faq" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                href="/contact"
                className={`text-gray-600 hover:text-teal-700 ${pathname === "/contact" ? "font-medium text-teal-700" : ""}`}
                onClick={closeMenu}
              >
                Contact
              </Link>

              {isLoggedIn && userType === "employer" && (
                <Link
                  href="/employer/dashboard"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}

              {isLoggedIn && userType === "volunteer" && (
                <Link
                  href="/volunteer/dashboard"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
              )}

              {!isLoggedIn && userType === "employer" && (
                <Link
                  href="/employer/login"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}

              {!isLoggedIn && userType === "volunteer" && (
                <Link
                  href="/volunteer/login"
                  className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-center"
                  onClick={closeMenu}
                >
                  Login
                </Link>
              )}

              {!isLoggedIn && !userType && (
                <>
                  <Link
                    href="/employer/login"
                    className="px-4 py-2 border border-teal-600 text-teal-600 rounded hover:bg-teal-50 transition-colors text-center"
                    onClick={closeMenu}
                  >
                    Employer Login
                  </Link>
                  <Link
                    href="/volunteer/login"
                    className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-center"
                    onClick={closeMenu}
                  >
                    Volunteer Login
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

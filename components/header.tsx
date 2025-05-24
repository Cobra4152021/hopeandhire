"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navigation = [
    { name: "Job Seekers", href: "/job-seekers" },
    { name: "Organizations", href: "/organizations" },
    { name: "Volunteers", href: "/volunteers" },
    { name: "Employers", href: "/employers" },
    { name: "Resources", href: "/resources" },
    { name: "FAQ", href: "/faq" },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.jpg"
                  alt="Hope and Hire Logo"
                  fill
                  className="object-cover rounded-full border border-gray-200 shadow"
                  priority
                />
              </div>
              <span className="text-teal font-bold text-xl">HopeAndHire</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`font-medium transition-colors ${
                  isActive(item.href) ? "text-teal" : "text-gray-700 hover:text-teal"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/donate">
              <Button className="bg-yellow text-dark-text hover:bg-yellow-dark">Donate</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-teal"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  isActive(item.href) ? "bg-teal-light/10 text-teal" : "text-gray-700 hover:bg-gray-50 hover:text-teal"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="mt-4 px-3 space-y-2">
              <Link href="/login" className="block">
                <Button variant="outline" className="w-full border-teal text-teal hover:bg-teal hover:text-white">
                  Login
                </Button>
              </Link>
              <Link href="/donate" className="block">
                <Button className="w-full bg-yellow text-dark-text hover:bg-yellow-dark">Donate</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

// Export both as default and named export
export default Header
export { Header }

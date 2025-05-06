"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  MessageSquare,
  BarChart,
  Settings,
  LogOut,
  FileText,
  Menu,
  X,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Candidates", href: "/dashboard/candidates", icon: Users },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Applications", href: "/dashboard/applications", icon: FileText },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Messages", href: "/dashboard/messaging", icon: MessageSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(`${href}/`)
  }

  return (
    <div className="flex min-h-screen bg-light-bg">
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-white"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Logo Section - Centrally positioned below header on mobile */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 md:hidden">
        <Image src="/logo.png" alt="Hope and Hire Logo" width={120} height={48} className="h-auto" priority />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="flex items-center justify-center flex-shrink-0 px-4 mb-5">
            <Link href="/">
              <Image src="/logo.png" alt="Hope and Hire Logo" width={150} height={60} className="h-auto" priority />
            </Link>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-teal-light/10 text-teal"
                      : "text-gray-600 hover:bg-teal-light/10 hover:text-teal"
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? "text-teal" : "text-gray-400 group-hover:text-teal"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="px-3 mt-6 mb-6">
              <Link href="/logout">
                <Button
                  variant="outline"
                  className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 border-gray-200"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="fixed inset-y-0 left-0 w-64 bg-white overflow-y-auto">
            <div className="flex items-center justify-center h-16 border-b border-gray-200">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/logo.png" alt="Hope and Hire Logo" width={120} height={48} className="h-auto" priority />
              </Link>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    isActive(item.href)
                      ? "bg-teal-light/10 text-teal"
                      : "text-gray-600 hover:bg-teal-light/10 hover:text-teal"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive(item.href) ? "text-teal" : "text-gray-400 group-hover:text-teal"
                    }`}
                  />
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <Link href="/logout" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50 border-gray-200"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-col flex-1 pt-16 md:pt-0">
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  )
}

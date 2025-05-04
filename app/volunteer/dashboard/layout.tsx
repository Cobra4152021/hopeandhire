"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Briefcase, Building2, LogOut, Menu, X, UserCircle, Handshake } from "lucide-react"
import { cn } from "@/lib/utils"

export default function VolunteerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/volunteer/dashboard", icon: LayoutDashboard },
    { name: "Candidates", href: "/volunteer/dashboard/candidates", icon: Users },
    { name: "Jobs", href: "/volunteer/dashboard/jobs", icon: Briefcase },
    { name: "Companies", href: "/volunteer/dashboard/companies", icon: Building2 },
    { name: "Match", href: "/volunteer/dashboard/match", icon: Handshake },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className="md:hidden">
        <button
          type="button"
          className="fixed top-4 left-4 z-50 rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="sr-only">Open sidebar</span>
          {sidebarOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
        </button>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        )}
      </div>

      {/* Sidebar for mobile and desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-white shadow-lg transition-transform duration-300 ease-in-out md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 flex-shrink-0 items-center border-b border-gray-200 px-4">
            <Link href="/" className="flex items-center space-x-2">
              <img className="h-8 w-32" src="/logo.png" alt="Hope & Hire Logo" />
              <span className="text-lg font-semibold">Hope & Hire</span>
            </Link>
          </div>

          {/* Sidebar content */}
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <nav className="mt-5 flex-1 space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ? "text-gray-500" : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-5 w-5 flex-shrink-0",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div>
                <UserCircle className="inline-block h-9 w-9 rounded-full text-gray-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Volunteer User</p>
                <Link
                  href="/volunteer/login"
                  className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center"
                >
                  <LogOut className="mr-1 h-3 w-3" />
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <header className="bg-white shadow">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <h1 className="text-xl font-semibold text-gray-900">Volunteer Portal</h1>
            <div className="flex items-center">
              <span className="hidden md:inline-block text-sm text-gray-500 mr-4">Welcome, Volunteer</span>
              <Link
                href="/volunteer/login"
                className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Logout
              </Link>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  )
}

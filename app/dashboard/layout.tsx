import type React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Briefcase, Calendar, MessageSquare, BarChart, Settings, LogOut } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard - Hope and Hire",
  description: "Hope and Hire dashboard for volunteers and employers",
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Candidates", href: "/dashboard/candidates", icon: Users },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-light-bg">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <Link href="/" className="text-teal font-bold text-xl">
              HopeAndHire
            </Link>
          </div>
          <div className="mt-5 flex-grow flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-teal-light/10 hover:text-teal"
                >
                  <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-teal" />
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

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <main className="flex-1 pb-8">{children}</main>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Briefcase, Users, Building, Settings, HelpCircle } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/employer/dashboard",
    icon: Home,
  },
  {
    title: "Jobs",
    href: "/employer/dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Applications",
    href: "/employer/dashboard/applications",
    icon: Users,
  },
  {
    title: "Company Profile",
    href: "/employer/dashboard/profile",
    icon: Building,
  },
  {
    title: "Settings",
    href: "/employer/dashboard/settings",
    icon: Settings,
  },
  {
    title: "Help",
    href: "/employer/dashboard/help",
    icon: HelpCircle,
  },
]

export function EmployerDashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex flex-col w-64 bg-gray-50 border-r">
      <div className="p-6">
        <Link href="/">
          <h2 className="text-2xl font-bold">Hope And Hire</h2>
        </Link>
      </div>
      <div className="flex-1 px-4 py-2 space-y-1">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium",
              pathname === item.href ? "bg-gray-200 text-gray-900" : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  BriefcaseBusiness,
  Building2,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"

const navItems = [
  {
    name: "Dashboard",
    href: "/employer/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Job Postings",
    href: "/employer/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    name: "Applications",
    href: "/employer/dashboard/applications",
    icon: FileText,
  },
  {
    name: "Candidates",
    href: "/employer/dashboard/candidates",
    icon: Users,
  },
  {
    name: "Messages",
    href: "/employer/dashboard/messages",
    icon: MessageSquare,
  },
  {
    name: "Analytics",
    href: "/employer/dashboard/analytics",
    icon: BarChart3,
  },
  {
    name: "Company Profile",
    href: "/employer/dashboard/company",
    icon: Building2,
  },
  {
    name: "Settings",
    href: "/employer/dashboard/settings",
    icon: Settings,
  },
]

export function EmployerDashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "flex items-center px-3 py-2 text-sm font-medium rounded-md group",
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted",
          )}
        >
          <item.icon className="mr-3 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  )
}

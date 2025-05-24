"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  MessageSquare,
  Calendar,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Candidates", href: "/dashboard/candidates", icon: Users },
    { name: "Applications", href: "/dashboard/applications", icon: FileText },
    { name: "Messaging", href: "/dashboard/messaging", icon: MessageSquare },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar>
          <div className="flex h-full flex-col">
            <div className="flex h-14 items-center border-b px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                <span>Hope & Hire</span>
              </Link>
            </div>
            <ScrollArea className="flex-1">
              <div className="space-y-1 p-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive(item.href)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </Sidebar>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { supabase } from "@/lib/supabase"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUserRole(data?.user?.user_metadata?.role || null))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserRole(session?.user?.user_metadata?.role || null)
    })
    return () => { listener?.subscription?.unsubscribe?.() }
  }, [])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["jobseeker", "employer", "volunteer"] },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase, roles: ["jobseeker", "employer"] },
    { name: "Candidates", href: "/dashboard/candidates", icon: Users, roles: ["employer", "volunteer"] },
    { name: "Applications", href: "/dashboard/applications", icon: FileText, roles: ["jobseeker", "employer"] },
    { name: "Messaging", href: "/dashboard/messaging", icon: MessageSquare, roles: ["jobseeker", "employer", "volunteer"] },
    { name: "Schedule", href: "/dashboard/schedule", icon: Calendar, roles: ["employer", "volunteer"] },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart, roles: ["employer"] },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["jobseeker", "employer", "volunteer"] },
  ]

  const filteredNavigation = navigation.filter(item => userRole && item.roles.includes(userRole))

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
                {(userRole ? filteredNavigation : navigation).map((item) => (
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

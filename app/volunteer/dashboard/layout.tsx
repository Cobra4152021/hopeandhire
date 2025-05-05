"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  Building2,
  LayoutDashboard,
  LogOut,
  Menu,
  UserCircle,
  Users,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface VolunteerDashboardLayoutProps {
  children: React.ReactNode
}

export default function VolunteerDashboardLayout({ children }: VolunteerDashboardLayoutProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/volunteer/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      active: pathname === "/volunteer/dashboard",
    },
    {
      href: "/volunteer/dashboard/jobs",
      label: "Jobs",
      icon: <Briefcase className="h-5 w-5" />,
      active: pathname === "/volunteer/dashboard/jobs",
    },
    {
      href: "/volunteer/dashboard/candidates",
      label: "Candidates",
      icon: <Users className="h-5 w-5" />,
      active: pathname === "/volunteer/dashboard/candidates",
    },
    {
      href: "/volunteer/dashboard/companies",
      label: "Companies",
      icon: <Building2 className="h-5 w-5" />,
      active: pathname === "/volunteer/dashboard/companies",
    },
    {
      href: "/volunteer/dashboard/match",
      label: "Match",
      icon: <Users className="h-5 w-5" />, // Replaced Handshake with Users
      active: pathname === "/volunteer/dashboard/match",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/volunteer/dashboard" className="flex items-center gap-2 text-lg font-semibold">
                <span>Hope & Hire</span>
              </Link>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn("flex items-center gap-2 text-muted-foreground", route.active && "text-foreground")}
                >
                  {route.icon}
                  {route.label}
                </Link>
              ))}
              <Link href="/volunteer/login" className="flex items-center gap-2 text-muted-foreground">
                <LogOut className="h-5 w-5" />
                Logout
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/volunteer/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <span>Hope & Hire</span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/volunteer/dashboard">
            <Button variant="ghost" size="icon">
              <UserCircle className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <nav className="grid gap-6 p-6 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "flex items-center gap-2 text-muted-foreground hover:text-foreground",
                  route.active && "text-foreground"
                )}
              >
                {route.icon}
                {route.label}
              </Link>
            ))}
            <Link
              href="/volunteer/login"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </nav>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

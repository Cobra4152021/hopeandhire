"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building, Briefcase, Users, BarChart, Settings, LogOut, Menu, X, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"

interface NavItem {
  title: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/employer/dashboard",
    icon: BarChart,
  },
  {
    title: "Company Profile",
    href: "/employer/dashboard/profile",
    icon: Building,
  },
  {
    title: "Job Listings",
    href: "/employer/dashboard/jobs",
    icon: Briefcase,
  },
  {
    title: "Candidates",
    href: "/employer/dashboard/candidates",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/employer/dashboard/settings",
    icon: Settings,
  },
]

export default function EmployerDashboardClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = "/employer/login"
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          aria-label="Toggle Menu"
          className="lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>

        <Link href="/employer/dashboard" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0420.jpg-VJCh7vUN0Y7OYbDUuKi3ahip7nq7jq.jpeg"
              alt="HopeAndHire Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-primary">Employer Portal</span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatar-placeholder.png" alt="User" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/employer/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/employer/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/employer/bypass">Bypass Page</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-20 bg-background lg:hidden">
          <nav className="grid gap-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                  pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.title}
              </Link>
            ))}
            <Separator className="my-2" />
            <button
              className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-muted transition-colors w-full text-left"
              onClick={() => {
                handleSignOut()
                setIsMobileMenuOpen(false)
              }}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </button>
          </nav>
        </div>
      )}

      <div className="flex min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
          <div className="flex flex-col h-full border-r bg-background">
            <div className="flex h-16 items-center gap-2 border-b px-6">
              <Link href="/employer/dashboard" className="flex items-center gap-2">
                <div className="relative w-8 h-8">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0420.jpg-VJCh7vUN0Y7OYbDUuKi3ahip7nq7jq.jpeg"
                    alt="HopeAndHire Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-bold text-primary">Employer Portal</span>
              </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
              <nav className="grid gap-1 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                      pathname === item.href ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.title}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t p-4">
              <div className="flex items-center gap-3 rounded-lg px-3 py-2">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/avatar-placeholder.png" alt="User" />
                  <AvatarFallback>AC</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Acme Corporation</span>
                  <span className="text-xs text-muted-foreground">admin@acme.com</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/employer/dashboard/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/employer/dashboard/settings">Settings</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/employer/bypass">Bypass Page</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 lg:pl-64">
          <div className="px-4 py-6 md:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}

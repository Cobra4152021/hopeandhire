"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userType, setUserType] = useState<"employer" | "volunteer" | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Check if user is logged in based on URL path
  useEffect(() => {
    setIsMounted(true)

    // This is a simple check for demo purposes
    // In a real app, you would use a proper auth system
    const path = window.location.pathname
    if (path.includes("/employer/dashboard")) {
      setIsLoggedIn(true)
      setUserType("employer")
    } else if (path.includes("/volunteer/dashboard")) {
      setIsLoggedIn(true)
      setUserType("volunteer")
    } else {
      setIsLoggedIn(false)
      setUserType(null)
    }
  }, [])

  // Don't render anything on the server to avoid hydration mismatch
  if (!isMounted) {
    return (
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0420.jpg-wy3FfcXdG3optf3BZuZ8p2DRfx2tND.jpeg"
                alt="HopeAndHire Logo"
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="ml-2 text-[#26a69a] font-medium text-lg hidden sm:inline-block">HopeAndHire</span>
            </Link>
            <div></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0420.jpg-wy3FfcXdG3optf3BZuZ8p2DRfx2tND.jpeg"
              alt="HopeAndHire Logo"
              width={140}
              height={40}
              className="h-8 w-auto"
              priority
            />
            <span className="ml-2 text-[#26a69a] font-medium text-lg hidden sm:inline-block">HopeAndHire</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/organizations" className="text-sm font-medium text-gray-600 hover:text-[#26a69a]">
              For Organizations
            </Link>
            <Link href="/volunteer" className="text-sm font-medium text-gray-600 hover:text-[#26a69a]">
              For Volunteers
            </Link>
            <Link href="/employer" className="text-sm font-medium text-gray-600 hover:text-[#26a69a]">
              For Employers
            </Link>
            <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-[#26a69a]">
              FAQ
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-600 hover:text-[#26a69a]">
              Contact
            </Link>
          </nav>

          <div className="flex items-center">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50">
                    My Account
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/${userType}/dashboard`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${userType}/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/">Sign Out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
                <Link href="/donate">Donate</Link>
              </Button>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <button className="ml-4 p-2 rounded-md md:hidden">
                  <Menu className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 py-4">
                  {isLoggedIn && (
                    <SheetClose asChild>
                      <Link
                        href={`/${userType}/dashboard`}
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-[#e6f7f5] text-[#26a69a]"
                      >
                        Dashboard
                      </Link>
                    </SheetClose>
                  )}
                  <SheetClose asChild>
                    <Link
                      href="/organizations"
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      For Organizations
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/volunteer"
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      For Volunteers
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/employer"
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      For Employers
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/faq"
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      FAQ
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                    >
                      Contact
                    </Link>
                  </SheetClose>

                  {isLoggedIn ? (
                    <>
                      <SheetClose asChild>
                        <Link
                          href={`/${userType}/profile`}
                          className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                        >
                          Profile
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          href="/"
                          className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                        >
                          Sign Out
                        </Link>
                      </SheetClose>
                    </>
                  ) : (
                    <SheetClose asChild>
                      <Link
                        href="/donate"
                        className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-[#f2b01e] text-white"
                      >
                        Donate
                      </Link>
                    </SheetClose>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

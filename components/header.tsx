import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
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
            <Button className="bg-[#f2b01e] hover:bg-[#e0a31c] text-white" asChild>
              <Link href="/donate">Donate</Link>
            </Button>
            <button className="ml-4 p-2 rounded-md md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

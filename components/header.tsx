import Link from "next/link"
import Image from "next/image"
import { ensureAbsoluteUrl } from "@/lib/image-url"

export function Header() {
  return (
    <header className="bg-white py-4 px-6 flex justify-between items-center shadow-sm">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src={ensureAbsoluteUrl("/logo.png") || "/placeholder.svg"}
            alt="Hope And Hire Logo"
            width={50}
            height={50}
            className="mr-2"
            priority
          />
          <span className="text-teal-500 text-xl font-semibold">HopeAndHire</span>
        </Link>
      </div>
      <nav className="hidden md:flex space-x-6">
        <Link href="/job-seekers" className="text-gray-600 hover:text-teal-500 transition-colors">
          For Job Seekers
        </Link>
        <Link href="/organizations" className="text-gray-600 hover:text-teal-500 transition-colors">
          For Organizations
        </Link>
        <Link href="/volunteers" className="text-gray-600 hover:text-teal-500 transition-colors">
          For Volunteers
        </Link>
        <Link href="/employers" className="text-gray-600 hover:text-teal-500 transition-colors">
          For Employers
        </Link>
        <Link href="/faq" className="text-gray-600 hover:text-teal-500 transition-colors">
          FAQ
        </Link>
      </nav>
      <div className="flex space-x-2">
        <Link
          href="/login"
          className="border border-teal-500 text-teal-500 px-4 py-2 rounded hover:bg-teal-50 transition-colors"
        >
          Login
        </Link>
        <Link href="/donate" className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-colors">
          Donate
        </Link>
      </div>
    </header>
  )
}

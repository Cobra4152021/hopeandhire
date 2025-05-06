export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <a href="/" className="text-2xl font-bold text-primary">
          Hope&Hire
        </a>
        <nav className="flex items-center space-x-4">
          <a href="/about" className="text-sm font-medium hover:underline">
            About
          </a>
          <a href="/faq" className="text-sm font-medium hover:underline">
            FAQ
          </a>
          <a href="/volunteer" className="text-sm font-medium hover:underline">
            Volunteer
          </a>
          <a href="/employer/register" className="text-sm font-medium hover:underline">
            Employers
          </a>
          <a href="/contact" className="text-sm font-medium hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

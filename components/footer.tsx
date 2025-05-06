import Link from "next/link"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  AtSign,
  Camera,
  BookOpen,
  Share2,
} from "lucide-react"

export function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/hopeandhire/" },
    { name: "Twitter/X", icon: Twitter, url: "https://x.com/HopeAndHire" },
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/hopeandhire/" },
    { name: "Threads", icon: AtSign, url: "https://www.threads.net/@hopeandhire" },
    { name: "BlueSky", icon: Share2, url: "https://bsky.app/profile/hopeandhire.bsky.social" },
    { name: "LinkedIn", icon: Linkedin, url: "https://www.linkedin.com/company/hopeandhire" },
    { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@HopeAndHire" },
    { name: "Pinterest", icon: Camera, url: "https://www.pinterest.com/hopeandhire/" },
    { name: "Reddit", icon: MessageCircle, url: "https://www.reddit.com/user/HopeAndHire/" },
    { name: "Medium", icon: BookOpen, url: "https://medium.com/@HopeAndHire" },
  ]

  return (
    <footer className="bg-background border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-primary">Hope&Hire</span>
            </div>
            <p className="text-base text-muted-foreground">
              Connecting formerly incarcerated individuals with meaningful employment opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Resources</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="/about" className="text-base text-muted-foreground hover:text-foreground">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="text-base text-muted-foreground hover:text-foreground">
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link href="/resources" className="text-base text-muted-foreground hover:text-foreground">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-base text-muted-foreground hover:text-foreground">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Get Involved</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="/volunteer" className="text-base text-muted-foreground hover:text-foreground">
                      Volunteer
                    </Link>
                  </li>
                  <li>
                    <Link href="/employer/register" className="text-base text-muted-foreground hover:text-foreground">
                      For Employers
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs" className="text-base text-muted-foreground hover:text-foreground">
                      Find Jobs
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:support@hopeandhire.org"
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <Link href="/privacy" className="text-base text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="text-base text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="/accessibility" className="text-base text-muted-foreground hover:text-foreground">
                      Accessibility
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Connect</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li className="flex items-center">
                    <a
                      href="mailto:info@hopeandhire.org"
                      className="text-base text-muted-foreground hover:text-foreground"
                    >
                      info@hopeandhire.org
                    </a>
                  </li>
                  <li className="flex items-center">
                    <a href="tel:+15551234567" className="text-base text-muted-foreground hover:text-foreground">
                      (555) 123-4567
                    </a>
                  </li>
                  <li className="flex items-center">
                    <span className="text-base text-muted-foreground">San Francisco, CA</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-base text-muted-foreground xl:text-center">
            &copy; {new Date().getFullYear()} Hope&Hire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

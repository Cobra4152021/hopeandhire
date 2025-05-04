export function Footer() {
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
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772 4.902 4.902 0 011.772-1.153c.636-.247 1.363-.416 2.427-.465 1.067-.048 1.407-.06 4.123-.06h.08zM8 6.812a5.113 5.113 0 015.113-5.113 5.113 5.113 0 015.113 5.113c0 2.836-2.277 5.113-5.113 5.113A5.113 5.113 0 018 6.812zM12 15.197a3.185 3.185 0 01-3.184-3.186 3.185 3.185 0 013.184-3.186 3.185 3.185 0 013.186 3.186A3.185 3.185 0 0112 15.197zm8.665-4.615c-.047.227-.132.479-.318.688a18.159 18.159 0 01-3.443 2.004c-.608.286-1.252.493-1.955.71a.75.75 0 01-.82.025.75.75 0 01-.025-.821c.222-.703.428-1.347.71-1.955a18.159 18.159 0 012.004-3.443c.209-.186.461-.271.688-.318a.75.75 0 01.798.021.75.75 0 01.021.798z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.672-6.253 11.672-11.673 0-.177 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.807-2.278 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.107 4.107 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.234 8.234 0 012 18.407a11.65 11.65 0 006.291 1.84" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Solutions</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Marketing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Analytics
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Commerce
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Insights
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Support</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      API Status
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Jobs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Press
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Partners
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Legal</h3>
                <ul role="list" className="mt-4 space-y-4">
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Claim
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-base text-muted-foreground hover:text-foreground">
                      Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="text-base text-muted-foreground xl:text-center">&copy; 2023 Hope&Hire. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

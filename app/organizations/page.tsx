import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Users, Building, ArrowRight } from "lucide-react"

export default function OrganizationsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.png')] opacity-30" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-up">
            <div className="inline-flex items-center justify-center p-1 px-3 mb-4 text-sm rounded-full border bg-background/50 backdrop-blur-sm shadow-sm">
              <span className="text-muted-foreground">For Nonprofits & Case Managers</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              Help Your Clients Access <span className="gradient-text">Career Support</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Partner with HopeAndHire to provide your clients with professional resume assistance, interview
              preparation, and direct connections to hiring employers.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How We Support Organizations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform provides comprehensive tools to help your clients succeed in their job search.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-background to-muted/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/70"></div>
              <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Resume & Interview Support</h3>
                <p className="text-muted-foreground">
                  Submit requests for professional resume reviews and mock interviews conducted by HR professionals.
                </p>
                <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-background to-muted/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/70"></div>
              <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Track Client Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your clients' journey from resume creation to interview preparation and job placement.
                </p>
                <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-gradient-to-br from-background to-muted/50 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary/70"></div>
              <CardContent className="pt-8 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Employer Connections</h3>
                <p className="text-muted-foreground">
                  Connect your clients with employers committed to second-chance hiring opportunities.
                </p>
                <Link href="#" className="text-primary font-medium inline-flex items-center hover:underline">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-secondary"></div>
              <CardContent className="pt-8 space-y-6">
                <h2 className="text-2xl font-bold text-center">Organization Login</h2>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 h-12 shadow-sm hover:shadow-md transition-all"
                  >
                    <Image src="/google-icon.png" alt="Google" width={20} height={20} />
                    Sign in with Google
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 h-12 shadow-sm hover:shadow-md transition-all"
                  >
                    <Image src="/email-icon.png" alt="Email" width={20} height={20} />
                    Sign in with Work Email
                  </Button>
                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-center text-muted-foreground">
                    <p>Coming soon! Our platform is currently in development.</p>
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact us for early access
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-gradient-to-br from-background to-muted/30">
              <CardContent className="pt-10 pb-10 text-center space-y-6">
                <div className="relative mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
                  <Image src="/organization-leader.png" alt="Maria L." fill className="object-cover" />
                </div>
                <svg className="w-12 h-12 text-primary/20 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-2xl font-medium leading-relaxed">
                  "HopeAndHire has been an invaluable resource for our clients. The platform streamlines the job
                  readiness process and connects our clients with opportunities they wouldn't otherwise have access to."
                </blockquote>
                <div>
                  <p className="font-bold text-lg">Maria L.</p>
                  <p className="text-sm text-muted-foreground">Program Director, Second Chance Coalition</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-10 md:p-16 shadow-lg">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Ready to Partner With Us?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join our network of organizations committed to helping formerly incarcerated individuals find meaningful
                employment.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link href="/contact">
                  <Button size="lg" className="min-w-40 rounded-full shadow-lg hover:shadow-xl transition-all">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

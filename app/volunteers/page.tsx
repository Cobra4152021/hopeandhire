import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Video, Award } from "lucide-react"

export default function VolunteersPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Use Your Skills to Make an Impact</h1>
            <p className="text-xl text-muted-foreground">
              Volunteer your expertise to help formerly incarcerated individuals prepare for and secure meaningful
              employment.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <FileText className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Resume & Cover Letter Assistance</h3>
                <p className="text-muted-foreground">
                  Help refine job seekers' resumes and cover letters to make them stand out to potential employers.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <Video className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Mock Interviews</h3>
                <p className="text-muted-foreground">
                  Conduct practice interviews and provide constructive feedback to prepare job seekers for real
                  interviews.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                <Award className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold">Career Mentorship</h3>
                <p className="text-muted-foreground">
                  Offer guidance on career paths, skill development, and professional growth opportunities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Login Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-md mx-auto">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <h2 className="text-2xl font-bold text-center">Volunteer Login</h2>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Image src="/linkedin-icon.png" alt="LinkedIn" width={20} height={20} />
                    Sign in with LinkedIn
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Image src="/google-icon.png" alt="Google" width={20} height={20} />
                    Sign in with Google
                  </Button>
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <Image src="/email-icon.png" alt="Email" width={20} height={20} />
                    Sign in with Email
                  </Button>
                  <p className="text-sm text-center text-muted-foreground">
                    Coming soon! Our platform is currently in development.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Volunteer Impact</h2>
            <Card className="border-primary/20">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="relative mx-auto w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image src="/confident-smile.png" alt="Sarah J." fill className="object-cover" />
                </div>
                <blockquote className="text-xl italic">
                  "Volunteering with HopeAndHire has been incredibly rewarding. Knowing that my HR skills are helping
                  people rebuild their lives gives me a sense of purpose."
                </blockquote>
                <p className="font-medium">Sarah J., HR Professional & Volunteer</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Make a Difference?</h2>
            <p className="text-xl text-muted-foreground">
              Join our community of volunteers and help change lives through your professional expertise.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="min-w-40">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

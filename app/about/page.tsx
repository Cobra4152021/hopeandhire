import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Mission</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Hope and Hire is dedicated to bridging the gap between formerly incarcerated individuals and meaningful
                employment opportunities, fostering second chances and stronger communities.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4">
                  <p>
                    Hope and Hire was founded in 2020 by a team of HR professionals, social workers, and formerly
                    incarcerated individuals who recognized the significant barriers to employment faced by those with
                    criminal records.
                  </p>
                  <p>
                    What began as a small volunteer initiative has grown into a comprehensive platform connecting job
                    seekers with the resources, mentorship, and opportunities they need to rebuild their lives and
                    contribute to their communities.
                  </p>
                  <p>
                    Today, we work with hundreds of employers, nonprofits, and volunteers across the country to create
                    pathways to employment for those seeking a second chance.
                  </p>
                </div>
              </div>
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src="/bridge-illustration.png"
                  alt="Bridge illustration representing our mission"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
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
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Dignity & Respect</h3>
                  <p className="text-muted-foreground">
                    We believe in treating every individual with dignity and respect, recognizing their inherent worth
                    beyond past mistakes.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
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
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7 6 13 6 13s6-6 6-13Z" />
                      <circle cx="12" cy="8" r="2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Community Impact</h3>
                  <p className="text-muted-foreground">
                    We're committed to strengthening communities by reducing recidivism and creating pathways to
                    sustainable employment.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
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
                      className="h-8 w-8 text-primary"
                    >
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Opportunity for All</h3>
                  <p className="text-muted-foreground">
                    We believe everyone deserves the opportunity to rebuild their lives and contribute meaningfully to
                    society.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="relative w-40 h-40 rounded-full overflow-hidden mb-4">
                    <Image src={`/team-member-${i}.png`} alt={`Team member ${i}`} fill className="object-cover" />
                  </div>
                  <h3 className="text-xl font-bold">Team Member {i}</h3>
                  <p className="text-muted-foreground">Position</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-10 md:p-16 shadow-lg">
              <div className="text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Join Our Mission</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Whether you're an employer, volunteer, or organization, you can make a difference in someone's life.
                </p>
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <Link href="/employer/register">
                    <Button size="lg" className="min-w-40 rounded-full shadow-lg hover:shadow-xl transition-all">
                      For Employers
                    </Button>
                  </Link>
                  <Link href="/volunteers">
                    <Button
                      size="lg"
                      variant="outline"
                      className="min-w-40 rounded-full shadow-lg hover:shadow-xl transition-all"
                    >
                      Volunteer
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

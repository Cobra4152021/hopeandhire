import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">About Hope&Hire</h1>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold mt-8 mb-6">Empowering Second Chances Through Meaningful Employment</h2>

            <p className="lead text-xl text-muted-foreground mb-8">
              HopeAndHire is a workforce readiness platform dedicated to helping formerly incarcerated individuals
              transition into stable, long-term employment. By connecting job seekers with career mentors, recruiters,
              and second-chance employers, we create opportunities that reduce recidivism and rebuild lives.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p>
              HopeAndHire was founded on the belief that employment is the key to successful reintegration. By offering
              resume assistance, interview preparation, and direct job placement, we help justice-impacted individuals
              secure meaningful work and become self-sufficient members of the community.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Partnership with SFDSA and Protecting San Francisco</h2>
            <p>
              HopeAndHire is supported by the San Francisco Deputy Sheriff's Association (SFDSA) and its charitable arm,
              Protecting San Francisco, a 501(c)(3) nonprofit dedicated to community-focused initiatives that enhance
              public safety and rehabilitation. Recognizing the urgent need for sustainable workforce solutions, SFDSA
              has embraced HopeAndHire as a pathway to reduce recidivism, strengthen communities, and create lasting
              opportunities for those reentering society.
            </p>
            <p>
              Through this partnership, we are not just providing jobs—we are building safer, stronger communities by
              ensuring that individuals leaving the justice system have the support they need to succeed.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Why It Matters</h2>
            <p>
              San Francisco has long been at the forefront of criminal justice reform, but without job opportunities,
              rehabilitation efforts fall short. Studies show that employment is one of the most effective ways to
              prevent reoffending, yet many returning citizens face barriers to employment due to stigma and lack of
              access.
            </p>
            <p>
              HopeAndHire bridges this gap by partnering with employers, nonprofits, and workforce development programs
              to ensure that second-chance hiring is not just a concept—but a reality.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Get Involved</h2>
            <p>
              Whether you're an employer, recruiter, career coach, or community partner, your involvement can make a
              direct impact. Together, we can empower second chances and create pathways to a better future.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <Button asChild size="lg">
                <Link href="/volunteer">Volunteer</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/employer/register">For Employers</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

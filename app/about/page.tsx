import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">About Hope&Hire</h1>

          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-muted-foreground mb-8">
              Hope&Hire is dedicated to connecting formerly incarcerated individuals with meaningful employment
              opportunities, helping them rebuild their lives and contribute to society.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Mission</h2>
            <p>
              Our mission is to bridge the gap between hope and employment for individuals with criminal records,
              providing them with the resources, support, and opportunities they need to succeed in the workforce.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Vision</h2>
            <p>
              We envision a society where everyone, regardless of their past, has the opportunity to contribute
              meaningfully through employment, reducing recidivism and creating stronger communities.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">What We Do</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Connect job seekers with second-chance-friendly employers</li>
              <li>Provide resources for skills development and job readiness</li>
              <li>Offer support throughout the employment process</li>
              <li>Educate employers on the benefits of second-chance hiring</li>
              <li>Advocate for policies that reduce barriers to employment</li>
            </ul>

            <h2 className="text-2xl font-bold mt-12 mb-4">Our Team</h2>
            <p>
              Hope&Hire was founded by a diverse team of professionals committed to social justice and economic
              opportunity for all. Our team includes experts in workforce development, criminal justice reform, and
              technology.
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-4">Get Involved</h2>
            <p>
              Whether you're a job seeker looking for opportunities, an employer interested in second-chance hiring, or
              a community partner wanting to collaborate, we welcome your involvement in our mission.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

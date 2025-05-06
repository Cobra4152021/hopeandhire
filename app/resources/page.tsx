import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: "Resume Building Guide",
      category: "Job Preparation",
      description: "Learn how to create a compelling resume that highlights your skills and experience.",
      link: "/resources/resume-guide",
    },
    {
      id: 2,
      title: "Interview Preparation",
      category: "Job Preparation",
      description:
        "Tips and strategies for successful job interviews, including how to address questions about your background.",
      link: "/resources/interview-prep",
    },
    {
      id: 3,
      title: "Skills Development Programs",
      category: "Training",
      description: "Information about free and low-cost training programs to develop job-ready skills.",
      link: "/resources/skills-development",
    },
    {
      id: 4,
      title: "Legal Rights for Job Seekers",
      category: "Legal",
      description: "Understanding your rights during the job application process with a criminal record.",
      link: "/resources/legal-rights",
    },
    {
      id: 5,
      title: "Financial Assistance Programs",
      category: "Support",
      description: "Resources for financial support during your job search and transition to employment.",
      link: "/resources/financial-assistance",
    },
    {
      id: 6,
      title: "Mental Health Support",
      category: "Support",
      description: "Resources for maintaining mental well-being during the job search process.",
      link: "/resources/mental-health",
    },
  ]

  const categories = ["All Resources", "Job Preparation", "Training", "Legal", "Support"]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Resources</h1>

          <p className="text-lg text-muted-foreground mb-8">
            Access our collection of resources designed to help you prepare for and succeed in your job search.
          </p>

          {/* Category filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button key={category} variant={category === "All Resources" ? "default" : "outline"} className="mb-2">
                {category}
              </Button>
            ))}
          </div>

          {/* Resources grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="text-sm font-medium text-primary mb-1">{resource.category}</div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="w-full">
                    <Link href={resource.link}>View Resource</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

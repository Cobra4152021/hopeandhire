import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

export default function Jobs() {
  // Sample job listings
  const jobs = [
    {
      id: 1,
      title: "Warehouse Associate",
      company: "Logistics Plus",
      location: "Chicago, IL",
      type: "Full-time",
      posted: "2 days ago",
      description:
        "Looking for reliable warehouse associates to join our growing team. No experience necessary, training provided.",
    },
    {
      id: 2,
      title: "Customer Service Representative",
      company: "Support Solutions",
      location: "Remote",
      type: "Full-time",
      posted: "1 week ago",
      description:
        "Join our customer service team to provide excellent support to our clients. Good communication skills required.",
    },
    {
      id: 3,
      title: "Kitchen Staff",
      company: "Fresh Eats Restaurant",
      location: "Atlanta, GA",
      type: "Part-time",
      posted: "3 days ago",
      description: "Seeking kitchen staff for busy restaurant. Flexible hours and competitive pay.",
    },
    {
      id: 4,
      title: "Maintenance Technician",
      company: "Property Management Inc",
      location: "Dallas, TX",
      type: "Full-time",
      posted: "Just now",
      description: "Maintenance technician needed for apartment complex. Experience with basic repairs preferred.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Find Jobs</h1>

          {/* Search and filters */}
          <div className="bg-card rounded-lg p-6 mb-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Input placeholder="Job title or keyword" />
              </div>
              <div>
                <Input placeholder="Location" />
              </div>
              <div>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Job type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Button className="w-full">Search Jobs</Button>
              </div>
            </div>
          </div>

          {/* Job listings */}
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <CardTitle>{job.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="text-muted-foreground">{job.company}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{job.location}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{job.type}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">Posted {job.posted}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{job.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild>
                    <Link href={`/jobs/${job.id}`}>View Job</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

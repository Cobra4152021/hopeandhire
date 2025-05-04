"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building2, MapPin, Users, Search, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")

  // Mock data for companies
  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      industry: "Technology",
      location: "San Francisco, CA",
      employees: "50-200",
      description:
        "A technology company specializing in software development and IT services. Actively hiring for various technical and non-technical roles.",
      openPositions: 5,
      tags: ["Remote-friendly", "Tech", "Benefits"],
      logo: "/abstract-tc.png",
    },
    {
      id: 2,
      name: "BuildRight Construction",
      industry: "Construction",
      location: "Chicago, IL",
      employees: "100-500",
      description:
        "A construction company with projects across the Midwest. Offers training programs and apprenticeships for various construction roles.",
      openPositions: 8,
      tags: ["Construction", "Training", "Benefits"],
      logo: "/abstract-blue-circles.png",
    },
    {
      id: 3,
      name: "GreenLeaf Landscaping",
      industry: "Landscaping",
      location: "Portland, OR",
      employees: "20-50",
      description:
        "A landscaping company focused on sustainable practices. Provides on-the-job training and growth opportunities.",
      openPositions: 3,
      tags: ["Outdoors", "Training", "Growth"],
      logo: "/green-leaf-close-up.png",
    },
    {
      id: 4,
      name: "Culinary Creations",
      industry: "Food Service",
      location: "Austin, TX",
      employees: "20-100",
      description:
        "A restaurant group with multiple locations. Offers positions in food preparation, service, and management.",
      openPositions: 6,
      tags: ["Food", "Service", "Flexible"],
      logo: "/intertwined-circles.png",
    },
    {
      id: 5,
      name: "Metro Logistics",
      industry: "Transportation & Logistics",
      location: "Atlanta, GA",
      employees: "200-1000",
      description:
        "A logistics company with warehouses and distribution centers. Offers positions in warehousing, driving, and administration.",
      openPositions: 12,
      tags: ["Logistics", "Benefits", "Growth"],
      logo: "/machine-learning-concept.png",
    },
    {
      id: 6,
      name: "Horizon Healthcare",
      industry: "Healthcare",
      location: "Boston, MA",
      employees: "500+",
      description:
        "A healthcare provider with multiple facilities. Offers positions in patient care, administration, and support services.",
      openPositions: 15,
      tags: ["Healthcare", "Benefits", "Training"],
      logo: "/placeholder.svg?height=80&width=80&query=HH",
    },
  ]

  // Filter companies based on search term
  const filteredCompanies = companies.filter(
    (company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.location.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Partner Companies</h2>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies by name, industry, or location..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCompanies.map((company) => (
          <Card key={company.id} className="overflow-hidden">
            <CardHeader className="flex flex-row items-start gap-4 space-y-0">
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                <img
                  src={company.logo || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <CardTitle>{company.name}</CardTitle>
                <CardDescription className="flex items-center">
                  <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {company.location}
                </CardDescription>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5 mr-1" />
                  {company.industry}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-3.5 w-3.5 mr-1" />
                  {company.employees} employees
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{company.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {company.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="text-sm font-medium">{company.openPositions} open positions</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/volunteer/dashboard/jobs?company=${company.id}`}>View Jobs</Link>
              </Button>
              <Button variant="default" className="flex items-center">
                Company Profile
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No companies found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}

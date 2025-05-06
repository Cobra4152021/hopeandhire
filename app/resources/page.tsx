import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-dark-text">Resources</h1>
        <p className="text-gray-600 mb-8">
          We've compiled a collection of resources to help job seekers, employers, and organizations navigate the
          employment landscape.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle>For Job Seekers</CardTitle>
              <CardDescription>Resources to help you in your job search</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Resume templates and guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Interview preparation tips</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Skills assessment tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Career development resources</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/job-seekers">
                <Button className="bg-teal text-white hover:bg-teal-dark">View Job Seeker Resources</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Employers</CardTitle>
              <CardDescription>Resources to help you find qualified candidates</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Inclusive hiring practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Tax incentives for hiring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Onboarding best practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Retention strategies</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/employers">
                <Button className="bg-yellow text-dark-text hover:bg-yellow-dark">View Employer Resources</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>For Organizations</CardTitle>
              <CardDescription>Resources to help your clients succeed</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Client assessment tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Program development guides</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Funding opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Partnership resources</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/organizations">
                <Button className="bg-teal text-white hover:bg-teal-dark">View Organization Resources</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>For Volunteers</CardTitle>
              <CardDescription>Resources to help you make an impact</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Volunteer training materials</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Mentorship guidelines</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Impact measurement tools</span>
                </li>
                <li className="flex items-start">
                  <span className="text-teal mr-2">•</span>
                  <span>Volunteer recognition programs</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/volunteers">
                <Button className="bg-yellow text-dark-text hover:bg-yellow-dark">View Volunteer Resources</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-light-bg rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-dark-text">Need Additional Resources?</h2>
          <p className="text-gray-600 mb-4">
            If you're looking for specific resources that aren't listed here, please contact us. We're happy to help you
            find what you need.
          </p>
          <Link href="/contact">
            <Button variant="outline" className="border-teal text-teal hover:bg-teal hover:text-white">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

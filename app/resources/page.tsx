import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ResourcesPage() {
  return (
    <div className="bg-white">
      <div className="container py-8 sm:py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resources</h1>
            <p className="mt-2 text-lg text-gray-600">
              We&apos;ve compiled a collection of resources to help job seekers, employers, and
              organizations navigate the employment landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">For Job Seekers</CardTitle>
                <CardDescription>Resources to help you in your job search</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Resume templates and guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Interview preparation tips</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Skills assessment tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Career development resources</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/job-seekers" className="w-full">
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark">
                    View Job Seeker Resources
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">For Employers</CardTitle>
                <CardDescription>Resources to help you find qualified candidates</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Inclusive hiring practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Tax incentives for hiring</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Onboarding best practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Retention strategies</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/employers" className="w-full">
                  <Button className="w-full bg-yellow text-dark-text hover:bg-yellow-dark">
                    View Employer Resources
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">For Organizations</CardTitle>
                <CardDescription>Resources to help your clients succeed</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Client assessment tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Program development guides</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Funding opportunities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Partnership resources</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/organizations" className="w-full">
                  <Button className="w-full bg-teal text-white hover:bg-teal-dark">
                    View Organization Resources
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">For Volunteers</CardTitle>
                <CardDescription>Resources to help you make an impact</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Volunteer training materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Mentorship guidelines</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Impact measurement tools</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-teal mr-2 text-lg leading-none">•</span>
                    <span className="text-gray-600">Volunteer recognition programs</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/volunteers" className="w-full">
                  <Button className="w-full bg-yellow text-dark-text hover:bg-yellow-dark">
                    View Volunteer Resources
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          <Card className="mt-8 bg-gray-50">
            <CardHeader>
              <CardTitle className="text-xl">Need Additional Resources?</CardTitle>
              <CardDescription>
                If you&apos;re looking for specific resources that aren&apos;t listed here, please
                contact us. We&apos;re happy to help you find what you need.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href="/contact" className="w-full">
                <Button
                  variant="outline"
                  className="w-full border-teal text-teal hover:bg-teal hover:text-white"
                >
                  Contact Us
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

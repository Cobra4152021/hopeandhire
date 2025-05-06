import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Volunteer Registration - Hope and Hire",
  description: "Register as a volunteer recruiter with Hope and Hire",
}

export default function VolunteerRegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Volunteer Registration</CardTitle>
              <CardDescription className="text-center">
                Join our community of volunteer recruiters and help job seekers find meaningful employment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="Michael" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Chen" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m.chen@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profession">Professional Background</Label>
                <Select>
                  <SelectTrigger id="profession">
                    <SelectValue placeholder="Select your background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                    <SelectItem value="hr">HR Professional</SelectItem>
                    <SelectItem value="career-coach">Career Coach</SelectItem>
                    <SelectItem value="hiring-manager">Hiring Manager</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="availability">Availability (hours per week)</Label>
                <Select>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-2">1-2 hours</SelectItem>
                    <SelectItem value="3-5">3-5 hours</SelectItem>
                    <SelectItem value="6-10">6-10 hours</SelectItem>
                    <SelectItem value="10+">10+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-teal-600 hover:underline">
                    terms of service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-teal-600 hover:underline">
                    privacy policy
                  </Link>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full bg-brand-teal-500 hover:bg-brand-teal-600">Register</Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/volunteers/login" className="text-brand-teal-600 hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}

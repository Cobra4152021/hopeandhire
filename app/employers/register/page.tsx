import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Employer Registration - Hope and Hire",
  description: "Register as an employer partner with Hope and Hire",
}

export default function EmployerRegisterPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-2xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Employer Registration</CardTitle>
              <CardDescription className="text-center">
                Join our network of employer partners and access qualified, pre-screened candidates
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" placeholder="Acme Corporation" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Smith" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="job-title">Job Title</Label>
                <Input id="job-title" placeholder="HR Manager" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Work Email</Label>
                <Input id="email" type="email" placeholder="j.smith@company.com" />
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
                <Label htmlFor="industry">Industry</Label>
                <Select>
                  <SelectTrigger id="industry">
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-size">Company Size</Label>
                <Select>
                  <SelectTrigger id="company-size">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 employees</SelectItem>
                    <SelectItem value="11-50">11-50 employees</SelectItem>
                    <SelectItem value="51-200">51-200 employees</SelectItem>
                    <SelectItem value="201-500">201-500 employees</SelectItem>
                    <SelectItem value="501+">501+ employees</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hiring-needs">Hiring Needs</Label>
                <Textarea
                  id="hiring-needs"
                  placeholder="Please describe your current hiring needs and the types of positions you're looking to fill."
                  rows={4}
                />
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
              <Button className="w-full bg-brand-yellow-500 hover:bg-brand-yellow-600">Register</Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/employers/login" className="text-brand-teal-600 hover:underline">
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

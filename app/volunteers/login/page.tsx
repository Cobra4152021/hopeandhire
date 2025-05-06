import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Volunteer Login - Hope and Hire",
  description: "Log in to your volunteer account",
}

export default function VolunteerLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Volunteer Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your volunteer dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m.chen@example.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/volunteers/reset-password" className="text-sm text-brand-teal-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-brand-teal-500 hover:bg-brand-teal-600">Log in</Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/volunteers/register" className="text-brand-teal-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}

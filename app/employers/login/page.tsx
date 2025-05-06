import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Employer Login - Hope and Hire",
  description: "Log in to your employer account",
}

export default function EmployerLoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Employer Login</CardTitle>
            <CardDescription className="text-center">
              Enter your email and password to access your employer dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="j.smith@company.com" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/employers/reset-password" className="text-sm text-brand-teal-600 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full bg-brand-yellow-500 hover:bg-brand-yellow-600">Log in</Button>
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/employers/register" className="text-brand-teal-600 hover:underline">
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

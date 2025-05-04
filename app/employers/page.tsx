"use client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function EmployersPage() {
  const router = useRouter()

  // Redirect to the employer login page
  const handleGetStarted = () => {
    router.push("/employer/login")
  }

  return (
    <div className="container max-w-6xl py-12 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">Employer Portal</h1>
        <p className="text-xl text-muted-foreground max-w-2xl">
          Connect with qualified candidates and make a difference through second-chance hiring.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg" onClick={handleGetStarted}>
            Get Started
          </Button>
          <Button size="lg" variant="outline" onClick={handleGetStarted}>
            Learn More
          </Button>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-6 w-6"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Access Qualified Talent</h3>
            <p className="text-muted-foreground text-center">
              Connect with motivated candidates who are ready to contribute to your organization.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-6 w-6"
              >
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Make a Social Impact</h3>
            <p className="text-muted-foreground text-center">
              Contribute to reducing recidivism and building stronger communities through employment.
            </p>
          </div>

          <div className="flex flex-col items-center space-y-4 p-6 border rounded-lg">
            <div className="bg-primary/10 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-6 w-6"
              >
                <path d="M12 2v4"></path>
                <path d="M12 18v4"></path>
                <path d="m4.93 4.93 2.83 2.83"></path>
                <path d="m16.24 16.24 2.83 2.83"></path>
                <path d="M2 12h4"></path>
                <path d="M18 12h4"></path>
                <path d="m4.93 19.07 2.83-2.83"></path>
                <path d="m16.24 7.76 2.83-2.83"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold">Receive Support</h3>
            <p className="text-muted-foreground text-center">
              Get guidance from our team throughout the hiring process and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

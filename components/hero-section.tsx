import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden hero-pattern">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            Bridging the Gap from <span className="text-primary">Hope</span> to{" "}
            <span className="text-primary">Hire</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering individuals with second chances through workforce readiness and meaningful employment
            opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/jobs">
              <Button size="lg">Find Jobs</Button>
            </Link>
            <Link href="/employer/login">
              <Button size="lg" variant="outline">
                For Employers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

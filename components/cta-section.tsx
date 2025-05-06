import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground rounded-lg">
      <div className="text-center max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
        <p className="mt-4 mb-8">Join our community today and discover opportunities for meaningful employment.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/jobs">
            <Button variant="secondary" size="lg">
              Find Jobs
            </Button>
          </Link>
          <Link href="/employer/register">
            <Button variant="outline" size="lg">
              For Employers
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-10 md:p-16 shadow-lg">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Make a Difference?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our community of employers, volunteers, and organizations committed to creating second chances
              through employment.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/employer/login">
                <Button size="lg" className="min-w-40 rounded-full shadow-lg hover:shadow-xl transition-all">
                  For Employers
                </Button>
              </Link>
              <Link href="/volunteers">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-40 rounded-full shadow-lg hover:shadow-xl transition-all"
                >
                  Volunteer
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

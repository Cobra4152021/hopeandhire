import type { Metadata } from "next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { StatsSection } from "@/components/stats-section"
import { PartnersSection } from "@/components/partners-section"

export const metadata: Metadata = {
  title: "HopeAndHire - Bridging the Gap from Hope to Hire",
  description: "Empowering individuals with second chances through workforce readiness and meaningful employment.",
  keywords: "second chance hiring, workforce readiness, job placement, formerly incarcerated, employment opportunities",
  openGraph: {
    title: "HopeAndHire - Bridging the Gap from Hope to Hire",
    description: "Empowering individuals with second chances through workforce readiness and meaningful employment.",
    type: "website",
    url: "https://hopeandhire.net",
    images: [
      {
        url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_0420.jpg-VJCh7vUN0Y7OYbDUuKi3ahip7nq7jq.jpeg",
        width: 1200,
        height: 630,
        alt: "HopeAndHire Logo",
      },
    ],
  },
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 space-y-16">
        <div className="container mx-auto px-4 max-w-screen-xl">
          <HeroSection />
        </div>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <FeaturesSection />
        </div>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <StatsSection />
        </div>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <TestimonialsSection />
        </div>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <PartnersSection />
        </div>
        <div className="container mx-auto px-4 max-w-screen-xl">
          <CTASection />
        </div>
      </main>
      <Footer />
    </div>
  )
}

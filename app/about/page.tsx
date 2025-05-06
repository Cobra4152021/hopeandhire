import AboutClientPage from "./client-page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | HopeAndHire",
  description:
    "Learn about HopeAndHire's mission to empower formerly incarcerated individuals through meaningful employment opportunities.",
  keywords:
    "second chance hiring, formerly incarcerated, job placement, workforce readiness, reentry programs, about us",
}

export default function AboutPage() {
  return <AboutClientPage />
}

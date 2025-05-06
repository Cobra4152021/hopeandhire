import type { Metadata } from "next"
import ContactPageClient from "./ContactPageClient"

export const metadata: Metadata = {
  title: "Contact Us - Hope and Hire",
  description: "Get in touch with the Hope and Hire team",
}

export default function ContactPage() {
  return <ContactPageClient />
}

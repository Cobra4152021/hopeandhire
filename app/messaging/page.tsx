import type { Metadata } from "next"
import MessagingPageClient from "./MessagingPageClient"

export const metadata: Metadata = {
  title: "Messages - Hope and Hire",
  description: "Your messages on Hope and Hire",
}

export default function MessagingPage() {
  return <MessagingPageClient />
}

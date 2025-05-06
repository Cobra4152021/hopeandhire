import SchedulePageClient from "./SchedulePageClient"

export const metadata = {
  title: "Schedule an Appointment | HopeAndHire",
  description:
    "Book a session with one of our volunteer recruiters for resume review, interview preparation, or job placement assistance.",
  keywords: "appointment scheduling, resume review, mock interview, job placement, career coaching",
}

export default function SchedulePage() {
  return <SchedulePageClient />
}

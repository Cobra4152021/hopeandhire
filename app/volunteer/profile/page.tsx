import type { Metadata } from "next"
import VolunteerProfileClientPage from "./VolunteerProfileClientPage"

export const metadata: Metadata = {
  title: "Volunteer Profile - Hope and Hire",
  description: "Manage your volunteer profile on Hope and Hire",
}

export default function VolunteerProfilePage() {
  return <VolunteerProfileClientPage />
}

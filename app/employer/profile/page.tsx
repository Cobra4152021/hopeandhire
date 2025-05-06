import type { Metadata } from "next"
import EmployerProfileClientPage from "./EmployerProfileClientPage"

export const metadata: Metadata = {
  title: "Employer Profile - Hope and Hire",
  description: "Manage your employer profile on Hope and Hire",
}

export default function EmployerProfilePage() {
  return <EmployerProfileClientPage />
}

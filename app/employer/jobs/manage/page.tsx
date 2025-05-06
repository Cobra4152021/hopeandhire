import type { Metadata } from "next"
import ManageJobsClientPage from "./ManageJobsClientPage"

export const metadata: Metadata = {
  title: "Manage Jobs - Hope and Hire",
  description: "Manage your job postings on Hope and Hire",
}

export default function ManageJobsPage() {
  return <ManageJobsClientPage />
}

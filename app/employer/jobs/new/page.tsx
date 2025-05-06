import type { Metadata } from "next"
import NewJobClientPage from "./NewJobClientPage"

export const metadata: Metadata = {
  title: "Post a New Job - Hope and Hire",
  description: "Create a new job posting on Hope and Hire",
}

export default function NewJobPage() {
  return <NewJobClientPage />
}

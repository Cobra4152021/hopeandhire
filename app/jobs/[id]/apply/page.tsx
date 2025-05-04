import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"

// Define proper types for the params
type PageParams = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Apply for Job | Hope and Hire",
  description: "Apply for a job opportunity through Hope and Hire",
}

// Fix the type issue by properly typing the params
export default async function JobApplicationPage({ params }: PageParams) {
  const supabase = createClient()

  // Fetch the job details
  const { data: job, error } = await supabase.from("jobs").select("*").eq("id", params.id).single()

  if (error || !job) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-6 text-3xl font-bold">Apply for: {job.title}</h1>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Job Details</h2>
        <p className="mb-2">
          <span className="font-medium">Company:</span> {job.company_name}
        </p>
        <p className="mb-2">
          <span className="font-medium">Location:</span> {job.location}
        </p>
        <p className="mb-2">
          <span className="font-medium">Type:</span> {job.job_type}
        </p>
        <p className="mb-4">
          <span className="font-medium">Description:</span> {job.description}
        </p>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Application Form</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block font-medium">
              Full Name
            </label>
            <input type="text" id="name" className="w-full rounded-md border border-gray-300 p-2" required />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block font-medium">
              Email
            </label>
            <input type="email" id="email" className="w-full rounded-md border border-gray-300 p-2" required />
          </div>

          <div>
            <label htmlFor="phone" className="mb-1 block font-medium">
              Phone Number
            </label>
            <input type="tel" id="phone" className="w-full rounded-md border border-gray-300 p-2" required />
          </div>

          <div>
            <label htmlFor="resume" className="mb-1 block font-medium">
              Resume/CV
            </label>
            <input type="file" id="resume" className="w-full rounded-md border border-gray-300 p-2" required />
          </div>

          <div>
            <label htmlFor="cover_letter" className="mb-1 block font-medium">
              Cover Letter (Optional)
            </label>
            <textarea id="cover_letter" rows={4} className="w-full rounded-md border border-gray-300 p-2"></textarea>
          </div>

          <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}

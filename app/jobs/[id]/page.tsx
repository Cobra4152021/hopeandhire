import React from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase"

type PageParams = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: "Job Details | Hope and Hire",
  description: "View job details and apply through Hope and Hire",
}

export default async function JobDetailPage({ params }: PageParams) {
  const supabase = createServerSupabaseClient()

  const { data: job, error } = await supabase
    .from("job_listings")
    .select("*, company(name)")
    .eq("id", params.id)
    .single()

  if (error || !job) {
    notFound()
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{job.title}</h1>
        <Link
          href={`/jobs/${params.id}/apply`}
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
          Apply Now
        </Link>
      </div>

      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">{job.company?.name}</h2>
            <p className="text-gray-600">{job.location}</p>
          </div>
          <div className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {job.job_type}
          </div>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <h3 className="mb-2 text-lg font-semibold">Job Description</h3>
          <p className="whitespace-pre-line text-gray-700">{job.description}</p>
        </div>

        <div className="mb-6 border-t border-gray-200 pt-4">
          <h3 className="mb-2 text-lg font-semibold">Requirements</h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            {job.requirements?.map((req: string, index: number) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h3 className="mb-2 text-lg font-semibold">Benefits</h3>
          <ul className="list-inside list-disc space-y-1 text-gray-700">
            {job.benefits?.map((benefit: string, index: number) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          href={`/jobs/${params.id}/apply`}
          className="rounded-md bg-blue-600 px-6 py-3 text-lg font-medium text-white hover:bg-blue-700"
        >
          Apply for this Position
        </Link>
      </div>
    </div>
  )
}

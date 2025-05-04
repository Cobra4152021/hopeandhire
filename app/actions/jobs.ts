"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { JobListing } from "@/types/database"

export async function getJobsByCompanyId(companyId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("job_listings")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })

  if (error) {
    return { error: error.message }
  }

  return { jobs: data as JobListing[] }
}

export async function getJobById(jobId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("job_listings").select("*, companies(*)").eq("id", jobId).single()

  if (error) {
    return { error: error.message }
  }

  return { job: data as JobListing & { companies: any } }
}

export async function createJob(formData: FormData, companyId: string) {
  const supabase = createServerSupabaseClient()

  // Process requirements and benefits as arrays
  const requirements = formData.get("requirements")?.toString().split("\n").filter(Boolean) || []
  const benefits = formData.get("benefits")?.toString().split("\n").filter(Boolean) || []

  const job = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    job_type: formData.get("job-type") as string,
    salary_min: Number.parseInt(formData.get("salary-min") as string),
    salary_max: Number.parseInt(formData.get("salary-max") as string),
    requirements,
    benefits,
    company_id: companyId,
    status: formData.get("status") || "draft",
  }

  const { data, error } = await supabase.from("job_listings").insert([job]).select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/jobs")
  return { success: true, job: data[0] as JobListing }
}

export async function updateJob(formData: FormData, jobId: string) {
  const supabase = createServerSupabaseClient()

  // Process requirements and benefits as arrays
  const requirements = formData.get("requirements")?.toString().split("\n").filter(Boolean) || []
  const benefits = formData.get("benefits")?.toString().split("\n").filter(Boolean) || []

  const job = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    location: formData.get("location") as string,
    job_type: formData.get("job-type") as string,
    salary_min: Number.parseInt(formData.get("salary-min") as string),
    salary_max: Number.parseInt(formData.get("salary-max") as string),
    requirements,
    benefits,
    status: formData.get("status") as string,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("job_listings").update(job).eq("id", jobId).select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/jobs")
  return { success: true, job: data[0] as JobListing }
}

export async function changeJobStatus(jobId: string, status: "draft" | "active" | "closed") {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("job_listings")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", jobId)
    .select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/jobs")
  return { success: true, job: data[0] as JobListing }
}

export async function deleteJob(jobId: string) {
  const supabase = createServerSupabaseClient()

  const { error } = await supabase.from("job_listings").delete().eq("id", jobId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/jobs")
  return { success: true }
}

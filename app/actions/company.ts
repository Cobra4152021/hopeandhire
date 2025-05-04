"use server"

import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase"
import type { Company, HiringPreference } from "@/types/database"

export async function getCompanyByUserId(userId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("companies").select("*").eq("user_id", userId).single()

  if (error) {
    return { error: error.message }
  }

  return { company: data as Company }
}

export async function createCompany(formData: FormData, userId: string) {
  const supabase = createServerSupabaseClient()

  const company = {
    name: formData.get("company-name") as string,
    industry: formData.get("industry") as string,
    description: formData.get("company-description") as string,
    size: formData.get("company-size") as string,
    founded_year: Number.parseInt(formData.get("founded-year") as string),
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip: formData.get("zip") as string,
    country: formData.get("country") as string,
    website: formData.get("website") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    user_id: userId,
  }

  const { data, error } = await supabase.from("companies").insert([company]).select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/profile")
  return { success: true, company: data[0] as Company }
}

export async function updateCompany(formData: FormData, companyId: string) {
  const supabase = createServerSupabaseClient()

  const company = {
    name: formData.get("company-name") as string,
    industry: formData.get("industry") as string,
    description: formData.get("company-description") as string,
    size: formData.get("company-size") as string,
    founded_year: Number.parseInt(formData.get("founded-year") as string),
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zip: formData.get("zip") as string,
    country: formData.get("country") as string,
    website: formData.get("website") as string,
    phone: formData.get("phone") as string,
    email: formData.get("email") as string,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase.from("companies").update(company).eq("id", companyId).select()

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/profile")
  return { success: true, company: data[0] as Company }
}

export async function saveHiringPreferences(formData: FormData, companyId: string) {
  const supabase = createServerSupabaseClient()

  // Process form data to extract arrays
  const jobTypes = Array.from(formData.entries())
    .filter(([key]) =>
      ["full-time", "part-time", "contract", "temporary", "internship", "apprenticeship"].includes(key),
    )
    .map(([key]) => key)

  const industries = Array.from(formData.entries())
    .filter(([key]) =>
      [
        "manufacturing",
        "construction",
        "logistics",
        "food-service",
        "retail",
        "technology",
        "healthcare",
        "hospitality",
        "other-industry",
      ].includes(key),
    )
    .map(([key]) => key)

  const supportServices = Array.from(formData.entries())
    .filter(([key]) => ["mentorship", "training", "transportation", "flexible-scheduling"].includes(key))
    .map(([key]) => key)

  const hiringPreference = {
    company_id: companyId,
    job_types: jobTypes,
    industries: industries,
    open_to_all_records: formData.get("open-to-all") === "on",
    background_restrictions: formData.get("background-restrictions") as string,
    support_services: supportServices,
    wotc_interest: formData.get("wotc-interest") === "on",
    updated_at: new Date().toISOString(),
  }

  // Check if preferences already exist
  const { data: existingData } = await supabase
    .from("hiring_preferences")
    .select("id")
    .eq("company_id", companyId)
    .single()

  let result

  if (existingData) {
    // Update existing preferences
    result = await supabase.from("hiring_preferences").update(hiringPreference).eq("id", existingData.id).select()
  } else {
    // Create new preferences
    result = await supabase.from("hiring_preferences").insert([hiringPreference]).select()
  }

  const { data, error } = result

  if (error) {
    return { error: error.message }
  }

  revalidatePath("/employer/dashboard/profile")
  return { success: true, hiringPreference: data[0] as HiringPreference }
}

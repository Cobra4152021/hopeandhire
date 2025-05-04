export type Company = {
  id: string
  name: string
  industry: string
  description: string
  size: string
  founded_year: number
  address: string
  city: string
  state: string
  zip: string
  country: string
  website: string
  phone: string
  email: string
  logo_url?: string
  user_id: string
  created_at: string
  updated_at: string
}

export type JobListing = {
  id: string
  title: string
  description: string
  location: string
  job_type: string
  salary_min: number
  salary_max: number
  benefits: string[]
  requirements: string[]
  company_id: string
  status: "draft" | "active" | "closed"
  created_at: string
  updated_at: string
}

export type HiringPreference = {
  id: string
  company_id: string
  job_types: string[]
  industries: string[]
  open_to_all_records: boolean
  background_restrictions: string
  support_services: string[]
  wotc_interest: boolean
  created_at: string
  updated_at: string
}

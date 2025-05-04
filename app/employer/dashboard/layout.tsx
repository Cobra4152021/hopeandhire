import type React from "react"
import { redirect } from "next/navigation"
import { createServerClient } from "@/utils/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?next=/employer/dashboard")
  }

  // Check if user is an employer
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  if (!profile || profile.role !== "employer") {
    redirect("/auth/login?message=You must be an employer to access this page")
  }

  return <div className="flex min-h-screen flex-col">{children}</div>
}

import { createServerSupabaseClient } from "@/lib/supabase"

export async function getServerSession() {
  const supabase = createServerSupabaseClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

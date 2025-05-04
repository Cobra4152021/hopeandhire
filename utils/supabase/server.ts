import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { cache } from "react"

export const createServerClient = cache(() => {
  const cookieStore = cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.warn("Missing Supabase environment variables. Using fallback values for development.")
    return createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "https://example.supabase.co",
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "example-key",
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name, options) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      },
    )
  }

  return createClient(supabaseUrl, supabaseKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
})

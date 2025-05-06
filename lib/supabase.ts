import { createClient } from "@supabase/supabase-js"

// This is a safe import that won't be bundled with client components
let serverComponentCookies: () => {
  get: (name: string) => { value: string } | undefined
}

// Only import cookies from next/headers in a server context
if (typeof window === "undefined") {
  // Dynamic import to prevent bundling with client components
  serverComponentCookies = () => {
    // Using require instead of import to avoid bundling issues
    const { cookies } = require("next/headers")
    return cookies()
  }
}

export function createServerSupabaseClient() {
  if (typeof window !== "undefined") {
    throw new Error("createServerSupabaseClient can only be used on the server")
  }

  const cookieStore = serverComponentCookies()

  return createClient(
    process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value
        },
      },
    },
  )
}

// Client-side singleton to prevent multiple instances
let clientSupabase: ReturnType<typeof createClient> | null = null

export function createClientSupabaseClient() {
  if (typeof window === "undefined") {
    throw new Error("createClientSupabaseClient should only be used on the client")
  }

  if (clientSupabase) return clientSupabase

  clientSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  )

  return clientSupabase
}

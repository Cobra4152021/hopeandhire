import { createClient } from "@supabase/supabase-js"

// Make sure these environment variables are set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a singleton instance of the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: "pkce",
    onAuthStateChange: (event, session) => {
      console.log("Auth state change:", event, session ? "Session exists" : "No session")

      // Handle specific auth errors
      if (event === "TOKEN_REFRESHED" && !session) {
        console.error("Token refresh failed - no session returned")
      }

      if (event === "USER_UPDATED" && !session) {
        console.error("User updated but no session returned")
      }
    },
  },
})

// Server-side client with service role for admin operations
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ""
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

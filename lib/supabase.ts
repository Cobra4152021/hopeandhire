import { createClient } from "@supabase/supabase-js"

// This is for client-side usage
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Create a dummy client for build time
const dummyClient = {
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signInWithPassword: () => Promise.resolve({ data: null, error: { message: "Dummy client" } }),
    signUp: () => Promise.resolve({ data: null, error: { message: "Dummy client" } }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: () => Promise.resolve({ data: [], error: null }),
      }),
      order: () => Promise.resolve({ data: [], error: null }),
    }),
  }),
}

// Create the client based on environment
const supabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : typeof window === "undefined"
      ? dummyClient
      : null

// Export at the top level - will be null in browser if credentials are missing
export const supabase = supabaseClient || dummyClient

// Server-side client with service role for admin operations
export const createServerSupabaseClient = () => {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

  if (!supabaseUrl || !supabaseServiceKey) {
    if (typeof window === "undefined") {
      console.warn("Missing Supabase credentials for server client - using dummy client")
      return dummyClient
    }
    throw new Error("Missing Supabase credentials for server client")
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

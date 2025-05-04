import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const next = requestUrl.searchParams.get("next") || "/employer/dashboard"

  console.log("Auth callback - URL:", request.url)
  console.log("Auth callback - Code exists:", !!code)

  if (!code) {
    console.log("Auth callback - No code provided")
    return NextResponse.redirect(
      new URL(`/employer/login?error=${encodeURIComponent("No code provided")}&success=false`, requestUrl.origin),
    )
  }

  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    console.log("Auth callback - Exchanging code for session")
    await supabase.auth.exchangeCodeForSession(code)

    // Get the session to check if the user is authenticated
    console.log("Auth callback - Getting session")
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
      console.error("Auth callback - Session error:", sessionError)
      return NextResponse.redirect(
        new URL(`/employer/login?error=${encodeURIComponent(sessionError.message)}&success=false`, requestUrl.origin),
      )
    }

    if (session) {
      console.log("Auth callback - Session found, redirecting to:", next)
      // User is authenticated, redirect to dashboard
      return NextResponse.redirect(new URL(next, requestUrl.origin))
    } else {
      console.log("Auth callback - No session after exchange")
      // No session after exchange, redirect to login with email_confirmed
      return NextResponse.redirect(new URL("/employer/login?email_confirmed=true", requestUrl.origin))
    }
  } catch (error) {
    console.error("Auth callback error:", error)
    // If there's an error, redirect to login with an error message
    return NextResponse.redirect(
      new URL(`/employer/login?error=${encodeURIComponent("Authentication failed")}&success=false`, requestUrl.origin),
    )
  }
}

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"

export async function middleware(req: NextRequest) {
  // Create a response object
  const res = NextResponse.next()

  // Skip middleware for emergency access and static dashboard
  if (req.nextUrl.pathname === "/employer/emergency-access" || req.nextUrl.pathname === "/employer/static-dashboard") {
    console.log("Middleware - Bypassing for special page")
    return res
  }

  try {
    // Create the Supabase client
    const supabase = createMiddlewareClient({ req, res })

    // Get the session
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession()

    // Debug logging
    console.log("Middleware - Path:", req.nextUrl.pathname)
    console.log("Middleware - Session exists:", !!session)

    // Check for redirect loop
    const url = new URL(req.url)
    const isRedirectLoop =
      url.searchParams.has("message") && url.searchParams.has("next") && url.pathname === "/employer/login"

    if (isRedirectLoop) {
      console.log("Middleware - Detected redirect loop, sending to static dashboard")
      return NextResponse.redirect(new URL("/employer/static-dashboard", req.url))
    }

    if (sessionError) {
      console.error("Middleware - Session error:", sessionError.message)

      // If there's a JWT error, redirect to static dashboard
      if (sessionError.message.includes("User from sub claim in JWT does not exist")) {
        console.log("Middleware - Invalid user in token, redirecting to static dashboard")
        return NextResponse.redirect(new URL("/employer/static-dashboard", req.url))
      }
    }

    // Special case for direct dashboard and bypass - always allow
    if (
      req.nextUrl.pathname === "/employer/bypass" ||
      req.nextUrl.pathname === "/employer/direct-dashboard" ||
      req.nextUrl.pathname.includes("/reset-password") ||
      req.nextUrl.pathname.includes("/auth/callback")
    ) {
      return res
    }

    // Protected routes - require authentication
    if (req.nextUrl.pathname.startsWith("/employer/dashboard")) {
      if (!session) {
        console.log("Middleware - No session, redirecting to login")
        const redirectUrl = new URL("/employer/login", req.url)
        redirectUrl.searchParams.set("message", "Please sign in to access this page")
        redirectUrl.searchParams.set("next", req.nextUrl.pathname)
        return NextResponse.redirect(redirectUrl)
      }
      console.log("Middleware - Session exists, allowing dashboard access")
      return res
    }

    // Auth pages - redirect to dashboard if already authenticated
    if (
      session &&
      (req.nextUrl.pathname === "/employer/login" ||
        req.nextUrl.pathname === "/employer/signup" ||
        req.nextUrl.pathname === "/employer/forgot-password")
    ) {
      console.log("Middleware - Session exists, redirecting to static dashboard")
      return NextResponse.redirect(new URL("/employer/static-dashboard", req.url))
    }

    return res
  } catch (error) {
    console.error("Middleware - Unexpected error:", error)

    // In case of any error, redirect to the static dashboard
    return NextResponse.redirect(new URL("/employer/static-dashboard", req.url))
  }
}

export const config = {
  matcher: [
    "/employer/dashboard/:path*",
    "/employer/direct-dashboard",
    "/employer/bypass",
    "/employer/emergency-access",
    "/employer/static-dashboard",
    "/employer/login",
    "/employer/signup",
    "/employer/forgot-password",
    "/employer/reset-password",
    "/employer/auth/callback",
  ],
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

// This is an admin-only route to set up the demo user
// You would call this once to create the demo user

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const secretKey = requestUrl.searchParams.get("secret")

  // Check if the secret key is provided and matches
  if (!secretKey || secretKey !== process.env.SETUP_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Check if the demo user already exists
    const { data: existingUser } = await supabase
      .from("profiles")
      .select("*")
      .eq("email", "demo@hopeandhire.com")
      .single()

    if (existingUser) {
      return NextResponse.json({ message: "Demo user already exists" })
    }

    // Create the demo user
    const { data, error } = await supabase.auth.admin.createUser({
      email: "demo@hopeandhire.com",
      password: "Demo@123456",
      email_confirm: true,
      user_metadata: {
        company_name: "Demo Company",
        role: "employer",
      },
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      message: "Demo user created successfully",
      user: data.user,
    })
  } catch (error) {
    console.error("Error setting up demo user:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

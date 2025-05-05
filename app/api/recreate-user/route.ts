import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const DEMO_EMAIL = "demo@hopeandhire.com"
const DEMO_PASSWORD = "Demo@123456"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secretKey = searchParams.get("key")
  const userId = searchParams.get("userId")

  if (secretKey !== process.env.SETUP_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: {
        company_name: "Demo Company",
        role: "employer",
      },
      id: userId,
    })

    if (createError) {
      console.error("Error creating user:", createError)
      return NextResponse.json({ error: "Failed to create user: " + createError.message }, { status: 500 })
    }

    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .insert([
        {
          name: "Demo Company",
          employer_id: userData.user.id,
          description: "This is a demo company for testing purposes.",
          industry: "Technology",
          website: "https://demo-company.com",
          location: "San Francisco, CA",
          size: "10-50",
        },
      ])
      .select()

    if (companyError) {
      console.error("Error creating company record:", companyError)
      // Non-blocking
    }

    return NextResponse.json({
      message: "User recreated successfully with the same ID",
      userId: userData.user.id,
      email: DEMO_EMAIL,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred: " + message }, { status: 500 })
  }
}

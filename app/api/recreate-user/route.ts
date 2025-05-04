import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Demo user credentials
const DEMO_EMAIL = "demo@hopeandhire.com"
const DEMO_PASSWORD = "Demo@123456"

export async function GET(request: Request) {
  // Check for the setup secret key to prevent unauthorized access
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
    // Create a Supabase admin client
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Create the user with the specific ID
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: {
        company_name: "Demo Company",
        role: "employer",
      },
      // This is the key part - we're using the ID from the JWT
      id: userId,
    })

    if (createError) {
      console.error("Error creating user:", createError)
      return NextResponse.json({ error: "Failed to create user: " + createError.message }, { status: 500 })
    }

    // Create a company record for the user
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
      // Continue anyway, the user is created
    }

    return NextResponse.json({
      message: "User recreated successfully with the same ID",
      userId: userData.user.id,
      email: DEMO_EMAIL,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred: " + error.message }, { status: 500 })
  }
}

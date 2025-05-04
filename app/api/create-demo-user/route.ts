import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Demo user credentials
const DEMO_EMAIL = "demo@hopeandhire.com"
const DEMO_PASSWORD = "Demo@123456"

export async function GET(request: Request) {
  // Check for the setup secret key to prevent unauthorized access
  const { searchParams } = new URL(request.url)
  const secretKey = searchParams.get("key")

  if (secretKey !== process.env.SETUP_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    // Create a Supabase admin client
    const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // First, check if the user exists
    const { data: existingUser, error: checkError } = await supabase.auth.admin.getUserByEmail(DEMO_EMAIL)

    if (checkError && !checkError.message.includes("User not found")) {
      console.error("Error checking for existing user:", checkError)
      return NextResponse.json({ error: "Failed to check for existing user" }, { status: 500 })
    }

    // If user exists, delete it first to ensure a clean slate
    if (existingUser) {
      console.log("Existing demo user found, deleting first:", existingUser.id)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(existingUser.id)

      if (deleteError) {
        console.error("Error deleting existing user:", deleteError)
        return NextResponse.json({ error: "Failed to delete existing user" }, { status: 500 })
      }
    }

    // Create the demo user
    const { data: userData, error: createError } = await supabase.auth.admin.createUser({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: {
        company_name: "Demo Company",
        role: "employer",
      },
    })

    if (createError) {
      console.error("Error creating demo user:", createError)
      return NextResponse.json({ error: "Failed to create demo user" }, { status: 500 })
    }

    // Create a company record for the demo user
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
      message: "Demo user created successfully",
      userId: userData.user.id,
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

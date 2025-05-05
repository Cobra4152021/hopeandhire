import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const DEMO_EMAIL = "demo@hopeandhire.com"
const DEMO_PASSWORD = "Demo@123456"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secretKey = searchParams.get("key")

  if (secretKey !== process.env.SETUP_SECRET_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: { autoRefreshToken: false, persistSession: false },
      }
    )

    // Search all users for matching email
    const { data: userList, error: listError } = await supabase.auth.admin.listUsers()
    if (listError) {
      console.error("Error listing users:", listError)
      return NextResponse.json({ error: "Failed to list users" }, { status: 500 })
    }

    const existingUser = userList.users.find(u => u.email === DEMO_EMAIL)

    if (existingUser) {
      console.log("Existing demo user found, deleting:", existingUser.id)
      const { error: deleteError } = await supabase.auth.admin.deleteUser(existingUser.id)
      if (deleteError) {
        console.error("Error deleting existing user:", deleteError)
        return NextResponse.json({ error: "Failed to delete existing user" }, { status: 500 })
      }
    }

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

    const { data: companyData, error: companyError } = await supabase
      .from("companies")
      .insert([{
        name: "Demo Company",
        user_id: userData.user.id,
        description: "Demo company for testing",
        industry: "Technology",
        website: "https://demo-company.com",
        size: "10-50",
        address: "Demo Address",
        city: "San Francisco",
        state: "CA",
        zip: "94107",
        country: "USA",
        phone: "123-456-7890",
        email: DEMO_EMAIL,
      }])
      .select()

    if (companyError) {
      console.error("Company insert failed:", companyError)
    }

    return NextResponse.json({
      message: "Demo user created",
      userId: userData.user.id,
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
    })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 })
  }
}

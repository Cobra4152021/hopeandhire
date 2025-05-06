"use client"

import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { EmployerDashboardNav } from "@/components/employer-dashboard-nav"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [supabase, setSupabase] = useState<any>(null)
  // const [user, setUser] = useState<any>(null)
  // const [loading, setLoading] = useState(true)
  // const [companyName, setCompanyName] = useState("")
  // const [mobileNavOpen, setMobileNavOpen] = useState(false)
  // const router = useRouter()

  // useEffect(() => {
  //   const initializeSupabase = async () => {
  //     try {
  //       const { createClientSupabaseClient } = await import("@/lib/supabase")
  //       const supabaseClient = createClientSupabaseClient()
  //       setSupabase(supabaseClient)

  //       const {
  //         data: { user },
  //       } = await supabaseClient.auth.getUser()

  //       if (!user) {
  //         router.push("/employer/login")
  //         return
  //       }

  //       // Check if user is an employer
  //       const role = user.user_metadata?.role
  //       if (role !== "employer") {
  //         router.push("/login")
  //         return
  //       }

  //       setUser(user)
  //       setCompanyName(user.user_metadata?.company_name || "Your Company")
  //       setLoading(false)
  //     } catch (error) {
  //       console.error("Error initializing dashboard:", error)
  //       router.push("/employer/login")
  //     }
  //   }

  //   initializeSupabase()
  // }, [router])

  // if (loading) {
  //   return (
  //     <div className="flex min-h-screen flex-col">
  //       <Header />
  //       <div className="flex-1 py-8">
  //         <div className="container mx-auto px-4">
  //           <div className="flex flex-col space-y-4">
  //             <Skeleton className="h-8 w-64" />
  //             <Skeleton className="h-4 w-full max-w-md" />
  //             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
  //               <div className="md:col-span-1">
  //                 <Skeleton className="h-[600px] w-full" />
  //               </div>
  //               <div className="md:col-span-2">
  //                 <Skeleton className="h-[600px] w-full" />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //       <Footer />
  //     </div>
  //   )
  // }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-64 flex-shrink-0">
              <div className="sticky top-24">
                <EmployerDashboardNav />
              </div>
            </div>
            <div className="flex-1">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

"use client"

   import { useState, useEffect } from "react"
   import type { User } from "@supabase/supabase-js"
   import dynamic from "next/dynamic"
   import { Button } from "@/components/ui/button"
   import createClient from "@/utils/supabase/client"
   import { useRouter } from "next/navigation"
   import { CheckCircle2, XCircle } from "lucide-react"

   const Card = dynamic(() => import("@/components/ui/card").then(mod => mod.Card), { ssr: false })
   const CardContent = dynamic(() => import("@/components/ui/card").then(mod => mod.CardContent), { ssr: false })
   const CardDescription = dynamic(() => import("@/components/ui/card").then(mod => mod.CardDescription), { ssr: false })
   const CardHeader = dynamic(() => import("@/components/ui/card").then(mod => mod.CardHeader), { ssr: false })
   const CardTitle = dynamic(() => import("@/components/ui/card").then(mod => mod.CardTitle), { ssr: false })

   export default function TestAuthPage() {
     const router = useRouter()
     const [user, setUser] = useState<User | null>(null)
     const [loading, setLoading] = useState(true)
     const [error, setError] = useState("")
     const supabase = createClient()

     useEffect(() => {
       async function getUser() {
         try {
           setLoading(true)
           const { data, error } = await supabase.auth.getUser()

           if (error) {
             throw error
           }

           setUser(data.user)
         } catch (error: any) {
           console.error("Error fetching user:", error)
           setError(error.message)
         } finally {
           setLoading(false)
         }
       }

       getUser()
     }, [supabase])

     if (loading) {
       return (
         <div className="container py-10">
           <Card>
             <CardHeader>
               <CardTitle>Authentication Test</CardTitle>
               <CardDescription>Checking authentication status...</CardDescription>
             </CardHeader>
             <CardContent>
               <div className="flex items-center justify-center p-8">
                 <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
               </div>
             </CardContent>
           </Card>
         </div>
       )
     }

     return (
       <div className="container py-10">
         <Card>
           <CardHeader>
             <CardTitle>Authentication Test</CardTitle>
             <CardDescription>
               This page verifies your authentication status and displays your user information.
             </CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             {error ? (
               <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
                 <div className="flex items-center gap-2">
                   <XCircle className="h-5 w-5" />
                   <h3 className="font-medium">Authentication Error</h3>
                 </div>
                 <p className="mt-1 text-sm">{error}</p>
               </div>
             ) : user ? (
               <>
                 <div className="rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                   <div className="flex items-center gap-2">
                     <CheckCircle2 className="h-5 w-5" />
                     <h3 className="font-medium">Authenticated</h3>
                   </div>
                   <p className="mt-1 text-sm">You are successfully logged in.</p>
                 </div>

                 <div className="space-y-4">
                   <h3 className="text-lg font-medium">User Information</h3>
                   <div className="rounded-md bg-muted p-4">
                     <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(user, null, 2)}</pre>
                   </div>
                 </div>

                 <Button onClick={handleSignOut} variant="destructive">
                   Sign Out
                 </Button>
               </>
             ) : (
               <div className="rounded-lg bg-destructive/10 p-4 text-destructive">
                 <div className="flex items-center gap-2">
                   <XCircle className="h-5 w-5" />
                   <h3 className="font-medium">Not Authenticated</h3>
                 </div>
                 <p className="mt-1 text-sm">You are not logged in. Please sign in to access this page.</p>
                 <Button className="mt-4" onClick={() => router.push("/employer/login")}>Go to Login</Button>
               </div>
             )}
           </CardContent>
         </Card>
       </div>
     )
   }
   }
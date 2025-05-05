import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"
import { createClient } from "@/utils/supabase/server"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Hope And Hire",
    template: "%s | Hope And Hire",
  },
  description: "Connecting formerly incarcerated individuals with employment opportunities",
  keywords: ["employment", "jobs", "hiring", "second chance", "reentry", "rehabilitation"],
  authors: [{ name: "Hope And Hire Team" }],
  creator: "Hope And Hire",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hopeandhire.org",
    title: "Hope And Hire",
    description: "Connecting formerly incarcerated individuals with employment opportunities",
    siteName: "Hope And Hire",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hope And Hire",
    description: "Connecting formerly incarcerated individuals with employment opportunities",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className + " bg-background text-foreground"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense>
            <div className="container mx-auto px-4 max-w-screen-xl">
              {children}
              <Toaster />
            </div>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

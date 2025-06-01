import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { GridDiagnostic } from "@/components/grid-diagnostic"
import { LayoutDebugger } from "@/components/layout-debugger"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Providers from "@/app/providers"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://hopeandhire.net'),
  title: {
    default: "Hope and Hire - Building Better Futures",
    template: "%s | Hope and Hire"
  },
  description: "Empowering individuals with second chances through workforce readiness and meaningful employment. Join our mission to bridge the gap from hope to hire.",
  keywords: "second chances, employment, workforce readiness, job placement, career development, reentry support, rehabilitation, job training, volunteer opportunities",
  authors: [{ name: "Hope and Hire Team" }],
  creator: "Hope and Hire",
  publisher: "Hope and Hire",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hopeandhire.org",
    siteName: "Hope and Hire",
    title: "Hope and Hire - Building Better Futures",
    description: "Empowering individuals with second chances through workforce readiness and meaningful employment.",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Hope and Hire Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hope and Hire - Building Better Futures",
    description: "Empowering individuals with second chances through workforce readiness and meaningful employment.",
    images: ["/logo.jpg"],
    creator: "@hopeandhire",
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "social impact",
  applicationName: "Hope and Hire",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#0D9488" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hope and Hire" />
        <link rel="canonical" href="https://hopeandhire.org" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preload critical fonts */}
        <link rel="preload" href="/_next/static/media/inter.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Hope and Hire",
              "description": "Empowering individuals with second chances through workforce readiness and meaningful employment",
              "url": "https://hopeandhire.org",
              "logo": "https://hopeandhire.org/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/hopeandhire",
                "https://twitter.com/hopeandhire"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "US"
              }
            })
          }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          {/* Only show debugging tools in development */}
          {process.env.NODE_ENV === "development" && (
            <>
              <GridDiagnostic />
              <LayoutDebugger />
            </>
          )}
        </Providers>
      </body>
    </html>
  )
}

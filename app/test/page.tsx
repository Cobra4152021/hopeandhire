"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import TestUtility from "@/utils/test-utils"

export default function TestPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f8faf9]">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">System Testing</h1>
            <p className="text-gray-600">
              Run tests to validate system functionality and ensure all features are working correctly
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <TestUtility />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

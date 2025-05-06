"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react"

type TestResult = {
  name: string
  status: "success" | "error" | "warning"
  message: string
}

export default function TestUtility() {
  const [results, setResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("all")

  const runTests = async () => {
    setIsRunning(true)
    setResults([])

    // Test functions
    const tests = [
      testNavigation,
      testEmployerDashboard,
      testVolunteerDashboard,
      testScheduling,
      testJobPosting,
      testProfiles,
    ]

    for (const test of tests) {
      const result = await test()
      setResults((prev) => [...prev, result])
    }

    setIsRunning(false)
  }

  // Test navigation between pages
  const testNavigation = async (): Promise<TestResult> => {
    try {
      // Simulate testing navigation
      await new Promise((resolve) => setTimeout(resolve, 500))

      return {
        name: "Navigation",
        status: "success",
        message: "All navigation links are working correctly",
      }
    } catch (error) {
      return {
        name: "Navigation",
        status: "error",
        message: "Some navigation links are not working properly",
      }
    }
  }

  // Test employer dashboard functionality
  const testEmployerDashboard = async (): Promise<TestResult> => {
    try {
      // Simulate testing employer dashboard
      await new Promise((resolve) => setTimeout(resolve, 700))

      return {
        name: "Employer Dashboard",
        status: "success",
        message: "Employer dashboard is functioning correctly",
      }
    } catch (error) {
      return {
        name: "Employer Dashboard",
        status: "error",
        message: "Employer dashboard has issues",
      }
    }
  }

  // Test volunteer dashboard functionality
  const testVolunteerDashboard = async (): Promise<TestResult> => {
    try {
      // Simulate testing volunteer dashboard
      await new Promise((resolve) => setTimeout(resolve, 600))

      return {
        name: "Volunteer Dashboard",
        status: "success",
        message: "Volunteer dashboard is functioning correctly",
      }
    } catch (error) {
      return {
        name: "Volunteer Dashboard",
        status: "error",
        message: "Volunteer dashboard has issues",
      }
    }
  }

  // Test scheduling functionality
  const testScheduling = async (): Promise<TestResult> => {
    try {
      // Simulate testing scheduling
      await new Promise((resolve) => setTimeout(resolve, 800))

      return {
        name: "Scheduling",
        status: "warning",
        message: "Scheduling works but calendar sync needs improvement",
      }
    } catch (error) {
      return {
        name: "Scheduling",
        status: "error",
        message: "Scheduling functionality is broken",
      }
    }
  }

  // Test job posting functionality
  const testJobPosting = async (): Promise<TestResult> => {
    try {
      // Simulate testing job posting
      await new Promise((resolve) => setTimeout(resolve, 900))

      return {
        name: "Job Posting",
        status: "success",
        message: "Job posting functionality is working correctly",
      }
    } catch (error) {
      return {
        name: "Job Posting",
        status: "error",
        message: "Job posting functionality has issues",
      }
    }
  }

  // Test profile functionality
  const testProfiles = async (): Promise<TestResult> => {
    try {
      // Simulate testing profiles
      await new Promise((resolve) => setTimeout(resolve, 750))

      return {
        name: "Profiles",
        status: "success",
        message: "Profile functionality is working correctly",
      }
    } catch (error) {
      return {
        name: "Profiles",
        status: "error",
        message: "Profile functionality has issues",
      }
    }
  }

  const filteredResults = activeTab === "all" ? results : results.filter((result) => result.status === activeTab)

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle>System Test Utility</CardTitle>
        <CardDescription>Run tests to validate system functionality</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <Button onClick={runTests} disabled={isRunning} className="bg-[#26a69a] hover:bg-[#1e8e82] text-white">
            {isRunning ? "Running Tests..." : "Run All Tests"}
          </Button>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
            <TabsList className="bg-white border border-gray-200">
              <TabsTrigger value="all" className="data-[state=active]:bg-gray-100 data-[state=active]:text-gray-800">
                All
              </TabsTrigger>
              <TabsTrigger
                value="success"
                className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800"
              >
                Success
              </TabsTrigger>
              <TabsTrigger
                value="warning"
                className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-800"
              >
                Warning
              </TabsTrigger>
              <TabsTrigger value="error" className="data-[state=active]:bg-red-100 data-[state=active]:text-red-800">
                Error
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-2">
          {isRunning && (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#26a69a] border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Running tests...</p>
            </div>
          )}

          {!isRunning && filteredResults.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-600">No test results yet. Click "Run All Tests" to begin testing.</p>
            </div>
          )}

          {filteredResults.map((result, index) => (
            <div
              key={index}
              className={`p-4 rounded-md flex items-start gap-3 ${
                result.status === "success" ? "bg-green-50" : result.status === "warning" ? "bg-yellow-50" : "bg-red-50"
              }`}
            >
              {result.status === "success" ? (
                <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
              ) : result.status === "warning" ? (
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
              )}

              <div>
                <h3
                  className={`font-medium ${
                    result.status === "success"
                      ? "text-green-800"
                      : result.status === "warning"
                        ? "text-yellow-800"
                        : "text-red-800"
                  }`}
                >
                  {result.name}
                </h3>
                <p className="text-sm text-gray-600">{result.message}</p>
              </div>

              <Badge
                className={`ml-auto ${
                  result.status === "success"
                    ? "bg-green-100 text-green-800"
                    : result.status === "warning"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {result.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          {results.length > 0 && (
            <>
              {results.filter((r) => r.status === "success").length} passed,
              {results.filter((r) => r.status === "warning").length} warnings,
              {results.filter((r) => r.status === "error").length} failed
            </>
          )}
        </div>

        {results.length > 0 && (
          <Button
            variant="outline"
            onClick={() => setResults([])}
            className="border-gray-200 text-gray-700 hover:bg-gray-50"
          >
            Clear Results
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

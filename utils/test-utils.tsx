"use client"

import type React from "react"
import { useState } from "react"

// Test types
export type TestStatus = "success" | "warning" | "error" | "pending"

export interface TestResult {
  id: string
  name: string
  description: string
  status: TestStatus
  message?: string
  details?: string
}

// Test components
export const TestCard: React.FC<{ test: TestResult }> = ({ test }) => {
  const [expanded, setExpanded] = useState(false)

  const statusColors = {
    success: "bg-green-100 border-green-200 text-green-800",
    warning: "bg-yellow-100 border-yellow-200 text-yellow-800",
    error: "bg-red-100 border-red-200 text-red-800",
    pending: "bg-gray-100 border-gray-200 text-gray-800",
  }

  const statusIcons = {
    success: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    warning: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-yellow-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
    ),
    error: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-red-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    pending: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-gray-600 animate-spin"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    ),
  }

  return (
    <div className={`p-4 rounded-lg border ${statusColors[test.status]}`}>
      <div className="flex justify-between items-start">
        <div className="flex items-start">
          <div className="mr-3 mt-0.5">{statusIcons[test.status]}</div>
          <div>
            <h3 className="font-medium">{test.name}</h3>
            <p className="text-sm mt-1">{test.description}</p>
            {test.message && <p className="text-sm mt-2 font-medium">{test.message}</p>}
          </div>
        </div>

        {test.details && (
          <button onClick={() => setExpanded(!expanded)} className="text-sm underline">
            {expanded ? "Hide Details" : "Show Details"}
          </button>
        )}
      </div>

      {expanded && test.details && (
        <div className="mt-4 p-3 bg-white rounded border border-gray-200 overflow-x-auto">
          <pre className="text-xs">{test.details}</pre>
        </div>
      )}
    </div>
  )
}

export const TestSummary: React.FC<{ results: TestResult[] }> = ({ results }) => {
  const counts = {
    success: results.filter((r) => r.status === "success").length,
    warning: results.filter((r) => r.status === "warning").length,
    error: results.filter((r) => r.status === "error").length,
    pending: results.filter((r) => r.status === "pending").length,
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div className="bg-green-100 p-4 rounded-lg border border-green-200">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-green-800 font-medium">Passed</span>
        </div>
        <p className="text-2xl font-bold text-green-800 mt-2">{counts.success}</p>
      </div>

      <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-yellow-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-yellow-800 font-medium">Warnings</span>
        </div>
        <p className="text-2xl font-bold text-yellow-800 mt-2">{counts.warning}</p>
      </div>

      <div className="bg-red-100 p-4 rounded-lg border border-red-200">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="text-red-800 font-medium">Failed</span>
        </div>

        <p className="text-2xl font-bold text-red-800 mt-2">{counts.error}</p>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg border border-gray-200">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600 mr-2 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          <span className="text-gray-800 font-medium">Pending</span>
        </div>
        <p className="text-2xl font-bold text-gray-800 mt-2">{counts.pending}</p>
      </div>
    </div>
  )
}

// Test runner functions
export const runTest = async (
  testFn: () => Promise<{ success: boolean; message?: string; details?: string }>,
  name: string,
  description: string,
): Promise<TestResult> => {
  try {
    const result = await testFn()
    return {
      id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      status: result.success ? "success" : "error",
      message: result.message,
      details: result.details,
    }
  } catch (error) {
    return {
      id: `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description,
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error occurred",
      details: error instanceof Error ? error.stack : undefined,
    }
  }
}

export const createTestSuite = (name: string) => {
  const tests: Array<() => Promise<TestResult>> = []

  return {
    test: (
      testName: string,
      description: string,
      testFn: () => Promise<{ success: boolean; message?: string; details?: string }>,
    ) => {
      tests.push(() => runTest(testFn, testName, description))
    },
    run: async () => {
      console.log(`Running test suite: ${name}`)
      const results: TestResult[] = []

      for (const test of tests) {
        results.push(await test())
      }

      return results
    },
  }
}

// Mock API functions for testing
export const mockFetch = async (url: string, options?: RequestInit) => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock responses based on URL
  if (url.includes("/api/auth")) {
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, user: { id: "123", name: "Test User" } }),
    }
  }

  if (url.includes("/api/jobs")) {
    return {
      ok: true,
      status: 200,
      json: async () => ({ success: true, jobs: [] }),
    }
  }

  // Default response
  return {
    ok: false,
    status: 404,
    json: async () => ({ success: false, error: "Not found" }),
  }
}

export const mockLocalStorage = () => {
  const store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      Object.keys(store).forEach((key) => delete store[key])
    },
  }
}

// Export all test utilities
export default {
  TestCard,
  TestSummary,
  runTest,
  createTestSuite,
  mockFetch,
  mockLocalStorage,
}

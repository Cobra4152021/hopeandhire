"use client"

import { useEffect, useState } from "react"

interface LayoutIssue {
  element: string
  issue: string
  suggestion: string
}

export function LayoutDebugger() {
  const [issues, setIssues] = useState<LayoutIssue[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const checkLayouts = () => {
      const foundIssues: LayoutIssue[] = []

      // Check for elements with grid class but no grid-cols
      const gridElements = document.querySelectorAll(".grid")
      gridElements.forEach((element, index) => {
        const classList = Array.from(element.classList)
        const hasGridCols = classList.some((cls) => cls.startsWith("grid-cols-"))

        if (!hasGridCols) {
          foundIssues.push({
            element: `Grid element ${index + 1}`,
            issue: "Has .grid class but no grid-cols-* class",
            suggestion: "Add grid-cols-1, grid-cols-2, etc.",
          })
        }

        const computedStyle = window.getComputedStyle(element)
        if (computedStyle.display !== "grid") {
          foundIssues.push({
            element: `Grid element ${index + 1}`,
            issue: "Display is not set to grid",
            suggestion: "Check if Tailwind CSS is loaded properly",
          })
        }
      })

      // Check for flex containers that might need to be grids
      const flexElements = document.querySelectorAll(".flex")
      flexElements.forEach((element, index) => {
        const children = element.children
        if (children.length > 3) {
          foundIssues.push({
            element: `Flex element ${index + 1}`,
            issue: `Has ${children.length} children - might benefit from grid layout`,
            suggestion: "Consider using grid instead of flex for better layout control",
          })
        }
      })

      setIssues(foundIssues)
    }

    // Run check after a delay to ensure DOM is ready
    const timer = setTimeout(checkLayouts, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (issues.length === 0) return null

  return (
    <>
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="fixed bottom-4 left-4 bg-red-500 text-white p-2 rounded-full z-50"
        title="Layout Issues Found"
      >
        🐛 {issues.length}
      </button>

      {isVisible && (
        <div className="fixed bottom-16 left-4 bg-white border border-red-200 rounded-lg p-4 max-w-md z-50 shadow-lg">
          <h3 className="font-bold text-red-600 mb-2">Layout Issues Detected</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {issues.map((issue, index) => (
              <div key={index} className="border-b border-gray-200 pb-2">
                <div className="font-medium text-sm">{issue.element}</div>
                <div className="text-red-600 text-xs">{issue.issue}</div>
                <div className="text-blue-600 text-xs">{issue.suggestion}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setIsVisible(false)} className="mt-2 text-xs text-gray-500 hover:text-gray-700">
            Close
          </button>
        </div>
      )}
    </>
  )
}

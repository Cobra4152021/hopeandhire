"use client"

import { useEffect, useState } from "react"

export function GridDiagnostic() {
  const [diagnostics, setDiagnostics] = useState<string[]>([])

  useEffect(() => {
    const results: string[] = []

    // Check if Tailwind CSS is loaded
    const testElement = document.createElement("div")
    testElement.className = "grid grid-cols-2"
    document.body.appendChild(testElement)

    const computedStyle = window.getComputedStyle(testElement)
    const display = computedStyle.display
    const gridTemplateColumns = computedStyle.gridTemplateColumns

    results.push(`Display property: ${display}`)
    results.push(`Grid template columns: ${gridTemplateColumns}`)

    if (display !== "grid") {
      results.push("❌ Grid display not working - Tailwind CSS may not be loaded properly")
    } else {
      results.push("✅ Grid display working correctly")
    }

    if (gridTemplateColumns === "none" || !gridTemplateColumns) {
      results.push("❌ Grid columns not working - Check Tailwind configuration")
    } else {
      results.push("✅ Grid columns working correctly")
    }

    document.body.removeChild(testElement)
    setDiagnostics(results)
  }, [])

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Grid Diagnostic</h3>
      {diagnostics.map((result, index) => (
        <div key={index} className="mb-1">
          {result}
        </div>
      ))}
    </div>
  )
}

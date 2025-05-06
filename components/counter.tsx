"use client"

import { useEffect, useState, useRef } from "react"

interface CounterProps {
  end: number
  duration?: number
  label: string
  sublabel: string
}

export function Counter({ end, duration = 2000, label, sublabel }: CounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const progress = timestamp - startTimeRef.current
      const percentage = Math.min(progress / duration, 1)

      // Easing function for smoother animation
      const easeOutQuad = (t: number) => t * (2 - t)
      const easedProgress = easeOutQuad(percentage)

      const currentCount = Math.floor(easedProgress * end)

      if (currentCount !== countRef.current) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (percentage < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end) // Ensure we end at the exact target
      }
    }

    // Start the animation
    rafRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [end, duration])

  return (
    <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">{label}</h3>
      <p className="text-5xl font-bold text-brand-teal-500 mb-2">{count.toLocaleString()}</p>
      <p className="text-gray-500">{sublabel}</p>
    </div>
  )
}

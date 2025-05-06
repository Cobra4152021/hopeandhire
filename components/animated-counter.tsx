"use client"

import { useEffect, useState, useRef } from "react"

interface AnimatedCounterProps {
  end: number
  duration?: number
  className?: string
}

export default function AnimatedCounter({ end, duration = 2000, className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    // Reset when end value changes
    countRef.current = 0
    startTimeRef.current = null
    setCount(0)

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smoother animation
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)

      const currentCount = Math.floor(easedProgress * end)

      if (currentCount !== countRef.current) {
        countRef.current = currentCount
        setCount(currentCount)
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate)
      } else {
        setCount(end) // Ensure we end exactly at the target number
      }
    }

    frameRef.current = requestAnimationFrame(animate)

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [end, duration])

  return <span className={className}>{count.toLocaleString()}</span>
}

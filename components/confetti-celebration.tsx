"use client"

import { useState, useEffect } from "react"
import Confetti from "react-confetti"

interface ConfettiCelebrationProps {
  duration?: number
}

export default function ConfettiCelebration({ duration = 5000 }: ConfettiCelebrationProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Set dimensions to window size
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial dimensions
    updateDimensions()

    // Update dimensions on resize
    window.addEventListener("resize", updateDimensions)

    // Set timer to hide confetti
    const timer = setTimeout(() => {
      setShowConfetti(false)
    }, duration)

    // Cleanup
    return () => {
      window.removeEventListener("resize", updateDimensions)
      clearTimeout(timer)
    }
  }, [duration])

  if (!showConfetti) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={500}
        gravity={0.15}
        colors={["#38B2AC", "#F6E05E", "#4FD1C5", "#FFD700", "#FFFFFF"]}
      />
    </div>
  )
}

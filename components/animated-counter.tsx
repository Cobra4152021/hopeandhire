'use client';

import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
}

function AnimatedCounter({
  end,
  duration = 2000,
  delay = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Wait for the specified delay before starting the animation
    const delayTimeout = setTimeout(() => {
      // Calculate the increment per step (every 500ms)
      const steps = duration / 500;
      const increment = end / steps;
      let current = 0;

      // Set up the interval to update the count
      const interval = setInterval(() => {
        current += increment;
        if (current >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, 500);

      // Clean up the interval on unmount
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [end, duration, delay]);

  return <>{count.toLocaleString()}</>;
}

// Export both as default and named export
export default AnimatedCounter;
export { AnimatedCounter };

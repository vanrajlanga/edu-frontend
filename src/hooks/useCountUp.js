'use client';

import { useState, useEffect, useRef } from 'react';

/**
 * Hook for count-up animation effect
 * @param {number} end - Target number
 * @param {Object} options - Animation options
 * @param {number} options.start - Starting number
 * @param {number} options.duration - Animation duration in ms
 * @param {boolean} options.startOnMount - Start animation on mount
 * @param {string} options.easing - Easing function
 * @returns {Object} Count state and controls
 */
export function useCountUp(
  end,
  {
    start = 0,
    duration = 2000,
    startOnMount = false,
    easing = 'easeOutExpo',
  } = {}
) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  // Easing functions
  const easingFunctions = {
    linear: (t) => t,
    easeOutQuad: (t) => t * (2 - t),
    easeOutCubic: (t) => 1 - Math.pow(1 - t, 3),
    easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    easeInOutQuad: (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  };

  const easeFn = easingFunctions[easing] || easingFunctions.easeOutExpo;

  const animate = (timestamp) => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
    }

    const elapsed = timestamp - startTimeRef.current;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeFn(progress);
    const currentCount = Math.floor(start + (end - start) * easedProgress);

    setCount(currentCount);

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    } else {
      setCount(end);
      setIsAnimating(false);
    }
  };

  const startAnimation = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    startTimeRef.current = null;
    rafRef.current = requestAnimationFrame(animate);
  };

  const reset = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    setCount(start);
    setIsAnimating(false);
    startTimeRef.current = null;
  };

  // Start on mount if enabled
  useEffect(() => {
    if (startOnMount) {
      startAnimation();
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [startOnMount]);

  return {
    count,
    isAnimating,
    startAnimation,
    reset,
  };
}

export default useCountUp;

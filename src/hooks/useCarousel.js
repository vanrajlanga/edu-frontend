'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

/**
 * Hook to manage carousel state and controls
 * @param {Object} options - Carousel options
 * @param {number} options.totalItems - Total number of items
 * @param {number} options.visibleItems - Number of visible items
 * @param {boolean} options.autoPlay - Enable auto-play
 * @param {number} options.autoPlayInterval - Auto-play interval in ms
 * @param {boolean} options.loop - Enable infinite loop
 * @returns {Object} Carousel state and controls
 */
export function useCarousel({
  totalItems,
  visibleItems = 1,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = false,
} = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef(null);

  const maxIndex = Math.max(0, totalItems - visibleItems);
  const canGoNext = loop || currentIndex < maxIndex;
  const canGoPrev = loop || currentIndex > 0;

  const goToIndex = useCallback(
    (index) => {
      if (loop) {
        // Wrap around for infinite loop
        if (index < 0) {
          setCurrentIndex(maxIndex);
        } else if (index > maxIndex) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(index);
        }
      } else {
        // Clamp to valid range
        setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
      }
    },
    [loop, maxIndex]
  );

  const goToNext = useCallback(() => {
    goToIndex(currentIndex + 1);
  }, [currentIndex, goToIndex]);

  const goToPrev = useCallback(() => {
    goToIndex(currentIndex - 1);
  }, [currentIndex, goToIndex]);

  const goToFirst = useCallback(() => {
    setCurrentIndex(0);
  }, []);

  const goToLast = useCallback(() => {
    setCurrentIndex(maxIndex);
  }, [maxIndex]);

  const play = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const pause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && totalItems > visibleItems) {
      intervalRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [isPlaying, autoPlayInterval, goToNext, totalItems, visibleItems]);

  // Calculate progress
  const progress = totalItems > visibleItems
    ? (currentIndex / maxIndex) * 100
    : 100;

  // Calculate which items are visible
  const visibleRange = {
    start: currentIndex,
    end: Math.min(currentIndex + visibleItems - 1, totalItems - 1),
  };

  return {
    // State
    currentIndex,
    isPlaying,
    canGoNext,
    canGoPrev,
    maxIndex,
    progress,
    visibleRange,

    // Actions
    goToIndex,
    goToNext,
    goToPrev,
    goToFirst,
    goToLast,
    play,
    pause,
    toggle,
  };
}

export default useCarousel;

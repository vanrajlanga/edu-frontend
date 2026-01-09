'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function Carousel({
  children,
  itemsPerView = { mobile: 1, tablet: 2, desktop: 4 },
  gap = 24,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  peek = false,
  className,
  ...props
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(itemsPerView.desktop);
  const containerRef = useRef(null);
  const items = Array.isArray(children) ? children : [children];
  const totalItems = items.length;

  // Calculate visible items based on screen size
  useEffect(() => {
    const updateVisibleItems = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleItems(itemsPerView.mobile || 1);
      } else if (width < 1024) {
        setVisibleItems(itemsPerView.tablet || 2);
      } else {
        setVisibleItems(itemsPerView.desktop || 4);
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);
    return () => window.removeEventListener('resize', updateVisibleItems);
  }, [itemsPerView]);

  const maxIndex = Math.max(0, totalItems - visibleItems);
  const canGoNext = currentIndex < maxIndex;
  const canGoPrev = currentIndex > 0;

  const goToNext = useCallback(() => {
    if (canGoNext) {
      setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    }
  }, [canGoNext, maxIndex]);

  const goToPrev = useCallback(() => {
    if (canGoPrev) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  }, [canGoPrev]);

  const goToIndex = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Auto play
  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      if (currentIndex >= maxIndex) {
        setCurrentIndex(0);
      } else {
        goToNext();
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, currentIndex, maxIndex, goToNext]);

  // Calculate dots
  const totalDots = Math.ceil(totalItems / visibleItems);
  const activeDot = Math.floor(currentIndex / visibleItems);

  return (
    <div className={cn('relative', className)} {...props}>
      {/* Carousel Container */}
      <div className="overflow-hidden" ref={containerRef}>
        <div
          className="flex transition-transform duration-[var(--duration-slow)] ease-[var(--ease-smooth)]"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            gap: `${gap}px`,
          }}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{
                width: `calc((100% - ${gap * (visibleItems - 1)}px) / ${visibleItems})`,
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && totalItems > visibleItems && (
        <>
          <button
            type="button"
            onClick={goToPrev}
            disabled={!canGoPrev}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-surface border border-border shadow-md',
              'flex items-center justify-center',
              'transition-all duration-[var(--duration-fast)]',
              'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-800',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface',
              'hidden md:flex'
            )}
            aria-label="Previous"
          >
            <Icon name="chevronLeft" size="md" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            disabled={!canGoNext}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-surface border border-border shadow-md',
              'flex items-center justify-center',
              'transition-all duration-[var(--duration-fast)]',
              'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-800',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-surface',
              'hidden md:flex'
            )}
            aria-label="Next"
          >
            <Icon name="chevronRight" size="md" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && totalDots > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalDots }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToIndex(index * visibleItems)}
              className={cn(
                'w-2 h-2 rounded-full transition-all duration-[var(--duration-fast)]',
                index === activeDot
                  ? 'w-6 bg-blue-500'
                  : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export { Carousel };
export default Carousel;

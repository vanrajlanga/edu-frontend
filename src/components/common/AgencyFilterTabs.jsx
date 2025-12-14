'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function AgencyFilterTabs({
  items,
  defaultValue,
  value,
  onChange,
  label = 'Agencies:',
  className,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || items[0]?.value);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scrollContainerRef = useRef(null);

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Label */}
      {label && (
        <span className="flex-shrink-0 text-sm text-gray-500">{label}</span>
      )}

      {/* Tabs Container Wrapper */}
      <div className="relative flex items-center gap-2 flex-1 min-w-0">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            type="button"
            onClick={() => scroll('left')}
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full',
              'border border-gray-200 bg-white shadow-sm',
              'flex items-center justify-center',
              'text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'transition-all duration-200'
            )}
          >
            <Icon name="chevronLeft" size="sm" />
          </button>
        )}

        {/* Tabs Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide scroll-smooth flex-1"
        >
          {items.map((item) => {
            const isActive = currentValue === item.value;
            return (
              <button
                key={item.value}
                type="button"
                onClick={() => handleChange(item.value)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-full',
                  'text-sm font-medium whitespace-nowrap',
                  'border transition-all duration-200',
                  isActive
                    ? 'bg-white text-gray-900 border-gray-900 shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            type="button"
            onClick={() => scroll('right')}
            className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full',
              'border border-gray-200 bg-white shadow-sm',
              'flex items-center justify-center',
              'text-gray-500 hover:text-gray-700 hover:border-gray-300',
              'transition-all duration-200'
            )}
          >
            <Icon name="arrowRight" size="sm" />
          </button>
        )}
      </div>
    </div>
  );
}

export { AgencyFilterTabs };
export default AgencyFilterTabs;

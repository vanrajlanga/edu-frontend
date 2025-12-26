'use client';

import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function FilterBar({
  filters = [],
  activeFilterId = null,
  onFilterClick,
  onAllFilterClick,
  className,
  renderDropdown,
}) {
  const scrollContainerRef = useRef(null);
  const buttonRefs = useRef({});
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [filters]);

  useEffect(() => {
    const updateDropdownPosition = () => {
      if (activeFilterId && buttonRefs.current[activeFilterId]) {
        const button = buttonRefs.current[activeFilterId];
        const rect = button.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + 8,
          left: rect.left,
        });
      }
    };

    updateDropdownPosition();

    if (activeFilterId) {
      window.addEventListener('scroll', updateDropdownPosition, true);
      window.addEventListener('resize', updateDropdownPosition);

      return () => {
        window.removeEventListener('scroll', updateDropdownPosition, true);
        window.removeEventListener('resize', updateDropdownPosition);
      };
    }
  }, [activeFilterId]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={cn('bg-white border border-gray-200 rounded-xl p-2.5', className)}>
      <div className="flex items-center gap-2.5">
        {/* All Filter Button */}
        <button
          onClick={onAllFilterClick}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 rounded-lg',
            'bg-white border border-gray-300',
            'text-gray-700 font-medium text-sm',
            'hover:border-gray-400 transition-colors',
            'whitespace-nowrap flex-shrink-0'
          )}
        >
          <Icon name="filter" size="sm" />
          <span>All Filter</span>
        </button>

        {/* Scrollable Filter Container */}
        <div className="relative flex-1 min-w-0">
          {/* Left Scroll Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10',
                '-ml-3',
                'w-8 h-8 rounded-full',
                'bg-white border border-gray-300 shadow-md',
                'flex items-center justify-center',
                'text-gray-600 hover:text-gray-900',
                'transition-all'
              )}
            >
              <Icon name="chevronLeft" size="sm" />
            </button>
          )}

          {/* Scrollable Filter Buttons */}
          <div
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
          >
            {filters.map((filter) => {
              const isActive = activeFilterId === filter.id;
              return (
                <div key={filter.id} className="flex-shrink-0">
                  <button
                    ref={(el) => (buttonRefs.current[filter.id] = el)}
                    onClick={() => onFilterClick?.(filter.id)}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2.5 rounded-lg',
                      'border text-sm font-medium',
                      'whitespace-nowrap transition-all',
                      isActive
                        ? 'bg-orange-50 border-orange-500 text-orange-700'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    )}
                  >
                    <span>{filter.label}</span>
                    <Icon
                      name={isActive ? "chevronUp" : "chevronDown"}
                      size="sm"
                      className="opacity-60"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Scroll Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10',
                '-mr-3',
                'w-8 h-8 rounded-full',
                'bg-white border border-gray-300 shadow-md',
                'flex items-center justify-center',
                'text-gray-600 hover:text-gray-900',
                'transition-all'
              )}
            >
              <Icon name="chevronRight" size="sm" />
            </button>
          )}
        </div>
      </div>

      {/* Render dropdown outside scrollable container using fixed positioning */}
      {activeFilterId && renderDropdown && (
        <div
          style={{
            position: 'fixed',
            top: `${dropdownPosition.top}px`,
            left: `${dropdownPosition.left}px`,
            zIndex: 100,
          }}
        >
          {renderDropdown(activeFilterId)}
        </div>
      )}
    </div>
  );
}

export { FilterBar };
export default FilterBar;

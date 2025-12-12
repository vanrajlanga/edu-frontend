'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function CollegeFilterTabs({
  primaryFilters = [],
  secondaryFiltersMap = {},
  selectedPrimary,
  selectedSecondary = [],
  onPrimaryChange,
  onSecondaryChange,
  className,
}) {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const secondaryFilters = secondaryFiltersMap[selectedPrimary] || [];
  const unselectedSecondary = secondaryFilters.filter(
    (f) => !selectedSecondary.includes(f.value)
  );

  // Check if any filter is applied (primary selected)
  const hasFilterApplied = selectedPrimary !== null && selectedPrimary !== undefined;

  const checkScroll = () => {
    const container = scrollRef.current;
    if (container) {
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      setTimeout(checkScroll, 100);
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [selectedPrimary, selectedSecondary]);

  const scrollRight = () => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  const handlePrimaryClick = (value) => {
    onPrimaryChange(value);
    onSecondaryChange([]);
  };

  const handlePrimaryRemove = () => {
    onPrimaryChange(null);
    onSecondaryChange([]);
  };

  const handleSecondaryClick = (value) => {
    if (selectedSecondary.includes(value)) {
      onSecondaryChange(selectedSecondary.filter((v) => v !== value));
    } else {
      onSecondaryChange([...selectedSecondary, value]);
    }
  };

  const handleRemoveSecondary = (value, e) => {
    e.stopPropagation();
    onSecondaryChange(selectedSecondary.filter((v) => v !== value));
  };

  return (
    <div className={cn('space-y-0', className)}>
      {/* Single Filter Row */}
      <div className="relative flex items-center">
        <div
          ref={scrollRef}
          className="flex items-center gap-2 overflow-x-auto scrollbar-hide pr-12 pb-4"
        >
          {hasFilterApplied ? (
            <>
              {/* Selected Primary (with X) */}
              <button
                onClick={handlePrimaryRemove}
                className={cn(
                  'flex-shrink-0 flex items-center gap-2 px-4 py-2.5',
                  'bg-white border-2 border-gray-800 rounded-full',
                  'text-sm font-medium text-gray-900',
                  'hover:bg-gray-50 transition-colors'
                )}
              >
                {primaryFilters.find((f) => f.value === selectedPrimary)?.label}
                <Icon name="close" size="sm" className="text-gray-400" />
              </button>

              {/* Selected Secondary Filters (with X) */}
              {selectedSecondary.map((value) => {
                const filter = secondaryFilters.find((f) => f.value === value);
                if (!filter) return null;
                return (
                  <button
                    key={value}
                    onClick={(e) => handleRemoveSecondary(value, e)}
                    className={cn(
                      'flex-shrink-0 flex items-center gap-2 px-4 py-2.5',
                      'bg-white border-2 border-gray-800 rounded-full',
                      'text-sm font-medium text-gray-900',
                      'hover:bg-gray-50 transition-colors'
                    )}
                  >
                    {filter.label}
                    <Icon name="close" size="sm" className="text-gray-400" />
                  </button>
                );
              })}

              {/* Separator */}
              {unselectedSecondary.length > 0 && (
                <div className="w-px h-8 bg-gray-200 mx-1 flex-shrink-0" />
              )}

              {/* Unselected Secondary Filters */}
              {unselectedSecondary.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleSecondaryClick(filter.value)}
                  className={cn(
                    'flex-shrink-0 px-4 py-2.5',
                    'bg-white border border-gray-200 rounded-full',
                    'text-sm font-medium text-gray-600',
                    'hover:border-gray-300 hover:text-gray-900',
                    'transition-all duration-200'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </>
          ) : (
            <>
              {/* All Primary Filters (no selection) */}
              {primaryFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handlePrimaryClick(filter.value)}
                  className={cn(
                    'flex-shrink-0 px-4 py-2.5',
                    'bg-white border border-gray-200 rounded-full',
                    'text-sm font-medium text-gray-600',
                    'hover:border-gray-300 hover:text-gray-900',
                    'transition-all duration-200'
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Scroll Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 -mt-2',
              'w-10 h-10 rounded-full',
              'bg-white border border-gray-200 shadow-lg',
              'flex items-center justify-center',
              'text-gray-500 hover:text-gray-700',
              'transition-all duration-200',
              'z-10'
            )}
          >
            <Icon name="arrowRight" size="md" />
          </button>
        )}
      </div>

      {/* Divider Line */}
      <div className="border-b border-gray-200" />
    </div>
  );
}

export { CollegeFilterTabs };
export default CollegeFilterTabs;

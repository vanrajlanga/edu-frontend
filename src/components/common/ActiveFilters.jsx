'use client';

import { cn } from '@/lib/cn';

/**
 * ActiveFilters component - displays selected filters as removable chips
 * @param {Object} props
 * @param {Object} props.filters - Object with filter categories as keys and arrays of selected values
 * @param {Object} props.filterLabels - Object mapping filter ids to display labels
 * @param {Function} props.onRemove - Callback when a filter is removed (category, value)
 * @param {Function} props.onClearAll - Callback when all filters are cleared
 * @param {string} props.className - Additional CSS classes
 */
export function ActiveFilters({
  filters = {},
  filterLabels = {},
  onRemove,
  onClearAll,
  className
}) {
  // Count total active filters
  const activeFilterCount = Object.values(filters).reduce(
    (count, values) => count + (Array.isArray(values) ? values.length : values ? 1 : 0),
    0
  );

  if (activeFilterCount === 0) {
    return null;
  }

  // Flatten filters into array of { category, value, label }
  const flatFilters = [];
  Object.entries(filters).forEach(([category, values]) => {
    if (Array.isArray(values)) {
      values.forEach(value => {
        flatFilters.push({
          category,
          value,
          label: filterLabels[value] || value
        });
      });
    } else if (values) {
      flatFilters.push({
        category,
        value: values,
        label: filterLabels[values] || values
      });
    }
  });

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      {/* Filter chips */}
      {flatFilters.map(({ category, value, label }) => (
        <span
          key={`${category}-${value}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 rounded-full text-sm font-medium border border-orange-200"
        >
          <span>{label}</span>
          <button
            onClick={() => onRemove?.(category, value)}
            className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-orange-200 transition-colors"
            aria-label={`Remove ${label} filter`}
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
      ))}

      {/* Clear All button */}
      {activeFilterCount > 1 && (
        <button
          onClick={onClearAll}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Clear All
        </button>
      )}
    </div>
  );
}

export default ActiveFilters;

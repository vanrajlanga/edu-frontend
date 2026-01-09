'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function FilterDropdown({
  title,
  options = [],
  selectedOptions = [],
  onToggleOption,
  onClear,
  onClose,
  onViewAllFilters,
  searchPlaceholder = 'Search...',
  buttonRef,
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className="w-[420px] bg-white rounded-lg shadow-xl border border-gray-200"
      style={{
        animation: 'slideDown 0.15s ease-out'
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Icon name="close" size="sm" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 pt-3 pb-2">
        <div className="relative">
          <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-200 text-sm placeholder:text-gray-400 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all"
          />
        </div>
      </div>

      {/* Options */}
      <div className="px-4 pb-3 max-h-[220px] overflow-y-auto">
        <div className="grid grid-cols-3 gap-2">
          {filteredOptions.map((option) => {
            const isSelected = selectedOptions.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggleOption?.(option.id)}
                className={cn(
                  'px-3 py-2 rounded-full text-sm font-medium transition-all',
                  'border text-center',
                  isSelected
                    ? 'bg-orange-50 border-orange-500 text-orange-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-orange-300 hover:bg-orange-50/50'
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {filteredOptions.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p className="text-sm">No options found</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
        <button
          onClick={onViewAllFilters}
          className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
        >
          View All Filters
        </button>
        <button
          onClick={onClear}
          className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export { FilterDropdown };
export default FilterDropdown;

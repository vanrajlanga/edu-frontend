'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Filter categories and their options
const filterCategories = [
  {
    id: 'stream',
    label: 'Stream',
    options: [
      { id: 'management', label: 'Management', count: 20557 },
      { id: 'science', label: 'Science', count: 18432 },
      { id: 'engineering', label: 'Engineering', count: 15678 },
      { id: 'medical', label: 'Medical', count: 12345 },
      { id: 'commerce', label: 'Commerce', count: 10987 },
      { id: 'arts', label: 'Arts', count: 9876 },
      { id: 'law', label: 'Law', count: 5432 },
      { id: 'design', label: 'Design', count: 3456 },
    ]
  },
  {
    id: 'state',
    label: 'State',
    options: [
      { id: 'maharashtra', label: 'Maharashtra', count: 5432 },
      { id: 'karnataka', label: 'Karnataka', count: 4321 },
      { id: 'delhi', label: 'Delhi', count: 3210 },
      { id: 'tamil-nadu', label: 'Tamil Nadu', count: 4567 },
      { id: 'uttar-pradesh', label: 'Uttar Pradesh', count: 3890 },
    ]
  },
  {
    id: 'city',
    label: 'City',
    options: [
      { id: 'bangalore', label: 'Bangalore', count: 2345 },
      { id: 'mumbai', label: 'Mumbai', count: 3456 },
      { id: 'delhi', label: 'Delhi', count: 2890 },
      { id: 'pune', label: 'Pune', count: 1987 },
      { id: 'hyderabad', label: 'Hyderabad', count: 1765 },
    ]
  },
  {
    id: 'degree',
    label: 'Degree',
    options: [
      { id: 'btech', label: 'B.Tech', count: 8765 },
      { id: 'mba', label: 'MBA', count: 6543 },
      { id: 'mbbs', label: 'MBBS', count: 4321 },
      { id: 'bba', label: 'BBA', count: 3456 },
      { id: 'mtech', label: 'M.Tech', count: 2987 },
    ]
  },
  {
    id: 'program-type',
    label: 'Program Type',
    options: [
      { id: 'full-time', label: 'Full Time', count: 15432 },
      { id: 'part-time', label: 'Part Time', count: 3456 },
      { id: 'online', label: 'Online', count: 2345 },
      { id: 'distance', label: 'Distance Learning', count: 1987 },
    ]
  },
  {
    id: 'college-type',
    label: 'Type Of College',
    options: [
      { id: 'private', label: 'Private', count: 12345 },
      { id: 'government', label: 'Government', count: 5432 },
      { id: 'deemed', label: 'Deemed University', count: 2876 },
      { id: 'autonomous', label: 'Autonomous', count: 1987 },
    ]
  },
  {
    id: 'entrance-exam',
    label: 'Entrance/Exam Accepted',
    options: [
      { id: 'jee-main', label: 'JEE Main', count: 4567 },
      { id: 'neet', label: 'NEET', count: 3456 },
      { id: 'cat', label: 'CAT', count: 2987 },
      { id: 'gate', label: 'GATE', count: 2345 },
    ]
  },
  {
    id: 'avg-fee',
    label: 'Avg Fee Per Year',
    options: [
      { id: 'below-1l', label: 'Below ₹1 Lakh', count: 5432 },
      { id: '1l-3l', label: '₹1-3 Lakhs', count: 6543 },
      { id: '3l-5l', label: '₹3-5 Lakhs', count: 4321 },
      { id: 'above-5l', label: 'Above ₹5 Lakhs', count: 3987 },
    ]
  },
];

function FilterModal({ isOpen, onClose, onApply, selectedFilters = {} }) {
  const [activeCategory, setActiveCategory] = useState('stream');
  const [searchQuery, setSearchQuery] = useState('');
  const [tempFilters, setTempFilters] = useState(selectedFilters);

  useEffect(() => {
    if (isOpen) {
      setTempFilters(selectedFilters);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedFilters]);

  if (!isOpen) return null;

  const activeOptions = filterCategories.find(cat => cat.id === activeCategory)?.options || [];
  const filteredOptions = activeOptions.filter(option =>
    option.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOptionToggle = (categoryId, optionId) => {
    setTempFilters(prev => {
      const categoryFilters = prev[categoryId] || [];
      const isSelected = categoryFilters.includes(optionId);

      return {
        ...prev,
        [categoryId]: isSelected
          ? categoryFilters.filter(id => id !== optionId)
          : [...categoryFilters, optionId]
      };
    });
  };

  const handleClear = () => {
    setTempFilters({});
  };

  const handleApply = () => {
    onApply?.(tempFilters);
    onClose?.();
  };

  const getTotalSelectedCount = () => {
    return Object.values(tempFilters).reduce((sum, arr) => sum + (arr?.length || 0), 0);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 max-w-5xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-xl shadow-2xl mx-4 max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">All Filters</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="md" />
            </button>
          </div>

          {/* Content */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar - Categories */}
            <div className="w-64 border-r border-gray-200 overflow-y-auto">
              <div className="p-3 space-y-1">
                {filterCategories.map((category) => {
                  const selectedCount = tempFilters[category.id]?.length || 0;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={cn(
                        'w-full flex items-center justify-between px-4 py-3 rounded-lg text-left',
                        'text-sm font-medium transition-colors',
                        activeCategory === category.id
                          ? 'bg-green-50 text-green-900 border border-green-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      )}
                    >
                      <span>{category.label}</span>
                      {selectedCount > 0 && (
                        <span className="px-2 py-0.5 text-xs font-bold bg-green-700 text-white rounded-full">
                          {selectedCount}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content - Options */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${filterCategories.find(c => c.id === activeCategory)?.label}...`}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                  />
                </div>
              </div>

              {/* Options Grid */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-2 gap-3">
                  {filteredOptions.map((option) => {
                    const isSelected = tempFilters[activeCategory]?.includes(option.id);
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleOptionToggle(activeCategory, option.id)}
                        className={cn(
                          'flex items-start gap-3 p-3 rounded-lg border text-left',
                          'transition-all duration-200',
                          isSelected
                            ? 'bg-green-50 border-green-700'
                            : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50'
                        )}
                      >
                        {/* Checkbox */}
                        <div className={cn(
                          'w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5',
                          'border-2 transition-colors',
                          isSelected
                            ? 'bg-green-700 border-green-700'
                            : 'bg-white border-gray-300'
                        )}>
                          {isSelected && <Icon name="check" size="sm" className="text-white" />}
                        </div>

                        {/* Label */}
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{option.label}</div>
                          <div className="text-xs text-gray-500">({option.count.toLocaleString()} Colleges)</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {filteredOptions.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <Icon name="search" size="lg" className="mx-auto mb-2 opacity-30" />
                    <p>No options found</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClear}
              className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              Clear All
            </button>
            <button
              onClick={handleApply}
              className={cn(
                'px-8 py-2.5 rounded-lg text-sm font-semibold',
                'bg-green-700 text-white',
                'hover:bg-green-800 transition-colors',
                'shadow-sm hover:shadow'
              )}
            >
              Apply {getTotalSelectedCount() > 0 && `(${getTotalSelectedCount()})`}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { FilterModal };
export default FilterModal;

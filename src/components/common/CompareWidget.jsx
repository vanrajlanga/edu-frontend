'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

/**
 * Floating Compare Widget - displays selected colleges for comparison
 * Shows at the bottom of the screen when colleges are selected
 */
export function CompareWidget() {
  const { colleges, removeCollege, clearAll, count, maxColleges } = useCompare();
  const [isMinimized, setIsMinimized] = useState(false);

  // Don't render if no colleges selected
  if (count === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'transition-transform duration-300 ease-in-out',
        isMinimized ? 'transform translate-y-[calc(100%-48px)]' : ''
      )}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsMinimized(!isMinimized)}
        className="absolute -top-10 right-4 bg-orange-600 text-white px-4 py-2 rounded-t-lg flex items-center gap-2 shadow-lg hover:bg-orange-700 transition-colors"
      >
        <Icon name="compare" size="sm" />
        <span className="font-medium">Compare ({count})</span>
        <Icon
          name={isMinimized ? 'chevronUp' : 'chevronDown'}
          size="sm"
        />
      </button>

      {/* Widget Content */}
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center gap-4">
            {/* College Cards */}
            <div className="flex-1 flex items-center gap-3 overflow-x-auto pb-1">
              {colleges.map((college) => (
                <div
                  key={college.id}
                  className="flex-shrink-0 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 min-w-[200px] max-w-[250px]"
                >
                  {/* College Logo */}
                  <div className="flex-shrink-0">
                    {college.logo ? (
                      <img
                        src={college.logo}
                        alt={college.name}
                        className="w-10 h-10 rounded object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 flex items-center justify-center">
                        <span className="text-blue-700 font-bold text-sm">
                          {college.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* College Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {college.name}
                    </h4>
                    <p className="text-xs text-gray-500 truncate">
                      {college.location}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeCollege(college.id)}
                    className="flex-shrink-0 p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                    title="Remove from compare"
                  >
                    <Icon name="close" size="sm" />
                  </button>
                </div>
              ))}

              {/* Empty Slots */}
              {Array.from({ length: maxColleges - count }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="flex-shrink-0 w-[200px] h-[60px] border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center"
                >
                  <span className="text-xs text-gray-400">Add College</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex-shrink-0 flex items-center gap-3">
              {count >= 2 ? (
                <Link
                  href="/compare"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors flex items-center gap-2"
                >
                  <Icon name="compare" size="sm" />
                  Compare Now
                </Link>
              ) : (
                <div className="text-sm text-gray-500 px-4">
                  Add {2 - count} more to compare
                </div>
              )}

              <button
                onClick={clearAll}
                className="text-gray-500 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompareWidget;

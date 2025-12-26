'use client';

import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Review categories with icons
const reviewCategories = [
  {
    id: 'academic',
    label: 'Academic',
    icon: 'graduationCap',
    rating: 4.5,
  },
  {
    id: 'accommodation',
    label: 'Accommodation',
    icon: 'building',
    rating: 4.5,
  },
  {
    id: 'faculty',
    label: 'Faculty',
    icon: 'user',
    rating: 4.6,
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    icon: 'building',
    rating: 4.5,
  },
  {
    id: 'placement',
    label: 'Placement',
    icon: 'briefcase',
    rating: 4.6,
  },
  {
    id: 'socialLife',
    label: 'Social Life',
    icon: 'heart',
    rating: 4.4,
  },
];

function ReviewsModal({ isOpen, onClose, collegeName = 'IIM Ahmedabad', reviewCount = 59, overallRating = 4.6 }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 max-w-2xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="relative bg-white rounded-lg shadow-2xl mx-4 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <h2 className="text-base font-bold text-gray-900">
              {collegeName} User Reviews Based on {reviewCount} Users
            </h2>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="sm" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-2 bg-orange-50 border-b border-gray-200">
                <div className="px-3 py-2 font-semibold text-gray-900 text-xs">
                  Categories
                </div>
                <div className="px-3 py-2 font-semibold text-gray-900 text-xs border-l border-gray-200">
                  Overall <span className="text-orange-600">{overallRating}/5</span>
                </div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-200">
                {reviewCategories.map((category) => (
                  <div key={category.id} className="grid grid-cols-2 hover:bg-gray-50 transition-colors">
                    {/* Category Column */}
                    <div className="px-3 py-2.5 flex items-center gap-2">
                      <Icon name={category.icon} size="sm" className="text-gray-600" />
                      <span className="text-sm text-gray-900">{category.label}</span>
                    </div>

                    {/* Rating Column */}
                    <div className="px-3 py-2.5 border-l border-gray-200">
                      <span className="text-sm font-semibold text-orange-600">{category.rating}/5</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ReviewsModal };
export default ReviewsModal;

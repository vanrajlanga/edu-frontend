'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

// Mock popular comparisons
const popularComparisons = [
  {
    id: 1,
    name: 'IIM Ahmedabad',
    course: 'Post Graduate Programme in...',
    image: '/assets/images/iim-ahmedabad.jpg',
    tag: 'vs',
  },
  {
    id: 2,
    name: 'IIM Bangalore',
    course: 'PGPM',
    image: '/assets/images/iim-bangalore.jpg',
  },
  {
    id: 3,
    name: 'IIM Ahmedabad',
    course: 'Post Graduate Programme in...',
    image: '/assets/images/iim-ahmedabad.jpg',
    tag: 'vs',
  },
  {
    id: 4,
    name: 'IIM Udaipur',
    course: 'MBA',
    image: '/assets/images/iim-udaipur.jpg',
  },
  {
    id: 5,
    name: 'IIM Ahmedabad',
    course: 'Post Graduate Programme in...',
    image: '/assets/images/iim-ahmedabad.jpg',
    tag: 'vs',
  },
  {
    id: 6,
    name: 'IIM Lucknow',
    course: 'PGPM',
    image: '/assets/images/iim-lucknow.jpg',
  },
];

function CompareModal({ isOpen, onClose, selectedColleges = [], onRemoveCollege, onCompare }) {
  const [searchCollege, setSearchCollege] = useState('');
  const [searchCourse, setSearchCourse] = useState('');

  if (!isOpen) return null;

  const maxColleges = 4;
  const canAddMore = selectedColleges.length < maxColleges;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-2xl shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">College Compare</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="md" />
            </button>
          </div>

          {/* Selected Colleges */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {selectedColleges.map((college, index) => (
                <div key={college.id} className="relative">
                  {/* Recommended Badge */}
                  {index === 0 && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Recommended
                      </span>
                    </div>
                  )}

                  {/* College Card */}
                  <div className="relative bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-300 transition-colors">
                    {/* Remove Button */}
                    <button
                      onClick={() => onRemoveCollege(college.id)}
                      className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <Icon name="close" size="xs" />
                    </button>

                    {/* College Image */}
                    <div className="relative h-32 bg-gradient-to-br from-gray-100 to-gray-200">
                      {college.image ? (
                        <img
                          src={college.image}
                          alt={college.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon name="building" size="xl" className="text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* College Logo */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2">
                      <div className="w-16 h-16 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center">
                        {college.logo ? (
                          <img src={college.logo} alt={college.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                          <span className="text-blue-700 font-bold text-2xl">{college.name?.charAt(0)}</span>
                        )}
                      </div>
                      {/* VS Badge */}
                      {index < selectedColleges.length - 1 && (
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center">
                          VS
                        </div>
                      )}
                    </div>

                    {/* College Info */}
                    <div className="pt-10 pb-4 px-4 text-center">
                      <h3 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">
                        {college.name}
                      </h3>
                      <p className="text-xs text-gray-600 mb-2">{college.location}</p>
                      <p className="text-xs text-gray-500">{college.courseName}</p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add College Slot */}
              {canAddMore && (
                <div className="relative">
                  <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 h-full flex flex-col items-center justify-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors">
                    <button className="flex flex-col items-center gap-3 w-full">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
                        <Icon name="plus" size="lg" className="text-gray-400" />
                      </div>
                      <span className="font-semibold text-gray-700">Add College</span>
                    </button>

                    {/* Search Dropdowns */}
                    <div className="w-full mt-4 space-y-2">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchCollege}
                          onChange={(e) => setSearchCollege(e.target.value)}
                          placeholder="Search College"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                        <Icon name="chevronDown" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                      <div className="relative">
                        <input
                          type="text"
                          value={searchCourse}
                          onChange={(e) => setSearchCourse(e.target.value)}
                          placeholder="Search Course"
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                        />
                        <Icon name="chevronDown" size="sm" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Compare Button */}
            {selectedColleges.length >= 2 && (
              <div className="flex justify-center mb-6">
                <Button
                  onClick={onCompare}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-3 text-lg font-bold rounded-lg shadow-lg"
                >
                  Compare Now
                </Button>
              </div>
            )}

            {/* Popular Compare */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Compare</h3>
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                  {popularComparisons.map((comparison) => (
                    <div key={comparison.id} className="flex-shrink-0 w-40">
                      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                        {/* Image */}
                        <div className="relative h-24 bg-gradient-to-br from-gray-100 to-gray-200">
                          {comparison.image ? (
                            <img
                              src={comparison.image}
                              alt={comparison.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Icon name="building" size="lg" className="text-gray-300" />
                            </div>
                          )}
                          {/* VS Badge */}
                          {comparison.tag && (
                            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gray-900 text-white text-xs font-bold flex items-center justify-center z-10">
                              {comparison.tag}
                            </div>
                          )}
                        </div>
                        {/* Info */}
                        <div className="p-3">
                          <h4 className="font-semibold text-xs text-gray-900 mb-1 line-clamp-2">
                            {comparison.name}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{comparison.course}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Scroll Arrow */}
                <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border border-gray-300 shadow-md flex items-center justify-center hover:bg-gray-50">
                  <Icon name="chevronRight" size="sm" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { CompareModal };
export default CompareModal;

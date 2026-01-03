'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function StudyGoalModal({ isOpen, onClose, studyGoals = [] }) {
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Filter study goals based on search query
  const filteredGoals = studyGoals.map(goal => {
    const matchesCategory = goal.title.toLowerCase().includes(searchQuery.toLowerCase());
    const filteredCourses = goal.courses.filter(course =>
      course.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If category matches or any course matches, include it
    if (matchesCategory || filteredCourses.length > 0 || searchQuery === '') {
      return {
        ...goal,
        courses: matchesCategory ? goal.courses : filteredCourses
      };
    }
    return null;
  }).filter(Boolean);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 max-w-4xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="bg-white rounded-xl shadow-2xl mx-4 max-h-[85vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Select Your Study Preference</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="md" />
            </button>
          </div>

          {/* Search */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="relative">
              <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                autoFocus
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {filteredGoals.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Icon name="search" size="lg" className="mx-auto mb-2 opacity-30" />
                <p>No courses found</p>
              </div>
            ) : (
              <div className="space-y-8">
                {filteredGoals.map((goal) => (
                  <div key={goal.id}>
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full',
                          'border-2 border-green-200',
                          'flex items-center justify-center',
                          'bg-green-50'
                        )}
                      >
                        <Icon name={goal.icon} size="md" className="text-green-800" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                        <p className="text-sm text-gray-500">{goal.collegeCount} Colleges</p>
                      </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="flex flex-wrap gap-2">
                      {goal.courses.map((course, index) => (
                        <Link
                          key={index}
                          href={course.href || '#'}
                          onClick={onClose}
                          className={cn(
                            'px-4 py-2 rounded-full',
                            'text-sm font-medium',
                            'border border-gray-200',
                            'bg-white hover:bg-green-50',
                            'hover:border-green-300 hover:text-green-800',
                            'transition-all duration-200'
                          )}
                        >
                          {course.label}
                          {course.collegeCount > 0 && (
                            <span className="ml-1 text-xs text-gray-400">
                              ({course.collegeCount})
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Skip
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export { StudyGoalModal };
export default StudyGoalModal;

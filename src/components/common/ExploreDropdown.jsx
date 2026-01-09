'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Explore menu items - Column 1
const exploreItemsCol1 = [
  {
    id: 'universities-colleges',
    label: 'Top Universities & Colleges',
    href: '/universities-colleges',
    icon: 'building',
  },
  {
    id: 'courses',
    label: 'Top Courses',
    href: '/courses',
    icon: 'book',
  },
  {
    id: 'reviews',
    label: 'Read College Reviews',
    href: '/reviews',
    icon: 'star',
  },
  {
    id: 'admission-alerts',
    label: 'Admission Alerts 2025',
    href: '/admission-alerts',
    icon: 'bell',
  },
  {
    id: 'institute',
    label: 'Institute (Counselling, Coaching and More)',
    href: '/institute',
    icon: 'graduationCap',
  },
  {
    id: 'predictor',
    label: 'College Predictor',
    href: '/predictor',
    icon: 'chart',
  },
  {
    id: 'practice',
    label: 'Practice Questions',
    href: '/practice-questions',
    icon: 'clipboard',
  },
  {
    id: 'scholarship',
    label: 'Scholarship',
    href: '/scholarship',
    icon: 'award',
  },
];

// Explore menu items - Column 2
const exploreItemsCol2 = [
  {
    id: 'study-abroad',
    label: 'Study Abroad',
    href: '/study-abroad',
    icon: 'globe',
    badge: 'Get upto 50% discount on Visa Fees',
    badgeColor: 'emerald',
  },
  {
    id: 'abroad-exams',
    label: 'Abroad Exams',
    href: '/abroad-exams',
    icon: 'clipboard',
  },
  {
    id: 'exams',
    label: 'Exams',
    href: '/exams',
    icon: 'clipboard',
  },
  {
    id: 'news',
    label: 'News',
    href: '/news',
    icon: 'newspaper',
  },
  {
    id: 'education-loan',
    label: 'Education Loan',
    href: '/education-loan',
    icon: 'banknote',
  },
  {
    id: 'ask-question',
    label: 'Ask a Question',
    href: '/ask-question',
    icon: 'messageCircle',
  },
  {
    id: 'test-series',
    label: 'Test Series',
    href: '/test-series',
    icon: 'clipboard',
  },
  {
    id: 'course-finder',
    label: 'Course Finder',
    href: '/course-finder',
    icon: 'search',
  },
];

function ExploreDropdown({ isOpen, onClose, triggerRef, className }) {
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute top-full right-0 mt-2',
        'w-[800px]',
        'bg-white rounded-xl shadow-lg',
        'border border-gray-200',
        'overflow-hidden',
        'animate-in fade-in slide-in-from-top-2 duration-200',
        'z-50',
        className
      )}
    >
      <div className="flex">
        {/* Left Side: Menu Items */}
        <div className="flex-1 p-5">
          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 px-2">Explore More</h3>

          {/* Two Columns */}
          <div className="grid grid-cols-2 gap-x-6">
            {/* Column 1 */}
            <div>
              {exploreItemsCol1.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-2.5 px-2 py-1.5 rounded-md',
                    'hover:bg-gray-50 transition-colors',
                    'group'
                  )}
                >
                  <Icon
                    name={item.icon}
                    size="sm"
                    className="text-blue-800 flex-shrink-0"
                  />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Column 2 */}
            <div>
              {exploreItemsCol2.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-2.5 px-2 py-1.5 rounded-md',
                    'hover:bg-gray-50 transition-colors',
                    'group'
                  )}
                >
                  <Icon
                    name={item.icon}
                    size="sm"
                    className="text-blue-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex items-center gap-2">
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-medium whitespace-nowrap">
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Promotional Banner */}
        <div className="w-64 bg-gradient-to-br from-orange-50 to-orange-100 border-l border-gray-200">
          <Link
            href="/write-review"
            onClick={onClose}
            className="block h-full p-5 hover:bg-gradient-to-br hover:from-orange-100 hover:to-orange-150 transition-colors group"
          >
            <div className="text-center">
              {/* Text */}
              <div className="mb-2">
                <p className="text-lg font-bold text-gray-900 leading-tight">
                  "Write a Review
                </p>
                <p className="text-base font-semibold text-gray-800">
                  & Earn Upto <span className="text-2xl font-bold text-orange-500">₹300</span>"
                </p>
              </div>

              {/* Approval */}
              <div className="flex items-center justify-center gap-1.5 mb-3 text-xs text-gray-700">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Approval in 15 Minutes*</span>
              </div>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-3">
                {[1, 2, 3, 4].map((star) => (
                  <svg key={star} className="w-6 h-6 text-orange-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg className="w-6 h-6 text-orange-200 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              {/* Illustration */}
              <div className="mt-3">
                <svg className="w-full h-auto" viewBox="0 0 200 120" fill="none">
                  {/* Laptop */}
                  <rect x="20" y="80" width="160" height="6" fill="#475569" rx="2" />
                  <rect x="40" y="25" width="120" height="60" fill="#1e293b" rx="3" />
                  <rect x="46" y="30" width="108" height="50" fill="#fff" rx="2" />

                  {/* Document lines */}
                  <rect x="52" y="36" width="40" height="3" fill="#fb923c" rx="1" />
                  <rect x="52" y="42" width="90" height="2" fill="#cbd5e1" rx="1" />
                  <rect x="52" y="47" width="85" height="2" fill="#cbd5e1" rx="1" />
                  <rect x="52" y="52" width="88" height="2" fill="#cbd5e1" rx="1" />
                  <rect x="52" y="57" width="80" height="2" fill="#cbd5e1" rx="1" />

                  {/* Bookmark */}
                  <path d="M120 32 L128 32 L128 52 L124 48 L120 52 Z" fill="#fb923c" />

                  {/* Hand with pen */}
                  <ellipse cx="160" cy="70" rx="10" ry="13" fill="#fbbf24" opacity="0.9" />
                  <line x1="155" y1="60" x2="158" y2="78" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="155" y1="60" x2="155" y2="54" stroke="#fb923c" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="155" cy="52" r="2" fill="#fb923c" />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export { ExploreDropdown };
export default ExploreDropdown;

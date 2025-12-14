'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function CourseCard({
  name,
  type = 'Full Time',
  duration,
  avgFees,
  collegeCount,
  href = '#',
  className,
}) {
  return (
    <div
      className={cn(
        'flex-shrink-0 w-[260px] sm:w-[280px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        'p-5',
        'hover:border-blue-300 hover:shadow-lg',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Type Badge */}
      <div className="mb-3">
        <span
          className={cn(
            'inline-flex items-center px-3 py-1',
            'text-xs font-medium rounded-full',
            'bg-gray-100 text-gray-600',
            'group-hover:bg-blue-50 group-hover:text-blue-600',
            'transition-colors duration-200'
          )}
        >
          {type}
        </span>
      </div>

      {/* Course Name */}
      <h3 className="text-lg font-semibold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
        {name}
      </h3>

      {/* Details */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Duration</span>
          <span className="text-sm font-medium text-gray-900">{duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Total Avg. Fees</span>
          <span className="text-sm font-medium text-gray-900">{avgFees}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Colleges</span>
          <span className="text-sm font-medium text-gray-900">{collegeCount}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-4" />

      {/* Course Overview Link */}
      <Link
        href={href}
        className={cn(
          'flex items-center justify-between',
          'text-sm font-medium',
          'text-gray-700 hover:text-blue-600',
          'transition-colors duration-200'
        )}
      >
        <span>Course Overview</span>
        <Icon
          name="chevronRight"
          size="sm"
          className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all"
        />
      </Link>
    </div>
  );
}

export { CourseCard };
export default CourseCard;

'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function StudyGoalCard({
  icon,
  title,
  collegeCount,
  courses = [],
  href = '#',
  className
}) {
  return (
    <div
      className={cn(
        'flex-shrink-0 w-[280px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        'p-5',
        'hover:border-green-300 hover:shadow-md',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {/* Icon */}
        <div
          className={cn(
            'w-12 h-12 rounded-full',
            'border-2 border-green-200',
            'flex items-center justify-center',
            'bg-green-50',
            'group-hover:border-green-400 group-hover:bg-green-100',
            'transition-colors duration-200'
          )}
        >
          <Icon name={icon} size="lg" className="text-green-800" />
        </div>

        {/* Title & Count */}
        <div>
          <h3 className="font-semibold text-gray-900 group-hover:text-green-900 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500">{collegeCount} Colleges</p>
        </div>
      </div>

      {/* Courses List */}
      <div className="space-y-0">
        {courses.map((course, index) => (
          <Link
            key={index}
            href={course.href || href}
            className={cn(
              'block py-2.5',
              'text-sm text-gray-600',
              'hover:text-green-800',
              'transition-colors duration-150',
              index !== courses.length - 1 && 'border-b border-gray-100'
            )}
          >
            {course.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// "See All" card variant
function StudyGoalSeeAllCard({ href = '/courses', className }) {
  return (
    <Link
      href={href}
      className={cn(
        'flex-shrink-0 w-[200px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        'p-5',
        'flex flex-col items-center justify-center',
        'hover:border-green-300 hover:shadow-md',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      <span className="text-green-800 font-semibold text-lg group-hover:text-green-900 transition-colors">
        See all
      </span>
      <div
        className={cn(
          'mt-2 w-10 h-10 rounded-full',
          'border-2 border-green-300',
          'flex items-center justify-center',
          'group-hover:border-green-800 group-hover:bg-green-50',
          'transition-colors duration-200'
        )}
      >
        <Icon name="arrowRight" size="md" className="text-green-800" />
      </div>
    </Link>
  );
}

export { StudyGoalCard, StudyGoalSeeAllCard };
export default StudyGoalCard;

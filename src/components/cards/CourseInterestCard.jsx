'use client';

import { Icon } from '@/components/ui';
import { cn } from '@/lib/cn';

export default function CourseInterestCard({ interest }) {
  const { id, title, icon, courses, link } = interest;

  return (
    <div className="group bg-white border border-gray-200 hover:border-green-300 rounded-xl p-6 transition-all duration-300 hover:shadow-lg">
      {/* Icon and Title */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-shrink-0">
          <Icon
            name={icon}
            className="w-10 h-10 text-green-600"
          />
        </div>
        <h3 className="text-xl font-bold text-gray-800">
          {title}
        </h3>
      </div>

      {/* Courses List */}
      <div className="mb-6 min-h-[80px]">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gray-600">
          {courses.map((course, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="hover:text-green-600 transition-colors cursor-pointer">
                {course}
              </span>
              {index < courses.length - 1 && (
                <span className="text-gray-300">|</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Explore Button */}
      <a
        href={link}
        className={cn(
          'inline-flex items-center gap-2 text-sm font-semibold',
          'text-green-600 hover:text-green-700',
          'transition-colors duration-200',
          'group-hover:gap-3'
        )}
      >
        Explore all courses
        <Icon name="arrowRight" className="w-4 h-4" />
      </a>
    </div>
  );
}

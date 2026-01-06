'use client';

import { cn } from '@/lib/cn';
import { examIcons } from './ExamCard';

export default function PreviousYearPaperCard({ paper, className }) {
  const { title, examIcon = 'default', href } = paper;

  return (
    <a
      href={href}
      className={cn(
        'flex-shrink-0 w-[240px]',
        'bg-gradient-to-br from-orange-50 to-amber-50',
        'rounded-xl p-4',
        'border border-orange-100',
        'hover:border-green-400 hover:shadow-md',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Exam Icon */}
      <div className="flex items-center justify-center mb-4">
        <div className="w-20 h-20">
          {examIcons[examIcon] || examIcons.default}
        </div>
      </div>

      {/* Paper Title */}
      <h4 className={cn(
        'text-sm font-semibold text-gray-900 text-center',
        'line-clamp-3 leading-snug min-h-[60px]',
        'group-hover:text-green-700 transition-colors'
      )}>
        {title}
      </h4>
    </a>
  );
}

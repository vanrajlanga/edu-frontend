'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

export default function ExamNewsCard({ news }) {
  const { title, date, image, href } = news;

  return (
    <a
      href={href}
      className={cn(
        'flex items-start gap-2.5 p-2.5 rounded-lg',
        'bg-white border border-gray-100',
        'hover:bg-green-50 hover:border-green-200',
        'transition-all duration-200 group'
      )}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0">
        <div className={cn(
          'w-12 h-12 rounded-md overflow-hidden',
          'bg-gradient-to-br from-green-100 to-blue-100',
          'flex items-center justify-center'
        )}>
          {image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <Icon name="document" size="sm" className="text-green-600" />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Title */}
        <h4 className={cn(
          'text-xs font-semibold text-gray-900 mb-1 line-clamp-2 leading-snug',
          'group-hover:text-green-700 transition-colors'
        )}>
          {title}
        </h4>

        {/* Date */}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Icon name="calendar" size="sm" className="text-gray-400" />
          <time dateTime={date}>{date}</time>
        </div>
      </div>

      {/* Arrow Icon */}
      <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity">
        <Icon name="chevronRight" size="sm" className="text-green-600" />
      </div>
    </a>
  );
}

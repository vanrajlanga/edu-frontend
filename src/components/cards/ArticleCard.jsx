'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

const gradients = [
  'from-blue-500 to-blue-600',
  'from-blue-500 to-blue-600',
  'from-sky-500 to-sky-600',
  'from-amber-500 to-amber-600',
  'from-purple-500 to-purple-600',
  'from-rose-500 to-rose-600'
];

export default function ArticleCard({ article, index = 0, className }) {
  const { title, href } = article;
  const gradient = gradients[index % gradients.length];

  return (
    <a
      href={href}
      className={cn(
        'flex-shrink-0 w-[210px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        'hover:border-blue-300 hover:shadow-lg',
        'transition-all duration-200',
        'group overflow-hidden',
        className
      )}
    >
      {/* Thumbnail Area */}
      <div className={cn(
        'relative h-40 overflow-hidden',
        'bg-gradient-to-br',
        gradient
      )}>
        {/* Document Illustration */}
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="relative w-full h-full">
            {/* Background document */}
            <div className="absolute top-2 right-4 w-28 h-32 bg-white/20 backdrop-blur-sm rounded-lg shadow-xl transform rotate-6" />

            {/* Front document */}
            <div className="absolute top-6 left-4 w-32 h-36 bg-white rounded-lg shadow-2xl p-3 overflow-hidden">
              {/* Document lines */}
              <div className="space-y-1.5">
                <div className="h-1.5 bg-gray-300 rounded w-3/4" />
                <div className="h-1.5 bg-gray-300 rounded w-full" />
                <div className="h-1.5 bg-gray-300 rounded w-5/6" />
                <div className="h-1.5 bg-gray-300 rounded w-4/5" />
                <div className="h-1.5 bg-gray-300 rounded w-full" />
                <div className="h-1.5 bg-gray-300 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h4 className={cn(
          'text-sm font-semibold text-gray-900 mb-3',
          'line-clamp-2 leading-snug min-h-[40px]',
          'group-hover:text-blue-700 transition-colors'
        )}>
          {title}
        </h4>

        {/* Read More Link */}
        <div className="flex items-center gap-1.5 text-blue-600 group-hover:text-blue-700 transition-colors">
          <span className="text-sm font-medium">Read More</span>
          <Icon name="chevronRight" size="sm" className="transform group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

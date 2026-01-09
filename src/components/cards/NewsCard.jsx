'use client';

import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Category color mapping
const categoryColors = {
  exam: {
    bg: 'bg-blue-50',
    text: 'text-blue-900',
    border: 'border-blue-100',
    accent: 'bg-blue-500',
  },
  college: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    border: 'border-emerald-100',
    accent: 'bg-emerald-500',
  },
  admission: {
    bg: 'bg-purple-50',
    text: 'text-blue-900',
    border: 'border-purple-100',
    accent: 'bg-blue-800',
  },
};

function NewsCard({
  title,
  excerpt,
  date,
  category = 'exam',
  categoryLabel,
  href = '#',
  imageUrl,
  className,
}) {
  const colors = categoryColors[category] || categoryColors.exam;

  return (
    <a
      href={href}
      className={cn(
        'group flex-shrink-0 w-[320px] md:w-[360px]',
        'bg-white rounded-xl border border-gray-100',
        'shadow-sm hover:shadow-lg',
        'transition-all duration-300',
        'overflow-hidden',
        className
      )}
    >
      {/* Image or Gradient Header */}
      <div className={cn('relative h-32 overflow-hidden', colors.bg)}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn('w-16 h-16 rounded-full opacity-20', colors.accent)} />
            <div className={cn('absolute w-24 h-24 rounded-full opacity-10', colors.accent, 'top-0 right-0 -translate-y-1/2 translate-x-1/2')} />
            <div className={cn('absolute w-12 h-12 rounded-full opacity-15', colors.accent, 'bottom-2 left-4')} />
          </div>
        )}

        {/* Category Badge */}
        {categoryLabel && (
          <div className="absolute top-3 left-3">
            <span className={cn(
              'px-3 py-1 rounded-full text-xs font-semibold',
              'bg-white/90 backdrop-blur-sm shadow-sm',
              colors.text
            )}>
              {categoryLabel}
            </span>
          </div>
        )}

        {/* Accent Line */}
        <div className={cn('absolute bottom-0 left-0 right-0 h-1', colors.accent)} />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Date */}
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Icon name="calendar" size="sm" />
          <span>{date}</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-900 transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {excerpt}
        </p>

        {/* Read More */}
        <div className="flex items-center gap-1 text-sm font-medium text-blue-900 group-hover:gap-2 transition-all">
          <span>Read more</span>
          <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </a>
  );
}

export { NewsCard, categoryColors };
export default NewsCard;

'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from './Icon';

function QuickLinkPill({
  href = '#',
  children,
  variant = 'default',
  className,
}) {
  const variants = {
    default: cn(
      'bg-white border-gray-200',
      'text-gray-700',
      'hover:border-green-300 hover:bg-green-50 hover:text-green-900'
    ),
    outline: cn(
      'bg-transparent border-gray-300',
      'text-gray-600',
      'hover:border-green-400 hover:text-green-900'
    ),
    subtle: cn(
      'bg-gray-50 border-transparent',
      'text-gray-600',
      'hover:bg-green-50 hover:text-green-900'
    ),
  };

  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2',
        'px-4 py-2.5',
        'text-sm font-medium',
        'rounded-full border',
        'transition-all duration-200',
        'group',
        variants[variant],
        className
      )}
    >
      <span>{children}</span>
      <span
        className={cn(
          'flex items-center justify-center',
          'w-5 h-5 rounded-full',
          'bg-gray-100 group-hover:bg-green-100',
          'transition-colors duration-200'
        )}
      >
        <Icon
          name="arrowRight"
          size="xs"
          className="text-gray-400 group-hover:text-green-800 transition-colors"
        />
      </span>
    </Link>
  );
}

export { QuickLinkPill };
export default QuickLinkPill;

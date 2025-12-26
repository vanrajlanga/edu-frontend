'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

function QuickLink({ label, href = '#', className }) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center gap-2',
        'px-4 py-2.5',
        'bg-white rounded-full',
        'border border-gray-200',
        'text-sm font-medium text-gray-700',
        'hover:border-green-300 hover:text-green-900 hover:bg-green-50',
        'hover:shadow-sm',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      <span>{label}</span>
      <span
        className={cn(
          'flex items-center justify-center',
          'w-5 h-5 rounded-full',
          'bg-gray-100 group-hover:bg-green-100',
          'transition-colors duration-200'
        )}
      >
        <svg
          className="w-3 h-3 text-gray-400 group-hover:text-green-800 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </span>
    </Link>
  );
}

// Group of quick links with a title
function QuickLinkGroup({ title, links, className }) {
  return (
    <div className={cn('', className)}>
      {/* Group Title */}
      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
        {title}
      </h3>

      {/* Links Grid */}
      <div className="flex flex-wrap gap-3">
        {links.map((link, index) => (
          <QuickLink
            key={index}
            label={link.label}
            href={link.href}
          />
        ))}
      </div>
    </div>
  );
}

export { QuickLink, QuickLinkGroup };
export default QuickLink;

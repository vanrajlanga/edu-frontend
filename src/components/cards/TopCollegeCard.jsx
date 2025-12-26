'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function TopCollegeCard({
  rank,
  name,
  location,
  rating,
  reviewCount,
  rankingInfo,
  cutoff,
  deadline,
  fees,
  href = '#',
  className,
}) {
  return (
    <Link
      href={href}
      className={cn(
        'block bg-white rounded-xl',
        'border border-gray-100',
        'hover:border-green-200 hover:shadow-lg',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      <div className="p-4 md:p-5">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Rank Badge */}
          <div className="flex items-center gap-4 lg:w-auto">
            <div
              className={cn(
                'flex-shrink-0 w-10 h-10 rounded-lg',
                'flex items-center justify-center',
                'font-bold text-lg',
                rank <= 3
                  ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white'
                  : 'bg-gray-100 text-gray-700'
              )}
            >
              {rank}
            </div>

            {/* College Logo Placeholder */}
            <div
              className={cn(
                'w-14 h-14 rounded-lg',
                'bg-gradient-to-br from-green-50 to-green-100',
                'border border-green-100',
                'flex items-center justify-center',
                'text-green-500 font-bold text-xl'
              )}
            >
              {name.charAt(0)}
            </div>

            {/* College Name & Location (Mobile) */}
            <div className="lg:hidden flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                {name}
              </h3>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                <Icon name="mapPin" size="xs" />
                {location}
              </p>
            </div>
          </div>

          {/* College Info (Desktop) */}
          <div className="hidden lg:block flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
              {name}
            </h3>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Icon name="mapPin" size="xs" />
                {location}
              </span>
              <span className="flex items-center gap-1 text-sm">
                <span className="text-amber-500 flex items-center">
                  <Icon name="star" size="xs" className="fill-amber-400" />
                </span>
                <span className="font-medium text-gray-900">{rating}</span>
                <span className="text-gray-400">({reviewCount} reviews)</span>
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
            {/* Ranking */}
            <div className="bg-gray-50 rounded-lg p-3 lg:bg-transparent lg:p-0">
              <p className="text-xs text-gray-500 mb-1">Ranking</p>
              <p className="font-semibold text-gray-900 text-sm">{rankingInfo}</p>
            </div>

            {/* Cutoff */}
            <div className="bg-gray-50 rounded-lg p-3 lg:bg-transparent lg:p-0">
              <p className="text-xs text-gray-500 mb-1">Cutoff</p>
              <p className="font-semibold text-gray-900 text-sm">{cutoff}</p>
            </div>

            {/* Deadline */}
            <div className="bg-gray-50 rounded-lg p-3 lg:bg-transparent lg:p-0">
              <p className="text-xs text-gray-500 mb-1">Deadline</p>
              <p className="font-semibold text-gray-900 text-sm">{deadline}</p>
            </div>

            {/* Fees */}
            <div className="bg-gray-50 rounded-lg p-3 lg:bg-transparent lg:p-0">
              <p className="text-xs text-gray-500 mb-1">Fees</p>
              <p className="font-semibold text-green-600 text-sm">{fees}</p>
            </div>
          </div>

          {/* Mobile Rating */}
          <div className="lg:hidden flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="flex items-center gap-1 text-sm">
              <span className="text-amber-500 flex items-center">
                <Icon name="star" size="sm" className="fill-amber-400" />
              </span>
              <span className="font-medium text-gray-900">{rating}</span>
              <span className="text-gray-400">({reviewCount} reviews)</span>
            </span>
            <span className="text-green-500 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              View Details
              <Icon name="arrowRight" size="sm" />
            </span>
          </div>

          {/* Desktop Arrow */}
          <div className="hidden lg:flex items-center">
            <div
              className={cn(
                'w-10 h-10 rounded-full',
                'border border-gray-200',
                'flex items-center justify-center',
                'text-gray-400 group-hover:text-green-500 group-hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronRight" size="md" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export { TopCollegeCard };
export default TopCollegeCard;

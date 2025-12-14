'use client';

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/cn';

function RankingTableRow({
  rank,
  totalInCategory,
  name,
  shortName,
  location,
  logoUrl,
  stream,
  href = '#',
  className,
}) {
  return (
    <Link
      href={href}
      className={cn(
        'grid grid-cols-12 gap-4 items-center',
        'px-5 py-4',
        'bg-white',
        'border-b border-gray-100',
        'hover:bg-gray-50',
        'transition-colors duration-150',
        'group',
        className
      )}
    >
      {/* College Info - 6 cols */}
      <div className="col-span-12 sm:col-span-6 flex items-center gap-3">
        {/* Logo */}
        <div
          className={cn(
            'flex-shrink-0 w-10 h-10 rounded-full',
            'bg-gray-100 border border-gray-200',
            'flex items-center justify-center',
            'overflow-hidden'
          )}
        >
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={shortName || name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-semibold text-gray-500">
              {(shortName || name).charAt(0)}
            </span>
          )}
        </div>

        {/* Name & Location */}
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {name}
            {shortName && (
              <span className="text-gray-500"> - [{shortName}]</span>
            )}
            {location && <span className="text-gray-500">, {location}</span>}
          </h3>
        </div>
      </div>

      {/* Ranking - 3 cols */}
      <div className="col-span-6 sm:col-span-3">
        <span className="text-sm text-gray-700">
          {rank} out of {totalInCategory}
        </span>
      </div>

      {/* Stream - 3 cols */}
      <div className="col-span-6 sm:col-span-3">
        <span className="text-sm text-gray-700">{stream}</span>
      </div>
    </Link>
  );
}

// Table Header Component
function RankingTableHeader({ className }) {
  return (
    <div
      className={cn(
        'grid grid-cols-12 gap-4',
        'px-5 py-3',
        'bg-gray-50 border-b border-gray-200',
        'text-xs font-semibold text-gray-500 uppercase tracking-wider',
        className
      )}
    >
      <div className="col-span-12 sm:col-span-6">College</div>
      <div className="hidden sm:block col-span-3">Ranking</div>
      <div className="hidden sm:block col-span-3">Streams</div>
    </div>
  );
}

export { RankingTableRow, RankingTableHeader };
export default RankingTableRow;

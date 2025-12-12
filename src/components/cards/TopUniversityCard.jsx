'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function TopUniversityCard({
  name,
  shortName,
  location,
  accreditations = [],
  image,
  logo,
  rating,
  reviewCount,
  courseType,
  fees,
  feesLabel = 'First Year Fees',
  ranking,
  cdRating = '10/10',
  href = '#',
  className,
}) {
  return (
    <div
      className={cn(
        'flex-shrink-0 w-[320px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        'overflow-hidden',
        'hover:shadow-lg hover:border-gray-300',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Image Header */}
      <div className="relative h-[160px] bg-gray-200 overflow-hidden">
        {/* Background Image */}
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
        )}

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* CD Rating Badge */}
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-gray-800/80 text-white text-xs font-medium px-2 py-1 rounded">
          <span className="text-blue-400 font-bold">cd</span>
          <span>{cdRating}</span>
        </div>

        {/* College Info on Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end gap-3">
          {/* Logo */}
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border-2 border-white overflow-hidden shadow-lg">
            {logo ? (
              <img src={logo} alt={shortName || name} className="w-full h-full object-contain p-1" />
            ) : (
              <div className="w-full h-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                {(shortName || name).charAt(0)}
              </div>
            )}
          </div>

          {/* Name & Location */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-sm leading-tight line-clamp-2">
              {name} {shortName && <span className="text-white/90">- [{shortName}]</span>}
            </h3>
            <p className="text-white/80 text-xs mt-0.5 truncate">
              {location} {accreditations.length > 0 && `| ${accreditations.join(', ')}`}
            </p>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        {/* Course Type & Rating */}
        <div className="flex items-start justify-between mb-2">
          <span className="text-gray-900 font-semibold text-sm">{courseType}</span>
          <div className="text-right">
            <div className="flex items-center gap-1">
              <Icon name="star" size="sm" className="text-amber-400 fill-amber-400" />
              <span className="font-semibold text-gray-900 text-sm">{rating}/5</span>
            </div>
            <span className="text-xs text-gray-500">{reviewCount} reviews</span>
          </div>
        </div>

        {/* Fees */}
        <p className="text-sm mb-3">
          <span className="text-blue-500 font-semibold">{fees}</span>
          <span className="text-gray-500 ml-1">{feesLabel}</span>
        </p>

        {/* Ranking */}
        {ranking && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-1">{ranking}</p>
        )}

        {/* Divider */}
        <div className="border-t border-gray-100 my-3" />

        {/* Action Links */}
        <div className="space-y-0">
          <Link
            href={`${href}/courses`}
            className="flex items-center justify-between py-2.5 text-sm text-gray-700 hover:text-blue-600 transition-colors group/link"
          >
            <span>View All Courses and fees</span>
            <Icon name="chevronRight" size="sm" className="text-gray-400 group-hover/link:text-blue-500 transition-colors" />
          </Link>

          <Link
            href={`${href}/brochure`}
            className="flex items-center justify-between py-2.5 text-sm text-gray-700 hover:text-blue-600 transition-colors border-t border-gray-100 group/link"
          >
            <span>Download Brochure</span>
            <Icon name="chevronRight" size="sm" className="text-gray-400 group-hover/link:text-blue-500 transition-colors" />
          </Link>

          <Link
            href={`${href}/compare`}
            className="flex items-center justify-between py-2.5 text-sm text-gray-700 hover:text-blue-600 transition-colors border-t border-gray-100 group/link"
          >
            <span>Compare</span>
            <Icon name="chevronRight" size="sm" className="text-gray-400 group-hover/link:text-blue-500 transition-colors" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export { TopUniversityCard };
export default TopUniversityCard;

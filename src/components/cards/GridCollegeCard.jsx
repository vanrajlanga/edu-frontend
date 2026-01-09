'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/formatters';
import { Icon } from '@/components/ui';

function GridCollegeCard({
  rank,
  name,
  location,
  approvals,
  logo,
  image,
  courseName,
  courseFees,
  avgPackage,
  rating,
  reviewCount,
  rankings = [],
  onAddToCompare,
  isCompared = false,
  collegeData,
  onApplyNow,
  onCompareFees,
  href = '#',
  isFeatured = false,
  mediaCount = 99,
  className
}) {
  const collegeRating = '10.0/10';

  return (
    <div className={cn(
      'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group',
      className
    )}>
      {/* College Image with Overlays */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200">
        {image ? (
          <img src={image} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-50 via-blue-50 to-gray-50" />
        )}

        {/* Top Left Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-2">
          {/* Ranking Badge */}
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm">
            <Icon name="building" size="xs" className="text-gray-600" />
            <span className="text-xs font-bold text-gray-900">{rank}</span>
          </div>

          {/* Media Count Badge */}
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm">
            <Icon name="camera" size="xs" className="text-gray-600" />
            <span className="text-xs font-bold text-gray-900">{mediaCount}</span>
          </div>
        </div>

        {/* Top Right - Rating Badge */}
        <div className="absolute top-2 right-2">
          <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-center min-w-[80px]">
            <div className="text-[10px] text-gray-600 mb-0.5">Collegedunia Rating</div>
            <div className="text-lg font-bold text-gray-900">{collegeRating}</div>
          </div>
        </div>

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute bottom-2 right-2">
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Icon name="star" size="xs" />
              Featured
            </div>
          </div>
        )}

        {/* College Logo - Bottom Left */}
        <div className="absolute bottom-3 left-3">
          <div className="w-16 h-16 bg-white rounded-lg shadow-lg flex items-center justify-center p-2 border-2 border-white">
            {logo ? (
              <img src={logo} alt={name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-200 rounded flex items-center justify-center">
                <Icon name="graduationCap" size="lg" className="text-blue-600" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* College Name */}
        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2 min-h-[40px] hover:text-blue-600 transition-colors">
          <a href={href}>{name}</a>
        </h3>

        {/* Location & Approvals */}
        <div className="flex items-start gap-1 mb-3">
          <Icon name="location" size="xs" className="text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600 line-clamp-1">
            {location} | {approvals.join(', ')}
          </p>
        </div>

        {/* Fees and Rating Row */}
        <div className="grid grid-cols-2 gap-4 mb-3 pb-3 border-b border-gray-200">
          {/* Fees */}
          <div>
            <div className="text-lg font-bold text-blue-600">
              {formatINR(courseFees)}
            </div>
            <div className="text-[10px] text-gray-600">{courseName} - Total Fees</div>
          </div>

          {/* Rating */}
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-blue-600">{rating}</span>
              <span className="text-sm text-gray-500">/ 5</span>
            </div>
            <div className="text-[10px] text-gray-600">Based on {reviewCount} User reviews</div>
          </div>
        </div>

        {/* Rankings */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-gray-700 mb-2">
            {rankings.slice(0, 2).map((ranking, idx) => (
              <div key={idx} className="flex-1 text-center">
                <div className="font-semibold">Ranked {ranking.rank} out of {ranking.total}</div>
                <div className="text-gray-500 text-[10px]">{ranking.agency}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-3">
          <div className="h-full bg-gray-400 rounded-full" style={{ width: '70%' }} />
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between mb-3 text-xs">
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Admission 2026
          </button>
          <button className="text-blue-600 hover:text-blue-700 font-semibold">
            Reviews
          </button>
          <button
            onClick={() => onCompareFees?.(courseName)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Courses & Fees
          </button>
        </div>

        {/* Compare and Brochure Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          <button
            onClick={() => onAddToCompare?.(collegeData, !isCompared)}
            className={cn(
              'flex items-center justify-center gap-1.5 py-2 rounded border-2 transition-all text-sm font-semibold',
              isCompared
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
            )}
          >
            <Icon name="compare" size="xs" />
            Compare
          </button>
          <button className="flex items-center justify-center gap-1.5 py-2 rounded border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all text-sm font-semibold">
            <Icon name="download" size="xs" />
            Brochure
          </button>
        </div>

        {/* Apply Now Button */}
        <button
          onClick={() => onApplyNow?.(collegeData)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition-all flex items-center justify-center gap-2"
        >
          <Icon name="check" size="sm" />
          Apply Now
        </button>
      </div>
    </div>
  );
}

export { GridCollegeCard };
export default GridCollegeCard;

'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/formatters';
import { Icon } from '@/components/ui';

function ListCollegeCard({
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
  mediaCount = 99,
  className
}) {
  const collegeRating = '10.0/10';
  const [isReviewExpanded, setIsReviewExpanded] = useState(false);

  return (
    <div className={cn(
      'bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group',
      className
    )}>
      <div className="flex gap-3 p-3">
        {/* Left - College Image */}
        <div className="relative w-64 h-44 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-50 via-blue-50 to-gray-50" />
          )}

          {/* Media Count Badge - Top Left */}
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm">
              <Icon name="image" size="xs" className="text-gray-600" />
              <span className="text-xs font-bold text-gray-900">{mediaCount}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded flex items-center gap-1 shadow-sm">
              <Icon name="camera" size="xs" className="text-gray-600" />
              <span className="text-xs font-bold text-gray-900">2</span>
            </div>
          </div>

          {/* Collegedunia Rating - Top Right */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-center min-w-[90px]">
              <div className="text-[10px] text-gray-600 mb-0.5">Collegedunia Rating</div>
              <div className="text-lg font-bold text-gray-900">{collegeRating}</div>
            </div>
          </div>

          {/* College Logo - Bottom Left */}
          <div className="absolute bottom-2 left-2">
            <div className="w-12 h-12 bg-white rounded-lg shadow-lg flex items-center justify-center p-1.5 border-2 border-white">
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

        {/* Middle - College Info */}
        <div className="flex-1 min-w-0">
          {/* College Name */}
          <h3 className="text-base font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors">
            <a href={href}>{name}</a>
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 mb-2">
            <p className="text-xs text-gray-600">
              {location} | {approvals.join(', ')}
            </p>
          </div>

          {/* Fees and Rating */}
          <div className="flex items-start gap-6 mb-3">
            <div>
              <div className="text-xl font-bold text-blue-600">
                {formatINR(courseFees)}
              </div>
              <div className="text-[11px] text-gray-600">{courseName} - Total Fees</div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-blue-600">{rating}</span>
                <span className="text-sm text-gray-500">/ 5</span>
              </div>
              <div className="text-[11px] text-gray-600">Based on {reviewCount} User reviews</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 mb-3">
            <button className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-1.5">
              <Icon name="graduationCap" size="xs" />
              Admission 2026
            </button>
            <button className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-1.5">
              <Icon name="star" size="xs" />
              Reviews
            </button>
            <button
              onClick={() => onCompareFees?.(courseName)}
              className="px-3 py-1.5 rounded-full border border-gray-300 text-xs font-medium text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-1.5"
            >
              <Icon name="menu" size="xs" />
              Courses & Fees
            </button>
          </div>

          {/* Rankings Section */}
          <div className="relative flex items-center gap-3">
            {/* Static Badge */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Icon name="award" size="sm" className="text-blue-600" />
              </div>
            </div>

            {/* Scrollable Rankings */}
            <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <div className="flex items-center gap-4 pb-2">
                {/* Rankings */}
                {rankings.slice(0, 5).map((ranking, idx) => (
                  <div key={idx} className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-base font-bold text-blue-600">#{ranking.rank}</span>
                    <span className="text-sm text-gray-500">out of {ranking.total}</span>
                    <span className="text-base font-bold text-gray-900">{ranking.agency}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right - Action Buttons */}
        <div className="flex flex-col gap-2 w-48 flex-shrink-0">
          <button
            onClick={() => onApplyNow?.(collegeData)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
          >
            Apply Now
            <Icon name="arrowRight" size="sm" />
          </button>

          <button className="w-full border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm">
            <Icon name="download" size="sm" />
            Brochure
          </button>

          <button
            onClick={() => onAddToCompare?.(collegeData, !isCompared)}
            className={cn(
              'w-full border-2 font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-2 text-sm',
              isCompared
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600'
            )}
          >
            <Icon name="compare" size="sm" />
            Compare
          </button>

          {/* Rating and Dropdown - Very Bottom */}
          <div className="flex items-center justify-end gap-2 mt-auto pt-4">
            <span className="text-xl font-bold text-blue-600 whitespace-nowrap">{rating}/5</span>
            <span className="text-sm text-gray-600 whitespace-nowrap">({reviewCount} Users)</span>
            <button
              onClick={() => setIsReviewExpanded(!isReviewExpanded)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <Icon
                name={isReviewExpanded ? 'chevronUp' : 'chevronDown'}
                size="sm"
                className="text-gray-600"
              />
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Review Section - Full Width */}
      {isReviewExpanded && (
        <div className="border-t border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex items-start gap-4">
            {/* Left - Avatar and User Info */}
            <div className="flex flex-col items-center gap-1 flex-shrink-0 w-[180px]">
              <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-bold text-xs">ST</span>
              </div>
              <h4 className="font-bold text-gray-900 text-xs text-center">SANTHOSH T</h4>
              <p className="text-[10px] text-gray-600 text-center leading-tight">{name}</p>
            </div>

            {/* Right - Review Text */}
            <div className="flex-1">
              <p className="text-sm text-gray-700 leading-relaxed">
                I Chose IIT BOMBAY Mainly Because I Was Getting Electrical Dual Degree Only Here, But Also Chose It Explicitely Because Of The Clubs In IIT Bombay And Also The Opportunities To Do Whatever We Like Than The Lecture, Unlike Other Colleges.
              </p>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium mt-2">
                Read More
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { ListCollegeCard };
export default ListCollegeCard;

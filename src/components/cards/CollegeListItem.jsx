'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

function CollegeListItem({
  rank,
  name,
  location,
  approvals = [],
  logo,
  courseName,
  courseFees,
  totalFees,
  avgPackage,
  highestPackage,
  placementRate,
  placementScore,
  rating,
  reviewCount,
  bestIn,
  rankings = [],
  cdScore,
  href = '#',
  onAddToCompare,
  isCompared = false,
  collegeData,
  onApplyNow,
  onCompareFees,
  onComparePlacement,
  onViewReviews,
  onViewAllRankings,
  className,
}) {
  const [showAllRankings, setShowAllRankings] = useState(false);

  const handleCompareChange = (e) => {
    if (onAddToCompare && collegeData) {
      onAddToCompare(collegeData, e.target.checked);
    }
  };

  const handleApplyClick = (e) => {
    e.preventDefault();
    if (onApplyNow && collegeData) {
      onApplyNow(collegeData);
    }
  };

  const handleCompareFeesClick = (e) => {
    e.preventDefault();
    if (onCompareFees) {
      onCompareFees(courseName);
    }
  };

  const handleComparePlacementClick = (e) => {
    e.preventDefault();
    if (onComparePlacement) {
      onComparePlacement();
    }
  };

  const handleViewReviewsClick = (e) => {
    e.preventDefault();
    if (onViewReviews && collegeData) {
      onViewReviews(collegeData);
    }
  };

  const handleViewAllRankingsClick = (e) => {
    e.preventDefault();
    if (onViewAllRankings && collegeData) {
      onViewAllRankings(collegeData);
    }
  };

  const visibleRankings = showAllRankings ? rankings : rankings.slice(0, 2);
  const hiddenRankingsCount = rankings.length - 2;

  return (
    <div
      className={cn(
        'bg-white border-b border-gray-200 last:border-b-0',
        'hover:bg-gray-50 transition-colors duration-200',
        className
      )}
    >
      <div className="grid grid-cols-12 gap-1.5 px-3 py-1.5">
        {/* Column 1: CD Rank */}
        <div className="col-span-1 flex items-start justify-start pt-0.5">
          <span className="text-sm font-semibold text-gray-900">
            #{rank}
          </span>
        </div>

        {/* Column 2: Colleges */}
        <div className="col-span-4 border-r border-gray-200 pr-3">
          <div className="flex gap-2">
            {/* College Logo */}
            <div className="flex-shrink-0">
              {logo ? (
                <img src={logo} alt={name} className="w-10 h-10 rounded object-cover border border-gray-200" />
              ) : (
                <div className="w-10 h-10 rounded bg-gradient-to-br from-green-50 to-green-100 border border-green-200 flex items-center justify-center">
                  <span className="text-green-700 font-bold text-sm">{name?.charAt(0)}</span>
                </div>
              )}
            </div>

            {/* College Info */}
            <div className="flex-1 min-w-0">
              <Link href={href} className="group">
                <h3 className="text-green-600 font-medium text-sm hover:underline group-hover:text-green-700 transition-colors mb-0 leading-tight">
                  {name}
                </h3>
              </Link>
              <p className="text-xs text-gray-600 mb-0.5 leading-tight">
                {location} {approvals.length > 0 && `| ${approvals.join(', ')}`}
              </p>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 mb-0.5">
                <button
                  onClick={handleApplyClick}
                  className="text-orange-600 text-xs font-medium hover:text-orange-700 flex items-center gap-0.5"
                >
                  <Icon name="arrowRight" size="xs" />
                  Apply Now
                </button>
                <button
                  onClick={handleApplyClick}
                  className="text-green-600 text-xs font-medium hover:text-green-700 flex items-center gap-0.5"
                >
                  <Icon name="download" size="xs" />
                  Download Brochure
                </button>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isCompared}
                    onChange={handleCompareChange}
                    className="w-3.5 h-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-xs text-gray-700">Add To Compare</span>
                </label>
              </div>

              {/* CD Score */}
              {cdScore && (
                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded inline-flex">
                  <Icon name="trophy" size="xs" className="text-amber-600" />
                  <span className="text-xs font-medium text-gray-900">CD Score: {cdScore}</span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Icon name="info" size="xs" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Course Fees */}
        <div className="col-span-2 border-r border-gray-200 pr-3">
          <div className="text-green-600 font-bold text-sm mb-0 leading-tight">₹ {courseFees?.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mb-0 leading-tight">{courseName}</p>
          <p className="text-xs text-gray-500 mb-0.5 leading-tight">- {totalFees}</p>
          <button
            onClick={handleCompareFeesClick}
            className="text-orange-600 text-xs font-medium hover:text-orange-700 flex items-center gap-0.5"
          >
            <Icon name="compare" size="xs" />
            Compare Fees
          </button>
        </div>

        {/* Column 4: Placement */}
        <div className="col-span-3 border-r border-gray-200 pr-3">
          <div className="text-green-600 font-bold text-sm mb-0 leading-tight">₹ {avgPackage?.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mb-0 leading-tight">Average Package</p>
          <div className="text-sm font-semibold text-gray-900 mb-0 leading-tight">₹ {highestPackage?.toLocaleString()}</div>
          <p className="text-xs text-gray-600 mb-0 leading-tight">Highest Package</p>
          <p className="text-orange-600 text-xs font-semibold mb-0.5 leading-tight">{placementRate}% Placement</p>
          <button
            onClick={handleComparePlacementClick}
            className="text-orange-600 text-xs font-medium hover:text-orange-700 flex items-center gap-0.5 mb-0.5"
          >
            <Icon name="compare" size="xs" />
            Compare Placement
          </button>

          {placementScore && (
            <div className="flex items-center gap-1 bg-amber-50 px-1.5 py-0.5 rounded text-xs">
              <Icon name="trophy" size="xs" className="text-amber-600" />
              <span className="font-medium text-gray-900">Placement Score: {placementScore}</span>
            </div>
          )}
        </div>

        {/* Column 5: User Reviews */}
        <div className="col-span-1 border-r border-gray-200 pr-3">
          <div className="flex items-center gap-0.5 mb-0 leading-tight">
            <Icon name="star" size="xs" className="text-amber-500 fill-amber-500" />
            <span className="font-bold text-sm text-gray-900">{rating}</span>
            <span className="text-xs text-gray-500">/ 5</span>
          </div>
          <p className="text-xs text-gray-600 mb-0.5 leading-tight">Based on {reviewCount} User Reviews</p>

          {bestIn && (
            <button
              onClick={handleViewReviewsClick}
              className="flex items-center gap-0.5 text-green-600 text-xs font-medium hover:text-green-700 transition-colors"
            >
              <Icon name="check" size="xs" />
              <span>Best in {bestIn}</span>
              <Icon name="chevronDown" size="xs" />
            </button>
          )}
        </div>

        {/* Column 6: Ranking */}
        <div className="col-span-1">
          <div className="space-y-0.5">
            {visibleRankings.map((ranking, index) => (
              <div key={index} className="flex items-start gap-1 leading-tight">
                <span className="font-bold text-xs text-gray-900">#{ranking.rank}</span>
                <div className="flex-1">
                  <span className="text-orange-600 font-semibold text-xs">/{ranking.total}</span>
                  <span className="text-gray-600 text-xs"> in {ranking.location}</span>
                  <div className="flex items-center gap-0.5 mt-0">
                    {ranking.logo && (
                      <img src={ranking.logo} alt={ranking.agency} className="w-3 h-3" />
                    )}
                    <span className="text-xs text-gray-600">{ranking.year}</span>
                  </div>
                </div>
              </div>
            ))}

            {hiddenRankingsCount > 0 && !showAllRankings && (
              <button
                onClick={handleViewAllRankingsClick}
                className="flex items-center gap-0.5 text-green-600 hover:text-green-700 text-xs font-medium mt-0.5"
              >
                <div className="flex -space-x-0.5">
                  {rankings.slice(2, 5).map((r, i) => (
                    r.logo && <img key={i} src={r.logo} alt="" className="w-3 h-3 rounded-full border border-white" />
                  ))}
                </div>
                <span>+ {hiddenRankingsCount} More</span>
                <Icon name="chevronDown" size="xs" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { CollegeListItem };
export default CollegeListItem;

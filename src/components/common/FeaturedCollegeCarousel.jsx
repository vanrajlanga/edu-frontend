'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/formatters';
import { Badge, Button, Icon } from '@/components/ui';

// Featured colleges data
const featuredColleges = [
  {
    id: 1,
    name: 'International Institute of Business Studies - [IIBS], Bangalore',
    shortName: 'IIBS',
    location: 'Bangalore, Karnataka',
    approvals: ['AICTE', 'NBA', 'AIU Approved'],
    logo: null,
    courseName: 'MBA',
    totalFees: 995000,
    avgPackage: 915000,
    highestPackage: 4800000,
    rank: 66,
    totalRanked: 100,
    rankingCategory: 'Management',
    rankingAgency: 'NIRF',
    year: '2025',
  },
  {
    id: 2,
    name: 'Xavier Institute of Management - [XIM], Bhubaneswar',
    shortName: 'XIM',
    location: 'Bhubaneswar, Odisha',
    approvals: ['AICTE', 'NBA', 'AACSB Accredited'],
    logo: null,
    courseName: 'MBA',
    totalFees: 1850000,
    avgPackage: 1750000,
    highestPackage: 6200000,
    rank: 42,
    totalRanked: 100,
    rankingCategory: 'Management',
    rankingAgency: 'NIRF',
    year: '2025',
  },
  {
    id: 3,
    name: 'Symbiosis Institute of Business Management - [SIBM], Pune',
    shortName: 'SIBM',
    location: 'Pune, Maharashtra',
    approvals: ['AICTE', 'NBA Approved'],
    logo: null,
    courseName: 'MBA',
    totalFees: 2150000,
    avgPackage: 2045000,
    highestPackage: 7500000,
    rank: 28,
    totalRanked: 100,
    rankingCategory: 'Management',
    rankingAgency: 'NIRF',
    year: '2025',
  },
  {
    id: 4,
    name: 'Great Lakes Institute of Management - [GLIM], Chennai',
    shortName: 'GLIM',
    location: 'Chennai, Tamil Nadu',
    approvals: ['AICTE', 'NBA', 'AACSB Accredited'],
    logo: null,
    courseName: 'MBA',
    totalFees: 1950000,
    avgPackage: 1820000,
    highestPackage: 6800000,
    rank: 35,
    totalRanked: 100,
    rankingCategory: 'Management',
    rankingAgency: 'NIRF',
    year: '2025',
  },
  {
    id: 5,
    name: 'Institute of Management Technology - [IMT], Ghaziabad',
    shortName: 'IMT',
    location: 'Ghaziabad, Uttar Pradesh',
    approvals: ['AICTE', 'NBA Approved'],
    logo: null,
    courseName: 'MBA',
    totalFees: 1920000,
    avgPackage: 1755000,
    highestPackage: 6500000,
    rank: 45,
    totalRanked: 100,
    rankingCategory: 'Management',
    rankingAgency: 'NIRF',
    year: '2025',
  },
];

function FeaturedCollegeCarousel({ className, onApplyNow, onDownloadBrochure, onAddToCompare, onCompareFees }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollContainerRef = useRef(null);

  const currentCollege = featuredColleges[currentIndex];

  const handlePrevious = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? featuredColleges.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === featuredColleges.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={cn('relative bg-gradient-to-br from-orange-50 via-white to-orange-50 border-2 border-orange-200 rounded-xl overflow-hidden', className)}>
      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        disabled={isTransitioning}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:scale-110 transition-all disabled:opacity-50"
        aria-label="Previous college"
      >
        <Icon name="chevronLeft" size="sm" />
      </button>

      <button
        onClick={handleNext}
        disabled={isTransitioning}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 hover:scale-110 transition-all disabled:opacity-50"
        aria-label="Next college"
      >
        <Icon name="chevronRight" size="sm" />
      </button>

      {/* Featured Card Content */}
      <div className="relative px-16 py-6">
        {/* Featured Badge */}
        <div className="absolute top-0 left-0">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-1.5 rounded-br-xl rounded-tl-xl font-semibold text-sm shadow-md">
            Featured
          </div>
        </div>

        {/* Main Content Grid */}
        <div
          className={cn(
            'grid grid-cols-12 gap-6 items-center transition-all duration-300',
            isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          )}
        >
          {/* Left Section - College Info */}
          <div className="col-span-5 flex gap-4">
            {/* College Logo Placeholder */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center shadow-sm">
                {currentCollege.logo ? (
                  <img src={currentCollege.logo} alt={currentCollege.shortName} className="w-full h-full object-contain p-2" />
                ) : (
                  <span className="text-2xl font-bold text-blue-600">{currentCollege.shortName}</span>
                )}
              </div>
            </div>

            {/* College Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-base font-bold text-gray-900 mb-1.5 leading-tight">
                {currentCollege.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2.5">
                {currentCollege.location} | {currentCollege.approvals.join(', ')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onApplyNow?.(currentCollege)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors"
                >
                  <Icon name="arrowRight" size="xs" />
                  Apply Now
                </button>
                <button
                  onClick={() => onDownloadBrochure?.(currentCollege)}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Icon name="download" size="xs" />
                  Download Brochure
                </button>
                <button
                  onClick={() => onAddToCompare?.(currentCollege, true)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                >
                  <div className="w-4 h-4 border-2 border-gray-400 rounded"></div>
                  Add To Compare
                </button>
              </div>
            </div>
          </div>

          {/* Middle Section - Fees */}
          <div className="col-span-3 border-l border-r border-gray-200 px-4">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">
                {formatINR(currentCollege.totalFees)}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {currentCollege.courseName}- Total Fees
              </div>
              <button
                onClick={() => onCompareFees?.(currentCollege.courseName)}
                className="text-sm font-semibold text-orange-600 hover:text-orange-700 transition-colors inline-flex items-center gap-1"
              >
                <Icon name="compare" size="xs" />
                Compare Fees
              </button>
            </div>
          </div>

          {/* Right Section - Placement */}
          <div className="col-span-3 px-4">
            <div className="space-y-2">
              <div>
                <div className="text-xl font-bold text-blue-600">
                  {formatINR(currentCollege.avgPackage)}
                </div>
                <div className="text-xs text-gray-600">Average Package</div>
              </div>
              <div>
                <div className="text-xl font-bold text-blue-600">
                  {formatINR(currentCollege.highestPackage)}
                </div>
                <div className="text-xs text-gray-600">Highest Package</div>
              </div>
            </div>
          </div>

          {/* Far Right - Ranking Badge */}
          <div className="col-span-1 flex justify-end">
            <div className="relative">
              {/* Ranking Badge */}
              <div className="bg-white border-2 border-orange-300 rounded-lg px-3 py-2 text-center shadow-md min-w-[100px]">
                <div className="text-sm font-bold text-gray-900 mb-0.5">
                  <span className="text-orange-600">#{currentCollege.rank}</span>
                  <span className="text-gray-500 text-xs">th</span>
                  <span className="text-gray-500 text-xs">/{currentCollege.totalRanked}</span>
                </div>
                <div className="text-[10px] text-gray-600 leading-tight mb-1">
                  in India for<br />{currentCollege.rankingCategory}
                </div>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-[8px] font-bold text-gray-600">NIRF</span>
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{currentCollege.year}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4">
          {featuredColleges.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isTransitioning) {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsTransitioning(false), 300);
                }
              }}
              className={cn(
                'h-1.5 rounded-full transition-all',
                index === currentIndex
                  ? 'w-8 bg-orange-500'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { FeaturedCollegeCarousel };
export default FeaturedCollegeCarousel;

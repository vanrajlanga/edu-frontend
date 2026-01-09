'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { CollegeListItem } from '@/components/cards';
import { FeaturedCollegeCarousel, ApplicationFormsSection, AdvertisementBanner } from '@/components/common';
import { GridViewSection, ListViewSection } from '@/components/sections';
import { Button } from '@/components/ui';
import { cn } from '@/lib/cn';

// Mock college data - Replace with actual API data
const mockColleges = [
  {
    id: 1,
    name: 'IIMA - Indian Institute of Management, Ahmedabad',
    location: 'Ahmedabad, Gujarat',
    approvals: ['UGC Approved'],
    logo: null,
    courseName: 'PG Program Food And Agri-Business Management',
    courseFees: 2750000,
    totalFees: 'Total Fees',
    avgPackage: 3522591,
    highestPackage: 11000000,
    placementRate: 100,
    placementScore: '990/1000',
    rating: 4.6,
    reviewCount: 59,
    bestIn: 'Placements',
    rankings: [
      { rank: 1, total: 370, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 2, total: 500, location: 'India', agency: 'India Today', year: '2025', logo: null },
      { rank: 3, total: 300, location: 'India', agency: 'The Week', year: '2025', logo: null },
    ],
    cdScore: '1988/2000',
  },
  {
    id: 2,
    name: 'IIT Bombay - Indian Institute of Technology - [IITB], Mumbai',
    location: 'Mumbai, Maharashtra',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 882500,
    totalFees: 'Total Fees',
    avgPackage: 2350000,
    highestPackage: 10000000,
    placementRate: 90,
    placementScore: null,
    rating: 4.4,
    reviewCount: 402,
    bestIn: 'Social Life',
    rankings: [
      { rank: 1, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 2, total: 450, location: 'India', agency: 'QS', year: '2025', logo: null },
    ],
    cdScore: '1851/2000',
  },
  {
    id: 3,
    name: 'IIT Delhi - Indian Institute of Technology - [IITD], New Delhi',
    location: 'New Delhi, Delhi NCR',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Electrical Engineering',
    courseFees: 850000,
    totalFees: 'Total Fees',
    avgPackage: 2280000,
    highestPackage: 9500000,
    placementRate: 92,
    placementScore: '945/1000',
    rating: 4.5,
    reviewCount: 387,
    bestIn: 'Academics',
    rankings: [
      { rank: 2, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 3, total: 450, location: 'India', agency: 'QS', year: '2025', logo: null },
      { rank: 1, total: 200, location: 'India', agency: 'Outlook', year: '2025', logo: null },
    ],
    cdScore: '1847/2000',
  },
  {
    id: 4,
    name: 'IIMB - Indian Institute of Management, Bangalore',
    location: 'Bangalore, Karnataka',
    approvals: ['UGC Approved'],
    logo: null,
    courseName: 'MBA - Master of Business Administration',
    courseFees: 2400000,
    totalFees: 'Total Fees',
    avgPackage: 3390000,
    highestPackage: 10500000,
    placementRate: 100,
    placementScore: '985/1000',
    rating: 4.7,
    reviewCount: 215,
    bestIn: 'Infrastructure',
    rankings: [
      { rank: 2, total: 370, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 1, total: 500, location: 'India', agency: 'India Today', year: '2025', logo: null },
      { rank: 2, total: 300, location: 'India', agency: 'The Week', year: '2025', logo: null },
    ],
    cdScore: '1965/2000',
  },
  {
    id: 5,
    name: 'IIT Madras - Indian Institute of Technology - [IITM], Chennai',
    location: 'Chennai, Tamil Nadu',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Mechanical Engineering',
    courseFees: 825000,
    totalFees: 'Total Fees',
    avgPackage: 2150000,
    highestPackage: 8900000,
    placementRate: 89,
    placementScore: '920/1000',
    rating: 4.3,
    reviewCount: 456,
    bestIn: 'Campus',
    rankings: [
      { rank: 3, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 4, total: 450, location: 'India', agency: 'QS', year: '2025', logo: null },
    ],
    cdScore: '1823/2000',
  },
  {
    id: 6,
    name: 'NIT Trichy - National Institute of Technology, Tiruchirappalli',
    location: 'Tiruchirappalli, Tamil Nadu',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 675000,
    totalFees: 'Total Fees',
    avgPackage: 1850000,
    highestPackage: 7500000,
    placementRate: 87,
    placementScore: '875/1000',
    rating: 4.2,
    reviewCount: 324,
    bestIn: 'Placements',
    rankings: [
      { rank: 8, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 1, total: 150, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1756/2000',
  },
  {
    id: 7,
    name: 'BITS Pilani - Birla Institute of Technology and Science',
    location: 'Pilani, Rajasthan',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.E Computer Science',
    courseFees: 1950000,
    totalFees: 'Total Fees',
    avgPackage: 1920000,
    highestPackage: 8200000,
    placementRate: 85,
    placementScore: '890/1000',
    rating: 4.4,
    reviewCount: 512,
    bestIn: 'Faculty',
    rankings: [
      { rank: 15, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 5, total: 200, location: 'India', agency: 'Outlook', year: '2025', logo: null },
      { rank: 3, total: 100, location: 'India', agency: 'The Week', year: '2025', logo: null },
    ],
    cdScore: '1742/2000',
  },
  {
    id: 8,
    name: 'IIT Kanpur - Indian Institute of Technology - [IITK], Kanpur',
    location: 'Kanpur, Uttar Pradesh',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 865000,
    totalFees: 'Total Fees',
    avgPackage: 2200000,
    highestPackage: 9200000,
    placementRate: 91,
    placementScore: '935/1000',
    rating: 4.4,
    reviewCount: 378,
    bestIn: 'Research',
    rankings: [
      { rank: 4, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 5, total: 450, location: 'India', agency: 'QS', year: '2025', logo: null },
    ],
    cdScore: '1812/2000',
  },
  {
    id: 9,
    name: 'IIMC - Indian Institute of Management, Calcutta',
    location: 'Kolkata, West Bengal',
    approvals: ['UGC Approved'],
    logo: null,
    courseName: 'MBA - Post Graduate Programme',
    courseFees: 2700000,
    totalFees: 'Total Fees',
    avgPackage: 3450000,
    highestPackage: 10800000,
    placementRate: 100,
    placementScore: '992/1000',
    rating: 4.6,
    reviewCount: 187,
    bestIn: 'Placements',
    rankings: [
      { rank: 3, total: 370, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 3, total: 500, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1952/2000',
  },
  {
    id: 10,
    name: 'Delhi University - [DU], New Delhi',
    location: 'New Delhi, Delhi NCR',
    approvals: ['UGC Approved'],
    logo: null,
    courseName: 'B.A. Economics (Hons)',
    courseFees: 45000,
    totalFees: 'Total Fees',
    avgPackage: 680000,
    highestPackage: 3200000,
    placementRate: 72,
    placementScore: null,
    rating: 4.1,
    reviewCount: 892,
    bestIn: 'Campus Life',
    rankings: [
      { rank: 12, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 8, total: 300, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1645/2000',
  },
  {
    id: 11,
    name: 'NIT Surathkal - National Institute of Technology Karnataka',
    location: 'Surathkal, Karnataka',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Information Technology',
    courseFees: 685000,
    totalFees: 'Total Fees',
    avgPackage: 1780000,
    highestPackage: 7200000,
    placementRate: 86,
    placementScore: '865/1000',
    rating: 4.3,
    reviewCount: 298,
    bestIn: 'Infrastructure',
    rankings: [
      { rank: 10, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 2, total: 150, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1718/2000',
  },
  {
    id: 12,
    name: 'VIT Vellore - Vellore Institute of Technology',
    location: 'Vellore, Tamil Nadu',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 1980000,
    totalFees: 'Total Fees',
    avgPackage: 1420000,
    highestPackage: 6500000,
    placementRate: 78,
    placementScore: '785/1000',
    rating: 4.0,
    reviewCount: 645,
    bestIn: 'Diversity',
    rankings: [
      { rank: 18, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 12, total: 300, location: 'India', agency: 'Outlook', year: '2025', logo: null },
    ],
    cdScore: '1587/2000',
  },
  {
    id: 13,
    name: 'IIT Kharagpur - Indian Institute of Technology - [IIT KGP]',
    location: 'Kharagpur, West Bengal',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Aerospace Engineering',
    courseFees: 840000,
    totalFees: 'Total Fees',
    avgPackage: 2100000,
    highestPackage: 8800000,
    placementRate: 88,
    placementScore: '910/1000',
    rating: 4.4,
    reviewCount: 412,
    bestIn: 'Alumni Network',
    rankings: [
      { rank: 5, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 6, total: 450, location: 'India', agency: 'QS', year: '2025', logo: null },
    ],
    cdScore: '1798/2000',
  },
  {
    id: 14,
    name: 'Manipal Institute of Technology - [MIT], Manipal',
    location: 'Manipal, Karnataka',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 1750000,
    totalFees: 'Total Fees',
    avgPackage: 1350000,
    highestPackage: 5800000,
    placementRate: 75,
    placementScore: '745/1000',
    rating: 3.9,
    reviewCount: 523,
    bestIn: 'Campus Facilities',
    rankings: [
      { rank: 22, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 15, total: 300, location: 'India', agency: 'Outlook', year: '2025', logo: null },
    ],
    cdScore: '1542/2000',
  },
  {
    id: 15,
    name: 'IIT Roorkee - Indian Institute of Technology - [IITR]',
    location: 'Roorkee, Uttarakhand',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Civil Engineering',
    courseFees: 835000,
    totalFees: 'Total Fees',
    avgPackage: 1980000,
    highestPackage: 8500000,
    placementRate: 87,
    placementScore: '895/1000',
    rating: 4.3,
    reviewCount: 367,
    bestIn: 'Placements',
    rankings: [
      { rank: 6, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 7, total: 450, location: 'India', agency: 'QS', year: '2025', logo: null },
    ],
    cdScore: '1782/2000',
  },
  {
    id: 16,
    name: 'Anna University - [AU], Chennai',
    location: 'Chennai, Tamil Nadu',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.E Electronics and Communication Engineering',
    courseFees: 120000,
    totalFees: 'Total Fees',
    avgPackage: 520000,
    highestPackage: 2800000,
    placementRate: 68,
    placementScore: null,
    rating: 3.8,
    reviewCount: 756,
    bestIn: 'Affordability',
    rankings: [
      { rank: 28, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 20, total: 300, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1478/2000',
  },
  {
    id: 17,
    name: 'IITL - Indian Institute of Management, Lucknow',
    location: 'Lucknow, Uttar Pradesh',
    approvals: ['UGC Approved'],
    logo: null,
    courseName: 'MBA - Master of Business Administration',
    courseFees: 2050000,
    totalFees: 'Total Fees',
    avgPackage: 2820000,
    highestPackage: 9200000,
    placementRate: 98,
    placementScore: '955/1000',
    rating: 4.5,
    reviewCount: 143,
    bestIn: 'ROI',
    rankings: [
      { rank: 5, total: 370, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 6, total: 500, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1868/2000',
  },
  {
    id: 18,
    name: 'SRM Institute of Science and Technology - [SRMIST], Chennai',
    location: 'Chennai, Tamil Nadu',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 1050000,
    totalFees: 'Total Fees',
    avgPackage: 980000,
    highestPackage: 4800000,
    placementRate: 71,
    placementScore: '710/1000',
    rating: 3.7,
    reviewCount: 587,
    bestIn: 'Industry Connections',
    rankings: [
      { rank: 32, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 25, total: 300, location: 'India', agency: 'Outlook', year: '2025', logo: null },
    ],
    cdScore: '1432/2000',
  },
  {
    id: 19,
    name: 'NIT Warangal - National Institute of Technology',
    location: 'Warangal, Telangana',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.Tech Computer Science and Engineering',
    courseFees: 695000,
    totalFees: 'Total Fees',
    avgPackage: 1820000,
    highestPackage: 7400000,
    placementRate: 85,
    placementScore: '855/1000',
    rating: 4.2,
    reviewCount: 312,
    bestIn: 'Academics',
    rankings: [
      { rank: 9, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 3, total: 150, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1702/2000',
  },
  {
    id: 20,
    name: 'Jadavpur University - [JU], Kolkata',
    location: 'Kolkata, West Bengal',
    approvals: ['AICTE', 'UGC Approved'],
    logo: null,
    courseName: 'B.E Computer Science and Engineering',
    courseFees: 48000,
    totalFees: 'Total Fees',
    avgPackage: 780000,
    highestPackage: 3800000,
    placementRate: 73,
    placementScore: null,
    rating: 4.0,
    reviewCount: 423,
    bestIn: 'Academic Excellence',
    rankings: [
      { rank: 16, total: 500, location: 'India', agency: 'NIRF', year: '2025', logo: null },
      { rank: 11, total: 300, location: 'India', agency: 'India Today', year: '2025', logo: null },
    ],
    cdScore: '1623/2000',
  },
];

function CollegeResultsSection({
  colleges = mockColleges,
  totalResults = 2500,
  onAddToCompare,
  compareColleges = [],
  onApplyNow,
  onCompareFees,
  onComparePlacement,
  onViewReviews,
  onViewAllRankings,
  viewMode = 'card',
  onViewModeChange,
  sortBy: externalSortBy,
  onSortChange: externalOnSortChange,
  className
}) {
  const [displayCount, setDisplayCount] = useState(10);
  const [internalSortBy, setInternalSortBy] = useState('popularity');

  // Use external sort if provided, otherwise use internal
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const setSortBy = externalOnSortChange || setInternalSortBy;

  const displayedColleges = colleges.slice(0, displayCount);
  const hasMore = displayCount < colleges.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 10, colleges.length));
  };

  const sortOptions = [
    { id: 'popularity', label: 'Popularity' },
    { id: 'rating', label: 'Rating' },
    { id: 'fees-high', label: 'Highest Fees' },
    { id: 'fees-low', label: 'Lowest Fees' },
  ];

  // If Grid View is selected, render GridViewSection instead
  if (viewMode === 'grid') {
    return (
      <GridViewSection
        colleges={colleges}
        totalResults={totalResults}
        onAddToCompare={onAddToCompare}
        compareColleges={compareColleges}
        onApplyNow={onApplyNow}
        onCompareFees={onCompareFees}
        onComparePlacement={onComparePlacement}
        onViewReviews={onViewReviews}
        onViewAllRankings={onViewAllRankings}
        onSortChange={setSortBy}
        sortBy={sortBy}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />
    );
  }

  // If List View is selected, render ListViewSection instead
  if (viewMode === 'list') {
    return (
      <ListViewSection
        colleges={colleges}
        totalResults={totalResults}
        onAddToCompare={onAddToCompare}
        compareColleges={compareColleges}
        onApplyNow={onApplyNow}
        onCompareFees={onCompareFees}
        onComparePlacement={onComparePlacement}
        onViewReviews={onViewReviews}
        onViewAllRankings={onViewAllRankings}
        onSortChange={setSortBy}
        sortBy={sortBy}
        viewMode={viewMode}
        onViewModeChange={onViewModeChange}
      />
    );
  }

  // Table/Card View (default)
  return (
    <section className={cn('bg-white py-3', className)}>
      <Container size="full" className="max-w-[1400px]">
        {/* Results Header with Sort Options */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-gray-200">
          {/* Results Count */}
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Found {totalResults.toLocaleString()} Colleges
            </h2>
          </div>

          {/* Sort Options and View Toggle */}
          <div className="flex items-center gap-4">
            {/* Sort By Radio Buttons */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">Sort By</span>
              <div className="flex items-center gap-3">
                {sortOptions.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center gap-1.5 cursor-pointer group"
                  >
                    <div className="relative">
                      <input
                        type="radio"
                        name="sort"
                        value={option.id}
                        checked={sortBy === option.id}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="sr-only"
                      />
                      <div
                        className={cn(
                          'w-5 h-5 rounded-full border-2 transition-all',
                          'flex items-center justify-center',
                          sortBy === option.id
                            ? 'border-orange-500 bg-white'
                            : 'border-gray-300 bg-white group-hover:border-gray-400'
                        )}
                      >
                        {sortBy === option.id && (
                          <div className="w-3 h-3 rounded-full bg-orange-500" />
                        )}
                      </div>
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium transition-colors',
                        sortBy === option.id
                          ? 'text-gray-900'
                          : 'text-gray-600 group-hover:text-gray-900'
                      )}
                    >
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              {/* List View with Bullets */}
              <button
                onClick={() => onViewModeChange?.('list')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'list'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                )}
                title="List View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="4" cy="7" r="1.5" />
                  <rect x="7" y="6" width="13" height="2" rx="1" />
                  <circle cx="4" cy="12" r="1.5" />
                  <rect x="7" y="11" width="13" height="2" rx="1" />
                  <circle cx="4" cy="17" r="1.5" />
                  <rect x="7" y="16" width="13" height="2" rx="1" />
                </svg>
              </button>

              {/* Grid View - 2x2 */}
              <button
                onClick={() => onViewModeChange?.('grid')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'grid'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                )}
                title="Grid View"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="4" y="4" width="7" height="7" rx="1" />
                  <rect x="13" y="4" width="7" height="7" rx="1" />
                  <rect x="4" y="13" width="7" height="7" rx="1" />
                  <rect x="13" y="13" width="7" height="7" rx="1" />
                </svg>
              </button>

              {/* Card/Table View - Stacked Rectangles */}
              <button
                onClick={() => onViewModeChange?.('card')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'card'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                )}
                title="Table View"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <rect x="4" y="5" width="16" height="4" rx="1" />
                  <rect x="4" y="10" width="16" height="4" rx="1" />
                  <rect x="4" y="15" width="16" height="4" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Reusable Table Header Component */}
        {(() => {
          const TableHeader = ({ isFirst = false }) => (
            <div className={cn(
              "bg-gradient-to-r from-blue-600 to-blue-500 text-white",
              isFirst ? "rounded-t-lg mt-3" : "rounded-t-lg"
            )}>
              <div className="grid grid-cols-12 gap-1.5 px-3 py-1.5">
                <div className="col-span-1 font-semibold text-xs">CD Rank</div>
                <div className="col-span-4 font-semibold text-xs">Colleges</div>
                <div className="col-span-2 font-semibold text-xs">Course Fees</div>
                <div className="col-span-3 font-semibold text-xs">Placement</div>
                <div className="col-span-1 font-semibold text-xs">User Reviews</div>
                <div className="col-span-1 font-semibold text-xs">Ranking</div>
              </div>
            </div>
          );

          return <TableHeader isFirst={true} />;
        })()}

        {/* College List with Featured Carousel */}
        <div className="space-y-0 border border-gray-200 border-t-0 rounded-b-lg overflow-hidden mb-0">
          {displayedColleges.map((college, index) => (
            <div key={`college-wrapper-${college.id}`}>
              <CollegeListItem
                rank={index + 1}
                name={college.name}
                location={college.location}
                approvals={college.approvals}
                logo={college.logo}
                courseName={college.courseName}
                courseFees={college.courseFees}
                totalFees={college.totalFees}
                avgPackage={college.avgPackage}
                highestPackage={college.highestPackage}
                placementRate={college.placementRate}
                placementScore={college.placementScore}
                rating={college.rating}
                reviewCount={college.reviewCount}
                bestIn={college.bestIn}
                rankings={college.rankings}
                cdScore={college.cdScore}
                href={`/colleges/${college.id}`}
                onAddToCompare={onAddToCompare}
                isCompared={compareColleges.some((c) => c.id === college.id)}
                collegeData={college}
                onApplyNow={onApplyNow}
                onCompareFees={onCompareFees}
                onComparePlacement={onComparePlacement}
                onViewReviews={onViewReviews}
                onViewAllRankings={onViewAllRankings}
              />

              {/* Insert sections after every 4 colleges */}
              {(index + 1) % 4 === 0 && index !== displayedColleges.length - 1 && (
                <>
                  {/* Featured Carousel - after 4, 16, 28, etc. (every 12 with offset of 4) */}
                  {(index + 1) % 12 === 4 && (
                    <>
                      <div className="border-t border-gray-200 p-4 bg-gray-50">
                        <FeaturedCollegeCarousel
                          onApplyNow={onApplyNow}
                          onAddToCompare={onAddToCompare}
                          onCompareFees={onCompareFees}
                        />
                      </div>
                      {/* Table Header after Featured Carousel */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg mt-3">
                        <div className="grid grid-cols-12 gap-1.5 px-3 py-1.5">
                          <div className="col-span-1 font-semibold text-xs">CD Rank</div>
                          <div className="col-span-4 font-semibold text-xs">Colleges</div>
                          <div className="col-span-2 font-semibold text-xs">Course Fees</div>
                          <div className="col-span-3 font-semibold text-xs">Placement</div>
                          <div className="col-span-1 font-semibold text-xs">User Reviews</div>
                          <div className="col-span-1 font-semibold text-xs">Ranking</div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Application Forms Section - after 8, 20, 32, etc. (every 12 with offset of 8) */}
                  {(index + 1) % 12 === 8 && (
                    <>
                      <div className="border-t border-gray-200">
                        <ApplicationFormsSection />
                      </div>
                      {/* Table Header after Application Forms */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg mt-3">
                        <div className="grid grid-cols-12 gap-1.5 px-3 py-1.5">
                          <div className="col-span-1 font-semibold text-xs">CD Rank</div>
                          <div className="col-span-4 font-semibold text-xs">Colleges</div>
                          <div className="col-span-2 font-semibold text-xs">Course Fees</div>
                          <div className="col-span-3 font-semibold text-xs">Placement</div>
                          <div className="col-span-1 font-semibold text-xs">User Reviews</div>
                          <div className="col-span-1 font-semibold text-xs">Ranking</div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Advertisement Banner - after 12, 24, 36, etc. */}
                  {(index + 1) % 12 === 0 && (
                    <>
                      <div className="border-t border-gray-200 py-4">
                        <Container size="full" className="max-w-[1400px]">
                          <AdvertisementBanner
                            image={null}
                            alt="Advertisement"
                            href="#"
                          />
                        </Container>
                      </div>
                      {/* Table Header after Advertisement Banner */}
                      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg mt-3">
                        <div className="grid grid-cols-12 gap-1.5 px-3 py-1.5">
                          <div className="col-span-1 font-semibold text-xs">CD Rank</div>
                          <div className="col-span-4 font-semibold text-xs">Colleges</div>
                          <div className="col-span-2 font-semibold text-xs">Course Fees</div>
                          <div className="col-span-3 font-semibold text-xs">Placement</div>
                          <div className="col-span-1 font-semibold text-xs">User Reviews</div>
                          <div className="col-span-1 font-semibold text-xs">Ranking</div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="min-w-[200px]"
            >
              Load More Colleges
            </Button>
          </div>
        )}

        {/* No Results */}
        {displayedColleges.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No colleges found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results</p>
          </div>
        )}
      </Container>
    </section>
  );
}

export { CollegeResultsSection };
export default CollegeResultsSection;

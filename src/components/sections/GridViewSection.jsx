'use client';

import { useState } from 'react';
import { GridCollegeCard } from '@/components/cards';
import { FeaturedCollegeCarousel, ApplicationFormsSection, AdvertisementBanner, FilterSidebar, StreamDegreeFilters } from '@/components/common';
import { Icon, Button } from '@/components/ui';
import { cn } from '@/lib/cn';

function GridViewSection({
  colleges = [],
  totalResults = 20557,
  onAddToCompare,
  compareColleges = [],
  onApplyNow,
  onCompareFees,
  onComparePlacement,
  onViewReviews,
  onViewAllRankings,
  onSortChange,
  sortBy = 'popularity',
  viewMode = 'grid',
  onViewModeChange,
  className
}) {
  const [displayCount, setDisplayCount] = useState(18);
  const displayedColleges = colleges.slice(0, displayCount);
  const hasMore = displayCount < colleges.length;

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 18, colleges.length));
  };

  const sortOptions = [
    { id: 'popularity', label: 'Popularity' },
    { id: 'rating', label: 'Rating' },
    { id: 'highest-fees', label: 'Highest Fees' },
    { id: 'lowest-fees', label: 'Lowest Fees' },
  ];

  return (
    <div className={cn('flex min-h-screen bg-gray-50', className)}>
      {/* Left Sidebar - Filters */}
      <div className="w-[320px] flex-shrink-0 sticky top-0 h-screen">
        <FilterSidebar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {/* Stream and Degree Filters */}
        <StreamDegreeFilters />

        {/* Sort By Section */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm font-bold text-gray-700">Sort By</span>
              <div className="flex items-center gap-4">
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onSortChange?.(option.id)}
                    className={cn(
                      'text-sm font-medium transition-all pb-1 border-b-2',
                      sortBy === option.id
                        ? 'text-blue-600 border-blue-600'
                        : 'text-gray-600 border-transparent hover:text-gray-900'
                    )}
                  >
                    {option.label}
                    {sortBy === option.id && (
                      <span className="inline-block ml-1">
                        <Icon name="arrowDown" size="xs" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Icons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewModeChange?.('card')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'card'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-100'
                )}
                title="List View"
              >
                <Icon
                  name="menu"
                  size="sm"
                  className={viewMode === 'card' ? 'text-blue-600' : 'text-gray-600'}
                />
              </button>
              <button
                onClick={() => onViewModeChange?.('grid')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'grid'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-100'
                )}
                title="Grid View"
              >
                <Icon
                  name="grid"
                  size="sm"
                  className={viewMode === 'grid' ? 'text-blue-600' : 'text-gray-600'}
                />
              </button>
              <button
                onClick={() => onViewModeChange?.('card')}
                className={cn(
                  'p-2 rounded transition-colors',
                  viewMode === 'table'
                    ? 'bg-blue-50'
                    : 'hover:bg-gray-100'
                )}
                title="Table View"
              >
                <svg
                  className={cn(
                    'w-5 h-5',
                    viewMode === 'table' ? 'text-blue-600' : 'text-gray-600'
                  )}
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect x="4" y="5" width="16" height="4" rx="1" />
                  <rect x="4" y="10" width="16" height="4" rx="1" />
                  <rect x="4" y="15" width="16" height="4" rx="1" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Colleges */}
        <div className="p-6">
          {displayedColleges.map((college, index) => (
            <div key={`grid-college-wrapper-${college.id}`}>
              {/* Start new grid every 6 colleges */}
              {index % 6 === 0 && (
                <div className="grid grid-cols-3 gap-5 mb-6">
                  {displayedColleges.slice(index, index + 6).map((col) => {
                    const collegeIndex = displayedColleges.indexOf(col);
                    return (
                      <GridCollegeCard
                        key={col.id}
                        rank={collegeIndex + 1}
                        name={col.name}
                        location={col.location}
                        approvals={col.approvals}
                        logo={col.logo}
                        courseName={col.courseName}
                        courseFees={col.courseFees}
                        avgPackage={col.avgPackage}
                        rating={col.rating}
                        reviewCount={col.reviewCount}
                        rankings={col.rankings}
                        href={`/colleges/${col.id}`}
                        onAddToCompare={onAddToCompare}
                        isCompared={compareColleges.some((c) => c.id === col.id)}
                        collegeData={col}
                        onApplyNow={onApplyNow}
                        onCompareFees={onCompareFees}
                        isFeatured={collegeIndex % 6 === 5}
                        mediaCount={62 + (col.id * 13) % 200}
                      />
                    );
                  })}
                </div>
              )}

              {/* Insert promotional sections after every 6 colleges */}
              {(index + 1) % 6 === 0 && index !== displayedColleges.length - 1 && (
                <>
                  {/* Featured Carousel - after 6, 24, 42, etc. (every 18 with offset of 6) */}
                  {(index + 1) % 18 === 6 && (
                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <FeaturedCollegeCarousel
                        onApplyNow={onApplyNow}
                        onAddToCompare={onAddToCompare}
                        onCompareFees={onCompareFees}
                      />
                    </div>
                  )}

                  {/* Application Forms Section - after 12, 30, 48, etc. (every 18 with offset of 12) */}
                  {(index + 1) % 18 === 12 && (
                    <div className="mb-6">
                      <ApplicationFormsSection />
                    </div>
                  )}

                  {/* Advertisement Banner - after 18, 36, 54, etc. */}
                  {(index + 1) % 18 === 0 && (
                    <div className="mb-6">
                      <AdvertisementBanner
                        image={null}
                        alt="Advertisement"
                        href="#"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          ))}

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
                <Icon name="search" size="xl" className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No colleges found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { GridViewSection };
export default GridViewSection;

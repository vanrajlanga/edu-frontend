'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { fetchTopColleges } from '@/lib/api';
import { CollegeFilterTabs } from '../common/CollegeFilterTabs';
import { TopCollegeCard } from '../cards/TopCollegeCard';

// Primary filter tabs
const primaryFilters = [
  { value: 'btech', label: 'BE/B.Tech' },
  { value: 'mba', label: 'MBA/PGDM' },
  { value: 'mbbs', label: 'MBBS' },
  { value: 'mtech', label: 'ME/M.Tech' },
  { value: 'bsc', label: 'B.Sc' },
  { value: 'ba', label: 'BA' },
  { value: 'bcom', label: 'B.Com' },
  { value: 'bca', label: 'BCA' },
  { value: 'bba', label: 'BBA/BMS' },
];

// Secondary filters for each primary category
const secondaryFiltersMap = {
  btech: [
    { value: 'cs', label: 'Computer Science' },
    { value: 'mech', label: 'Mechanical Engineering' },
    { value: 'ece', label: 'Electronics & Communication' },
    { value: 'civil', label: 'Civil Engineering' },
    { value: 'it', label: 'Information Technology' },
    { value: 'eee', label: 'Electrical Engineering' },
    { value: 'chem', label: 'Chemical Engineering' },
    { value: 'aero', label: 'Aerospace Engineering' },
  ],
  mba: [
    { value: 'cat', label: 'CAT' },
    { value: 'mat', label: 'MAT' },
    { value: 'cmat', label: 'CMAT' },
    { value: 'xat', label: 'XAT' },
    { value: 'atma', label: 'ATMA' },
    { value: 'cuet-pg', label: 'CUET PG' },
    { value: 'tancet', label: 'TANCET' },
    { value: 'mahcet', label: 'MAHCET' },
    { value: 'gmat', label: 'GMAT' },
  ],
  mbbs: [
    { value: 'neet', label: 'NEET' },
    { value: 'aiims', label: 'AIIMS' },
    { value: 'jipmer', label: 'JIPMER' },
  ],
  mtech: [
    { value: 'gate', label: 'GATE' },
    { value: 'pgecet', label: 'PGECET' },
    { value: 'tancet', label: 'TANCET' },
  ],
  bsc: [
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'biology', label: 'Biology' },
    { value: 'maths', label: 'Mathematics' },
    { value: 'cs', label: 'Computer Science' },
  ],
  ba: [
    { value: 'english', label: 'English' },
    { value: 'economics', label: 'Economics' },
    { value: 'psychology', label: 'Psychology' },
    { value: 'political-science', label: 'Political Science' },
    { value: 'history', label: 'History' },
  ],
  bcom: [
    { value: 'accounting', label: 'Accounting' },
    { value: 'finance', label: 'Finance' },
    { value: 'banking', label: 'Banking' },
    { value: 'taxation', label: 'Taxation' },
  ],
  bca: [
    { value: 'programming', label: 'Programming' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'data-science', label: 'Data Science' },
  ],
  bba: [
    { value: 'marketing', label: 'Marketing' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' },
    { value: 'operations', label: 'Operations' },
  ],
};

function TopCollegesSection({ className }) {
  const [selectedPrimary, setSelectedPrimary] = useState(null);
  const [selectedSecondary, setSelectedSecondary] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch colleges when filter changes
  useEffect(() => {
    const loadColleges = async () => {
      setLoading(true);
      const data = await fetchTopColleges(selectedPrimary || '', 10);
      setColleges(data);
      setLoading(false);
    };
    loadColleges();
  }, [selectedPrimary]);

  const handlePrimaryChange = (value) => {
    setSelectedPrimary(value);
    setSelectedSecondary([]); // Clear secondary when primary changes
  };

  return (
    <section className={cn('py-12 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Top 10 Colleges
          </h2>
          <a
            href="/colleges"
            className="text-green-800 hover:text-green-900 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            View All Colleges
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6">
          <CollegeFilterTabs
            primaryFilters={primaryFilters}
            secondaryFiltersMap={secondaryFiltersMap}
            selectedPrimary={selectedPrimary}
            selectedSecondary={selectedSecondary}
            onPrimaryChange={handlePrimaryChange}
            onSecondaryChange={setSelectedSecondary}
          />
        </div>

        {/* Table Header (Desktop) */}
        <div className="hidden lg:flex lg:items-center gap-4 px-5 py-3 bg-gray-50 rounded-t-xl border border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {/* College column - matches rank badge + logo + info */}
          <div className="w-10" /> {/* Space for rank */}
          <div className="w-14" /> {/* Space for logo */}
          <div className="flex-1 min-w-0">College</div>
          {/* Stats columns - matches the stats grid */}
          <div className="grid grid-cols-4 gap-6" style={{ width: '400px' }}>
            <div>Ranking</div>
            <div>Cutoff</div>
            <div>Deadline</div>
            <div>Fees</div>
          </div>
          {/* Arrow column */}
          <div className="w-10" />
        </div>

        {/* College List */}
        <div className="space-y-3 lg:space-y-0">
          {loading ? (
            // Loading skeleton
            <div className="space-y-3 lg:space-y-0">
              {[...Array(5)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    'bg-white border border-gray-100 p-4 lg:p-5 animate-pulse',
                    'lg:rounded-none lg:border-x lg:border-b lg:border-t-0',
                    index === 0 && 'lg:rounded-t-none lg:border-t',
                    index === 4 && 'lg:rounded-b-xl'
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gray-200 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : colleges.length === 0 ? (
            // Empty state
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-gray-500">No colleges found for the selected filter.</p>
            </div>
          ) : (
            // College cards
            colleges.map((college, index) => (
              <TopCollegeCard
                key={college.id}
                rank={college.rank}
                name={college.name}
                location={college.location}
                rating={college.rating}
                reviewCount={college.reviewCount}
                rankingInfo={college.rankingInfo}
                cutoff={college.cutoff}
                deadline={college.deadline}
                fees={college.fees}
                href={college.href}
                className={cn(
                  'lg:rounded-none lg:border-x lg:border-b lg:border-t-0',
                  index === 0 && 'lg:rounded-t-none lg:border-t',
                  index === colleges.length - 1 && 'lg:rounded-b-xl'
                )}
              />
            ))
          )}
        </div>

        {/* View More Button */}
        <div className="mt-6 text-center">
          <a
            href={`/colleges${selectedPrimary ? `?course=${selectedPrimary}` : ''}`}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3',
              'bg-green-50 text-green-900 font-semibold rounded-lg',
              'hover:bg-green-100 transition-colors duration-200'
            )}
          >
            View All {selectedPrimary ? primaryFilters.find((f) => f.value === selectedPrimary)?.label : ''} Colleges
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export { TopCollegesSection };
export default TopCollegesSection;

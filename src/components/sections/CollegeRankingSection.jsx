'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { AgencyFilterTabs } from '../common/AgencyFilterTabs';
import { RankingTableRow, RankingTableHeader } from '../cards/RankingTableRow';

// Ranking year options
const rankingYears = [
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
];

// Ranking agencies
const rankingAgencies = [
  { value: 'collegedunia', label: 'Collegedunia' },
  { value: 'indiatoday', label: 'Indiatoday' },
  { value: 'theweek', label: 'The Week' },
  { value: 'nirf', label: 'NIRF' },
  { value: 'outlook', label: 'Outlook' },
  { value: 'iirf', label: 'IIRF' },
  { value: 'times', label: 'Times' },
  { value: 'qs', label: 'QS World' },
];

// Sample ranking data by agency
const rankingData = {
  collegedunia: [
    {
      id: 1,
      rank: 1,
      totalInCategory: 53,
      name: 'Sam Higginbottom University of Agriculture Technology and Sciences',
      shortName: 'SHUATS',
      location: 'Allahabad',
      stream: 'Agriculture',
      href: '/colleges/shuats',
    },
    {
      id: 2,
      rank: 2,
      totalInCategory: 53,
      name: 'Indian Agricultural Research Institute',
      shortName: 'IARI',
      location: 'New Delhi',
      stream: 'Agriculture',
      href: '/colleges/iari',
    },
    {
      id: 3,
      rank: 3,
      totalInCategory: 53,
      name: 'National Dairy Research Institute',
      shortName: 'NDRI',
      location: 'Karnal',
      stream: 'Agriculture',
      href: '/colleges/ndri',
    },
    {
      id: 4,
      rank: 4,
      totalInCategory: 53,
      name: 'Punjab Agricultural University',
      shortName: 'PAU',
      location: 'Ludhiana',
      stream: 'Agriculture',
      href: '/colleges/pau',
    },
    {
      id: 5,
      rank: 5,
      totalInCategory: 53,
      name: 'Banaras Hindu University',
      shortName: 'BHU',
      location: 'Varanasi',
      stream: 'Agriculture',
      href: '/colleges/bhu',
    },
    {
      id: 6,
      rank: 6,
      totalInCategory: 53,
      name: 'Indian Veterinary Research Institute',
      shortName: 'IVRI',
      location: 'Bareilly',
      stream: 'Agriculture',
      href: '/colleges/ivri',
    },
  ],
  nirf: [
    {
      id: 1,
      rank: 1,
      totalInCategory: 100,
      name: 'Indian Institute of Technology Madras',
      shortName: 'IITM',
      location: 'Chennai',
      stream: 'Engineering',
      href: '/colleges/iit-madras',
    },
    {
      id: 2,
      rank: 2,
      totalInCategory: 100,
      name: 'Indian Institute of Technology Delhi',
      shortName: 'IITD',
      location: 'New Delhi',
      stream: 'Engineering',
      href: '/colleges/iit-delhi',
    },
    {
      id: 3,
      rank: 3,
      totalInCategory: 100,
      name: 'Indian Institute of Technology Bombay',
      shortName: 'IITB',
      location: 'Mumbai',
      stream: 'Engineering',
      href: '/colleges/iit-bombay',
    },
    {
      id: 4,
      rank: 4,
      totalInCategory: 100,
      name: 'Indian Institute of Technology Kanpur',
      shortName: 'IITK',
      location: 'Kanpur',
      stream: 'Engineering',
      href: '/colleges/iit-kanpur',
    },
    {
      id: 5,
      rank: 5,
      totalInCategory: 100,
      name: 'Indian Institute of Technology Kharagpur',
      shortName: 'IITKgp',
      location: 'Kharagpur',
      stream: 'Engineering',
      href: '/colleges/iit-kharagpur',
    },
    {
      id: 6,
      rank: 6,
      totalInCategory: 100,
      name: 'Indian Institute of Technology Roorkee',
      shortName: 'IITR',
      location: 'Roorkee',
      stream: 'Engineering',
      href: '/colleges/iit-roorkee',
    },
  ],
};

// Get ranking data for agency (with fallback)
const getRankingData = (agency) => {
  return rankingData[agency] || rankingData.collegedunia;
};

function CollegeRankingSection({ className }) {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedAgency, setSelectedAgency] = useState('collegedunia');
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

  const colleges = getRankingData(selectedAgency);

  return (
    <section className={cn('py-12 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            College Ranking {selectedYear}
          </h2>
          <Link
            href="/colleges"
            className="text-orange-500 hover:text-orange-600 font-medium text-sm flex items-center gap-1 transition-colors"
          >
            View all Colleges
          </Link>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {/* Year Dropdown */}
          <div className="relative flex-shrink-0">
            <button
              type="button"
              onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
              className={cn(
                'flex items-center gap-2 px-4 py-2',
                'bg-white border border-gray-200 rounded-full',
                'text-sm font-medium text-gray-700',
                'hover:border-gray-300',
                'transition-colors duration-200'
              )}
            >
              <span className="text-gray-500">Ranking:</span>
              <span>{selectedYear}</span>
              <Icon
                name="chevronDown"
                size="sm"
                className={cn(
                  'text-gray-400 transition-transform duration-200',
                  isYearDropdownOpen && 'rotate-180'
                )}
              />
            </button>

            {/* Dropdown Menu */}
            {isYearDropdownOpen && (
              <div
                className={cn(
                  'absolute top-full left-0 mt-2 z-20',
                  'bg-white border border-gray-200 rounded-lg shadow-lg',
                  'py-1 min-w-[120px]'
                )}
              >
                {rankingYears.map((year) => (
                  <button
                    key={year.value}
                    type="button"
                    onClick={() => {
                      setSelectedYear(year.value);
                      setIsYearDropdownOpen(false);
                    }}
                    className={cn(
                      'w-full px-4 py-2 text-left text-sm',
                      'hover:bg-gray-50 transition-colors',
                      selectedYear === year.value
                        ? 'text-blue-900 font-medium bg-blue-50'
                        : 'text-gray-700'
                    )}
                  >
                    {year.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Agency Tabs */}
          <div className="flex-1 min-w-0">
            <AgencyFilterTabs
              items={rankingAgencies}
              value={selectedAgency}
              onChange={setSelectedAgency}
              label="Agencies:"
            />
          </div>
        </div>

        {/* Click outside to close dropdown */}
        {isYearDropdownOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsYearDropdownOpen(false)}
          />
        )}

        {/* Ranking Table */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          {/* Table Header */}
          <RankingTableHeader />

          {/* Table Rows */}
          <div>
            {colleges.map((college, index) => (
              <RankingTableRow
                key={college.id}
                rank={college.rank}
                totalInCategory={college.totalInCategory}
                name={college.name}
                shortName={college.shortName}
                location={college.location}
                stream={college.stream}
                href={college.href}
                className={cn(
                  index === colleges.length - 1 && 'border-b-0'
                )}
              />
            ))}
          </div>
        </div>

        {/* View More Link */}
        <div className="mt-6 text-center">
          <Link
            href={`/rankings?agency=${selectedAgency}&year=${selectedYear}`}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3',
              'text-blue-900 font-semibold text-sm',
              'hover:text-blue-950',
              'transition-colors duration-200'
            )}
          >
            View Complete Rankings
            <Icon name="arrowRight" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { CollegeRankingSection };
export default CollegeRankingSection;

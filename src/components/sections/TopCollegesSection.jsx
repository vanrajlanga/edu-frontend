'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { CollegeFilterTabs } from '../common/CollegeFilterTabs';
import { CollegeListItem } from '../cards/CollegeListItem';

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

// Sample colleges data
const collegesData = {
  btech: [
    {
      id: 1,
      rank: 1,
      name: 'Indian Institute of Technology Madras',
      location: 'Chennai, Tamil Nadu',
      rating: 4.9,
      reviewCount: 1245,
      rankingInfo: 'NIRF #1',
      cutoff: 'JEE Adv: 98.5%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-madras',
    },
    {
      id: 2,
      rank: 2,
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      rating: 4.8,
      reviewCount: 1120,
      rankingInfo: 'NIRF #2',
      cutoff: 'JEE Adv: 98.2%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-delhi',
    },
    {
      id: 3,
      rank: 3,
      name: 'Indian Institute of Technology Bombay',
      location: 'Mumbai, Maharashtra',
      rating: 4.8,
      reviewCount: 1089,
      rankingInfo: 'NIRF #3',
      cutoff: 'JEE Adv: 98.0%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-bombay',
    },
    {
      id: 4,
      rank: 4,
      name: 'Indian Institute of Technology Kanpur',
      location: 'Kanpur, Uttar Pradesh',
      rating: 4.7,
      reviewCount: 956,
      rankingInfo: 'NIRF #4',
      cutoff: 'JEE Adv: 97.5%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-kanpur',
    },
    {
      id: 5,
      rank: 5,
      name: 'Indian Institute of Technology Kharagpur',
      location: 'Kharagpur, West Bengal',
      rating: 4.7,
      reviewCount: 892,
      rankingInfo: 'NIRF #5',
      cutoff: 'JEE Adv: 97.0%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-kharagpur',
    },
    {
      id: 6,
      rank: 6,
      name: 'Indian Institute of Technology Roorkee',
      location: 'Roorkee, Uttarakhand',
      rating: 4.6,
      reviewCount: 845,
      rankingInfo: 'NIRF #6',
      cutoff: 'JEE Adv: 96.5%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-roorkee',
    },
    {
      id: 7,
      rank: 7,
      name: 'Indian Institute of Technology Guwahati',
      location: 'Guwahati, Assam',
      rating: 4.5,
      reviewCount: 756,
      rankingInfo: 'NIRF #7',
      cutoff: 'JEE Adv: 96.0%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-guwahati',
    },
    {
      id: 8,
      rank: 8,
      name: 'Indian Institute of Technology Hyderabad',
      location: 'Hyderabad, Telangana',
      rating: 4.5,
      reviewCount: 678,
      rankingInfo: 'NIRF #8',
      cutoff: 'JEE Adv: 95.5%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-hyderabad',
    },
    {
      id: 9,
      rank: 9,
      name: 'National Institute of Technology Trichy',
      location: 'Tiruchirappalli, Tamil Nadu',
      rating: 4.4,
      reviewCount: 612,
      rankingInfo: 'NIRF #9',
      cutoff: 'JEE Main: 99.2%',
      deadline: 'Jun 30, 2025',
      fees: '1.8L/year',
      href: '/colleges/nit-trichy',
    },
    {
      id: 10,
      rank: 10,
      name: 'Indian Institute of Technology BHU',
      location: 'Varanasi, Uttar Pradesh',
      rating: 4.4,
      reviewCount: 589,
      rankingInfo: 'NIRF #10',
      cutoff: 'JEE Adv: 95.0%',
      deadline: 'May 15, 2025',
      fees: '2.5L/year',
      href: '/colleges/iit-bhu',
    },
  ],
  mba: [
    {
      id: 1,
      rank: 1,
      name: 'Indian Institute of Management Ahmedabad',
      location: 'Ahmedabad, Gujarat',
      rating: 4.9,
      reviewCount: 1567,
      rankingInfo: 'NIRF #1',
      cutoff: 'CAT: 99%ile',
      deadline: 'Jan 15, 2025',
      fees: '28L/2years',
      href: '/colleges/iim-ahmedabad',
    },
    {
      id: 2,
      rank: 2,
      name: 'Indian Institute of Management Bangalore',
      location: 'Bangalore, Karnataka',
      rating: 4.9,
      reviewCount: 1432,
      rankingInfo: 'NIRF #2',
      cutoff: 'CAT: 99%ile',
      deadline: 'Jan 15, 2025',
      fees: '27L/2years',
      href: '/colleges/iim-bangalore',
    },
    {
      id: 3,
      rank: 3,
      name: 'Indian Institute of Management Calcutta',
      location: 'Kolkata, West Bengal',
      rating: 4.8,
      reviewCount: 1298,
      rankingInfo: 'NIRF #3',
      cutoff: 'CAT: 99%ile',
      deadline: 'Jan 15, 2025',
      fees: '27L/2years',
      href: '/colleges/iim-calcutta',
    },
    {
      id: 4,
      rank: 4,
      name: 'Indian Institute of Management Lucknow',
      location: 'Lucknow, Uttar Pradesh',
      rating: 4.7,
      reviewCount: 1156,
      rankingInfo: 'NIRF #4',
      cutoff: 'CAT: 98%ile',
      deadline: 'Jan 20, 2025',
      fees: '22L/2years',
      href: '/colleges/iim-lucknow',
    },
    {
      id: 5,
      rank: 5,
      name: 'Indian Institute of Management Kozhikode',
      location: 'Kozhikode, Kerala',
      rating: 4.7,
      reviewCount: 1089,
      rankingInfo: 'NIRF #5',
      cutoff: 'CAT: 97%ile',
      deadline: 'Jan 20, 2025',
      fees: '21L/2years',
      href: '/colleges/iim-kozhikode',
    },
    {
      id: 6,
      rank: 6,
      name: 'Indian Institute of Management Indore',
      location: 'Indore, Madhya Pradesh',
      rating: 4.6,
      reviewCount: 978,
      rankingInfo: 'NIRF #6',
      cutoff: 'CAT: 97%ile',
      deadline: 'Jan 25, 2025',
      fees: '20L/2years',
      href: '/colleges/iim-indore',
    },
    {
      id: 7,
      rank: 7,
      name: 'XLRI Jamshedpur',
      location: 'Jamshedpur, Jharkhand',
      rating: 4.6,
      reviewCount: 892,
      rankingInfo: 'NIRF #7',
      cutoff: 'XAT: 95%ile',
      deadline: 'Jan 10, 2025',
      fees: '25L/2years',
      href: '/colleges/xlri',
    },
    {
      id: 8,
      rank: 8,
      name: 'Faculty of Management Studies, Delhi',
      location: 'New Delhi',
      rating: 4.5,
      reviewCount: 812,
      rankingInfo: 'NIRF #8',
      cutoff: 'CAT: 98%ile',
      deadline: 'Jan 15, 2025',
      fees: '2L/2years',
      href: '/colleges/fms-delhi',
    },
    {
      id: 9,
      rank: 9,
      name: 'SP Jain Institute of Management',
      location: 'Mumbai, Maharashtra',
      rating: 4.5,
      reviewCount: 756,
      rankingInfo: 'NIRF #9',
      cutoff: 'CAT: 96%ile',
      deadline: 'Jan 20, 2025',
      fees: '22L/2years',
      href: '/colleges/spjimr',
    },
    {
      id: 10,
      rank: 10,
      name: 'MDI Gurgaon',
      location: 'Gurgaon, Haryana',
      rating: 4.4,
      reviewCount: 698,
      rankingInfo: 'NIRF #10',
      cutoff: 'CAT: 96%ile',
      deadline: 'Jan 25, 2025',
      fees: '23L/2years',
      href: '/colleges/mdi-gurgaon',
    },
  ],
};

// Get colleges for selected filter (with fallback)
const getColleges = (filter) => {
  return collegesData[filter] || collegesData.btech;
};

function TopCollegesSection({ className }) {
  const [selectedPrimary, setSelectedPrimary] = useState(null);
  const [selectedSecondary, setSelectedSecondary] = useState([]);
  const colleges = getColleges(selectedPrimary || 'btech'); // Default to btech for list

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
            className="text-blue-500 hover:text-blue-600 font-medium text-sm flex items-center gap-1 transition-colors"
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
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 bg-gray-50 rounded-t-xl border border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="col-span-4">College</div>
          <div className="col-span-2">Ranking</div>
          <div className="col-span-2">Cutoff</div>
          <div className="col-span-2">Deadline</div>
          <div className="col-span-2">Fees</div>
        </div>

        {/* College List */}
        <div className="space-y-3 lg:space-y-0">
          {colleges.map((college, index) => (
            <CollegeListItem
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
          ))}
        </div>

        {/* View More Button */}
        <div className="mt-6 text-center">
          <a
            href={`/colleges${selectedPrimary ? `?course=${selectedPrimary}` : ''}`}
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3',
              'bg-blue-50 text-blue-600 font-semibold rounded-lg',
              'hover:bg-blue-100 transition-colors duration-200'
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

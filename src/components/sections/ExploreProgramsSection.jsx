'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { ProgramFilterTabs } from '../common/ProgramFilterTabs';
import {
  RankingCard,
  FindCollegesCard,
  CompareCollegesCard,
  ExamsCard,
  CollegePredictorCard,
  CourseFinderCard,
} from '../cards/ProgramCard';

// Filter tabs data
const programFilters = [
  { value: 'all', label: 'All' },
  { value: 'btech', label: 'BE/B.Tech' },
  { value: 'mba', label: 'MBA/PGDM' },
  { value: 'mbbs', label: 'MBBS' },
  { value: 'mtech', label: 'ME/M.Tech' },
  { value: 'bsc', label: 'B.Sc' },
  { value: 'ba', label: 'BA' },
  { value: 'bcom', label: 'B.Com' },
  { value: 'bca', label: 'BCA' },
  { value: 'bba', label: 'BBA/BMS' },
  { value: 'bsc-nursing', label: 'B.Sc (Nursing)' },
];

function ExploreProgramsSection({ className }) {
  const [selectedFilter, setSelectedFilter] = useState('all');

  return (
    <section className={cn('py-12 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Explore Programs
        </h2>

        {/* Filter Tabs */}
        <div className="mb-8">
          <ProgramFilterTabs
            items={programFilters}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <RankingCard />
          <FindCollegesCard />
          <CompareCollegesCard />
          <ExamsCard />
          <CollegePredictorCard />
          <CourseFinderCard />
        </div>
      </div>
    </section>
  );
}

export { ExploreProgramsSection };
export default ExploreProgramsSection;

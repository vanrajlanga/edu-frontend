'use client';

import { useState, useEffect } from 'react';
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
import { fetchExploreProgramsData } from '@/lib/api';

// Default filter tabs (fallback)
const defaultFilters = [
  { value: 'all', label: 'All' },
  { value: 'btech', label: 'BE/B.Tech' },
  { value: 'mba', label: 'MBA/PGDM' },
  { value: 'mbbs', label: 'MBBS' },
];

function ExploreProgramsSection({ className }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [programData, setProgramData] = useState({
    filters: defaultFilters,
    courseCounts: [],
    exams: [],
    rankings: [],
    predictorExams: [],
    totalColleges: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchExploreProgramsData();
      if (data.filters && data.filters.length > 0) {
        setProgramData(data);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  // Loading skeleton
  if (loading) {
    return (
      <section className={cn('py-12 bg-gray-50', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Explore Programs
          </h2>
          <div className="mb-8 flex gap-2 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

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
            items={programData.filters}
            value={selectedFilter}
            onChange={setSelectedFilter}
          />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <RankingCard rankings={programData.rankings} />
          <FindCollegesCard totalColleges={programData.totalColleges} />
          <CompareCollegesCard />
          <ExamsCard exams={programData.exams} />
          <CollegePredictorCard predictors={programData.predictorExams} />
          <CourseFinderCard courses={programData.courseCounts} />
        </div>
      </div>
    </section>
  );
}

export { ExploreProgramsSection };
export default ExploreProgramsSection;

'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

const streamOptions = [
  { id: 'management', label: 'Management', count: 7707 },
  { id: 'science', label: 'Science', count: 6439 },
  { id: 'engineering', label: 'Engineering', count: 6215 },
  { id: 'arts', label: 'Arts', count: 5769 },
  { id: 'computer-applications', label: 'Computer Applications', count: 5124 },
  { id: 'commerce', label: 'Commerce', count: 5097 },
];

const degreeOptions = [
  { id: 'mba-pgdm', label: 'MBA/PGDM', count: 5287 },
  { id: 'bsc', label: 'B.Sc', count: 4931 },
  { id: 'bcom', label: 'B.Com', count: 4863 },
  { id: 'ba', label: 'BA', count: 4669 },
  { id: 'be-btech', label: 'BE/B.Tech', count: 4467 },
  { id: 'bba-bms', label: 'BBA/BMS', count: 4332 },
  { id: 'msc', label: 'M.Sc', count: 3784 },
];

const locationTags = [
  { id: 'maharashtra', label: 'Maharashtra', count: 2958 },
  { id: 'tamil-nadu', label: 'Tamil Nadu', count: 2461 },
];

function FilterChip({ label, count, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex-shrink-0 px-4 py-2 rounded-full border transition-all text-sm font-medium whitespace-nowrap',
        isActive
          ? 'bg-green-500 text-white border-green-500'
          : 'bg-white text-gray-700 border-gray-300 hover:border-green-400'
      )}
    >
      <span className="inline-flex items-center gap-1">
        {isActive && <span className="w-2 h-2 bg-white rounded-full" />}
        {label} ({count})
      </span>
    </button>
  );
}

function StreamDegreeFilters({ className }) {
  const [activeStream, setActiveStream] = useState(null);
  const [activeDegree, setActiveDegree] = useState(null);

  return (
    <div className={cn('bg-white border-b border-gray-200', className)}>
      <div className="max-w-full px-4 py-3 space-y-3">
        {/* Select Stream */}
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-gray-900 flex-shrink-0 min-w-[120px]">
            Select Stream
          </h3>
          <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-2">
              {streamOptions.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label}
                  count={option.count}
                  isActive={activeStream === option.id}
                  onClick={() => setActiveStream(activeStream === option.id ? null : option.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Select Degree */}
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-gray-900 flex-shrink-0 min-w-[120px]">
            Select Degree
          </h3>
          <div className="flex-1 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="flex gap-2">
              {degreeOptions.map((option) => (
                <FilterChip
                  key={option.id}
                  label={option.label}
                  count={option.count}
                  isActive={activeDegree === option.id}
                  onClick={() => setActiveDegree(activeDegree === option.id ? null : option.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Location Tags and More */}
        <div className="flex items-center gap-2">
          {locationTags.map((tag) => (
            <button
              key={tag.id}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-200 hover:bg-green-100 transition-all"
            >
              <span className="w-1.5 h-1.5 bg-green-600 rounded-full" />
              {tag.label} ({tag.count})
            </button>
          ))}
          <button className="px-3 py-1 text-orange-600 hover:text-orange-700 font-bold text-sm">
            33 more
          </button>
        </div>
      </div>
    </div>
  );
}

export { StreamDegreeFilters };
export default StreamDegreeFilters;

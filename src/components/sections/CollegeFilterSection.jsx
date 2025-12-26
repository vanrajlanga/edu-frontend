'use client';

import { useState } from 'react';
import { Container } from '@/components/layout';
import { FilterBar } from '@/components/common/FilterBar';
import { FilterDropdown } from '@/components/common/FilterDropdown';
import { FilterModal } from '@/components/common/FilterModal';
import { cn } from '@/lib/cn';

// Filter configurations
const filterConfigs = [
  {
    id: 'stream',
    label: 'Stream',
    searchPlaceholder: 'Search stream...',
    options: [
      { id: 'management', label: 'Management' },
      { id: 'science', label: 'Science' },
      { id: 'engineering', label: 'Engineering' },
      { id: 'medical', label: 'Medical' },
      { id: 'commerce', label: 'Commerce' },
      { id: 'arts', label: 'Arts' },
      { id: 'law', label: 'Law' },
      { id: 'design', label: 'Design' },
      { id: 'architecture', label: 'Architecture' },
    ],
  },
  {
    id: 'state',
    label: 'State',
    searchPlaceholder: 'Search state...',
    options: [
      { id: 'maharashtra', label: 'Maharashtra' },
      { id: 'karnataka', label: 'Karnataka' },
      { id: 'delhi', label: 'Delhi' },
      { id: 'tamil-nadu', label: 'Tamil Nadu' },
      { id: 'uttar-pradesh', label: 'Uttar Pradesh' },
      { id: 'gujarat', label: 'Gujarat' },
      { id: 'rajasthan', label: 'Rajasthan' },
      { id: 'west-bengal', label: 'West Bengal' },
      { id: 'telangana', label: 'Telangana' },
    ],
  },
  {
    id: 'city',
    label: 'City',
    searchPlaceholder: 'Search city...',
    options: [
      { id: 'bangalore', label: 'Bangalore' },
      { id: 'mumbai', label: 'Mumbai' },
      { id: 'delhi', label: 'Delhi' },
      { id: 'pune', label: 'Pune' },
      { id: 'hyderabad', label: 'Hyderabad' },
      { id: 'chennai', label: 'Chennai' },
      { id: 'kolkata', label: 'Kolkata' },
      { id: 'ahmedabad', label: 'Ahmedabad' },
      { id: 'jaipur', label: 'Jaipur' },
    ],
  },
  {
    id: 'degree',
    label: 'Degree',
    searchPlaceholder: 'Search degree...',
    options: [
      { id: 'btech', label: 'B.Tech' },
      { id: 'mba', label: 'MBA' },
      { id: 'mbbs', label: 'MBBS' },
      { id: 'bba', label: 'BBA' },
      { id: 'mtech', label: 'M.Tech' },
      { id: 'bsc', label: 'B.Sc' },
      { id: 'msc', label: 'M.Sc' },
      { id: 'bcom', label: 'B.Com' },
      { id: 'mcom', label: 'M.Com' },
    ],
  },
  {
    id: 'program-type',
    label: 'Program Type',
    searchPlaceholder: 'Search program type...',
    options: [
      { id: 'full-time', label: 'Full Time' },
      { id: 'part-time', label: 'Part Time' },
      { id: 'online', label: 'Online' },
      { id: 'distance', label: 'Distance Learning' },
    ],
  },
  {
    id: 'college-type',
    label: 'Type Of College',
    searchPlaceholder: 'Search college type...',
    options: [
      { id: 'private', label: 'Private' },
      { id: 'government', label: 'Government' },
      { id: 'deemed', label: 'Deemed University' },
      { id: 'autonomous', label: 'Autonomous' },
    ],
  },
  {
    id: 'entrance-exam',
    label: 'Entrance/Exam Accepted',
    searchPlaceholder: 'Search exam...',
    options: [
      { id: 'jee-main', label: 'JEE Main' },
      { id: 'neet', label: 'NEET' },
      { id: 'cat', label: 'CAT' },
      { id: 'gate', label: 'GATE' },
      { id: 'cuet', label: 'CUET' },
      { id: 'mh-cet', label: 'MH CET' },
    ],
  },
  {
    id: 'total-fee',
    label: 'Total Fee',
    searchPlaceholder: 'Search fee range...',
    options: [
      { id: 'below-1l', label: 'Below ₹1 Lakh' },
      { id: '1l-3l', label: '₹1-3 Lakhs' },
      { id: '3l-5l', label: '₹3-5 Lakhs' },
      { id: '5l-10l', label: '₹5-10 Lakhs' },
      { id: 'above-10l', label: 'Above ₹10 Lakhs' },
    ],
  },
  {
    id: 'course-type',
    label: 'Course Type',
    searchPlaceholder: 'Search course type...',
    options: [
      { id: 'ug', label: 'Undergraduate' },
      { id: 'pg', label: 'Postgraduate' },
      { id: 'diploma', label: 'Diploma' },
      { id: 'certificate', label: 'Certificate' },
    ],
  },
  {
    id: 'agency',
    label: 'Agency',
    searchPlaceholder: 'Search agency...',
    options: [
      { id: 'nirf', label: 'NIRF' },
      { id: 'naac', label: 'NAAC' },
      { id: 'nba', label: 'NBA' },
      { id: 'aicte', label: 'AICTE' },
      { id: 'ugc', label: 'UGC' },
    ],
  },
];

function CollegeFilterSection({ className, onFilterChange }) {
  const [activeFilterId, setActiveFilterId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFilterClick = (filterId) => {
    setActiveFilterId(activeFilterId === filterId ? null : filterId);
  };

  const handleAllFilterClick = () => {
    setIsModalOpen(true);
    setActiveFilterId(null);
  };

  const handleOptionToggle = (filterId, optionId) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[filterId] || [];
      const isSelected = currentOptions.includes(optionId);

      const newFilters = {
        ...prev,
        [filterId]: isSelected
          ? currentOptions.filter((id) => id !== optionId)
          : [...currentOptions, optionId],
      };

      // Remove empty arrays
      if (newFilters[filterId].length === 0) {
        delete newFilters[filterId];
      }

      // Notify parent component
      onFilterChange?.(newFilters);

      return newFilters;
    });
  };

  const handleClearFilter = (filterId) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterId];
      onFilterChange?.(newFilters);
      return newFilters;
    });
  };

  const handleModalApply = (filters) => {
    setSelectedFilters(filters);
    onFilterChange?.(filters);
  };

  const renderDropdown = (filterId) => {
    const filter = filterConfigs.find((f) => f.id === filterId);
    if (!filter) return null;

    return (
      <FilterDropdown
        title={filter.label}
        options={filter.options}
        selectedOptions={selectedFilters[filterId] || []}
        onToggleOption={(optionId) => handleOptionToggle(filterId, optionId)}
        onClear={() => handleClearFilter(filterId)}
        onClose={() => setActiveFilterId(null)}
        onViewAllFilters={handleAllFilterClick}
        searchPlaceholder={filter.searchPlaceholder}
      />
    );
  };

  return (
    <>
      <section className={cn('bg-white py-1', className)}>
        <Container size="full" className="max-w-[1400px]">
          <FilterBar
            filters={filterConfigs}
            activeFilterId={activeFilterId}
            onFilterClick={handleFilterClick}
            onAllFilterClick={handleAllFilterClick}
            renderDropdown={renderDropdown}
          />
        </Container>
      </section>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onApply={handleModalApply}
        selectedFilters={selectedFilters}
      />
    </>
  );
}

export { CollegeFilterSection };
export default CollegeFilterSection;

'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

const filterData = {
  stream: [
    { id: 'management', label: 'Management', count: 7707 },
    { id: 'science', label: 'Science', count: 6439 },
    { id: 'engineering', label: 'Engineering', count: 6215 },
    { id: 'arts', label: 'Arts', count: 5769 },
    { id: 'computer-applications', label: 'Computer Applications', count: 5124 },
    { id: 'commerce', label: 'Commerce', count: 5097 },
    { id: 'education', label: 'Education', count: 3034 },
  ],
  state: [
    { id: 'maharashtra', label: 'Maharashtra', count: 2958 },
    { id: 'tamil-nadu', label: 'Tamil Nadu', count: 2461 },
    { id: 'uttar-pradesh', label: 'Uttar Pradesh', count: 2175 },
    { id: 'karnataka', label: 'Karnataka', count: 1731 },
    { id: 'delhi-ncr', label: 'Delhi NCR', count: 1661 },
    { id: 'kerala', label: 'Kerala', count: 1138 },
    { id: 'gujarat', label: 'Gujarat', count: 1014 },
  ],
};

function FilterSection({ title, items, selectedItems = [], onToggle }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="border-b border-gray-200 pb-4 mb-4">
      {/* Section Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-3"
      >
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <Icon
          name={isExpanded ? 'chevronUp' : 'chevronDown'}
          size="sm"
          className="text-gray-500"
        />
      </button>

      {isExpanded && (
        <>
          {/* Search Input */}
          <div className="mb-3 relative">
            <Icon name="search" size="sm" className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`FIND ${title.toUpperCase()}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Filter Items */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {filteredItems.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onToggle?.(item.id)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700 flex-1">
                  {item.label}- <span className="text-gray-500">[{item.count}]</span>
                </span>
              </label>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function FilterSidebar({ onFilterChange, className }) {
  const [selectedStreams, setSelectedStreams] = useState([]);
  const [selectedStates, setSelectedStates] = useState([]);

  const handleStreamToggle = (streamId) => {
    const newStreams = selectedStreams.includes(streamId)
      ? selectedStreams.filter(id => id !== streamId)
      : [...selectedStreams, streamId];
    setSelectedStreams(newStreams);
    onFilterChange?.({ streams: newStreams, states: selectedStates });
  };

  const handleStateToggle = (stateId) => {
    const newStates = selectedStates.includes(stateId)
      ? selectedStates.filter(id => id !== stateId)
      : [...selectedStates, stateId];
    setSelectedStates(newStates);
    onFilterChange?.({ streams: selectedStreams, states: newStates });
  };

  const handleSetDefault = () => {
    setSelectedStreams([]);
    setSelectedStates([]);
    onFilterChange?.({ streams: [], states: [] });
  };

  return (
    <div className={cn(
      'w-full h-full bg-white border-r border-gray-200 overflow-y-auto',
      className
    )}>
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-gray-500">FOUND </span>
            <span className="text-sm font-bold text-gray-900">20557</span>
            <span className="text-sm text-gray-500"> COLLEGES</span>
          </div>
          <button
            onClick={handleSetDefault}
            className="text-sm font-semibold text-orange-600 hover:text-orange-700"
          >
            SET DEFAULT
          </button>
        </div>

        {/* Filter Sections */}
        <FilterSection
          title="Stream"
          items={filterData.stream}
          selectedItems={selectedStreams}
          onToggle={handleStreamToggle}
        />

        <FilterSection
          title="State"
          items={filterData.state}
          selectedItems={selectedStates}
          onToggle={handleStateToggle}
        />
      </div>
    </div>
  );
}

export { FilterSidebar };
export default FilterSidebar;

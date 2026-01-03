'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Default goal categories (fallback)
const defaultGoalCategories = [
  {
    id: 'engineering',
    title: 'Engineering',
    icon: 'settings',
    courses: [
      { label: 'BE/B.Tech', href: '/btech-colleges' },
      { label: 'M.Tech', href: '/mtech-colleges' },
    ],
  },
  {
    id: 'management',
    title: 'Management',
    icon: 'briefcase',
    courses: [
      { label: 'MBA/PGDM', href: '/mba-colleges' },
      { label: 'BBA', href: '/bba-colleges' },
    ],
  },
];

// Popular cities
const popularCities = [
  { id: 'delhi', label: 'Delhi NCR', state: 'Delhi' },
  { id: 'mumbai', label: 'Mumbai', state: 'Maharashtra' },
  { id: 'bangalore', label: 'Bangalore', state: 'Karnataka' },
  { id: 'chennai', label: 'Chennai', state: 'Tamil Nadu' },
  { id: 'hyderabad', label: 'Hyderabad', state: 'Telangana' },
  { id: 'pune', label: 'Pune', state: 'Maharashtra' },
  { id: 'kolkata', label: 'Kolkata', state: 'West Bengal' },
  { id: 'ahmedabad', label: 'Ahmedabad', state: 'Gujarat' },
];

function GoalSelector({ isOpen, onClose, onSelect, triggerRef, studyGoals = [], className }) {
  const [activeTab, setActiveTab] = useState('goal');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const dropdownRef = useRef(null);

  // Use provided studyGoals or fallback to default
  const goalCategories = studyGoals.length > 0 ? studyGoals : defaultGoalCategories;

  // Set initial hovered category
  useEffect(() => {
    if (isOpen && goalCategories.length > 0 && !hoveredCategory) {
      setHoveredCategory(goalCategories[0]);
    }
  }, [isOpen, goalCategories, hoveredCategory]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  // Filter cities based on search
  const filteredCities = popularCities.filter(
    (city) =>
      city.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGoalSelect = (course) => {
    if (onSelect) {
      onSelect({ goal: course, city: null });
    }
    setActiveTab('city');
    setSearchQuery('');
  };

  const handleCitySelect = (city) => {
    if (onSelect) {
      onSelect({ goal: null, city });
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute top-full left-0 mt-2',
        'w-[560px]',
        'bg-white rounded-xl shadow-xl',
        'border border-gray-200',
        'overflow-hidden',
        'animate-in fade-in slide-in-from-top-2 duration-200',
        'z-50',
        className
      )}
    >
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => {
            setActiveTab('goal');
            setSearchQuery('');
          }}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium',
            'border-b-2 transition-colors',
            activeTab === 'goal'
              ? 'text-green-800 border-green-800 bg-green-50/50'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          )}
        >
          Select Goal
        </button>
        <button
          onClick={() => {
            setActiveTab('city');
            setSearchQuery('');
          }}
          className={cn(
            'flex-1 px-4 py-3 text-sm font-medium',
            'border-b-2 transition-colors',
            activeTab === 'city'
              ? 'text-green-800 border-green-800 bg-green-50/50'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          )}
        >
          Select City
        </button>
      </div>

      {activeTab === 'goal' ? (
        <div className="flex max-h-[400px]">
          {/* Left: Categories */}
          <div className="w-48 border-r border-gray-100 bg-gray-50/50 overflow-y-auto">
            <div className="p-2">
              {goalCategories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-2.5 rounded-lg',
                    'text-sm text-left',
                    'transition-colors duration-150',
                    hoveredCategory?.id === category.id
                      ? 'bg-white text-green-900 shadow-sm'
                      : 'text-gray-700 hover:bg-white/80'
                  )}
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center',
                      hoveredCategory?.id === category.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-500'
                    )}
                  >
                    <Icon name={category.icon || 'folder'} size="sm" />
                  </div>
                  <div>
                    <span className="font-medium">{category.title}</span>
                    {category.collegeCount > 0 && (
                      <span className="block text-xs text-gray-400">{category.collegeCount} Colleges</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Courses */}
          <div className="flex-1 p-3 overflow-y-auto">
            {hoveredCategory && (
              <>
                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">
                  {hoveredCategory.title} Courses
                </h4>
                <div className="space-y-0.5">
                  {hoveredCategory.courses?.map((course, index) => (
                    <Link
                      key={index}
                      href={course.href || '#'}
                      onClick={() => {
                        handleGoalSelect(course);
                        onClose();
                      }}
                      className={cn(
                        'flex items-center justify-between w-full',
                        'px-3 py-2.5 rounded-lg',
                        'text-sm text-gray-700',
                        'hover:bg-green-50 hover:text-green-900',
                        'transition-colors duration-150',
                        'group'
                      )}
                    >
                      <span className="font-medium">
                        {course.label}
                        {course.collegeCount > 0 && (
                          <span className="ml-1 text-xs text-gray-400">({course.collegeCount})</span>
                        )}
                      </span>
                      <Icon
                        name="chevronRight"
                        size="sm"
                        className="text-gray-300 group-hover:text-green-500 transition-colors"
                      />
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          {/* Search */}
          <div className="relative mb-4">
            <Icon
              name="search"
              size="sm"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city..."
              autoFocus
              className={cn(
                'w-full pl-9 pr-4 py-2.5',
                'bg-gray-50 rounded-lg',
                'border border-gray-200 focus:border-green-400',
                'text-sm text-gray-700 placeholder:text-gray-400',
                'outline-none transition-colors'
              )}
            />
          </div>

          {/* Cities Grid */}
          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Popular Cities
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className={cn(
                  'flex items-center gap-3 p-3',
                  'rounded-lg border border-gray-200',
                  'text-left',
                  'hover:border-green-300 hover:bg-green-50',
                  'transition-all duration-150',
                  'group'
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Icon
                    name="mapPin"
                    size="sm"
                    className="text-gray-500 group-hover:text-green-800 transition-colors"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-700 group-hover:text-green-900">
                    {city.label}
                  </div>
                  <div className="text-xs text-gray-400">{city.state}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { GoalSelector };
export default GoalSelector;

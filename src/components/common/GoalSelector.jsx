'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Goal categories with their sub-items
const goalCategories = [
  {
    id: 'engineering',
    label: 'Engineering',
    icon: 'settings',
    items: [
      { id: 'btech', label: 'BE/B.Tech', href: '/courses/btech' },
      { id: 'mtech', label: 'M.Tech', href: '/courses/mtech' },
      { id: 'diploma', label: 'Diploma in Engineering', href: '/courses/diploma-engineering' },
    ],
  },
  {
    id: 'management',
    label: 'Management',
    icon: 'briefcase',
    items: [
      { id: 'mba', label: 'MBA/PGDM', href: '/courses/mba' },
      { id: 'bba', label: 'BBA', href: '/courses/bba' },
      { id: 'executive-mba', label: 'Executive MBA', href: '/courses/executive-mba' },
    ],
  },
  {
    id: 'commerce',
    label: 'Commerce',
    icon: 'chart',
    items: [
      { id: 'bcom', label: 'B.Com', href: '/courses/bcom' },
      { id: 'mcom', label: 'M.Com', href: '/courses/mcom' },
      { id: 'ca', label: 'CA', href: '/courses/ca' },
    ],
  },
  {
    id: 'arts',
    label: 'Arts',
    icon: 'book',
    items: [
      { id: 'ba', label: 'BA', href: '/courses/ba' },
      { id: 'ma', label: 'MA', href: '/courses/ma' },
      { id: 'bjmc', label: 'BJMC', href: '/courses/bjmc' },
    ],
  },
  {
    id: 'science',
    label: 'Science',
    icon: 'flask',
    items: [
      { id: 'bsc', label: 'B.Sc', href: '/courses/bsc' },
      { id: 'msc', label: 'M.Sc', href: '/courses/msc' },
    ],
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: 'heart',
    items: [
      { id: 'mbbs', label: 'MBBS', href: '/courses/mbbs' },
      { id: 'bds', label: 'BDS', href: '/courses/bds' },
      { id: 'pharmacy', label: 'B.Pharma', href: '/courses/bpharma' },
    ],
  },
  {
    id: 'computer',
    label: 'Computer',
    icon: 'code',
    items: [
      { id: 'bca', label: 'BCA', href: '/courses/bca' },
      { id: 'mca', label: 'MCA', href: '/courses/mca' },
    ],
  },
  {
    id: 'law',
    label: 'Law',
    icon: 'shield',
    items: [
      { id: 'llb', label: 'LLB', href: '/courses/llb' },
      { id: 'ballb', label: 'BA LLB', href: '/courses/ballb' },
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

function GoalSelector({ isOpen, onClose, onSelect, triggerRef, className }) {
  const [activeTab, setActiveTab] = useState('goal');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [hoveredCategory, setHoveredCategory] = useState(goalCategories[0]);
  const dropdownRef = useRef(null);

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

  const handleGoalSelect = (item) => {
    if (onSelect) {
      onSelect({ goal: item, city: null });
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
        'w-[520px]',
        'bg-surface rounded-xl shadow-xl',
        'border border-border',
        'overflow-hidden',
        'animate-in fade-in slide-in-from-top-2 duration-200',
        'z-50',
        className
      )}
    >
      {/* Tabs */}
      <div className="flex border-b border-border">
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
              : 'text-text-secondary border-transparent hover:text-text-primary'
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
              : 'text-text-secondary border-transparent hover:text-text-primary'
          )}
        >
          Select City
        </button>
      </div>

      {activeTab === 'goal' ? (
        <div className="flex">
          {/* Left: Categories */}
          <div className="w-44 border-r border-border bg-surface-alt/50">
            <div className="p-2">
              {goalCategories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => setHoveredCategory(category)}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-2.5 rounded-lg',
                    'text-sm text-left',
                    'transition-colors duration-150',
                    hoveredCategory?.id === category.id
                      ? 'bg-surface text-green-900 shadow-sm'
                      : 'text-text-primary hover:bg-surface/80'
                  )}
                >
                  <div
                    className={cn(
                      'w-7 h-7 rounded-lg flex items-center justify-center',
                      hoveredCategory?.id === category.id
                        ? 'bg-green-100 text-green-800'
                        : 'bg-slate-100 text-slate-500'
                    )}
                  >
                    <Icon name={category.icon} size="sm" />
                  </div>
                  <span className="font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Sub-items */}
          <div className="flex-1 p-3">
            {hoveredCategory && (
              <>
                <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-2">
                  {hoveredCategory.label} Courses
                </h4>
                <div className="space-y-0.5">
                  {hoveredCategory.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleGoalSelect(item)}
                      className={cn(
                        'flex items-center justify-between w-full',
                        'px-3 py-2.5 rounded-lg',
                        'text-sm text-text-primary',
                        'hover:bg-green-50 hover:text-green-900',
                        'transition-colors duration-150',
                        'group'
                      )}
                    >
                      <span className="font-medium">{item.label}</span>
                      <Icon
                        name="chevronRight"
                        size="sm"
                        className="text-text-muted group-hover:text-green-400 transition-colors"
                      />
                    </button>
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
              className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city..."
              autoFocus
              className={cn(
                'w-full pl-9 pr-4 py-2.5',
                'bg-surface-alt rounded-lg',
                'border border-border focus:border-green-400',
                'text-sm text-text-primary placeholder:text-text-muted',
                'outline-none transition-colors'
              )}
            />
          </div>

          {/* Cities Grid */}
          <h4 className="text-xs font-semibold text-text-muted uppercase tracking-wider mb-3">
            Popular Cities
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {filteredCities.map((city) => (
              <button
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className={cn(
                  'flex items-center gap-3 p-3',
                  'rounded-lg border border-border',
                  'text-left',
                  'hover:border-green-300 hover:bg-green-50',
                  'transition-all duration-150',
                  'group'
                )}
              >
                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center group-hover:bg-green-100 transition-colors">
                  <Icon
                    name="mapPin"
                    size="sm"
                    className="text-slate-500 group-hover:text-green-800 transition-colors"
                  />
                </div>
                <div>
                  <div className="font-medium text-sm text-text-primary group-hover:text-green-900">
                    {city.label}
                  </div>
                  <div className="text-xs text-text-muted">{city.state}</div>
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

'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

// Stats data
const stats = [
  { value: '25K+', label: 'Colleges' },
  { value: '11K+', label: 'Courses' },
  { value: '500+', label: 'Exams' },
  { value: '10L+', label: 'Students' },
];

// Popular searches
const popularSearches = ['IIT Delhi', 'MBA', 'B.Tech', 'NEET', 'JEE Main'];

function HeroSection({ className }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const animatedTexts = ['Colleges', 'Courses', 'Exams', 'Universities'];

  // Text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Fade in on mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  };

  return (
    <section className={cn('relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-white', className)}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-20 -left-20 w-60 h-60 bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8 lg:pt-28 lg:pb-12">
        <div
          className={cn(
            'text-center max-w-4xl mx-auto',
            'transition-all duration-700 ease-out',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          )}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-4">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-sm font-medium text-blue-700">Trusted by 10 Lakh+ Students</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find Your Perfect{' '}
            <span className="relative inline-block">
              <span
                key={currentTextIndex}
                className="text-blue-600 animate-fade-in-up"
              >
                {animatedTexts[currentTextIndex]}
              </span>
              <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 200 8" fill="none">
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-draw-line"
                />
              </svg>
            </span>
            <br className="hidden sm:block" />
            <span className="text-gray-700"> in India</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base lg:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Discover top colleges, compare courses, and get expert guidance for your education journey
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mb-5">
            <div
              className={cn(
                'flex items-center gap-2',
                'bg-white rounded-full',
                'p-1.5 pl-4',
                'shadow-lg shadow-gray-200/60',
                'border border-gray-200',
                'hover:shadow-xl hover:border-blue-200',
                'focus-within:shadow-xl focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100',
                'transition-all duration-200'
              )}
            >
              <Icon name="search" size="md" className="text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search colleges, exams, courses..."
                className="flex-1 py-2 bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400 text-sm lg:text-base"
              />
              <Button type="submit" variant="primary" size="md" className="px-5 shadow-md">
                Search
              </Button>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            <span className="text-gray-500 text-sm">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                type="button"
                onClick={() => setSearchQuery(term)}
                className={cn(
                  'px-3 py-1.5 rounded-full',
                  'text-sm text-gray-600',
                  'bg-gray-50 border border-gray-200',
                  'hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50',
                  'transition-all duration-200'
                )}
              >
                {term}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Button
              variant="primary"
              size="md"
              className="shadow-lg shadow-blue-200/50"
              rightIcon={<Icon name="arrowRight" size="sm" className="group-hover:translate-x-0.5 transition-transform" />}
            >
              Get Free Counselling
            </Button>
            <Button
              variant="outline"
              size="md"
              leftIcon={<Icon name="play" size="sm" className="text-blue-500" />}
            >
              How It Works
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-3 lg:gap-6 max-w-2xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-3 rounded-xl bg-white/80 border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-200"
              >
                <div className="text-xl lg:text-2xl font-bold text-blue-600 mb-0.5">
                  {stat.value}
                </div>
                <div className="text-xs lg:text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { HeroSection };
export default HeroSection;

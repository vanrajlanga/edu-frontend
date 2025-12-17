'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
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

// Featured colleges
const featuredColleges = [
  {
    id: 1,
    name: 'Pandit Deendayal Energy University',
    shortName: 'PDEU',
    image: '/assets/images/ambani.png',
    location: 'Gandhinagar',
  },
  {
    id: 2,
    name: 'Maharaja Sayajirao University',
    shortName: 'MSU',
    image: '/assets/images/msu.png',
    location: 'Vadodara',
  },
  {
    id: 3,
    name: 'Nirma University',
    shortName: 'Nirma',
    image: '/assets/images/nirma.png',
    location: 'Ahmedabad',
  },
  {
    id: 4,
    name: 'Parul University',
    shortName: 'Parul',
    image: '/assets/images/parul.png',
    location: 'Vadodara',
  },
];

function HeroSection({ className }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const animatedTexts = ['Colleges', 'Courses', 'Exams', 'Universities'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % animatedTexts.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
    <section className={cn('relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white', className)}>
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* pt-32 = 128px to account for fixed Header (64px) + Navbar (48px) + some spacing */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[85vh] pt-36 pb-16 lg:pt-40 lg:pb-20">

          {/* Left Content */}
          <div
            className={cn(
              'text-center lg:text-left',
              'transition-all duration-700 ease-out',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium text-blue-700">Trusted by 10 Lakh+ Students</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
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
              <br />
              <span className="text-gray-600">in India</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
              Discover top colleges, compare courses, and get expert guidance for your education journey
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl mx-auto lg:mx-0 mb-6">
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
                  className="flex-1 py-2.5 bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400"
                />
                <Button type="submit" variant="primary" size="md" className="px-6 rounded-full">
                  Search
                </Button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-8">
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
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10">
              <Button
                variant="primary"
                size="lg"
                className="shadow-lg shadow-blue-200/50"
                rightIcon={<Icon name="arrowRight" size="sm" />}
              >
                Get Free Counselling
              </Button>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Icon name="play" size="sm" className="text-blue-500" />}
              >
                How It Works
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto lg:mx-0">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl lg:text-3xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image Grid (Bento Style) */}
          <div
            className={cn(
              'relative',
              'transition-all duration-700 ease-out delay-300',
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            )}
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-sky-50 rounded-3xl -rotate-3" />

              {/* Bento Grid */}
              <div className="relative grid grid-cols-2 gap-3 p-3 bg-white rounded-2xl shadow-2xl shadow-blue-900/10">
                {/* Large image - top left */}
                <div className="col-span-1 row-span-2">
                  <CollegeCard college={featuredColleges[0]} size="large" />
                </div>

                {/* Top right */}
                <div className="col-span-1">
                  <CollegeCard college={featuredColleges[1]} size="medium" />
                </div>

                {/* Bottom right */}
                <div className="col-span-1">
                  <CollegeCard college={featuredColleges[2]} size="medium" />
                </div>

                {/* Bottom full width */}
                <div className="col-span-2">
                  <div className="grid grid-cols-2 gap-3">
                    <CollegeCard college={featuredColleges[3]} size="small" />
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 flex flex-col justify-center items-center text-white">
                      <span className="text-3xl font-bold">500+</span>
                      <span className="text-sm text-blue-100">Top Colleges</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2 border-white/30 text-white hover:bg-white/10 text-xs"
                      >
                        View All
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Icon name="check" size="sm" className="text-green-600" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-900">Verified</div>
                  <div className="text-xs text-gray-500">Colleges</div>
                </div>
              </div>

              {/* Floating rating badge */}
              <div className="absolute -bottom-3 -left-3 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 flex items-center gap-2">
                <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                  <Icon name="star" size="sm" className="text-amber-500" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-gray-900">4.8/5</div>
                  <div className="text-xs text-gray-500">Avg Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// College Card Component
function CollegeCard({ college, size = 'medium' }) {
  const sizeClasses = {
    large: 'h-72',
    medium: 'h-32',
    small: 'h-28',
  };

  return (
    <div
      className={cn(
        'group relative rounded-xl overflow-hidden cursor-pointer',
        sizeClasses[size]
      )}
    >
      <Image
        src={college.image}
        alt={college.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="text-white font-semibold text-sm truncate">{college.shortName}</h3>
        <div className="flex items-center gap-1 text-white/80 text-xs">
          <Icon name="mapPin" size="xs" />
          <span>{college.location}</span>
        </div>
      </div>
    </div>
  );
}

export { HeroSection };
export default HeroSection;

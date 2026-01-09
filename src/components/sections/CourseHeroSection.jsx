'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';
import { Button } from '@/components/ui';

export default function CourseHeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Handle course search
      console.log('Searching for:', searchQuery);
      // Navigate to search results or filter courses
    }
  };

  const quickCourseLinks = [
    { label: 'BE/B.TECH COURSES', href: '/courses/btech' },
    { label: 'MBBS COURSES', href: '/courses/mbbs' },
    { label: 'B.SC COURSES', href: '/courses/bsc' },
    { label: 'B.COM COURSES', href: '/courses/bcom' },
    { label: 'BA COURSES', href: '/courses/ba' },
    { label: 'MBA/PGDM COURSES', href: '/courses/mba' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white">
      {/* Background decoration - matching homepage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-sky-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* pt-44 = 176px to account for fixed Header (64px) + Navbar (44px) + NewsTicker (36px) + spacing */}
        <div className="text-center min-h-[60vh] pt-44 pb-16 lg:pt-44 lg:pb-20">

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-gray-900">SEARCH FROM OVER 10000 </span>
            <span className="text-blue-900">COURSES</span>
            <br />
            <span className="text-gray-600">IN INDIA</span>
          </h1>

          {/* Search Bar - matching homepage style */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto mb-8">
            <div
              className={cn(
                'flex items-center gap-2',
                'bg-white rounded-full',
                'p-1.5 pl-6',
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
                placeholder="Search Course for Ex. MCA, BA Finance or B.Tech Courses"
                className="flex-1 py-3 bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400"
              />
              <Button type="submit" variant="primary" size="md" className="px-6 rounded-full">
                <Icon name="arrowRight" size="sm" />
              </Button>
            </div>
          </form>

          {/* Quick Course Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-4 text-sm font-medium">
            {quickCourseLinks.map((link, index) => (
              <div key={link.href} className="flex items-center gap-2 lg:gap-4">
                <a
                  href={link.href}
                  className={cn(
                    'px-3 py-1.5 rounded-full',
                    'text-gray-600',
                    'bg-white border border-gray-200',
                    'hover:border-blue-300 hover:text-blue-900 hover:bg-blue-50',
                    'transition-all duration-200',
                    'whitespace-nowrap'
                  )}
                >
                  {link.label}
                </a>
                {index < quickCourseLinks.length - 1 && (
                  <span className="text-gray-300 hidden sm:inline">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

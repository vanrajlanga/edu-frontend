'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';
import Image from 'next/image';

export default function ExamHeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for exam:', searchQuery);
    }
  };

  const popularExams = [
    { name: 'JEE MAIN', href: '/exams/jee-main' },
    { name: 'NEET', href: '/exams/neet' },
    { name: 'CAT', href: '/exams/cat' },
    { name: 'GATE', href: '/exams/gate' },
    { name: 'CLAT', href: '/exams/clat' },
    { name: 'JEE ADVANCED', href: '/exams/jee-advanced' },
    { name: 'COMEDK UGET', href: '/exams/comedk-uget' },
    { name: 'AP EAPCET', href: '/exams/ap-eapcet' },
    { name: 'WBJEE', href: '/exams/wbjee' },
    { name: 'KCET', href: '/exams/kcet' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-10 right-1/4 w-72 h-72 bg-green-200 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[70vh] pt-44 pb-16 lg:pt-44 lg:pb-20">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                <span className="text-gray-900">Entrance Exams</span>
                <br />
                <span className="text-green-600">In India</span>
              </h1>
              <p className="text-gray-600 text-lg">
                Explore comprehensive information about entrance exams, dates, syllabus, and preparation tips
              </p>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch}>
              <div className={cn(
                'flex items-center gap-2',
                'bg-white rounded-2xl',
                'p-2 pl-6',
                'shadow-lg shadow-gray-200/60',
                'border border-gray-200',
                'hover:shadow-xl hover:border-green-200',
                'focus-within:shadow-xl focus-within:border-green-300 focus-within:ring-2 focus-within:ring-green-100',
                'transition-all duration-200'
              )}>
                <Icon name="search" size="md" className="text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Entrance Exams"
                  className="flex-1 py-3 bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400 text-lg"
                />
                <button
                  type="submit"
                  className={cn(
                    'px-6 py-3 rounded-xl',
                    'bg-green-600 hover:bg-green-700',
                    'text-white font-semibold',
                    'transition-all duration-200',
                    'flex items-center gap-2'
                  )}
                >
                  <span>Search</span>
                  <Icon name="arrowRight" size="sm" />
                </button>
              </div>
            </form>

            {/* Popular Exams */}
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wide">
                Popular Exams:
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {popularExams.map((exam) => (
                  <a
                    key={exam.href}
                    href={exam.href}
                    className={cn(
                      'px-4 py-2 rounded-full',
                      'text-sm font-medium text-blue-600',
                      'bg-blue-50 border border-blue-200',
                      'hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700',
                      'transition-all duration-200',
                      'whitespace-nowrap'
                    )}
                  >
                    {exam.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="hidden lg:flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <Image
                src="/assets/images/exam.svg"
                alt="Student preparing for exams"
                width={600}
                height={450}
                priority
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { cn } from '@/lib/cn';

export default function TrendingCourseSection() {
  const trendingCourses = [
    { name: 'BE/B.TECH courses', href: '/courses/btech' },
    { name: 'MBBS courses', href: '/courses/mbbs' },
    { name: 'B.SC courses', href: '/courses/bsc' },
    { name: 'B.COM courses', href: '/courses/bcom' },
    { name: 'BA courses', href: '/courses/ba' },
    { name: 'MBA/PGDM courses', href: '/courses/mba' },
    { name: 'BCA courses', href: '/courses/bca' },
    { name: 'M.Tech courses', href: '/courses/mtech' },
    { name: 'BBA courses', href: '/courses/bba' },
    { name: 'M.Sc courses', href: '/courses/msc' },
    { name: 'B.Ed courses', href: '/courses/bed' },
    { name: 'LLB courses', href: '/courses/llb' },
  ];

  return (
    <section className="py-16 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-400 mb-6">
            #TRENDING COURSE SEARCH
          </h2>
        </div>

        {/* Trending Course Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-5xl mx-auto">
          {trendingCourses.map((course) => (
            <a
              key={course.href}
              href={course.href}
              className={cn(
                'px-5 py-2.5 rounded-full',
                'bg-white border border-gray-300',
                'text-sm font-medium text-gray-700',
                'hover:border-green-500 hover:text-green-700 hover:bg-green-50',
                'transition-all duration-200',
                'shadow-sm hover:shadow-md'
              )}
            >
              {course.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

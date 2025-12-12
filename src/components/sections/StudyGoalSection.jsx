'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { StudyGoalCard, StudyGoalSeeAllCard } from '../cards/StudyGoalCard';

// Study goal categories data
const studyGoals = [
  {
    id: 'engineering',
    icon: 'settings',
    title: 'Engineering',
    collegeCount: 6347,
    courses: [
      { label: 'BE/B.Tech', href: '/courses/btech' },
      { label: 'Diploma in Engineering', href: '/courses/diploma-engineering' },
      { label: 'ME/M.Tech', href: '/courses/mtech' },
    ],
  },
  {
    id: 'management',
    icon: 'chart',
    title: 'Management',
    collegeCount: 7977,
    courses: [
      { label: 'MBA/PGDM', href: '/courses/mba' },
      { label: 'BBA/BMS', href: '/courses/bba' },
      { label: 'Executive MBA', href: '/courses/executive-mba' },
    ],
  },
  {
    id: 'commerce',
    icon: 'briefcase',
    title: 'Commerce',
    collegeCount: 5063,
    courses: [
      { label: 'B.Com', href: '/courses/bcom' },
      { label: 'M.Com', href: '/courses/mcom' },
    ],
  },
  {
    id: 'arts',
    icon: 'book',
    title: 'Arts',
    collegeCount: 5706,
    courses: [
      { label: 'BA', href: '/courses/ba' },
      { label: 'MA', href: '/courses/ma' },
      { label: 'BFA', href: '/courses/bfa' },
      { label: 'BSW', href: '/courses/bsw' },
    ],
  },
  {
    id: 'medical',
    icon: 'heart',
    title: 'Medical',
    collegeCount: 2490,
    courses: [
      { label: 'MBBS', href: '/courses/mbbs' },
      { label: 'PG Medical', href: '/courses/pg-medical' },
    ],
  },
  {
    id: 'design',
    icon: 'sparkles',
    title: 'Design',
    collegeCount: 1463,
    courses: [
      { label: 'B.Des', href: '/courses/bdes' },
      { label: 'M.Des', href: '/courses/mdes' },
    ],
  },
  {
    id: 'science',
    icon: 'flask',
    title: 'Science',
    collegeCount: 4521,
    courses: [
      { label: 'B.Sc', href: '/courses/bsc' },
      { label: 'M.Sc', href: '/courses/msc' },
    ],
  },
  {
    id: 'law',
    icon: 'shield',
    title: 'Law',
    collegeCount: 1892,
    courses: [
      { label: 'LLB', href: '/courses/llb' },
      { label: 'BA LLB', href: '/courses/ballb' },
      { label: 'LLM', href: '/courses/llm' },
    ],
  },
  {
    id: 'computer',
    icon: 'code',
    title: 'Computer Application',
    collegeCount: 3245,
    courses: [
      { label: 'BCA', href: '/courses/bca' },
      { label: 'MCA', href: '/courses/mca' },
    ],
  },
];

function StudyGoalSection({ className }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={cn('py-12 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Select Your Study Goal
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10',
                '-ml-4 lg:-ml-6',
                'w-12 h-12 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-blue-500 hover:border-blue-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronLeft" size="lg" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {studyGoals.map((goal) => (
              <StudyGoalCard
                key={goal.id}
                icon={goal.icon}
                title={goal.title}
                collegeCount={goal.collegeCount}
                courses={goal.courses}
                href={`/courses/${goal.id}`}
              />
            ))}

            {/* See All Card */}
            <StudyGoalSeeAllCard href="/courses" />
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10',
                '-mr-4 lg:-mr-6',
                'w-12 h-12 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-blue-500 hover:border-blue-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronRight" size="lg" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export { StudyGoalSection };
export default StudyGoalSection;

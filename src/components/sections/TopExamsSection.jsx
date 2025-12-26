'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { ExamCard } from '../cards/ExamCard';

// Top exams data
const topExams = [
  {
    id: 'cuet',
    name: 'CUET',
    icon: 'cuet',
    mode: 'Offline',
    participatingColleges: '560',
    examDate: 'May 13, 2025',
    examLevel: 'National',
    applicationHref: '/exams/cuet/application',
    infoHref: '/exams/cuet',
  },
  {
    id: 'neet',
    name: 'NEET',
    icon: 'neet',
    mode: 'Offline',
    participatingColleges: '1,370',
    examDate: 'May 04, 2025',
    examLevel: 'National',
    applicationHref: '/exams/neet/application',
    infoHref: '/exams/neet',
  },
  {
    id: 'jee-main',
    name: 'JEE Main',
    icon: 'jee',
    mode: 'Online',
    participatingColleges: '2,019',
    examDate: 'January 22, 2026',
    examLevel: 'National',
    applicationHref: '/exams/jee-main/application',
    infoHref: '/exams/jee-main',
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    icon: 'jee',
    mode: 'Online',
    participatingColleges: '23',
    examDate: 'May 25, 2025',
    examLevel: 'National',
    applicationHref: '/exams/jee-advanced/application',
    infoHref: '/exams/jee-advanced',
  },
  {
    id: 'gate',
    name: 'GATE',
    icon: 'gate',
    mode: 'Online',
    participatingColleges: '1,250',
    examDate: 'February 01, 2025',
    examLevel: 'National',
    applicationHref: '/exams/gate/application',
    infoHref: '/exams/gate',
  },
  {
    id: 'cat',
    name: 'CAT',
    icon: 'cat',
    mode: 'Online',
    participatingColleges: '1,400',
    examDate: 'November 24, 2025',
    examLevel: 'National',
    applicationHref: '/exams/cat/application',
    infoHref: '/exams/cat',
  },
  {
    id: 'upsc',
    name: 'UPSC CSE',
    icon: 'upsc',
    mode: 'Offline',
    participatingColleges: '-',
    examDate: 'May 25, 2025',
    examLevel: 'National',
    applicationHref: '/exams/upsc/application',
    infoHref: '/exams/upsc',
  },
];

function TopExamsSection({ className }) {
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
      const scrollAmount = 320;
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
          Top Exams
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10',
                '-ml-4 lg:-ml-5',
                'w-10 h-10 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-green-800 hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronLeft" size="md" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {topExams.map((exam) => (
              <ExamCard
                key={exam.id}
                name={exam.name}
                icon={exam.icon}
                mode={exam.mode}
                participatingColleges={exam.participatingColleges}
                examDate={exam.examDate}
                examLevel={exam.examLevel}
                applicationHref={exam.applicationHref}
                infoHref={exam.infoHref}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10',
                '-mr-4 lg:-mr-5',
                'w-10 h-10 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-green-800 hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="arrowRight" size="md" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export { TopExamsSection };
export default TopExamsSection;

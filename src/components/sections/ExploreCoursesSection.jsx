'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { CourseCard } from '../cards/CourseCard';

// Course level filter tabs
const courseLevels = [
  { value: 'bachelors', label: 'Bachelors' },
  { value: 'masters', label: 'Masters' },
  { value: 'doctorate', label: 'Doctorate' },
  { value: 'diploma', label: 'Diploma' },
  { value: 'certification', label: 'Certification' },
];

// Courses data by level
const coursesData = {
  bachelors: [
    { id: 1, name: 'B.Com General', type: 'Full Time', duration: '3 Years', avgFees: '77.65 K', collegeCount: '6,918', href: '/courses/bcom' },
    { id: 2, name: 'B.Ed General', type: 'Full Time', duration: '2 Years', avgFees: '86.66 K', collegeCount: '5,616', href: '/courses/bed' },
    { id: 3, name: 'BCA General', type: 'Full Time', duration: '3 Years', avgFees: '1.58 L', collegeCount: '5,529', href: '/courses/bca' },
    { id: 4, name: 'BA General', type: 'Full Time', duration: '3 Years', avgFees: '53.42 K', collegeCount: '4,125', href: '/courses/ba' },
    { id: 5, name: 'B.Sc General', type: 'Full Time', duration: '3 Years', avgFees: '68.90 K', collegeCount: '3,892', href: '/courses/bsc' },
    { id: 6, name: 'BBA General', type: 'Full Time', duration: '3 Years', avgFees: '1.82 L', collegeCount: '3,456', href: '/courses/bba' },
    { id: 7, name: 'B.Tech CSE', type: 'Full Time', duration: '4 Years', avgFees: '2.45 L', collegeCount: '4,521', href: '/courses/btech-cse' },
    { id: 8, name: 'LLB General', type: 'Full Time', duration: '3 Years', avgFees: '1.25 L', collegeCount: '1,892', href: '/courses/llb' },
  ],
  masters: [
    { id: 1, name: 'MBA General', type: 'Full Time', duration: '2 Years', avgFees: '4.85 L', collegeCount: '5,234', href: '/courses/mba' },
    { id: 2, name: 'M.Tech General', type: 'Full Time', duration: '2 Years', avgFees: '1.92 L', collegeCount: '3,128', href: '/courses/mtech' },
    { id: 3, name: 'M.Com General', type: 'Full Time', duration: '2 Years', avgFees: '45.50 K', collegeCount: '2,856', href: '/courses/mcom' },
    { id: 4, name: 'MA General', type: 'Full Time', duration: '2 Years', avgFees: '38.75 K', collegeCount: '2,645', href: '/courses/ma' },
    { id: 5, name: 'MCA General', type: 'Full Time', duration: '2 Years', avgFees: '1.45 L', collegeCount: '2,341', href: '/courses/mca' },
    { id: 6, name: 'M.Sc General', type: 'Full Time', duration: '2 Years', avgFees: '52.30 K', collegeCount: '2,124', href: '/courses/msc' },
  ],
  doctorate: [
    { id: 1, name: 'Ph.D Management', type: 'Full Time', duration: '3-5 Years', avgFees: '2.85 L', collegeCount: '1,245', href: '/courses/phd-management' },
    { id: 2, name: 'Ph.D Engineering', type: 'Full Time', duration: '3-5 Years', avgFees: '1.95 L', collegeCount: '1,128', href: '/courses/phd-engineering' },
    { id: 3, name: 'Ph.D Science', type: 'Full Time', duration: '3-5 Years', avgFees: '1.45 L', collegeCount: '985', href: '/courses/phd-science' },
    { id: 4, name: 'Ph.D Arts', type: 'Full Time', duration: '3-5 Years', avgFees: '1.25 L', collegeCount: '756', href: '/courses/phd-arts' },
  ],
  diploma: [
    { id: 1, name: 'Diploma in Engineering', type: 'Full Time', duration: '3 Years', avgFees: '85.50 K', collegeCount: '3,456', href: '/courses/diploma-engineering' },
    { id: 2, name: 'PGDM General', type: 'Full Time', duration: '2 Years', avgFees: '5.25 L', collegeCount: '1,892', href: '/courses/pgdm' },
    { id: 3, name: 'Diploma in Nursing', type: 'Full Time', duration: '3 Years', avgFees: '1.15 L', collegeCount: '1,234', href: '/courses/diploma-nursing' },
    { id: 4, name: 'Diploma in Pharmacy', type: 'Full Time', duration: '2 Years', avgFees: '95.00 K', collegeCount: '1,156', href: '/courses/diploma-pharmacy' },
  ],
  certification: [
    { id: 1, name: 'Data Science', type: 'Online', duration: '6 Months', avgFees: '45.00 K', collegeCount: '856', href: '/courses/cert-data-science' },
    { id: 2, name: 'Digital Marketing', type: 'Online', duration: '4 Months', avgFees: '35.00 K', collegeCount: '645', href: '/courses/cert-digital-marketing' },
    { id: 3, name: 'Cloud Computing', type: 'Online', duration: '6 Months', avgFees: '55.00 K', collegeCount: '534', href: '/courses/cert-cloud' },
    { id: 4, name: 'AI & ML', type: 'Online', duration: '8 Months', avgFees: '65.00 K', collegeCount: '423', href: '/courses/cert-ai-ml' },
  ],
};

function ExploreCoursesSection({ className }) {
  const [selectedLevel, setSelectedLevel] = useState('bachelors');
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const courses = coursesData[selectedLevel] || coursesData.bachelors;

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
  }, [selectedLevel]);

  // Reset scroll when level changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
      checkScrollPosition();
    }
  }, [selectedLevel]);

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
    <section className={cn('py-12 bg-gray-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
          Explore Courses
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {courseLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => setSelectedLevel(level.value)}
              className={cn(
                'px-5 py-2.5 rounded-full',
                'text-sm font-medium',
                'border transition-all duration-200',
                selectedLevel === level.value
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-900'
              )}
            >
              {level.label}
            </button>
          ))}
        </div>

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
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                name={course.name}
                type={course.type}
                duration={course.duration}
                avgFees={course.avgFees}
                collegeCount={course.collegeCount}
                href={course.href}
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

export { ExploreCoursesSection };
export default ExploreCoursesSection;

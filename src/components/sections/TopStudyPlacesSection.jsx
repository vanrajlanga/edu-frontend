'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { CityCard } from '../cards/CityCard';

// Top study places data
const studyPlaces = [
  { id: 'delhi', city: 'delhi', name: 'Delhi NCR', collegeCount: 2840, href: '/colleges/delhi' },
  { id: 'bangalore', city: 'bangalore', name: 'Bangalore', collegeCount: 1920, href: '/colleges/bangalore' },
  { id: 'hyderabad', city: 'hyderabad', name: 'Hyderabad', collegeCount: 1650, href: '/colleges/hyderabad' },
  { id: 'pune', city: 'pune', name: 'Pune', collegeCount: 1480, href: '/colleges/pune' },
  { id: 'mumbai', city: 'mumbai', name: 'Mumbai', collegeCount: 1320, href: '/colleges/mumbai' },
  { id: 'chennai', city: 'chennai', name: 'Chennai', collegeCount: 1180, href: '/colleges/chennai' },
  { id: 'kolkata', city: 'kolkata', name: 'Kolkata', collegeCount: 1050, href: '/colleges/kolkata' },
  { id: 'jaipur', city: 'jaipur', name: 'Jaipur', collegeCount: 890, href: '/colleges/jaipur' },
  { id: 'ahmedabad', city: 'ahmedabad', name: 'Ahmedabad', collegeCount: 760, href: '/colleges/ahmedabad' },
  { id: 'lucknow', city: 'lucknow', name: 'Lucknow', collegeCount: 680, href: '/colleges/lucknow' },
];

function TopStudyPlacesSection({ className }) {
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
      const scrollAmount = 340;
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
          Top Study Places
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
                'text-gray-500 hover:text-blue-500 hover:border-blue-300',
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
            {studyPlaces.map((place) => (
              <CityCard
                key={place.id}
                city={place.city}
                name={place.name}
                collegeCount={place.collegeCount}
                href={place.href}
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
                'text-gray-500 hover:text-blue-500 hover:border-blue-300',
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

export { TopStudyPlacesSection };
export default TopStudyPlacesSection;

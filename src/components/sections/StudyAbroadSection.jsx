'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { StudyAbroadCard } from '../cards/StudyAbroadCard';

// Study abroad destinations data
const studyDestinations = [
  {
    id: 'usa',
    country: 'USA',
    countryCode: 'usa',
    collegeCount: 1019,
    avgCost: '33.99 K',
    currency: 'USD',
    href: '/study-abroad/usa',
    guides: [
      { label: 'Why Study in the USA?', href: '/study-abroad/usa/why-study' },
      { label: 'SOP for USA', href: '/study-abroad/usa/sop' },
      { label: 'Exams for Studying in USA', href: '/study-abroad/usa/exams' },
      { label: 'Post Study Opportunities in USA', href: '/study-abroad/usa/post-study' },
    ],
  },
  {
    id: 'uk',
    country: 'UK',
    countryCode: 'uk',
    collegeCount: 175,
    avgCost: '22.40 K',
    currency: 'USD',
    href: '/study-abroad/uk',
    guides: [
      { label: 'Why Study in UK?', href: '/study-abroad/uk/why-study' },
      { label: 'SOP for UK', href: '/study-abroad/uk/sop' },
      { label: 'UK Student VISA', href: '/study-abroad/uk/visa' },
      { label: 'Cost to Study in UK', href: '/study-abroad/uk/cost' },
    ],
  },
  {
    id: 'canada',
    country: 'Canada',
    countryCode: 'canada',
    collegeCount: 223,
    avgCost: '25.45 K',
    currency: 'USD',
    href: '/study-abroad/canada',
    guides: [
      { label: 'Why Study in Canada', href: '/study-abroad/canada/why-study' },
      { label: 'Top Universities to Study', href: '/study-abroad/canada/top-universities' },
      { label: 'SOP for Canada', href: '/study-abroad/canada/sop' },
      { label: 'Work Study in Canada', href: '/study-abroad/canada/work-study' },
    ],
  },
  {
    id: 'australia',
    country: 'Australia',
    countryCode: 'australia',
    collegeCount: 156,
    avgCost: '28.50 K',
    currency: 'USD',
    href: '/study-abroad/australia',
    guides: [
      { label: 'Why Study in Australia?', href: '/study-abroad/australia/why-study' },
      { label: 'SOP for Australia', href: '/study-abroad/australia/sop' },
      { label: 'Australia Student VISA', href: '/study-abroad/australia/visa' },
      { label: 'Top Universities in Australia', href: '/study-abroad/australia/universities' },
    ],
  },
  {
    id: 'germany',
    country: 'Germany',
    countryCode: 'germany',
    collegeCount: 142,
    avgCost: '15.20 K',
    currency: 'EUR',
    href: '/study-abroad/germany',
    guides: [
      { label: 'Why Study in Germany?', href: '/study-abroad/germany/why-study' },
      { label: 'Free Education in Germany', href: '/study-abroad/germany/free-education' },
      { label: 'German Language Requirements', href: '/study-abroad/germany/language' },
      { label: 'Work Opportunities in Germany', href: '/study-abroad/germany/work' },
    ],
  },
  {
    id: 'ireland',
    country: 'Ireland',
    countryCode: 'ireland',
    collegeCount: 68,
    avgCost: '18.75 K',
    currency: 'EUR',
    href: '/study-abroad/ireland',
    guides: [
      { label: 'Why Study in Ireland?', href: '/study-abroad/ireland/why-study' },
      { label: 'SOP for Ireland', href: '/study-abroad/ireland/sop' },
      { label: 'Ireland Student VISA', href: '/study-abroad/ireland/visa' },
      { label: 'Scholarships in Ireland', href: '/study-abroad/ireland/scholarships' },
    ],
  },
  {
    id: 'singapore',
    country: 'Singapore',
    countryCode: 'singapore',
    collegeCount: 45,
    avgCost: '32.00 K',
    currency: 'SGD',
    href: '/study-abroad/singapore',
    guides: [
      { label: 'Why Study in Singapore?', href: '/study-abroad/singapore/why-study' },
      { label: 'Top Universities in Singapore', href: '/study-abroad/singapore/universities' },
      { label: 'Cost of Living in Singapore', href: '/study-abroad/singapore/cost' },
      { label: 'Work After Studies', href: '/study-abroad/singapore/work' },
    ],
  },
  {
    id: 'newzealand',
    country: 'New Zealand',
    countryCode: 'newzealand',
    collegeCount: 52,
    avgCost: '24.80 K',
    currency: 'NZD',
    href: '/study-abroad/new-zealand',
    guides: [
      { label: 'Why Study in New Zealand?', href: '/study-abroad/new-zealand/why-study' },
      { label: 'SOP for New Zealand', href: '/study-abroad/new-zealand/sop' },
      { label: 'Student VISA Process', href: '/study-abroad/new-zealand/visa' },
      { label: 'Post Study Work Rights', href: '/study-abroad/new-zealand/post-study' },
    ],
  },
];

function StudyAbroadSection({ className }) {
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
      const scrollAmount = 400;
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
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-800 to-green-600 flex items-center justify-center shadow-lg shadow-green-200">
              <Icon name="globe" size="lg" className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Study Abroad
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Explore top destinations for international education
              </p>
            </div>
          </div>

          {/* View All Link */}
          <a
            href="/study-abroad"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-50 hover:bg-green-100 text-green-900 font-medium text-sm rounded-full transition-colors group"
          >
            View all destinations
            <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
          </a>
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
                'w-12 h-12 rounded-full',
                'bg-white border border-gray-200 shadow-xl',
                'flex items-center justify-center',
                'text-gray-500 hover:text-green-800 hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronLeft" size="lg" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          >
            {studyDestinations.map((destination) => (
              <StudyAbroadCard
                key={destination.id}
                country={destination.country}
                countryCode={destination.countryCode}
                collegeCount={destination.collegeCount}
                avgCost={destination.avgCost}
                currency={destination.currency}
                guides={destination.guides}
                href={destination.href}
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
                'w-12 h-12 rounded-full',
                'bg-white border border-gray-200 shadow-xl',
                'flex items-center justify-center',
                'text-gray-500 hover:text-green-800 hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="arrowRight" size="lg" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export { StudyAbroadSection };
export default StudyAbroadSection;

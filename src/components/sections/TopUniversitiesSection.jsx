'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { TopUniversityCard } from '../cards/TopUniversityCard';

// Sample universities data
const universitiesData = [
  {
    id: 1,
    name: 'Indian Institute of Management',
    shortName: 'IIMA',
    location: 'Ahmedabad, Gujarat',
    accreditations: ['UGC'],
    image: null,
    logo: null,
    rating: 4.6,
    reviewCount: 59,
    courseType: 'MBA/PGDM',
    fees: '27.50 Lacs',
    feesLabel: 'Total Fees',
    ranking: 'Ranked 428 out of 2000 CWUR',
    cdRating: '10/10',
    href: '/colleges/iima',
  },
  {
    id: 2,
    name: 'Indian Institute of Technology',
    shortName: 'IITB',
    location: 'Mumbai, Maharashtra',
    accreditations: ['AICTE', 'UGC'],
    image: null,
    logo: null,
    rating: 4.4,
    reviewCount: 402,
    courseType: 'MBA/PGDM',
    fees: '7.68 Lacs',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 129 out of 1401 QS',
    cdRating: '10/10',
    href: '/colleges/iitb',
  },
  {
    id: 3,
    name: 'Chandigarh University',
    shortName: 'CU',
    location: 'Mohali, Punjab',
    accreditations: ['NCTE', 'AICTE'],
    image: null,
    logo: null,
    rating: 4.4,
    reviewCount: 3781,
    courseType: 'BE/B.Tech',
    fees: '2.35 Lacs',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 32 out of 200 NIRF, Ranked 27 out of 103 India Today',
    cdRating: '10/10',
    href: '/colleges/chandigarh-university',
  },
  {
    id: 4,
    name: 'Shri Ram College of Commerce',
    shortName: 'SRCC',
    location: 'New Delhi, Delhi NCR',
    accreditations: ['AICTE'],
    image: null,
    logo: null,
    rating: 4.3,
    reviewCount: 333,
    courseType: 'BA',
    fees: '32.42 K',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 18 out of 300 NIRF',
    cdRating: '10/10',
    href: '/colleges/srcc',
  },
  {
    id: 5,
    name: 'Institute of Hotel Management, Catering and Nutrition',
    shortName: 'IHM',
    location: 'New Delhi, Delhi NCR',
    accreditations: ['NCHMCT'],
    image: null,
    logo: null,
    rating: 4.1,
    reviewCount: 113,
    courseType: 'BHM',
    fees: '1.77 Lacs',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 1 out of 130 Collegedunia, Ranked 1 out of 50 NIRF',
    cdRating: '10/10',
    href: '/colleges/ihm-delhi',
  },
  {
    id: 6,
    name: 'NALSAR University of Law',
    shortName: 'NALSAR',
    location: 'Hyderabad, Telangana',
    accreditations: ['AICTE', 'BCI'],
    image: null,
    logo: null,
    rating: 4.5,
    reviewCount: 40,
    courseType: 'MBA/PGDM',
    fees: '4.47 Lacs',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 2 out of 98 Collegedunia, Ranked 2 out of 30 NIRF',
    cdRating: '10/10',
    href: '/colleges/nalsar',
  },
  {
    id: 7,
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IITD',
    location: 'New Delhi',
    accreditations: ['AICTE', 'UGC'],
    image: null,
    logo: null,
    rating: 4.7,
    reviewCount: 892,
    courseType: 'BE/B.Tech',
    fees: '2.28 Lacs',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 2 out of 200 NIRF',
    cdRating: '10/10',
    href: '/colleges/iitd',
  },
  {
    id: 8,
    name: 'National Institute of Technology',
    shortName: 'NIT Trichy',
    location: 'Tiruchirappalli, Tamil Nadu',
    accreditations: ['AICTE', 'UGC'],
    image: null,
    logo: null,
    rating: 4.5,
    reviewCount: 567,
    courseType: 'BE/B.Tech',
    fees: '1.83 Lacs',
    feesLabel: 'First Year Fees',
    ranking: 'Ranked 9 out of 200 NIRF',
    cdRating: '10/10',
    href: '/colleges/nit-trichy',
  },
];

function TopUniversitiesSection({ className }) {
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
      const scrollAmount = 340; // Card width + gap
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
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Top Universities/Colleges
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
                'text-gray-500 hover:text-blue-800 hover:border-blue-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronLeft" size="lg" />
            </button>
          )}

          {/* Scrollable Cards - 2 Row Grid */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            <div className="grid grid-rows-2 grid-flow-col gap-5 w-max">
              {universitiesData.map((university) => (
                <TopUniversityCard
                  key={university.id}
                  name={university.name}
                  shortName={university.shortName}
                  location={university.location}
                  accreditations={university.accreditations}
                  image={university.image}
                  logo={university.logo}
                  rating={university.rating}
                  reviewCount={university.reviewCount}
                  courseType={university.courseType}
                  fees={university.fees}
                  feesLabel={university.feesLabel}
                  ranking={university.ranking}
                  cdRating={university.cdRating}
                  href={university.href}
                />
              ))}
            </div>
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
                'text-gray-500 hover:text-blue-800 hover:border-blue-300',
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

export { TopUniversitiesSection };
export default TopUniversitiesSection;

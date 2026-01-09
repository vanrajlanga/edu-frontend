'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { formatINR } from '@/lib/formatters';
import { Icon } from '@/components/ui';

// College application data
const collegeApplications = [
  {
    id: 1,
    type: 'college',
    name: 'MIT World Peace University - [MIT-WPU]',
    location: 'Pune, Maharashtra',
    image: '/assets/images/colleges/mit-wpu.jpg',
    rating: 9.6,
    bestIn: 'Infrastructure',
    fees: 10000,
    feesLabel: '100% Placement Assistar',
    additionalInfo: '51.36 LPA Highest CTC',
    course: null,
  },
  {
    id: 2,
    type: 'college',
    name: 'Vikrant University',
    location: 'Gwalior, Madhya Pradesh',
    image: '/assets/images/colleges/vikrant.jpg',
    rating: 4.1,
    bestIn: 'Faculty',
    fees: 3000000,
    feesLabel: '1st Year Fees',
    course: 'B.Com',
  },
  {
    id: 3,
    type: 'promo',
    title: 'Write a Review and Earn Upto ₹300/-',
    cta: 'Start Writing',
    illustration: 'review',
    color: 'orange',
  },
  {
    id: 4,
    type: 'college',
    name: 'Parul University',
    location: 'Vadodara, Gujarat',
    image: '/assets/images/colleges/parul.jpg',
    rating: 4.1,
    bestIn: 'Infrastructure',
    fees: 144000,
    feesLabel: '1st Year Fees',
    course: 'B.Arch',
  },
  {
    id: 5,
    type: 'promo',
    title: 'Know Your Chances of Admission',
    cta: 'Predict Now',
    illustration: 'admission',
    color: 'orange',
  },
  {
    id: 6,
    type: 'college',
    name: 'Manipal Academy of Higher Education - [MAHE]',
    location: 'Manipal, Karnataka',
    image: '/assets/images/colleges/manipal.jpg',
    rating: 4.2,
    bestIn: 'Infrastructure',
    fees: 2994000,
    feesLabel: 'Total Fees',
    course: 'B.Des',
  },
  {
    id: 7,
    type: 'promo',
    title: 'Find Courses with Help of AI Based Course Finder',
    cta: 'Start Now',
    illustration: 'courseFinder',
    color: 'orange',
  },
];

function CollegeCard({ college }) {
  return (
    <div className="flex-shrink-0 w-[210px] bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
      {/* College Image */}
      <div className="relative h-[110px] bg-gradient-to-br from-blue-50 to-blue-100">
        {college.image ? (
          <img
            src={college.image}
            alt={college.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-md">
              <Icon name="building" size="lg" className="text-blue-600" />
            </div>
          </div>
        )}

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-gray-900 text-white px-2 py-0.5 rounded flex items-center gap-1 shadow-lg">
          <Icon name="star" size="xs" className="text-amber-400" />
          <span className="text-xs font-bold">{college.rating}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-3">
        {/* Best In Label */}
        <div className="inline-block mb-1.5">
          <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
            Best in {college.bestIn}
          </span>
        </div>

        {/* College Name */}
        <h3 className="text-xs font-bold text-gray-900 mb-1 line-clamp-2 min-h-[32px] group-hover:text-blue-600 transition-colors leading-tight">
          {college.name}
        </h3>

        {/* Location */}
        <p className="text-[10px] text-gray-600 mb-2">{college.location}</p>

        {/* Fees */}
        <div className="mb-1.5">
          <div className="text-sm font-bold text-blue-600">
            {college.fees === 10000 ? college.feesLabel : formatINR(college.fees)}
          </div>
          {college.fees !== 10000 && (
            <div className="text-[10px] text-gray-600">{college.feesLabel}</div>
          )}
          {college.additionalInfo && (
            <div className="text-[10px] text-gray-700 font-medium mt-0.5">
              {college.additionalInfo}
            </div>
          )}
        </div>

        {/* Course */}
        {college.course && (
          <div className="text-[10px] text-gray-700 mb-2">{college.course}</div>
        )}

        {/* Apply Now Button */}
        <button className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors py-1.5">
          <Icon name="arrowRight" size="xs" />
          Apply Now
        </button>
      </div>
    </div>
  );
}

function PromoCard({ promo }) {
  const illustrations = {
    review: (
      <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
        {/* Illustration: Person writing with coins */}
        <circle cx="100" cy="50" r="28" fill="#FED7AA" />
        <path d="M80 80 Q100 72 120 80" stroke="#F97316" strokeWidth="2.5" fill="none" />
        <circle cx="75" cy="35" r="6" fill="#FDBA74" />
        <circle cx="90" cy="30" r="5" fill="#FDBA74" />
        <circle cx="125" cy="35" r="6" fill="#FDBA74" />
        <rect x="90" y="95" width="20" height="18" rx="2" fill="#F97316" opacity="0.2" />
        <path d="M97 103 L100 106 L107 99" stroke="#F97316" strokeWidth="1.5" fill="none" />
      </svg>
    ),
    admission: (
      <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
        {/* Illustration: Person with laptop */}
        <ellipse cx="100" cy="45" rx="25" ry="28" fill="#DBEAFE" />
        <circle cx="100" cy="35" r="15" fill="#93C5FD" />
        <rect x="75" y="70" width="50" height="32" rx="3" fill="#3B82F6" opacity="0.2" />
        <rect x="80" y="75" width="40" height="20" rx="1.5" fill="#60A5FA" opacity="0.3" />
        <line x1="95" y1="85" x2="105" y2="85" stroke="#3B82F6" strokeWidth="1.5" />
      </svg>
    ),
    courseFinder: (
      <svg className="w-full h-full" viewBox="0 0 200 120" fill="none">
        {/* Illustration: AI/Robot character with magnifying glass */}
        <circle cx="105" cy="50" r="20" fill="#FEF3C7" />
        <circle cx="101" cy="46" r="4" fill="#92400E" />
        <circle cx="109" cy="46" r="4" fill="#92400E" />
        <path d="M97 55 Q105 58 113 55" stroke="#92400E" strokeWidth="1.5" fill="none" />
        <circle cx="135" cy="70" r="16" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
        <line x1="146" y1="81" x2="156" y2="91" stroke="#F59E0B" strokeWidth="2.5" />
        <rect x="80" y="30" width="6" height="12" rx="1.5" fill="#FBBF24" />
        <rect x="124" y="30" width="6" height="12" rx="1.5" fill="#FBBF24" />
      </svg>
    ),
  };

  return (
    <div className="flex-shrink-0 w-[210px] bg-gradient-to-br from-orange-50 to-white border-2 border-orange-200 rounded-lg overflow-hidden hover:shadow-lg hover:border-orange-400 transition-all duration-300 group">
      <div className="p-4 h-full flex flex-col">
        {/* Illustration */}
        <div className="h-24 mb-3 flex items-center justify-center">
          {illustrations[promo.illustration]}
        </div>

        {/* Title */}
        <h3 className="text-xs font-bold text-gray-900 mb-3 text-center leading-tight min-h-[36px] flex items-center justify-center">
          {promo.title}
        </h3>

        {/* CTA Button */}
        <button className="w-full mt-auto inline-flex items-center justify-center gap-1 text-xs font-semibold text-orange-600 hover:text-orange-700 transition-colors py-1.5 bg-white rounded-lg border-2 border-orange-200 hover:border-orange-400 hover:shadow-md">
          <Icon name="arrowRight" size="xs" />
          {promo.cta}
        </button>
      </div>
    </div>
  );
}

function ApplicationFormsSection({ className }) {
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
    <section className={cn('bg-white py-4 border-t border-b border-gray-200', className)}>
      <div className="max-w-[1400px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Colleges Application Forms 2025
          </h2>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={cn(
                'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all',
                canScrollLeft
                  ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              )}
              aria-label="Scroll left"
            >
              <Icon name="chevronLeft" size="sm" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={cn(
                'w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all',
                canScrollRight
                  ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                  : 'border-gray-300 text-gray-300 cursor-not-allowed'
              )}
              aria-label="Scroll right"
            >
              <Icon name="chevronRight" size="sm" />
            </button>
          </div>
        </div>

        {/* Scrollable Cards Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {collegeApplications.map((item) =>
            item.type === 'college' ? (
              <CollegeCard key={item.id} college={item} />
            ) : (
              <PromoCard key={item.id} promo={item} />
            )
          )}
        </div>
      </div>
    </section>
  );
}

export { ApplicationFormsSection };
export default ApplicationFormsSection;

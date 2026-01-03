'use client';

import { Breadcrumb } from '@/components/common';
import { PromoBanner } from '@/components/common/PromoBanner';
import { Container } from '@/components/layout';
import { cn } from '@/lib/cn';

// Default promo banners (used when no custom banners are provided)
const defaultBanners = [
  {
    id: 1,
    image: '/assets/images/default-write-review-1.svg',
    alt: 'Write a Review',
    href: '/write-review',
  },
  {
    id: 2,
    image: '/assets/images/default-college-predictor-2.svg',
    alt: 'College Predictor',
    href: '/college-predictor',
  },
  {
    id: 3,
    image: '/assets/images/default-course-finder-2.svg',
    alt: 'Course Finder',
    href: '/course-finder',
  },
];

function CollegeListingHeader({
  breadcrumbItems = [],
  pageTitle = 'List of Top Colleges in India Based on 2025 Ranking',
  showPromoBanners = true,
  banners = null,
  className,
}) {
  // Use custom banners if provided, otherwise use defaults
  const promoBanners = banners && banners.length > 0 ? banners : defaultBanners;
  return (
    <section className={cn('bg-white', className)}>
      <Container size="full" className="max-w-[1400px]">
        {/* Breadcrumb */}
        {breadcrumbItems.length > 0 && (
          <Breadcrumb items={breadcrumbItems} />
        )}

        {/* Page Title */}
        <div className="py-3">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
            {pageTitle}
          </h1>
        </div>

        {/* Promo Banners */}
        {showPromoBanners && (
          <div className="flex justify-center mb-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[1200px] w-full">
              {promoBanners.map((banner) => (
                <PromoBanner
                  key={banner.id}
                  image={banner.image}
                  alt={banner.alt}
                  href={banner.href}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

export { CollegeListingHeader };
export default CollegeListingHeader;

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Badge } from '../ui/Badge';
import { AllCoursesMenu } from '../common/AllCoursesMenu';
import { staticQuickCourseTabs, fetchQuickTabs } from '@/lib/coursesData';

// Static fallback navigation data
const staticCourseCategories = [
  { label: 'B.Tech', href: '/btech-colleges' },
  { label: 'MBA', href: '/mba-colleges' },
  { label: 'M.Tech', href: '/mtech-colleges' },
  { label: 'MBBS', href: '/mbbs-colleges' },
  { label: 'B.Com', href: '/bcom-colleges' },
  { label: 'B.Sc', href: '/bsc-colleges' },
  { label: 'BA', href: '/ba-colleges' },
  { label: 'BBA', href: '/bba-colleges' },
  { label: 'BCA', href: '/bca-colleges' },
];

const rightNavItems = [
  {
    label: 'Study Abroad',
    href: '/study-abroad',
    icon: 'globe',
  },
  {
    label: 'Course Finder',
    href: '/course-finder',
    badge: 'NEW',
  },
];

function Navbar({ variant = 'default', className }) {
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isAllCoursesOpen, setIsAllCoursesOpen] = useState(false);
  const [courseTabs, setCourseTabs] = useState(staticCourseCategories);
  const scrollContainerRef = useRef(null);

  // Fetch dynamic course tabs on mount
  useEffect(() => {
    async function loadCourseTabs() {
      try {
        const data = await fetchQuickTabs();
        if (data && data.length > 0) {
          setCourseTabs(data.map(tab => ({
            label: tab.name,
            href: tab.slug
          })));
        }
      } catch (error) {
        console.error('Error loading course tabs:', error);
      }
    }
    loadCourseTabs();
  }, []);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
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

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <>
    <nav
      className={cn(
        'relative',
        'bg-gradient-to-r from-blue-900 to-blue-700',
        'shadow-sm',
        className
      )}
    >
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-10 sm:h-11">
          {/* Left: Course Categories with horizontal scroll */}
          <div className="relative flex-1 flex items-center">
            {/* Left Scroll Arrow */}
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className={cn(
                  'absolute left-0 z-10 p-1',
                  'bg-gradient-to-r from-blue-900 via-blue-900 to-transparent',
                  'text-white/70 hover:text-white',
                  'pr-4'
                )}
              >
                <Icon name="chevronLeft" size="sm" />
              </button>
            )}

            {/* All Courses Button */}
            <button
              onClick={() => setIsAllCoursesOpen(true)}
              className={cn(
                'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md whitespace-nowrap',
                'text-xs sm:text-sm font-medium',
                'transition-all duration-200',
                'text-blue-900 bg-white/90 shadow-sm hover:bg-white',
                'flex-shrink-0 mr-1'
              )}
            >
              <Icon name="graduationCap" size="sm" className="hidden sm:block" />
              <span className="hidden sm:inline">All Courses</span>
              <span className="sm:hidden">All</span>
              <Icon name="chevronDown" size="xs" />
            </button>

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {courseTabs.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md whitespace-nowrap',
                    'text-xs sm:text-sm font-medium',
                    'transition-all duration-200',
                    'text-white/90 hover:text-white hover:bg-white/15'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Right Scroll Arrow */}
            {showRightArrow && (
              <button
                onClick={scrollRight}
                className={cn(
                  'absolute right-0 z-10 p-1',
                  'bg-gradient-to-l from-blue-700 via-blue-700 to-transparent',
                  'text-white/70 hover:text-white',
                  'pl-4'
                )}
              >
                <Icon name="chevronRight" size="sm" />
              </button>
            )}
          </div>

          {/* Right: Study Abroad & Course Finder */}
          <div className="hidden sm:flex items-center gap-0.5 ml-2 sm:ml-4 pl-2 sm:pl-4 border-l border-white/20">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md whitespace-nowrap',
                  'text-xs sm:text-sm font-medium',
                  'text-white/90 hover:text-white hover:bg-white/15',
                  'transition-all duration-200'
                )}
              >
                {item.icon && <Icon name={item.icon} size="sm" className="hidden md:block" />}
                <span className="hidden md:inline">{item.label}</span>
                <span className="md:hidden">{item.label.split(' ')[0]}</span>
                {item.badge && (
                  <span className="px-1 sm:px-1.5 py-0.5 text-[10px] sm:text-xs font-bold bg-amber-400 text-amber-900 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>

    </nav>

    {/* All Courses Menu */}
    <AllCoursesMenu
      isOpen={isAllCoursesOpen}
      onClose={() => setIsAllCoursesOpen(false)}
    />
    </>
  );
}

export { Navbar };
export default Navbar;

'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Badge } from '../ui/Badge';

// Navigation data
const courseCategories = [
  { label: 'All Courses', href: '/courses', icon: 'graduationCap' },
  { label: 'B.Tech', href: '/courses/btech' },
  { label: 'MBA', href: '/courses/mba' },
  { label: 'M.Tech', href: '/courses/mtech' },
  { label: 'MBBS', href: '/courses/mbbs' },
  { label: 'B.Com', href: '/courses/bcom' },
  { label: 'B.Sc', href: '/courses/bsc' },
  { label: 'B.Sc (Nursing)', href: '/courses/bsc-nursing' },
  { label: 'BA', href: '/courses/ba' },
  { label: 'BBA', href: '/courses/bba' },
  { label: 'BCA', href: '/courses/bca' },
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
  const scrollContainerRef = useRef(null);

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
    <nav
      className={cn(
        'relative',
        'bg-gradient-to-r from-blue-600 to-blue-500',
        'shadow-sm',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-11">
          {/* Left: Course Categories with horizontal scroll */}
          <div className="relative flex-1 flex items-center">
            {/* Left Scroll Arrow */}
            {showLeftArrow && (
              <button
                onClick={scrollLeft}
                className={cn(
                  'absolute left-0 z-10 p-1',
                  'bg-gradient-to-r from-blue-600 via-blue-600 to-transparent',
                  'text-white/70 hover:text-white',
                  'pr-4'
                )}
              >
                <Icon name="chevronLeft" size="sm" />
              </button>
            )}

            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide scroll-smooth"
            >
              {courseCategories.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap',
                    'text-sm font-medium',
                    'transition-all duration-200',
                    index === 0
                      ? 'text-blue-700 bg-white/90 shadow-sm'
                      : 'text-white/90 hover:text-white hover:bg-white/15'
                  )}
                >
                  {item.icon && <Icon name={item.icon} size="sm" />}
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
                  'bg-gradient-to-l from-blue-500 via-blue-500 to-transparent',
                  'text-white/70 hover:text-white',
                  'pl-4'
                )}
              >
                <Icon name="chevronRight" size="sm" />
              </button>
            )}
          </div>

          {/* Right: Study Abroad & Course Finder */}
          <div className="hidden md:flex items-center gap-0.5 ml-4 pl-4 border-l border-white/20">
            {rightNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 rounded-md whitespace-nowrap',
                  'text-sm font-medium',
                  'text-white/90 hover:text-white hover:bg-white/15',
                  'transition-all duration-200'
                )}
              >
                {item.icon && <Icon name={item.icon} size="sm" />}
                {item.label}
                {item.badge && (
                  <span className="px-1.5 py-0.5 text-xs font-bold bg-amber-400 text-amber-900 rounded">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar };
export default Navbar;

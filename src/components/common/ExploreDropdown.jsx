'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Explore menu items
const exploreItems = [
  {
    id: 'universities',
    label: 'Top Universities',
    description: 'Explore top-ranked universities',
    href: '/universities',
    icon: 'building',
  },
  {
    id: 'colleges',
    label: 'Top Colleges',
    description: 'Find best colleges near you',
    href: '/colleges',
    icon: 'graduationCap',
  },
  {
    id: 'courses',
    label: 'Top Courses',
    description: 'Discover trending courses',
    href: '/courses',
    icon: 'book',
  },
  {
    id: 'exams',
    label: 'Exams',
    description: 'Exam dates, syllabus & more',
    href: '/exams',
    icon: 'clipboard',
  },
  {
    id: 'study-abroad',
    label: 'Study Abroad',
    description: 'Universities worldwide',
    href: '/study-abroad',
    icon: 'globe',
  },
  {
    id: 'news',
    label: 'News & Articles',
    description: 'Latest education updates',
    href: '/news',
    icon: 'newspaper',
  },
  {
    id: 'rankings',
    label: 'College Rankings',
    description: 'NIRF, QS & more',
    href: '/rankings',
    icon: 'trophy',
  },
  {
    id: 'reviews',
    label: 'Reviews',
    description: 'Read student reviews',
    href: '/reviews',
    icon: 'star',
  },
];

// Promotional card data
const promoCard = {
  title: 'Write a Review',
  subtitle: 'Earn Upto',
  amount: '₹300',
  description: 'Share your college experience',
  href: '/write-review',
};

function ExploreDropdown({ isOpen, onClose, triggerRef, className }) {
  const dropdownRef = useRef(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef?.current &&
        !triggerRef.current.contains(e.target)
      ) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute top-full right-0 mt-2',
        'w-[580px]',
        'bg-surface rounded-xl shadow-xl',
        'border border-border',
        'overflow-hidden',
        'animate-in fade-in slide-in-from-top-2 duration-200',
        'z-50',
        className
      )}
    >
      <div className="flex">
        {/* Menu Items - 2 columns */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-1">
            {exploreItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-start gap-3 p-3 rounded-xl',
                  'hover:bg-surface-alt transition-colors',
                  'group'
                )}
              >
                <div
                  className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                    'bg-blue-100 group-hover:bg-blue-200 transition-colors'
                  )}
                >
                  <Icon
                    name={item.icon}
                    size="sm"
                    className="text-blue-500 group-hover:text-blue-600 transition-colors"
                  />
                </div>
                <div className="min-w-0 pt-0.5">
                  <div className="font-medium text-sm text-text-primary group-hover:text-blue-600 transition-colors">
                    {item.label}
                  </div>
                  <div className="text-xs text-text-muted line-clamp-1">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Promotional Card */}
        <div className="w-44 p-3 bg-surface-alt border-l border-border">
          <Link
            href={promoCard.href}
            onClick={onClose}
            className={cn(
              'block rounded-xl p-4',
              'bg-gradient-to-br from-blue-500 to-blue-600',
              'text-white',
              'hover:shadow-coral transition-shadow',
              'group'
            )}
          >
            <div className="text-sm font-medium opacity-90">
              {promoCard.title}
            </div>
            <div className="text-xs opacity-75 mt-1">{promoCard.subtitle}</div>
            <div className="text-2xl font-bold mt-0.5">{promoCard.amount}</div>
            <div className="text-xs opacity-75 mt-2">{promoCard.description}</div>
            <div className="flex items-center gap-1 mt-3 text-sm font-medium">
              Write Now
              <Icon
                name="arrowRight"
                size="sm"
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>

          {/* Quick Links */}
          <div className="mt-3 space-y-1">
            <Link
              href="/compare"
              onClick={onClose}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-text-secondary hover:text-blue-500 hover:bg-surface transition-colors"
            >
              <Icon name="compare" size="sm" />
              Compare Colleges
            </Link>
            <Link
              href="/scholarships"
              onClick={onClose}
              className="flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-text-secondary hover:text-blue-500 hover:bg-surface transition-colors"
            >
              <Icon name="award" size="sm" />
              Scholarships
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="px-4 py-3 bg-blue-900 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white/80 text-sm">
          <Icon name="sparkles" size="sm" className="text-sky-400" />
          <span>Not sure where to start?</span>
        </div>
        <Link
          href="/counselling"
          onClick={onClose}
          className={cn(
            'px-4 py-1.5 rounded-lg text-sm font-medium',
            'bg-blue-500 text-white',
            'hover:bg-blue-600 transition-colors'
          )}
        >
          Get Free Counselling
        </Link>
      </div>
    </div>
  );
}

export { ExploreDropdown };
export default ExploreDropdown;

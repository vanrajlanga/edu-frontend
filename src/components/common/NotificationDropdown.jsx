'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Sample notification data
const notifications = [
  {
    id: 1,
    type: 'live',
    title: 'AILET 2026 Exam Live Updates:',
    description: 'What is the dress code for AILET',
    date: '12 Dec 2025',
    time: '12:00 AM IST',
    href: '/exams/ailet-2026',
  },
  {
    id: 2,
    type: 'live',
    title: 'TANCET 2026 Exam Live Updates:',
    description: 'TANCET 2026 Admit Card Likely i',
    date: '12 Dec 2025',
    time: '09:38 AM IST',
    href: '/exams/tancet-2026',
  },
  {
    id: 3,
    type: 'live',
    title: 'XAT 2026 Live Updates:',
    description: 'XAT 2026 registration closes soon',
    date: '11 Dec 2025',
    time: '06:00 PM IST',
    href: '/exams/xat-2026',
  },
  {
    id: 4,
    type: 'live',
    title: 'ICAI CA January 2026 Admit Card LIVE Updates:',
    description: 'ICAI CA Jan 2026 Admit C',
    date: '12 Dec 2025',
    time: '09:45 AM IST',
    href: '/exams/icai-ca-2026',
  },
  {
    id: 5,
    type: 'live',
    title: 'IIT JAM 2026 Admit Card Live Updates:',
    description: 'What is JAM? JAM stands for the Joint Adm',
    date: '12 Dec 2025',
    time: '09:34 AM IST',
    href: '/exams/iit-jam-2026',
  },
  {
    id: 6,
    type: 'live',
    title: 'MHT CET Registration Date 2026 Live Updates:',
    description: 'MHT CET 2026 Physics',
    date: '11 Dec 2025',
    time: '06:21 PM IST',
    href: '/exams/mht-cet-2026',
  },
  {
    id: 7,
    type: 'live',
    title: 'NEET Exam Form Date 2026 Out Live Updates:',
    description: 'NEET 2026 Exam Questic',
    date: '11 Dec 2025',
    time: '05:00 PM IST',
    href: '/exams/neet-2026',
  },
];

const filterOptions = [
  { id: 'live', label: 'Live Notification' },
  { id: 'all', label: 'All Notifications' },
  { id: 'exams', label: 'Exam Updates' },
  { id: 'admissions', label: 'Admission Alerts' },
];

function NotificationDropdown({ isOpen, onClose, triggerRef, className }) {
  const [selectedFilter, setSelectedFilter] = useState('live');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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

  const currentFilter = filterOptions.find((f) => f.id === selectedFilter);

  if (!isOpen) return null;

  return (
    <div
      ref={dropdownRef}
      className={cn(
        'absolute top-full right-0 mt-2',
        'w-[400px]',
        'bg-surface rounded-xl shadow-xl',
        'border border-border',
        'overflow-hidden',
        'animate-in fade-in slide-in-from-top-2 duration-200',
        'z-50',
        className
      )}
    >
      {/* Arrow pointer */}
      <div className="absolute -top-2 right-6 w-4 h-4 bg-surface border-l border-t border-border rotate-45" />

      {/* Header */}
      <div className="relative px-4 py-3 border-b border-border bg-surface">
        <h3 className="text-lg font-semibold text-text-primary">Notification</h3>
      </div>

      {/* Filter Dropdown */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              'w-full flex items-center justify-between',
              'px-4 py-2.5 rounded-lg',
              'border border-border',
              'text-sm text-text-primary',
              'hover:border-blue-300 transition-colors'
            )}
          >
            <span>{currentFilter?.label}</span>
            <Icon
              name="chevronDown"
              size="sm"
              className={cn(
                'text-text-muted transition-transform',
                isFilterOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Filter Options */}
          {isFilterOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-surface border border-border rounded-lg shadow-lg z-10">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedFilter(option.id);
                    setIsFilterOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-2.5 text-left text-sm',
                    'hover:bg-surface-alt transition-colors',
                    'first:rounded-t-lg last:rounded-b-lg',
                    selectedFilter === option.id
                      ? 'text-blue-800 bg-blue-50'
                      : 'text-text-primary'
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Updates Header */}
      <div className="px-4 py-2 flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-amber-500" />
        <span className="text-sm font-medium text-text-primary">Live Updates</span>
      </div>

      {/* Notifications List */}
      <div className="max-h-[400px] overflow-y-auto">
        <div className="px-4 pb-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="py-3 border-b border-border last:border-0"
            >
              <div className="flex gap-3">
                {/* Bullet */}
                <span className="mt-2 w-2 h-2 rounded-full bg-amber-500 flex-shrink-0" />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-text-primary">
                    {notification.title}
                  </p>
                  <p className="text-sm font-semibold text-text-primary mt-0.5">
                    {notification.description}
                    <Link
                      href={notification.href}
                      onClick={onClose}
                      className="text-blue-800 hover:text-blue-900 font-normal ml-1"
                    >
                      ...Read More
                    </Link>
                  </p>
                  <p className="text-xs text-text-muted mt-1">
                    {notification.date} | {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-border bg-surface-alt">
        <Link
          href="/notifications"
          onClick={onClose}
          className="block text-center text-sm font-medium text-blue-800 hover:text-blue-900 transition-colors"
        >
          View All Notifications
        </Link>
      </div>
    </div>
  );
}

export { NotificationDropdown };
export default NotificationDropdown;

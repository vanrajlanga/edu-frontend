'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Exam icon components with unique designs
const examIcons = {
  cuet: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <path d="M14 32 L24 12 L34 32" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="17" y1="26" x2="31" y2="26" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="20" r="3" fill="#F59E0B" />
    </svg>
  ),
  neet: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <path d="M24 14 L24 26 M24 26 L18 32 M24 26 L30 32" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="14" r="4" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />
      <path d="M16 20 Q24 16 32 20" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  jee: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <rect x="16" y="14" width="16" height="20" rx="2" fill="none" stroke="#3B82F6" strokeWidth="2" />
      <line x1="20" y1="20" x2="28" y2="20" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="20" y1="24" x2="28" y2="24" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="20" y1="28" x2="26" y2="28" stroke="#3B82F6" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="6" fill="#10B981" />
      <path d="M30 32 L31.5 33.5 L34.5 30.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  gate: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#EDE9FE" stroke="#8B5CF6" strokeWidth="2" />
      <rect x="14" y="18" width="20" height="16" rx="2" fill="none" stroke="#8B5CF6" strokeWidth="2" />
      <line x1="14" y1="24" x2="34" y2="24" stroke="#8B5CF6" strokeWidth="1.5" />
      <circle cx="24" cy="14" r="4" fill="#F59E0B" />
      <line x1="24" y1="18" x2="24" y2="14" stroke="#8B5CF6" strokeWidth="2" />
    </svg>
  ),
  cat: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2" />
      <path d="M16 28 L24 16 L32 28 Z" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" fill="#3B82F6" />
      <line x1="24" y1="28" x2="24" y2="34" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  upsc: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#DBEAFE" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="24" cy="20" r="8" fill="none" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M24 28 L24 38" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 34 L24 38 L30 34" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="20" r="3" fill="#10B981" />
    </svg>
  ),
  default: (
    <svg viewBox="0 0 48 48" className="w-full h-full">
      <circle cx="24" cy="24" r="22" fill="#F3F4F6" stroke="#6B7280" strokeWidth="2" />
      <rect x="16" y="14" width="16" height="20" rx="2" fill="none" stroke="#6B7280" strokeWidth="2" />
      <line x1="20" y1="20" x2="28" y2="20" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="20" y1="25" x2="28" y2="25" stroke="#6B7280" strokeWidth="1.5" />
      <line x1="20" y1="30" x2="26" y2="30" stroke="#6B7280" strokeWidth="1.5" />
    </svg>
  ),
};

function ExamCard({
  name,
  icon = 'default',
  mode = 'Offline',
  participatingColleges,
  examDate,
  examLevel,
  applicationHref = '#',
  infoHref = '#',
  className,
}) {
  const examIcon = examIcons[icon] || examIcons.default;
  const isOnline = mode.toLowerCase().includes('online');

  return (
    <div
      className={cn(
        'flex-shrink-0 w-[280px] sm:w-[300px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        'p-5',
        'hover:border-blue-300 hover:shadow-lg',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Header - Icon + Mode + Name */}
      <div className="flex items-start gap-4 mb-5">
        {/* Exam Icon */}
        <div className="w-12 h-12 flex-shrink-0">
          {examIcon}
        </div>

        {/* Mode & Name */}
        <div className="flex-1 min-w-0">
          <span
            className={cn(
              'inline-block px-2.5 py-0.5 rounded text-xs font-medium mb-1',
              isOnline
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-blue-50 text-blue-600'
            )}
          >
            {mode} Exam
          </span>
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
            {name}
          </h3>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2.5 mb-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Participating Colleges</span>
          <span className="text-sm font-semibold text-gray-900">{participatingColleges}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Exam Date</span>
          <span className="text-sm font-semibold text-gray-900">{examDate}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">Exam Level</span>
          <span className="text-sm font-semibold text-gray-900">{examLevel}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 mb-4" />

      {/* Action Links */}
      <div className="space-y-2">
        <Link
          href={applicationHref}
          className={cn(
            'flex items-center justify-between py-1.5',
            'text-sm font-medium text-gray-700',
            'hover:text-blue-600',
            'transition-colors duration-200'
          )}
        >
          <span>Application Process</span>
          <Icon name="chevronRight" size="sm" className="text-gray-400" />
        </Link>
        <Link
          href={infoHref}
          className={cn(
            'flex items-center justify-between py-1.5',
            'text-sm font-medium text-gray-700',
            'hover:text-blue-600',
            'transition-colors duration-200'
          )}
        >
          <span>Exam Info</span>
          <Icon name="chevronRight" size="sm" className="text-gray-400" />
        </Link>
      </div>
    </div>
  );
}

export { ExamCard, examIcons };
export default ExamCard;

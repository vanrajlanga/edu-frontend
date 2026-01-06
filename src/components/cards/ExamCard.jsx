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
  fullName,
  icon = 'default',
  mode = 'Offline',
  participatingColleges,
  examDate,
  examLevel,
  applicationForm,
  resultAnnounce,
  applicationHref = '#',
  infoHref = '#',
  examPatternHref = '#',
  previousYearPaperHref = '#',
  applyNowHref = '#',
  showApplyButton = false,
  variant = 'default', // 'default' for homepage, 'detailed' for exams page
  className,
}) {
  const examIcon = examIcons[icon] || examIcons.default;
  const isOnline = mode.toLowerCase().includes('online');
  const isDetailed = variant === 'detailed';

  return (
    <div
      className={cn(
        isDetailed ? 'w-full' : 'flex-shrink-0 w-[280px] sm:w-[300px]',
        'bg-white rounded-xl',
        'border border-gray-200',
        isDetailed ? 'p-4' : 'p-5 sm:p-6',
        'hover:border-green-300 hover:shadow-lg',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Header - Icon + Name + Mode Badge */}
      <div className="flex items-start justify-between gap-2.5 mb-3">
        <div className="flex items-start gap-2.5 flex-1 min-w-0">
          {/* Exam Icon */}
          <div className={cn(
            'flex-shrink-0',
            isDetailed ? 'w-12 h-12' : 'w-12 h-12'
          )}>
            {examIcon}
          </div>

          {/* Name */}
          <div className="flex-1 min-w-0">
            <h3 className={cn(
              'font-bold text-gray-900 group-hover:text-green-900 transition-colors leading-tight',
              isDetailed ? 'text-base mb-0.5' : 'text-lg'
            )}>
              {name}
            </h3>
            {fullName && (
              <p className="text-xs text-gray-600 line-clamp-1">
                {fullName}
              </p>
            )}
          </div>
        </div>

        {/* Mode Badge */}
        <span
          className={cn(
            'flex-shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium whitespace-nowrap',
            isOnline
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-blue-100 text-blue-700 border border-blue-200'
          )}
        >
          {mode} Exam
        </span>
      </div>

      {/* Details */}
      <div className={cn(
        'mb-3',
        isDetailed && 'bg-gray-50 rounded-lg p-2.5 space-y-2'
      )}>
        {isDetailed ? (
          // Detailed view for exams page
          <>
            <div className="flex items-center justify-between py-1 border-b border-gray-200 last:border-0">
              <span className="text-xs font-medium text-gray-600">Exam Date</span>
              <span className="text-xs font-semibold text-gray-900 text-right">{examDate}</span>
            </div>
            {applicationForm && (
              <div className="flex items-center justify-between py-1 border-b border-gray-200 last:border-0">
                <span className="text-xs font-medium text-gray-600">Application Form</span>
                <span className="text-xs font-semibold text-gray-900 text-right">{applicationForm}</span>
              </div>
            )}
            {resultAnnounce && (
              <div className="flex items-center justify-between py-1">
                <span className="text-xs font-medium text-gray-600">Result Announce</span>
                <span className="text-xs font-semibold text-gray-900 text-right">{resultAnnounce}</span>
              </div>
            )}
          </>
        ) : (
          // Default view for homepage
          <div className="space-y-2.5">
            {participatingColleges && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Participating Colleges</span>
                <span className="text-sm font-semibold text-gray-900">{participatingColleges}</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Exam Date</span>
              <span className="text-sm font-semibold text-gray-900">{examDate}</span>
            </div>
            {examLevel && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Exam Level</span>
                <span className="text-sm font-semibold text-gray-900">{examLevel}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Links */}
      <div className={cn(
        'space-y-1',
        isDetailed ? 'mb-3' : 'border-t border-gray-100 pt-4'
      )}>
        <Link
          href={applicationHref}
          className={cn(
            'flex items-center justify-between py-1',
            'text-xs font-medium text-gray-700',
            'hover:text-green-600',
            'transition-colors duration-200'
          )}
        >
          <span>Application Process</span>
          <Icon name="chevronRight" size="sm" className="text-gray-400" />
        </Link>
        <Link
          href={isDetailed ? examPatternHref : infoHref}
          className={cn(
            'flex items-center justify-between py-1',
            'text-xs font-medium text-gray-700',
            'hover:text-green-600',
            'transition-colors duration-200'
          )}
        >
          <span>{isDetailed ? 'Exam Pattern' : 'Exam Info'}</span>
          <Icon name="chevronRight" size="sm" className="text-gray-400" />
        </Link>
        {isDetailed && (
          <Link
            href={previousYearPaperHref}
            className={cn(
              'flex items-center justify-between py-1',
              'text-xs font-medium text-gray-700',
              'hover:text-green-600',
              'transition-colors duration-200'
            )}
          >
            <span>Previous Year Paper</span>
            <Icon name="chevronRight" size="sm" className="text-gray-400" />
          </Link>
        )}
      </div>

      {/* Apply Now Button - Only shown when showApplyButton is true */}
      {showApplyButton && (
        <Link
          href={applyNowHref}
          className={cn(
            'block w-full text-center',
            'px-6 py-2 rounded-lg',
            'bg-gradient-to-r from-green-600 to-emerald-600',
            'hover:from-green-700 hover:to-emerald-700',
            'text-white font-semibold text-sm',
            'shadow-md hover:shadow-lg',
            'transition-all duration-200'
          )}
        >
          Apply Now
        </Link>
      )}
    </div>
  );
}

export { ExamCard, examIcons };
export default ExamCard;

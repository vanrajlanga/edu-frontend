'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

function SubscribeBanner({ className }) {
  return (
    <section className={cn('py-6', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'relative overflow-hidden',
            'bg-green-50',
            'rounded-2xl',
            'px-6 py-6 md:px-12 md:py-8'
          )}
        >
          {/* Content */}
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Left Content - Title + Button */}
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <h2 className="text-xl md:text-2xl font-bold italic text-gray-900">
                Subscribe For Regular Alerts
              </h2>
              <Link
                href="/subscribe"
                className={cn(
                  'inline-flex items-center justify-center',
                  'px-8 py-3',
                  'bg-green-900 hover:bg-green-950',
                  'text-white font-semibold text-base',
                  'rounded-md',
                  'shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30',
                  'transition-all duration-200'
                )}
              >
                Subscribe Now
              </Link>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden md:block flex-shrink-0 w-32 h-24">
              <svg viewBox="0 0 140 100" className="w-full h-full">
                {/* Floating Icons - Top Left */}
                <circle cx="15" cy="20" r="12" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
                <rect x="10" y="15" width="10" height="10" rx="1" fill="none" stroke="#93C5FD" strokeWidth="1" />

                {/* Floating Icons - Top Right */}
                <circle cx="55" cy="12" r="10" fill="none" stroke="#93C5FD" strokeWidth="1.5" />
                <path d="M52 9 L55 12 L58 9" fill="none" stroke="#93C5FD" strokeWidth="1" />
                <line x1="55" y1="12" x2="55" y2="16" stroke="#93C5FD" strokeWidth="1" />

                {/* Person - Head */}
                <circle cx="95" cy="45" r="12" fill="#FCD34D" />

                {/* Person - Hair */}
                <path d="M83 40 Q85 30 95 28 Q105 30 107 40" fill="#1F2937" />

                {/* Person - Body */}
                <path
                  d="M80 58 Q95 52 110 58 L112 95 Q95 98 78 95 Z"
                  fill="#6366F1"
                />

                {/* Person - Left Arm with Phone */}
                <path
                  d="M82 62 Q70 70 72 85"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="72" cy="87" r="4" fill="#FCD34D" />

                {/* Person - Right Arm Up */}
                <path
                  d="M108 62 Q120 55 125 45"
                  fill="none"
                  stroke="#6366F1"
                  strokeWidth="8"
                  strokeLinecap="round"
                />
                <circle cx="125" cy="43" r="4" fill="#FCD34D" />

                {/* Notification Card in Right Hand */}
                <rect x="115" y="20" width="22" height="28" rx="3" fill="white" stroke="#E5E7EB" strokeWidth="1" />
                <circle cx="126" cy="30" r="5" fill="#3B82F6" />
                <path d="M124 28 L126 30 L128 28 M126 30 L126 33" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <rect x="119" y="38" width="14" height="2" rx="1" fill="#BFDBFE" />
                <rect x="119" y="42" width="10" height="2" rx="1" fill="#BFDBFE" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { SubscribeBanner };
export default SubscribeBanner;

'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

function CourseFinderBanner({ className }) {
  return (
    <section className={cn('py-6', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl">
          {/* Two-tone background */}
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Illustration Area */}
            <div className="relative bg-gradient-to-br from-green-50 to-green-100 px-8 py-8 md:py-0 md:w-[280px] flex items-center justify-center">
              {/* Illustration */}
              <div className="w-40 h-32 md:w-48 md:h-36">
                <svg viewBox="0 0 200 150" className="w-full h-full">
                  {/* Person */}
                  <ellipse cx="70" cy="140" rx="35" ry="8" fill="#E0E7FF" opacity="0.5" />

                  {/* Body */}
                  <path
                    d="M50 75 Q70 65 90 75 L95 130 Q70 138 45 130 Z"
                    fill="#DBEAFE"
                    stroke="#93C5FD"
                    strokeWidth="1"
                  />

                  {/* Head */}
                  <circle cx="70" cy="50" r="18" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="1" />

                  {/* Hair */}
                  <path d="M52 45 Q55 30 70 28 Q85 30 88 45" fill="#1E3A8A" />
                  <circle cx="55" cy="38" r="4" fill="#1E3A8A" />

                  {/* Arm holding magnifier */}
                  <path
                    d="M90 80 Q110 75 125 85"
                    fill="none"
                    stroke="#DBEAFE"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  <circle cx="90" cy="80" r="6" fill="#FEF3C7" />

                  {/* Magnifying Glass */}
                  <circle cx="140" cy="75" r="20" fill="none" stroke="#3B82F6" strokeWidth="4" />
                  <circle cx="140" cy="75" r="14" fill="#EFF6FF" />
                  <line x1="155" y1="90" x2="168" y2="103" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />

                  {/* Document in magnifier */}
                  <rect x="132" y="68" width="16" height="14" rx="1" fill="white" stroke="#93C5FD" strokeWidth="1" />
                  <line x1="135" y1="72" x2="145" y2="72" stroke="#93C5FD" strokeWidth="1" />
                  <line x1="135" y1="76" x2="142" y2="76" stroke="#93C5FD" strokeWidth="1" />

                  {/* Flying papers */}
                  <g transform="rotate(-15 160 40)">
                    <rect x="155" y="35" width="18" height="22" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="158" y1="42" x2="170" y2="42" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="158" y1="48" x2="167" y2="48" stroke="#CBD5E1" strokeWidth="1" />
                  </g>

                  <g transform="rotate(10 180 60)">
                    <rect x="175" y="55" width="16" height="20" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="178" y1="62" x2="188" y2="62" stroke="#CBD5E1" strokeWidth="1" />
                    <line x1="178" y1="67" x2="185" y2="67" stroke="#CBD5E1" strokeWidth="1" />
                  </g>

                  {/* Left arm with paper */}
                  <path
                    d="M50 80 Q30 90 25 110"
                    fill="none"
                    stroke="#DBEAFE"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  <circle cx="25" cy="112" r="5" fill="#FEF3C7" />

                  {/* Paper in left hand */}
                  <rect x="10" y="100" width="20" height="26" rx="2" fill="white" stroke="#93C5FD" strokeWidth="1" transform="rotate(-10 20 113)" />
                  <line x1="14" y1="108" x2="26" y2="106" stroke="#93C5FD" strokeWidth="1" />
                  <line x1="15" y1="114" x2="24" y2="112" stroke="#93C5FD" strokeWidth="1" />
                </svg>
              </div>
            </div>

            {/* Right Side - Content Area */}
            <div className="flex-1 bg-gradient-to-r from-green-800 to-green-900 px-8 py-8 md:py-10 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id="course-pattern" width="50" height="50" patternUnits="userSpaceOnUse">
                      <circle cx="25" cy="25" r="20" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="400" height="150" fill="url(#course-pattern)" />
                </svg>
              </div>

              {/* Content */}
              <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    Search from <span className="text-amber-300">30K+</span> courses with
                  </h2>
                  <p className="text-2xl md:text-3xl font-bold text-amber-400 mt-1">
                    Course Finder
                  </p>
                </div>

                {/* CTA Button */}
                <Link
                  href="/course-finder"
                  className={cn(
                    'inline-flex items-center gap-2',
                    'px-8 py-3.5',
                    'bg-green-950 hover:bg-green-800',
                    'text-white font-semibold text-base',
                    'rounded-lg',
                    'shadow-lg shadow-green-900/30 hover:shadow-xl',
                    'transition-all duration-200'
                  )}
                >
                  <span>Try Now</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { CourseFinderBanner };
export default CourseFinderBanner;

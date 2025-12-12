'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

function AdmissionBanner({ className }) {
  return (
    <section className={cn('py-8', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            'relative overflow-hidden',
            'bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50',
            'rounded-2xl',
            'px-6 py-10 md:px-12 md:py-12'
          )}
        >
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-[0.15]">
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                    <path d="M 8 0 L 0 0 0 8" fill="none" stroke="#F59E0B" strokeWidth="0.3" />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="flex-1 text-center md:text-left max-w-xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                Know your chances of{' '}
                <span className="text-orange-500">Admission</span>
              </h2>
              <p className="text-gray-600 text-sm md:text-base">
                Get personalized predictions based on your profile, scores, and preferences
              </p>
            </div>

            {/* Right Side - Button + Illustration */}
            <div className="flex-shrink-0 flex items-center gap-0">
              {/* Illustration - Person */}
              <div className="hidden md:block relative w-32 h-32 -mr-6 z-10">
                <svg viewBox="0 0 120 120" className="w-full h-full">
                  {/* Clouds */}
                  <ellipse cx="25" cy="15" rx="12" ry="6" fill="#D1D5DB" opacity="0.6" />
                  <ellipse cx="95" cy="20" rx="10" ry="5" fill="#D1D5DB" opacity="0.5" />

                  {/* Building Outline */}
                  <path
                    d="M85 110 L85 60 L100 45 L115 60 L115 110"
                    fill="none"
                    stroke="#D1D5DB"
                    strokeWidth="1"
                    opacity="0.4"
                  />
                  <line x1="92" y1="70" x2="92" y2="85" stroke="#D1D5DB" strokeWidth="0.8" opacity="0.4" />
                  <line x1="108" y1="70" x2="108" y2="85" stroke="#D1D5DB" strokeWidth="0.8" opacity="0.4" />

                  {/* Hair Bun */}
                  <circle cx="55" cy="28" r="6" fill="#1F2937" />

                  {/* Head */}
                  <circle cx="55" cy="42" r="14" fill="#FCD34D" />

                  {/* Body */}
                  <path
                    d="M35 58 Q55 50 75 58 L80 110 Q55 115 30 110 Z"
                    fill="#6366F1"
                  />

                  {/* Left Arm */}
                  <path
                    d="M38 65 Q25 75 30 95"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />

                  {/* Right Arm - Extended */}
                  <path
                    d="M72 65 Q95 60 115 65"
                    fill="none"
                    stroke="#6366F1"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />

                  {/* Hands */}
                  <circle cx="30" cy="97" r="5" fill="#FCD34D" />
                  <circle cx="115" cy="65" r="5" fill="#FCD34D" />

                  {/* Book */}
                  <rect x="22" y="82" width="35" height="28" rx="2" fill="#1F2937" transform="rotate(-8 40 96)" />
                  <rect x="24" y="84" width="15" height="24" rx="1" fill="#F9FAFB" transform="rotate(-8 40 96)" />
                  <rect x="40" y="84" width="15" height="24" rx="1" fill="#E5E7EB" transform="rotate(-8 40 96)" />
                </svg>
              </div>

              {/* CTA Button */}
              <Link
                href="/admission-predictor"
                className={cn(
                  'inline-flex items-center gap-3',
                  'px-8 py-4 md:px-10 md:py-5',
                  'bg-orange-500 hover:bg-orange-600',
                  'text-white font-semibold text-lg',
                  'rounded-full',
                  'shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/30',
                  'transform hover:-translate-y-0.5',
                  'transition-all duration-200'
                )}
              >
                <span>Start Now</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { AdmissionBanner };
export default AdmissionBanner;

'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';

// Unique landmark icons for each city
const cityLandmarks = {
  delhi: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* India Gate */}
      <path d="M12 52 L12 28 L32 12 L52 28 L52 52" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M20 52 L20 32 Q32 24 44 32 L44 52" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="36" width="8" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="52" x2="52" y2="52" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="22" r="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  bangalore: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Vidhana Soudha inspired */}
      <rect x="8" y="44" width="48" height="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="12" y="32" width="40" height="12" fill="none" stroke="currentColor" strokeWidth="2" />
      <rect x="16" y="22" width="32" height="10" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Dome */}
      <path d="M26 22 Q32 12 38 22" fill="none" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="12" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" />
      {/* Pillars */}
      <line x1="18" y1="32" x2="18" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="26" y1="32" x2="26" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="38" y1="32" x2="38" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="46" y1="32" x2="46" y2="44" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  hyderabad: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Charminar */}
      <rect x="22" y="28" width="20" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Arch */}
      <path d="M26 52 L26 40 Q32 34 38 40 L38 52" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Minarets */}
      <rect x="14" y="24" width="6" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="44" y="24" width="6" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Minaret tops */}
      <path d="M14 24 L17 16 L20 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M44 24 L47 16 L50 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Dome */}
      <path d="M26 28 Q32 20 38 28" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="20" x2="32" y2="16" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  pune: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Shaniwar Wada inspired */}
      <rect x="12" y="32" width="40" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Main Gate Arch */}
      <path d="M24 52 L24 38 Q32 30 40 38 L40 52" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Crenellations */}
      <path d="M12 32 L12 28 L18 28 L18 32 L24 32 L24 28 L30 28 L30 32 L36 32 L36 28 L42 28 L42 32 L48 32 L48 28 L52 28 L52 32" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Side towers */}
      <rect x="8" y="36" width="6" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="50" y="36" width="6" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="52" x2="52" y2="52" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  mumbai: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Gateway of India */}
      <rect x="18" y="28" width="28" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Main Arch */}
      <path d="M24 52 L24 36 Q32 28 40 36 L40 52" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Top structure */}
      <rect x="22" y="20" width="20" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Dome */}
      <path d="M28 20 Q32 14 36 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Side arches */}
      <path d="M18 52 L18 44 Q21 40 24 44 L24 52" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M40 52 L40 44 Q43 40 46 44 L46 52" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* Side towers */}
      <rect x="12" y="32" width="6" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="46" y="32" width="6" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  chennai: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Marina Lighthouse / Temple Tower inspired */}
      <path d="M24 52 L28 20 L36 20 L40 52" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Tiers */}
      <line x1="26" y1="44" x2="38" y2="44" stroke="currentColor" strokeWidth="1.5" />
      <line x1="27" y1="36" x2="37" y2="36" stroke="currentColor" strokeWidth="1.5" />
      <line x1="28" y1="28" x2="36" y2="28" stroke="currentColor" strokeWidth="1.5" />
      {/* Top dome */}
      <path d="M30 20 Q32 12 34 20" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="12" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" />
      {/* Base */}
      <rect x="20" y="48" width="24" height="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Side elements */}
      <circle cx="14" cy="44" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle cx="50" cy="44" r="4" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  kolkata: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Victoria Memorial / Howrah Bridge inspired */}
      <rect x="16" y="36" width="32" height="16" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Main Dome */}
      <ellipse cx="32" cy="28" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M32 20 L32 14" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="32" cy="12" r="2" fill="none" stroke="currentColor" strokeWidth="1" />
      {/* Side domes */}
      <ellipse cx="20" cy="34" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="44" cy="34" rx="4" ry="3" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Pillars */}
      <line x1="22" y1="36" x2="22" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="36" x2="28" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="36" y1="36" x2="36" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="42" y1="36" x2="42" y2="52" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  jaipur: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Hawa Mahal inspired */}
      <rect x="16" y="16" width="32" height="36" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Windows grid */}
      <line x1="16" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="32" x2="48" y2="32" stroke="currentColor" strokeWidth="1" />
      <line x1="16" y1="40" x2="48" y2="40" stroke="currentColor" strokeWidth="1" />
      <line x1="24" y1="16" x2="24" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="16" x2="32" y2="52" stroke="currentColor" strokeWidth="1" />
      <line x1="40" y1="16" x2="40" y2="52" stroke="currentColor" strokeWidth="1" />
      {/* Top decorations */}
      <path d="M16 16 L20 10 L24 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M24 16 L28 10 L32 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M32 16 L36 10 L40 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M40 16 L44 10 L48 16" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ahmedabad: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Sabarmati Ashram / Modern Architecture */}
      <rect x="12" y="32" width="40" height="20" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Arches */}
      <path d="M16 52 L16 40 Q22 34 28 40 L28 52" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M36 52 L36 40 Q42 34 48 40 L48 52" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Top structure */}
      <rect x="20" y="24" width="24" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M26 24 Q32 16 38 24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="32" y1="16" x2="32" y2="12" stroke="currentColor" strokeWidth="1.5" />
      {/* Steps */}
      <line x1="8" y1="52" x2="56" y2="52" stroke="currentColor" strokeWidth="2" />
    </svg>
  ),
  lucknow: (
    <svg viewBox="0 0 64 64" className="w-full h-full">
      {/* Bara Imambara inspired */}
      <rect x="10" y="34" width="44" height="18" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Main arch */}
      <path d="M22 52 L22 40 Q32 30 42 40 L42 52" fill="none" stroke="currentColor" strokeWidth="2" />
      {/* Top domes */}
      <path d="M18 34 Q18 28 24 28 Q30 28 30 34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M34 34 Q34 28 40 28 Q46 28 46 34" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {/* Minarets */}
      <rect x="8" y="28" width="4" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="52" y="28" width="4" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 28 L10 22 L12 28" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M52 28 L54 22 L56 28" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
};

function CityCard({
  city,
  name,
  href = '#',
  collegeCount,
  className,
}) {
  const landmark = cityLandmarks[city] || cityLandmarks.delhi;

  return (
    <Link
      href={href}
      className={cn(
        'flex-shrink-0 w-[140px] sm:w-[160px]',
        'flex flex-col items-center',
        'p-5',
        'bg-white rounded-xl',
        'border border-gray-100',
        'hover:border-blue-200 hover:shadow-md',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Landmark Icon */}
      <div
        className={cn(
          'w-16 h-16 mb-3',
          'text-blue-500 group-hover:text-blue-600',
          'transition-colors duration-200'
        )}
      >
        {landmark}
      </div>

      {/* City Name */}
      <h3 className="text-sm font-semibold text-gray-900 text-center group-hover:text-blue-600 transition-colors">
        {name}
      </h3>

      {/* College Count (optional) */}
      {collegeCount && (
        <p className="text-xs text-gray-500 mt-1">{collegeCount} Colleges</p>
      )}
    </Link>
  );
}

export { CityCard, cityLandmarks };
export default CityCard;

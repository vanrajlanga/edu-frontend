'use client';

import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Country landmark icons (unique SVG illustrations)
const countryLandmarks = {
  usa: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Statue of Liberty */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M40 15L42 22H38L40 15Z" fill="#3B82F6" />
      <path d="M35 22H45V28H35V22Z" fill="#60A5FA" />
      <path d="M32 28H48L46 35H34L32 28Z" fill="#3B82F6" />
      <path d="M34 35H46V42L44 65H36L34 42V35Z" fill="#60A5FA" />
      <path d="M30 65H50V68H30V65Z" fill="#3B82F6" />
      <path d="M28 68H52V72H28V68Z" fill="#1D4ED8" />
      {/* Crown rays */}
      <path d="M40 12L41 8L40 10L39 8L40 12Z" fill="#3B82F6" />
      <path d="M35 14L32 11L34 13L31 12L35 14Z" fill="#3B82F6" />
      <path d="M45 14L48 11L46 13L49 12L45 14Z" fill="#3B82F6" />
      {/* Torch */}
      <path d="M48 28L54 20L56 22L50 30L48 28Z" fill="#60A5FA" />
      <ellipse cx="55" cy="18" rx="3" ry="4" fill="#FBBF24" />
    </svg>
  ),
  uk: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Big Ben / Elizabeth Tower */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M36 70H44V55H36V70Z" fill="#1D4ED8" />
      <path d="M34 55H46V45H34V55Z" fill="#3B82F6" />
      <path d="M33 45H47V35H33V45Z" fill="#60A5FA" />
      <path d="M35 35H45V25H35V35Z" fill="#3B82F6" />
      <path d="M37 25H43V18H37V25Z" fill="#60A5FA" />
      <path d="M38 18H42L40 10L38 18Z" fill="#3B82F6" />
      {/* Clock face */}
      <circle cx="40" cy="30" r="4" fill="white" stroke="#1D4ED8" strokeWidth="1" />
      <path d="M40 28V30H42" stroke="#1D4ED8" strokeWidth="0.5" />
      {/* Windows */}
      <rect x="36" y="48" width="2" height="3" fill="#BFDBFE" />
      <rect x="42" y="48" width="2" height="3" fill="#BFDBFE" />
      <rect x="36" y="38" width="2" height="3" fill="#BFDBFE" />
      <rect x="42" y="38" width="2" height="3" fill="#BFDBFE" />
    </svg>
  ),
  canada: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* CN Tower */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M39 72H41V50H39V72Z" fill="#1D4ED8" />
      <path d="M38 50H42V42H38V50Z" fill="#3B82F6" />
      <ellipse cx="40" cy="40" rx="6" ry="4" fill="#60A5FA" />
      <path d="M39 40H41V20H39V40Z" fill="#3B82F6" />
      <path d="M38 20H42L40 8L38 20Z" fill="#1D4ED8" />
      {/* Maple leaf accent */}
      <path d="M55 55L52 50L54 50L50 45L52 45L48 40L55 45L53 45L57 50L55 50L58 55H55Z" fill="#EF4444" />
    </svg>
  ),
  australia: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sydney Opera House */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M15 55H65V60H15V55Z" fill="#1D4ED8" />
      <path d="M20 55C20 55 25 35 30 40C35 45 25 55 20 55Z" fill="#60A5FA" />
      <path d="M28 55C28 55 35 30 42 38C49 46 35 55 28 55Z" fill="#3B82F6" />
      <path d="M38 55C38 55 48 25 55 35C62 45 48 55 38 55Z" fill="#60A5FA" />
      <path d="M50 55C50 55 58 40 62 48C66 55 55 55 50 55Z" fill="#3B82F6" />
      {/* Water */}
      <path d="M10 62C15 60 20 62 25 60C30 58 35 62 40 60C45 58 50 62 55 60C60 58 65 62 70 60V70H10V62Z" fill="#BFDBFE" />
    </svg>
  ),
  germany: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Brandenburg Gate */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M20 65H60V60H20V65Z" fill="#1D4ED8" />
      <path d="M22 60H26V45H22V60Z" fill="#3B82F6" />
      <path d="M32 60H36V45H32V60Z" fill="#3B82F6" />
      <path d="M44 60H48V45H44V60Z" fill="#3B82F6" />
      <path d="M54 60H58V45H54V60Z" fill="#3B82F6" />
      <path d="M20 45H60V40H20V45Z" fill="#60A5FA" />
      <path d="M25 40H55V35H25V40Z" fill="#3B82F6" />
      {/* Quadriga on top */}
      <path d="M35 35H45V30L40 25L35 30V35Z" fill="#1D4ED8" />
      <circle cx="40" cy="22" r="3" fill="#FBBF24" />
    </svg>
  ),
  france: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Eiffel Tower */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M40 10L42 25H38L40 10Z" fill="#1D4ED8" />
      <path d="M36 25H44L46 40H34L36 25Z" fill="#3B82F6" />
      <path d="M32 40H48V45H32V40Z" fill="#60A5FA" />
      <path d="M30 45H50L55 70H25L30 45Z" fill="#3B82F6" />
      <path d="M20 70H60V72H20V70Z" fill="#1D4ED8" />
      {/* Cross beams */}
      <path d="M33 52H47V54H33V52Z" fill="#BFDBFE" />
      <path d="M28 62H52V64H28V62Z" fill="#BFDBFE" />
    </svg>
  ),
  ireland: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dublin Castle / Cliffs */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M25 70H55V50H25V70Z" fill="#3B82F6" />
      <path d="M22 50H28V35L25 30L22 35V50Z" fill="#60A5FA" />
      <path d="M52 50H58V35L55 30L52 35V50Z" fill="#60A5FA" />
      <path d="M35 50H45V40L40 35L35 40V50Z" fill="#1D4ED8" />
      <rect x="38" y="55" width="4" height="8" fill="#BFDBFE" />
      {/* Shamrock */}
      <circle cx="60" cy="25" r="4" fill="#22C55E" />
      <circle cx="55" cy="28" r="4" fill="#22C55E" />
      <circle cx="65" cy="28" r="4" fill="#22C55E" />
      <path d="M60 30V38" stroke="#22C55E" strokeWidth="2" />
    </svg>
  ),
  newzealand: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Sky Tower */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M39 72H41V55H39V72Z" fill="#1D4ED8" />
      <ellipse cx="40" cy="50" rx="8" ry="3" fill="#60A5FA" />
      <path d="M39 50H41V25H39V50Z" fill="#3B82F6" />
      <path d="M38 25H42L40 12L38 25Z" fill="#1D4ED8" />
      {/* Silver fern */}
      <path d="M55 60L60 55L58 58L62 55L58 60L62 58L60 62L55 60Z" fill="#1D4ED8" />
      <path d="M20 35L25 32L22 35L25 38L20 35Z" fill="#1D4ED8" />
    </svg>
  ),
  singapore: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Marina Bay Sands */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M18 65H28V40H18V65Z" fill="#3B82F6" />
      <path d="M35 65H45V40H35V65Z" fill="#3B82F6" />
      <path d="M52 65H62V40H52V65Z" fill="#3B82F6" />
      <path d="M15 40H65C65 40 60 35 40 35C20 35 15 40 15 40Z" fill="#60A5FA" />
      {/* Top boat structure */}
      <ellipse cx="40" cy="38" rx="28" ry="4" fill="#1D4ED8" />
      {/* Merlion accent */}
      <circle cx="25" cy="55" r="3" fill="#BFDBFE" />
    </svg>
  ),
  dubai: (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Burj Khalifa */}
      <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
      <path d="M39 72H41V60H39V72Z" fill="#1D4ED8" />
      <path d="M37 60H43V50H37V60Z" fill="#3B82F6" />
      <path d="M36 50H44V40H36V50Z" fill="#60A5FA" />
      <path d="M35 40H45V30H35V40Z" fill="#3B82F6" />
      <path d="M36 30H44V22H36V30Z" fill="#60A5FA" />
      <path d="M37 22H43V16H37V22Z" fill="#3B82F6" />
      <path d="M38 16H42L40 8L38 16Z" fill="#1D4ED8" />
      {/* Side buildings */}
      <path d="M25 72V55L28 50L25 55V72H25Z" fill="#93C5FD" />
      <path d="M55 72V58L52 52L55 58V72H55Z" fill="#93C5FD" />
    </svg>
  ),
};

// Country themed gradients (using green palette)
const countryAccents = {
  usa: 'from-blue-700 to-blue-600',
  uk: 'from-blue-800 to-blue-600',
  canada: 'from-blue-600 to-blue-500',
  australia: 'from-blue-700 to-amber-500',
  germany: 'from-blue-800 to-gray-700',
  france: 'from-blue-800 to-blue-600',
  ireland: 'from-blue-500 to-blue-400',
  newzealand: 'from-blue-700 to-blue-500',
  singapore: 'from-blue-600 to-blue-400',
  dubai: 'from-blue-700 to-amber-600',
};

function StudyAbroadCard({
  country,
  countryCode,
  collegeCount,
  avgCost,
  currency = 'USD',
  guides = [],
  href = '#',
  className,
}) {
  const landmark = countryLandmarks[countryCode] || countryLandmarks.usa;
  const accent = countryAccents[countryCode] || 'from-blue-800 to-blue-900';

  return (
    <div
      className={cn(
        'flex-shrink-0 w-[340px] md:w-[380px]',
        'bg-white rounded-2xl border border-gray-100',
        'shadow-sm hover:shadow-xl',
        'transition-all duration-300',
        'overflow-hidden group',
        className
      )}
    >
      {/* Header with Landmark */}
      <div className="relative p-6 pb-4">
        <div className="flex items-start gap-4">
          {/* Landmark Icon */}
          <div className="w-16 h-16 flex-shrink-0">
            {landmark}
          </div>

          {/* Country Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              Study in {country}
            </h3>
            <a
              href={href}
              className="inline-flex items-center gap-1 text-sm text-blue-900 hover:text-blue-950 font-medium group/link"
            >
              Check {collegeCount.toLocaleString()} Colleges
              <Icon name="chevronRight" size="sm" className="group-hover/link:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Accent Line */}
        <div className={cn('absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r', accent)} />
      </div>

      {/* Stats */}
      <div className="px-6 py-4 bg-slate-50 flex items-center gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Icon name="building" size="md" className="text-blue-900" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{collegeCount.toLocaleString()}</p>
            <p className="text-xs text-gray-500">No. Of Colleges</p>
          </div>
        </div>

        <div className="w-px h-10 bg-gray-200" />

        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center">
            <Icon name="currency" size="md" className="text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">{avgCost}</p>
            <p className="text-xs text-gray-500">{currency}/Year Avg.</p>
          </div>
        </div>
      </div>

      {/* Guides Section */}
      {guides.length > 0 && (
        <div className="px-6 py-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Guides</h4>
          <ul className="space-y-2">
            {guides.slice(0, 4).map((guide, index) => (
              <li key={index}>
                <a
                  href={guide.href}
                  className="flex items-center justify-between py-2 px-3 -mx-3 rounded-lg hover:bg-slate-50 text-sm text-gray-600 hover:text-blue-900 transition-colors group/guide"
                >
                  <span>{guide.label}</span>
                  <Icon
                    name="chevronRight"
                    size="sm"
                    className="text-gray-400 group-hover/guide:text-blue-800 group-hover/guide:translate-x-0.5 transition-all"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* View All Button */}
      <div className="px-6 pb-6">
        <a
          href={href}
          className={cn(
            'block w-full py-3 px-4 rounded-xl text-center',
            'bg-gradient-to-r from-blue-800 to-blue-900',
            'text-white font-medium text-sm',
            'hover:from-blue-900 hover:to-blue-950',
            'shadow-sm hover:shadow-md',
            'transition-all duration-200'
          )}
        >
          Explore Study in {country}
        </a>
      </div>
    </div>
  );
}

export { StudyAbroadCard, countryLandmarks, countryAccents };
export default StudyAbroadCard;

'use client';

import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

const newsItems = [
  { type: 'alert', text: 'NEET 2025 Registration Last Date: March 15, 2025', link: '/exams/neet' },
  { type: 'info', text: 'JEE Main 2025 Session 2 Application Open', link: '/exams/jee-main' },
  { type: 'alert', text: 'CAT 2025 Registration Deadline: September 20, 2025', link: '/exams/cat' },
  { type: 'new', text: 'CUET UG 2025 Dates Announced - Apply Now', link: '/exams/cuet' },
  { type: 'info', text: 'GATE 2025 Admit Card Released', link: '/exams/gate' },
  { type: 'alert', text: 'CLAT 2025 Application Last Date: November 15, 2025', link: '/exams/clat' },
  { type: 'new', text: 'NTA Announces New Exam Pattern for UGC NET', link: '/exams/ugc-net' },
  { type: 'info', text: 'BITSAT 2025 Registration Starts from January', link: '/exams/bitsat' },
];

function NewsTicker({ className }) {
  // Duplicate items for seamless loop
  const duplicatedItems = [...newsItems, ...newsItems];

  const getTypeStyles = (type) => {
    switch (type) {
      case 'alert':
        return 'bg-red-500/10 text-red-600 border-red-200';
      case 'new':
        return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      default:
        return 'bg-blue-500/10 text-blue-600 border-blue-200';
    }
  };

  const getTypeLabel = (type) => {
    switch (type) {
      case 'alert':
        return 'DEADLINE';
      case 'new':
        return 'NEW';
      default:
        return 'UPDATE';
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50',
        'border-b border-amber-200/50',
        className
      )}
    >
      {/* Left Label */}
      <div className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 bg-gradient-to-r from-amber-100 to-amber-50 border-r border-amber-200/50">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Latest Updates
          </span>
        </div>
      </div>

      {/* Scrolling Content */}
      <div className="flex items-center h-9 pl-40">
        <div className="flex items-center gap-8 animate-ticker">
          {duplicatedItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="flex items-center gap-2 whitespace-nowrap group"
            >
              <span
                className={cn(
                  'px-1.5 py-0.5 text-[10px] font-bold rounded border',
                  getTypeStyles(item.type)
                )}
              >
                {getTypeLabel(item.type)}
              </span>
              <span className="text-sm text-gray-700 group-hover:text-blue-600 transition-colors">
                {item.text}
              </span>
              <Icon
                name="chevronRight"
                size="xs"
                className="text-gray-400 group-hover:text-blue-500 transition-colors"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Right Fade */}
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-amber-50 to-transparent pointer-events-none" />
    </div>
  );
}

export { NewsTicker };
export default NewsTicker;

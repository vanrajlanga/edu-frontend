'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Base Program Card Component
function ProgramCard({
  title,
  description,
  illustration,
  ctaText,
  ctaHref = '#',
  children,
  className,
}) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl',
        'border border-gray-100',
        'p-5',
        'hover:shadow-md hover:border-gray-200',
        'transition-all duration-200',
        'group',
        className
      )}
    >
      {/* Header with illustration */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {description}
          </p>
        </div>
        {illustration && (
          <div className="flex-shrink-0 w-20 h-16">
            {illustration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        {children}
      </div>

      {/* CTA Link */}
      <Link
        href={ctaHref}
        className={cn(
          'inline-flex items-center gap-1 text-sm font-medium',
          'text-gray-700 hover:text-green-900',
          'transition-colors duration-200'
        )}
      >
        {ctaText}
        <Icon name="chevronRight" size="sm" className="group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  );
}

// Ranking Card
function RankingCard({ rankings = [], className }) {
  // Default rankings if none provided
  const displayRankings = rankings.length > 0 ? rankings : [
    { name: 'NIRF', collegeCount: 0 },
    { name: 'QS', collegeCount: 0 },
    { name: 'India Today', collegeCount: 0 },
    { name: 'Outlook', collegeCount: 0 },
  ];

  return (
    <ProgramCard
      title="Ranking"
      description="College ranked based on real data"
      ctaText="Top Ranked Colleges in India"
      ctaHref="/rankings"
      illustration={<RankingIllustration />}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {displayRankings.map((item) => (
          <span
            key={item.name || item.code}
            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100"
          >
            {item.code || item.name} - {item.collegeCount || item.count || 0}
          </span>
        ))}
      </div>
    </ProgramCard>
  );
}

// Find Colleges Card
function FindCollegesCard({ totalColleges = 19000, className }) {
  const links = [
    { label: 'Best MBA colleges in India', href: '/mba-colleges' },
    { label: 'Best BTech colleges in India', href: '/btech-colleges' },
  ];

  return (
    <ProgramCard
      title="Find Colleges"
      description={`Discover ${totalColleges.toLocaleString()}+ colleges via preferences`}
      ctaText="Discover Top Colleges in India"
      ctaHref="/colleges"
      illustration={<FindCollegesIllustration />}
      className={className}
    >
      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="block text-sm text-gray-600 hover:text-green-900 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </ProgramCard>
  );
}

// Compare Colleges Card
function CompareCollegesCard({ className }) {
  const comparisons = [
    { college1: 'IIT Madras', course1: 'BE/B.Tech', college2: 'IIT Delhi', course2: 'BE/B.Tech' },
    { college1: 'IIT Madras', course1: 'BE/B.Tech', college2: 'IIT Bombay', course2: 'BE/B.Tech' },
  ];

  return (
    <ProgramCard
      title="Compare Colleges"
      description="Compare on the basis of rank, fees, etc."
      ctaText="Compare Colleges"
      ctaHref="/compare"
      illustration={<CompareIllustration />}
      className={className}
    >
      <div className="space-y-3">
        {comparisons.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-xs">🏛</span>
              </div>
              <div>
                <span className="font-medium text-gray-800">{item.college1}</span>
                <span className="block text-xs text-green-800">{item.course1}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 text-xs bg-gray-100 rounded text-gray-500">vs</span>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-xs">🏛</span>
              </div>
              <div>
                <span className="font-medium text-gray-800">{item.college2}</span>
                <span className="block text-xs text-green-800">{item.course2}</span>
              </div>
            </div>
            <Icon name="chevronRight" size="sm" className="ml-auto text-gray-400" />
          </div>
        ))}
      </div>
    </ProgramCard>
  );
}

// Exams Card
function ExamsCard({ exams = [], className }) {
  // Default exams if none provided
  const displayExams = exams.length > 0 ? exams : [
    { shortName: 'JEE Main', slug: 'jee-main' },
    { shortName: 'NEET', slug: 'neet-ug' },
    { shortName: 'CAT', slug: 'cat' },
    { shortName: 'GATE', slug: 'gate' },
  ];

  return (
    <ProgramCard
      title="Exams"
      description="Know more about your exams"
      ctaText="Check All Entrance Exams in India"
      ctaHref="/exams"
      illustration={<ExamsIllustration />}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {displayExams.slice(0, 7).map((exam) => (
          <Link
            key={exam.slug || exam}
            href={`/exams/${exam.slug || exam.toLowerCase().replace(/[^a-z]/g, '-')}`}
            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100 hover:border-green-200 hover:text-green-900 transition-colors"
          >
            {exam.shortName || exam.name || exam}
          </Link>
        ))}
      </div>
    </ProgramCard>
  );
}

// College Predictor Card
function CollegePredictorCard({ predictors = [], className }) {
  // Default predictors if none provided
  const displayPredictors = predictors.length > 0 ? predictors : [
    { shortName: 'JEE Main', slug: 'jee-main' },
    { shortName: 'NEET', slug: 'neet-ug' },
    { shortName: 'CAT', slug: 'cat' },
    { shortName: 'JEE Advanced', slug: 'jee-advanced' },
  ];

  return (
    <ProgramCard
      title="College Predictor"
      description="Know your college admission chances"
      ctaText="Find Where you may get Admission"
      ctaHref="/college-predictor"
      illustration={<PredictorIllustration />}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {displayPredictors.map((item) => (
          <Link
            key={item.slug || item}
            href={`/predictor/${item.slug || item.toLowerCase().replace(/\s+/g, '-')}`}
            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100 hover:border-green-200 hover:text-green-900 transition-colors"
          >
            {item.shortName || item.name || item}
          </Link>
        ))}
      </div>
    </ProgramCard>
  );
}

// Course Finder Card
function CourseFinderCard({ courses = [], className }) {
  // Default courses if none provided
  const displayCourses = courses.length > 0 ? courses : [
    { name: 'B.Tech', slug: 'btech', count: 0 },
    { name: 'MBA', slug: 'mba', count: 0 },
    { name: 'M.Tech', slug: 'mtech', count: 0 },
    { name: 'B.Sc', slug: 'bsc', count: 0 },
  ];

  return (
    <ProgramCard
      title="Course Finder"
      description="Discover top courses in Indian Colleges 2025"
      ctaText="Get Top Courses in Indian Colleges"
      ctaHref="/courses"
      illustration={<CourseFinderIllustration />}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {displayCourses.slice(0, 4).map((course) => (
          <Link
            key={course.name || course.slug}
            href={`/${course.slug || course.name.toLowerCase().replace(/[^a-z]/g, '-')}-colleges`}
            className="px-3 py-1.5 text-sm text-gray-600 bg-gray-50 rounded-lg border border-gray-100 hover:border-green-200 hover:text-green-900 transition-colors"
          >
            {course.name} - {course.count || 0}
          </Link>
        ))}
      </div>
    </ProgramCard>
  );
}

// Simple SVG Illustrations
function RankingIllustration() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <rect x="10" y="30" width="15" height="30" rx="2" fill="#FED7AA" />
      <rect x="32" y="15" width="15" height="45" rx="2" fill="#FDBA74" />
      <rect x="54" y="40" width="15" height="20" rx="2" fill="#FED7AA" />
      <circle cx="40" cy="8" r="6" fill="#F59E0B" />
      <path d="M40 4L41.5 7H44L42 9L43 12L40 10L37 12L38 9L36 7H38.5L40 4Z" fill="white" />
      <circle cx="60" cy="55" r="4" fill="#3B82F6" />
      <rect x="55" y="20" width="3" height="8" rx="1" fill="#3B82F6" />
    </svg>
  );
}

function FindCollegesIllustration() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <rect x="15" y="20" width="50" height="35" rx="3" fill="#DBEAFE" />
      <rect x="20" y="25" width="20" height="3" rx="1" fill="#3B82F6" />
      <rect x="20" y="32" width="35" height="2" rx="1" fill="#93C5FD" />
      <rect x="20" y="38" width="30" height="2" rx="1" fill="#93C5FD" />
      <rect x="20" y="44" width="25" height="2" rx="1" fill="#93C5FD" />
      <circle cx="58" cy="15" r="8" fill="#F59E0B" />
      <path d="M58 10L60 14H64L61 17L62 21L58 18L54 21L55 17L52 14H56L58 10Z" fill="white" />
    </svg>
  );
}

function CompareIllustration() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <rect x="5" y="15" width="25" height="35" rx="3" fill="#DBEAFE" />
      <rect x="50" y="15" width="25" height="35" rx="3" fill="#FEE2E2" />
      <rect x="35" y="28" width="10" height="10" rx="5" fill="#E5E7EB" />
      <text x="40" y="36" fontSize="8" fill="#6B7280" textAnchor="middle">vs</text>
      <circle cx="17" cy="25" r="5" fill="#3B82F6" />
      <circle cx="63" cy="25" r="5" fill="#EF4444" />
      <rect x="10" y="35" width="15" height="2" rx="1" fill="#93C5FD" />
      <rect x="55" y="35" width="15" height="2" rx="1" fill="#FCA5A5" />
      <rect x="10" y="40" width="12" height="2" rx="1" fill="#93C5FD" />
      <rect x="55" y="40" width="12" height="2" rx="1" fill="#FCA5A5" />
    </svg>
  );
}

function ExamsIllustration() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <rect x="20" y="10" width="40" height="50" rx="3" fill="#FEF3C7" />
      <rect x="25" y="20" width="20" height="3" rx="1" fill="#F59E0B" />
      <rect x="25" y="28" width="30" height="2" rx="1" fill="#FCD34D" />
      <rect x="25" y="34" width="25" height="2" rx="1" fill="#FCD34D" />
      <rect x="25" y="40" width="28" height="2" rx="1" fill="#FCD34D" />
      <circle cx="50" cy="50" r="3" fill="#3B82F6" />
      <path d="M48 50L49.5 52H52L50 53.5L51 56L49 54.5L47 56L48 53.5L46 52H48.5L48 50Z" fill="white" transform="translate(2, 0)" />
      <rect x="15" y="45" width="8" height="12" rx="1" fill="#FDBA74" />
    </svg>
  );
}

function PredictorIllustration() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <circle cx="40" cy="32" r="25" fill="#DBEAFE" />
      <circle cx="40" cy="32" r="18" fill="#BFDBFE" />
      <circle cx="40" cy="32" r="10" fill="#3B82F6" />
      <circle cx="40" cy="32" r="3" fill="white" />
      <rect x="55" y="10" width="15" height="20" rx="2" fill="#FEF3C7" />
      <rect x="58" y="15" width="8" height="2" rx="1" fill="#F59E0B" />
      <rect x="58" y="20" width="6" height="2" rx="1" fill="#FCD34D" />
      <circle cx="62" cy="50" r="8" fill="#10B981" />
      <path d="M59 50L61 52L66 47" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CourseFinderIllustration() {
  return (
    <svg viewBox="0 0 80 64" fill="none" className="w-full h-full">
      <rect x="15" y="20" width="35" height="40" rx="3" fill="#FEF3C7" />
      <rect x="20" y="28" width="25" height="3" rx="1" fill="#F59E0B" />
      <rect x="20" y="35" width="20" height="2" rx="1" fill="#FCD34D" />
      <rect x="20" y="41" width="22" height="2" rx="1" fill="#FCD34D" />
      <rect x="20" y="47" width="18" height="2" rx="1" fill="#FCD34D" />
      <circle cx="55" cy="25" r="12" fill="#DBEAFE" />
      <circle cx="55" cy="25" r="6" fill="#3B82F6" />
      <rect x="63" y="33" width="3" height="12" rx="1" fill="#3B82F6" transform="rotate(45 63 33)" />
      <circle cx="60" cy="50" r="6" fill="#10B981" />
      <rect x="55" y="45" width="6" height="8" rx="1" fill="#FEF3C7" />
    </svg>
  );
}

export {
  ProgramCard,
  RankingCard,
  FindCollegesCard,
  CompareCollegesCard,
  ExamsCard,
  CollegePredictorCard,
  CourseFinderCard,
};
export default ProgramCard;

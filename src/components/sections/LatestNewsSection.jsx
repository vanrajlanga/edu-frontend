'use client';

import { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { NewsCard } from '../cards/NewsCard';

// Filter tabs configuration
const filterTabs = [
  { id: 'exam', label: 'Exam Alerts' },
  { id: 'college', label: 'College Alerts' },
  { id: 'admission', label: 'Admission Alerts' },
];

// Sample news data
const newsData = {
  exam: [
    {
      id: 'exam-1',
      title: 'AILET BA LLB 2026 Question Paper (Available) Download PDF',
      excerpt: 'AILET 2026 LLB Question Paper With Answer Key PDF Is Available For Download. NLU Delhi Has Conducted AILET 2026 On December 14, 2025.',
      date: 'Dec 15, 2025',
      category: 'exam',
      categoryLabel: 'Exam Alert',
      href: '/news/ailet-ba-llb-2026-question-paper',
    },
    {
      id: 'exam-2',
      title: 'JEE Main 2026 Registration Begins - Complete Guide',
      excerpt: 'NTA has started the registration process for JEE Main 2026. Check eligibility, application fee, and important dates here.',
      date: 'Dec 14, 2025',
      category: 'exam',
      categoryLabel: 'Exam Alert',
      href: '/news/jee-main-2026-registration',
    },
    {
      id: 'exam-3',
      title: 'NEET 2025 Result Declared - Check Scorecard Now',
      excerpt: 'NTA has announced NEET 2025 results. Over 24 lakh students appeared for the exam. Check how to download scorecard.',
      date: 'Dec 13, 2025',
      category: 'exam',
      categoryLabel: 'Exam Alert',
      href: '/news/neet-2025-result',
    },
    {
      id: 'exam-4',
      title: 'GATE 2025 Admit Card Released - Download Link',
      excerpt: 'IISc Bangalore has released GATE 2025 admit cards. Candidates can download from the official GOAPS portal.',
      date: 'Dec 12, 2025',
      category: 'exam',
      categoryLabel: 'Exam Alert',
      href: '/news/gate-2025-admit-card',
    },
    {
      id: 'exam-5',
      title: 'CAT 2025 Answer Key Released - Raise Objections',
      excerpt: 'IIM Calcutta has released the official CAT 2025 answer key. Candidates can raise objections until December 18.',
      date: 'Dec 11, 2025',
      category: 'exam',
      categoryLabel: 'Exam Alert',
      href: '/news/cat-2025-answer-key',
    },
  ],
  college: [
    {
      id: 'college-1',
      title: 'IIT Delhi Launches New B.Tech Program in AI & Data Science',
      excerpt: 'IIT Delhi has introduced a new undergraduate program focusing on Artificial Intelligence and Data Science from the 2026 academic session.',
      date: 'Dec 15, 2025',
      category: 'college',
      categoryLabel: 'College Update',
      href: '/news/iit-delhi-ai-program',
    },
    {
      id: 'college-2',
      title: 'Top 10 Engineering Colleges in India 2025 Ranking',
      excerpt: 'NIRF 2025 rankings are out. IIT Madras retains top position followed by IIT Delhi and IIT Bombay.',
      date: 'Dec 14, 2025',
      category: 'college',
      categoryLabel: 'College Update',
      href: '/news/top-engineering-colleges-2025',
    },
    {
      id: 'college-3',
      title: 'DU SOL Admission 2025 - Last Date Extended',
      excerpt: 'Delhi University School of Open Learning has extended the last date for admission to undergraduate programs.',
      date: 'Dec 13, 2025',
      category: 'college',
      categoryLabel: 'College Update',
      href: '/news/du-sol-admission-2025',
    },
    {
      id: 'college-4',
      title: 'BITS Pilani Introduces New M.Tech Specializations',
      excerpt: 'BITS Pilani announces four new M.Tech specializations in emerging technology domains for 2026.',
      date: 'Dec 12, 2025',
      category: 'college',
      categoryLabel: 'College Update',
      href: '/news/bits-pilani-mtech',
    },
  ],
  admission: [
    {
      id: 'admission-1',
      title: 'MBA Admission 2025 - Top B-Schools Still Accepting Applications',
      excerpt: 'Several top MBA colleges are still accepting applications for 2025 batch. Check the complete list and deadlines.',
      date: 'Dec 15, 2025',
      category: 'admission',
      categoryLabel: 'Admission Alert',
      href: '/news/mba-admission-2025',
    },
    {
      id: 'admission-2',
      title: 'CUET PG 2025 Registration Process - Step by Step Guide',
      excerpt: 'NTA has started CUET PG 2025 registration. Learn how to apply, fee structure, and document requirements.',
      date: 'Dec 14, 2025',
      category: 'admission',
      categoryLabel: 'Admission Alert',
      href: '/news/cuet-pg-2025-registration',
    },
    {
      id: 'admission-3',
      title: 'Medical Admission 2025 - Counselling Schedule Released',
      excerpt: 'MCC has released the counselling schedule for MBBS/BDS admissions 2025. Check important dates and rounds.',
      date: 'Dec 13, 2025',
      category: 'admission',
      categoryLabel: 'Admission Alert',
      href: '/news/medical-counselling-2025',
    },
    {
      id: 'admission-4',
      title: 'JoSAA 2025 Seat Allotment - Round 1 Results Out',
      excerpt: 'JoSAA has released Round 1 seat allotment for IITs, NITs, and GFTIs. Check your allotment status now.',
      date: 'Dec 12, 2025',
      category: 'admission',
      categoryLabel: 'Admission Alert',
      href: '/news/josaa-seat-allotment-2025',
    },
  ],
};

function LatestNewsSection({ className }) {
  const scrollContainerRef = useRef(null);
  const [activeTab, setActiveTab] = useState('exam');
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const currentNews = newsData[activeTab] || [];

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      // Reset scroll position when tab changes
      container.scrollLeft = 0;
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [activeTab]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 380;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className={cn('py-12 bg-slate-50', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Icon name="newspaper" size="lg" className="text-blue-900" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Latest News & Stories
            </h2>
          </div>

          {/* View All Link */}
          <a
            href="/news"
            className="inline-flex items-center gap-1 text-blue-900 hover:text-blue-950 font-medium text-sm group"
          >
            View all news
            <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap',
                'border-2 transition-all duration-200',
                activeTab === tab.id
                  ? 'bg-blue-900 text-white border-blue-600 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-900'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10',
                '-ml-4 lg:-ml-5',
                'w-10 h-10 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-blue-800 hover:border-blue-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronLeft" size="md" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {currentNews.map((news) => (
              <NewsCard
                key={news.id}
                title={news.title}
                excerpt={news.excerpt}
                date={news.date}
                category={news.category}
                categoryLabel={news.categoryLabel}
                href={news.href}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10',
                '-mr-4 lg:-mr-5',
                'w-10 h-10 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-blue-800 hover:border-blue-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="arrowRight" size="md" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export { LatestNewsSection };
export default LatestNewsSection;

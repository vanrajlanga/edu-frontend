'use client';

import { cn } from '@/lib/cn';
import ExamNewsCard from '@/components/cards/ExamNewsCard';
import { NewsletterWidget } from '@/components/widgets';
import UpcomingExamsWidget from '@/components/widgets/UpcomingExamsWidget';
import ExamsSyllabusWidget from '@/components/widgets/ExamsSyllabusWidget';

export default function ExamNewsSection() {
  const newsItems = [
    {
      title: 'MHT CET Registration Date 2026 Out Check Live Updates',
      date: 'January 6, 2026',
      image: null,
      href: '/news/mht-cet-registration-2026'
    },
    {
      title: 'JEE Main Admit Card Errors',
      date: 'January 6, 2026',
      image: null,
      href: '/news/jee-main-admit-card-errors'
    },
    {
      title: 'MHT CET 2026 Registration Begins Apply by January 20',
      date: 'January 6, 2026',
      image: null,
      href: '/news/mht-cet-2026-registration-begins'
    },
    {
      title: 'TS EAMCET PYQs for Magnetic Field with Solutions',
      date: 'January 5, 2026',
      image: null,
      href: '/news/ts-eamcet-pyqs-magnetic-field'
    },
    {
      title: 'Does MHT CET Have Negative Marking',
      date: 'January 5, 2026',
      image: null,
      href: '/news/mht-cet-negative-marking'
    },
    {
      title: 'NEET 2026 Application Form Released - Apply Now',
      date: 'January 5, 2026',
      image: null,
      href: '/news/neet-2026-application-form'
    },
    {
      title: 'CAT 2026 Exam Pattern Changed - Check New Updates',
      date: 'January 4, 2026',
      image: null,
      href: '/news/cat-2026-exam-pattern-changes'
    },
    {
      title: 'GATE 2026 Admit Card Download Process Starts',
      date: 'January 4, 2026',
      image: null,
      href: '/news/gate-2026-admit-card-download'
    },
    {
      title: 'CUET 2026 Syllabus Released - Subject-wise Details',
      date: 'January 3, 2026',
      image: null,
      href: '/news/cuet-2026-syllabus-released'
    },
    {
      title: 'JEE Advanced 2026 Eligibility Criteria Updated',
      date: 'January 3, 2026',
      image: null,
      href: '/news/jee-advanced-2026-eligibility'
    }
  ];

  // Show only first 6 news items
  const displayedNews = newsItems.slice(0, 6);

  return (
    <div className="space-y-5">
      {/* Section Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Exams News
        </h2>
      </div>

      {/* News List - Limited to 6 items */}
      <div className="space-y-2">
        {displayedNews.map((news, index) => (
          <ExamNewsCard key={index} news={news} />
        ))}
      </div>

      {/* View All News Button */}
      <div>
        <a
          href="/exams/news"
          className={cn(
            'block w-full text-center',
            'px-6 py-2 rounded-lg',
            'bg-white border-2 border-green-600',
            'text-green-600 font-semibold text-sm',
            'hover:bg-green-600 hover:text-white',
            'transition-all duration-200'
          )}
        >
          View All News
        </a>
      </div>

      {/* Newsletter Widget */}
      <NewsletterWidget />

      {/* Upcoming Exams Widget */}
      <UpcomingExamsWidget />

      {/* Exams Syllabus Widget */}
      <ExamsSyllabusWidget />
    </div>
  );
}

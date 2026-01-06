'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { ExamCard } from '@/components/cards';
import { Icon } from '@/components/ui';

export default function ExamCategorySection() {
  const [activeCategory, setActiveCategory] = useState('Engineering');
  const [showAllCategories, setShowAllCategories] = useState(false);

  const categories = [
    'Engineering', 'Medical', 'Management', 'Science', 'Law', 'Pharmacy',
    'Computer Applications', 'Arts', 'Education', 'Design', 'Architecture',
    'Commerce', 'Paramedical', 'Dental', 'Class 12 Exams', 'Agriculture',
    'Class 10 Exams', 'Hotel Management', 'Veterinary Sciences',
    'Vocational Courses', 'Study Abroad Exams', 'Mass Communications',
    'Aviation', 'Animation'
  ];

  const displayedCategories = showAllCategories ? categories : categories.slice(0, 7);

  const exams = [
    {
      name: 'CUET 2025',
      fullName: 'Common Universities Entrance Test',
      icon: 'cuet',
      mode: 'Offline',
      examDate: '11 May 26 - 31 May 26',
      applicationForm: '03 Jan 26 - 30 Jan 26',
      resultAnnounce: '04 Jul 26',
      applicationHref: '/exams/cuet/application',
      examPatternHref: '/exams/cuet/pattern',
      previousYearPaperHref: '/exams/cuet/previous-papers',
      applyNowHref: '/exams/cuet/apply'
    },
    {
      name: 'JEE Advanced 2026',
      fullName: 'Joint Entrance Examination',
      icon: 'jee',
      mode: 'Online',
      examDate: '17 May 26',
      applicationForm: '23 Apr 26 - 02 May 26',
      resultAnnounce: '01 Jun 26',
      applicationHref: '/exams/jee-advanced/application',
      examPatternHref: '/exams/jee-advanced/pattern',
      previousYearPaperHref: '/exams/jee-advanced/previous-papers',
      applyNowHref: '/exams/jee-advanced/apply'
    },
    {
      name: 'NEET 2026',
      fullName: 'National Eligibility cum Entrance Test',
      icon: 'neet',
      mode: 'Offline',
      examDate: '04 May 26',
      applicationForm: '15 Feb 26 - 15 Mar 26',
      resultAnnounce: '05 Jun 26',
      applicationHref: '/exams/neet/application',
      examPatternHref: '/exams/neet/pattern',
      previousYearPaperHref: '/exams/neet/previous-papers',
      applyNowHref: '/exams/neet/apply'
    },
    {
      name: 'CAT 2026',
      fullName: 'Common Admission Test',
      icon: 'cat',
      mode: 'Online',
      examDate: '29 Nov 26',
      applicationForm: '01 Aug 26 - 20 Sep 26',
      resultAnnounce: '02 Jan 27',
      applicationHref: '/exams/cat/application',
      examPatternHref: '/exams/cat/pattern',
      previousYearPaperHref: '/exams/cat/previous-papers',
      applyNowHref: '/exams/cat/apply'
    },
    {
      name: 'GATE 2026',
      fullName: 'Graduate Aptitude Test in Engineering',
      icon: 'gate',
      mode: 'Online',
      examDate: '01 Feb 26 - 16 Feb 26',
      applicationForm: '25 Aug 25 - 26 Sep 25',
      resultAnnounce: '19 Mar 26',
      applicationHref: '/exams/gate/application',
      examPatternHref: '/exams/gate/pattern',
      previousYearPaperHref: '/exams/gate/previous-papers',
      applyNowHref: '/exams/gate/apply'
    },
    {
      name: 'UPSC CSE 2026',
      fullName: 'Civil Services Examination',
      icon: 'upsc',
      mode: 'Offline',
      examDate: '31 May 26',
      applicationForm: '18 Feb 26 - 10 Mar 26',
      resultAnnounce: '15 Jun 27',
      applicationHref: '/exams/upsc-cse/application',
      examPatternHref: '/exams/upsc-cse/pattern',
      previousYearPaperHref: '/exams/upsc-cse/previous-papers',
      applyNowHref: '/exams/upsc-cse/apply'
    },
    {
      name: 'JEE Main 2026',
      fullName: 'Joint Entrance Examination Main',
      icon: 'jee',
      mode: 'Online',
      examDate: '22 Jan 26 - 31 Jan 26',
      applicationForm: '01 Nov 25 - 30 Nov 25',
      resultAnnounce: '12 Feb 26',
      applicationHref: '/exams/jee-main/application',
      examPatternHref: '/exams/jee-main/pattern',
      previousYearPaperHref: '/exams/jee-main/previous-papers',
      applyNowHref: '/exams/jee-main/apply'
    },
    {
      name: 'CLAT 2026',
      fullName: 'Common Law Admission Test',
      icon: 'default',
      mode: 'Online',
      examDate: '06 Dec 26',
      applicationForm: '15 Jul 26 - 15 Oct 26',
      resultAnnounce: '31 Dec 26',
      applicationHref: '/exams/clat/application',
      examPatternHref: '/exams/clat/pattern',
      previousYearPaperHref: '/exams/clat/previous-papers',
      applyNowHref: '/exams/clat/apply'
    }
  ];

  // Show only first 6 exams initially
  const displayedExams = exams.slice(0, 6);

  return (
    <div>
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Exams Category
        </h2>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {displayedCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-medium',
                'border transition-all duration-200',
                activeCategory === category
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50'
              )}
            >
              {category}
            </button>
          ))}

          {/* Show More/Less Button */}
          <button
            onClick={() => setShowAllCategories(!showAllCategories)}
            className={cn(
              'px-4 py-2 rounded-full text-xs font-semibold',
              'text-green-600 hover:text-green-700',
              'transition-colors duration-200'
            )}
          >
            {showAllCategories ? 'View Less' : 'View More'}
          </button>
        </div>
      </div>

      {/* Exam Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedExams.map((exam, index) => (
          <ExamCard
            key={index}
            {...exam}
            variant="detailed"
            showApplyButton={true}
          />
        ))}
      </div>

      {/* View All Category Exams Link */}
      <div className="mt-6 text-center">
        <a
          href={`/exams/${activeCategory.toLowerCase().replace(/\s+/g, '-')}`}
          className={cn(
            'inline-flex items-center gap-2',
            'text-green-600 hover:text-green-700',
            'font-semibold text-sm',
            'transition-colors duration-200'
          )}
        >
          <span>View All {activeCategory} Exams</span>
          <Icon name="chevronRight" size="sm" />
        </a>
      </div>
    </div>
  );
}

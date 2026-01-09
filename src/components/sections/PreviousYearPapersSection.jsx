'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/cn';
import PreviousYearPaperCard from '@/components/cards/PreviousYearPaperCard';
import { Icon } from '@/components/ui';

export default function PreviousYearPapersSection() {
  const [activeExam, setActiveExam] = useState('JEE Main');
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollRef = useRef(null);

  const exams = [
    { name: 'JEE Main', icon: 'jee' },
    { name: 'NEET', icon: 'neet' },
    { name: 'CAT', icon: 'cat' },
    { name: 'GATE', icon: 'gate' },
    { name: 'JEE Advanced', icon: 'jee' },
    { name: 'CUET', icon: 'cuet' }
  ];

  // Papers data for each exam
  const papersData = {
    'JEE Main': [
      {
        title: 'Waves Weightage in JEE Main 2026 Must Do Topics and Easy Tips',
        examIcon: 'jee',
        href: '/papers/jee-main/waves-weightage-2026'
      },
      {
        title: 'JEE Main 2023 Question Paper April 15 Shift 1',
        examIcon: 'jee',
        href: '/papers/jee-main/2023-april-15-shift-1'
      },
      {
        title: 'JEE Main 2025 Shift Wise Marks vs Percentile Key Trends',
        examIcon: 'jee',
        href: '/papers/jee-main/2025-shift-wise-marks'
      },
      {
        title: 'JEE Main 2023 Question Paper Jan 29 Shift 2',
        examIcon: 'jee',
        href: '/papers/jee-main/2023-jan-29-shift-2'
      },
      {
        title: 'JEE Main 2024 Question Paper Jan 27 Shift 1',
        examIcon: 'jee',
        href: '/papers/jee-main/2024-jan-27-shift-1'
      },
      {
        title: 'JEE Main 2023 Question Paper April 10 Shift 2',
        examIcon: 'jee',
        href: '/papers/jee-main/2023-april-10-shift-2'
      }
    ],
    'NEET': [
      {
        title: 'NEET 2025 Question Paper with Answer Key and Solutions',
        examIcon: 'neet',
        href: '/papers/neet/2025-question-paper'
      },
      {
        title: 'NEET 2024 Question Paper Code P1 with Solutions',
        examIcon: 'neet',
        href: '/papers/neet/2024-code-p1'
      },
      {
        title: 'NEET 2023 Question Paper Analysis and Answer Key',
        examIcon: 'neet',
        href: '/papers/neet/2023-analysis'
      },
      {
        title: 'NEET Biology Previous Year Questions Chapter Wise',
        examIcon: 'neet',
        href: '/papers/neet/biology-chapter-wise'
      },
      {
        title: 'NEET Physics Previous Year Questions with Solutions',
        examIcon: 'neet',
        href: '/papers/neet/physics-pyqs'
      },
      {
        title: 'NEET Chemistry Organic Chapter Wise Questions',
        examIcon: 'neet',
        href: '/papers/neet/chemistry-organic'
      }
    ],
    'CAT': [
      {
        title: 'CAT 2024 Question Paper Slot 1 with Detailed Solutions',
        examIcon: 'cat',
        href: '/papers/cat/2024-slot-1'
      },
      {
        title: 'CAT 2023 Question Paper Slot 2 Analysis',
        examIcon: 'cat',
        href: '/papers/cat/2023-slot-2'
      },
      {
        title: 'CAT Quantitative Aptitude Previous 10 Years Questions',
        examIcon: 'cat',
        href: '/papers/cat/quant-10-years'
      },
      {
        title: 'CAT Verbal Ability Reading Comprehension PYQs',
        examIcon: 'cat',
        href: '/papers/cat/varc-pyqs'
      },
      {
        title: 'CAT Data Interpretation Logical Reasoning Papers',
        examIcon: 'cat',
        href: '/papers/cat/dilr-papers'
      },
      {
        title: 'CAT 2022 Question Paper with Video Solutions',
        examIcon: 'cat',
        href: '/papers/cat/2022-video-solutions'
      }
    ],
    'GATE': [
      {
        title: 'GATE 2025 Computer Science Question Paper',
        examIcon: 'gate',
        href: '/papers/gate/2025-cs'
      },
      {
        title: 'GATE 2024 ECE Question Paper with Solutions',
        examIcon: 'gate',
        href: '/papers/gate/2024-ece'
      },
      {
        title: 'GATE Mechanical Engineering Previous Year Papers',
        examIcon: 'gate',
        href: '/papers/gate/mechanical-pyqs'
      },
      {
        title: 'GATE Civil Engineering Last 10 Years Papers',
        examIcon: 'gate',
        href: '/papers/gate/civil-10-years'
      },
      {
        title: 'GATE 2023 Electrical Engineering Question Paper',
        examIcon: 'gate',
        href: '/papers/gate/2023-ee'
      },
      {
        title: 'GATE Mathematics Previous Year Questions Topic Wise',
        examIcon: 'gate',
        href: '/papers/gate/maths-topic-wise'
      }
    ],
    'JEE Advanced': [
      {
        title: 'JEE Advanced 2025 Paper 1 with Detailed Solutions',
        examIcon: 'jee',
        href: '/papers/jee-advanced/2025-paper-1'
      },
      {
        title: 'JEE Advanced 2024 Paper 2 Question Paper',
        examIcon: 'jee',
        href: '/papers/jee-advanced/2024-paper-2'
      },
      {
        title: 'JEE Advanced Physics Previous 10 Years Chapter Wise',
        examIcon: 'jee',
        href: '/papers/jee-advanced/physics-10-years'
      },
      {
        title: 'JEE Advanced Chemistry Organic Questions',
        examIcon: 'jee',
        href: '/papers/jee-advanced/chemistry-organic'
      },
      {
        title: 'JEE Advanced Mathematics Topic Wise PYQs',
        examIcon: 'jee',
        href: '/papers/jee-advanced/maths-topic-wise'
      },
      {
        title: 'JEE Advanced 2023 Both Papers with Answer Key',
        examIcon: 'jee',
        href: '/papers/jee-advanced/2023-both-papers'
      }
    ],
    'CUET': [
      {
        title: 'CUET 2025 Question Paper with Answer Key',
        examIcon: 'cuet',
        href: '/papers/cuet/2025-question-paper'
      },
      {
        title: 'CUET General Test Previous Year Questions',
        examIcon: 'cuet',
        href: '/papers/cuet/general-test-pyqs'
      },
      {
        title: 'CUET English Language Previous Papers',
        examIcon: 'cuet',
        href: '/papers/cuet/english-papers'
      },
      {
        title: 'CUET Domain Subject Mathematics Question Papers',
        examIcon: 'cuet',
        href: '/papers/cuet/maths-papers'
      },
      {
        title: 'CUET 2024 All Shifts Question Papers',
        examIcon: 'cuet',
        href: '/papers/cuet/2024-all-shifts'
      },
      {
        title: 'CUET Physics Domain Subject PYQs',
        examIcon: 'cuet',
        href: '/papers/cuet/physics-pyqs'
      }
    ]
  };

  const currentPapers = papersData[activeExam] || [];

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      setIsScrolled(scrollLeft > 10);
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Top {activeExam} Previous Year Paper
        </h2>

        {/* Exam Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {exams.map((exam) => (
            <button
              key={exam.name}
              onClick={() => {
                setActiveExam(exam.name);
                setIsScrolled(false); // Reset scroll state when changing exam
              }}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium',
                'border transition-all duration-200',
                activeExam === exam.name
                  ? 'bg-white text-blue-600 border-blue-600 shadow-sm'
                  : 'bg-gray-100 text-gray-700 border-transparent hover:bg-white hover:border-gray-200'
              )}
            >
              {exam.name}
            </button>
          ))}
        </div>
      </div>

      {/* Carousel Container with Navigation */}
      <div className="relative">
        {/* Left Navigation Button - Conditional */}
        {isScrolled && (
          <button
            onClick={() => scroll('left')}
            className={cn(
              'absolute -left-3 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-white border-2 border-gray-300',
              'hover:border-blue-600 hover:bg-blue-50',
              'shadow-lg hover:shadow-xl',
              'transition-all duration-200',
              'flex items-center justify-center'
            )}
            aria-label="Scroll left"
          >
            <Icon name="chevronLeft" size="md" className="text-gray-700" />
          </button>
        )}

        {/* Scrollable Papers */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {currentPapers.map((paper, index) => (
            <PreviousYearPaperCard key={index} paper={paper} />
          ))}
        </div>

        {/* Right Navigation Button - Floating */}
        <button
          onClick={() => scroll('right')}
          className={cn(
            'absolute -right-3 top-1/2 -translate-y-1/2 z-10',
            'w-10 h-10 rounded-full',
            'bg-white border-2 border-gray-300',
            'hover:border-blue-600 hover:bg-blue-50',
            'shadow-lg hover:shadow-xl',
            'transition-all duration-200',
            'flex items-center justify-center'
          )}
          aria-label="Scroll right"
        >
          <Icon name="chevronRight" size="md" className="text-gray-700" />
        </button>
      </div>
    </div>
  );
}

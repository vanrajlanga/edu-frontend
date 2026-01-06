'use client';

import { useState, useRef } from 'react';
import { cn } from '@/lib/cn';
import ArticleCard from '@/components/cards/ArticleCard';
import { Icon } from '@/components/ui';

export default function ConceptArticlesSection() {
  const [activeSubject, setActiveSubject] = useState('Mathematics');
  const [class10Scrolled, setClass10Scrolled] = useState(false);
  const [class12Scrolled, setClass12Scrolled] = useState(false);
  const class10Ref = useRef(null);
  const class12Ref = useRef(null);

  const subjects = ['Mathematics', 'Physics', 'Biology', 'Chemistry'];

  // Handle scroll position detection
  const handleScroll = (ref, setScrolled) => {
    if (ref.current) {
      const scrollLeft = ref.current.scrollLeft;
      setScrolled(scrollLeft > 10); // Show left arrow if scrolled more than 10px
    }
  };

  const class10Articles = [
    {
      title: 'NCERT Class 10 Maths Book PDF Download',
      href: '/articles/ncert-class-10-maths-pdf'
    },
    {
      title: 'Important MCQs on Coordinate Geometry with Explanation',
      href: '/articles/coordinate-geometry-mcqs'
    },
    {
      title: 'Number System MCQs with Answers',
      href: '/articles/number-system-mcqs'
    },
    {
      title: 'Statistics: Mean, Median, Variance and Cumulative Frequency',
      href: '/articles/statistics-concepts'
    },
    {
      title: 'Real Numbers Chapter Concepts and Practice Questions',
      href: '/articles/real-numbers-concepts'
    },
    {
      title: 'Polynomial Formula Sheet with Solved Examples',
      href: '/articles/polynomial-formulas'
    }
  ];

  const class12Articles = [
    {
      title: 'An Introduction to T-Test: Formula and Solved Examples',
      href: '/articles/t-test-introduction'
    },
    {
      title: '30000 in Words: Write 30000 in Words, 30000 Spelling',
      href: '/articles/30000-in-words'
    },
    {
      title: 'Complex Numbers and Quadratic Equations MCQs',
      href: '/articles/complex-numbers-mcqs'
    },
    {
      title: '150000 in Words: Write 150000 in Words, 150000 Spelling',
      href: '/articles/150000-in-words'
    },
    {
      title: 'Matrices and Determinants Important Formulas',
      href: '/articles/matrices-determinants'
    },
    {
      title: 'Integration Techniques and Practice Problems',
      href: '/articles/integration-techniques'
    }
  ];

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      {/* Section Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Concept Articles
        </h2>

        {/* Subject Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => setActiveSubject(subject)}
              className={cn(
                'px-5 py-2.5 rounded-full text-sm font-medium',
                'border transition-all duration-200',
                activeSubject === subject
                  ? 'bg-white text-green-600 border-green-600 shadow-sm'
                  : 'bg-gray-100 text-gray-700 border-transparent hover:bg-white hover:border-gray-200'
              )}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Top Class 10 Concept Articles */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Top Class 10 Concept Articles
          </h3>
        </div>

        {/* Carousel Container with Navigation */}
        <div className="relative">
          {/* Left Navigation Button - Conditional */}
          {class10Scrolled && (
            <button
              onClick={() => scroll(class10Ref, 'left')}
              className={cn(
                'absolute -left-3 top-1/2 -translate-y-1/2 z-10',
                'w-10 h-10 rounded-full',
                'bg-white border-2 border-gray-300',
                'hover:border-green-600 hover:bg-green-50',
                'shadow-lg hover:shadow-xl',
                'transition-all duration-200',
                'flex items-center justify-center'
              )}
              aria-label="Scroll left"
            >
              <Icon name="chevronLeft" size="md" className="text-gray-700" />
            </button>
          )}

          {/* Scrollable Articles */}
          <div
            ref={class10Ref}
            onScroll={() => handleScroll(class10Ref, setClass10Scrolled)}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {class10Articles.map((article, index) => (
              <ArticleCard key={index} article={article} index={index} />
            ))}
          </div>

          {/* Right Navigation Button - Floating */}
          <button
            onClick={() => scroll(class10Ref, 'right')}
            className={cn(
              'absolute -right-3 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-white border-2 border-gray-300',
              'hover:border-green-600 hover:bg-green-50',
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

      {/* Top Class 12 Concept Articles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">
            Top Class 12 Concept Articles
          </h3>
        </div>

        {/* Carousel Container with Navigation */}
        <div className="relative">
          {/* Left Navigation Button - Conditional */}
          {class12Scrolled && (
            <button
              onClick={() => scroll(class12Ref, 'left')}
              className={cn(
                'absolute -left-3 top-1/2 -translate-y-1/2 z-10',
                'w-10 h-10 rounded-full',
                'bg-white border-2 border-gray-300',
                'hover:border-green-600 hover:bg-green-50',
                'shadow-lg hover:shadow-xl',
                'transition-all duration-200',
                'flex items-center justify-center'
              )}
              aria-label="Scroll left"
            >
              <Icon name="chevronLeft" size="md" className="text-gray-700" />
            </button>
          )}

          {/* Scrollable Articles */}
          <div
            ref={class12Ref}
            onScroll={() => handleScroll(class12Ref, setClass12Scrolled)}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {class12Articles.map((article, index) => (
              <ArticleCard key={index} article={article} index={index} />
            ))}
          </div>

          {/* Right Navigation Button - Floating */}
          <button
            onClick={() => scroll(class12Ref, 'right')}
            className={cn(
              'absolute -right-3 top-1/2 -translate-y-1/2 z-10',
              'w-10 h-10 rounded-full',
              'bg-white border-2 border-gray-300',
              'hover:border-green-600 hover:bg-green-50',
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
    </div>
  );
}

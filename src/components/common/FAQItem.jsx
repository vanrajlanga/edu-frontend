'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

export default function FAQItem({ faq, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const { question, answer, author, date } = faq;

  return (
    <div
      className={cn(
        'border-b border-gray-200 last:border-0',
        className
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full py-5 flex items-start justify-between gap-4',
          'text-left hover:bg-gray-50',
          'transition-colors duration-200',
          'group'
        )}
      >
        <div className="flex-1 min-w-0">
          {/* Question */}
          <h3 className={cn(
            'text-base font-semibold text-gray-900 mb-2',
            'group-hover:text-green-700 transition-colors'
          )}>
            {question}
          </h3>

          {/* Author and Date */}
          <p className="text-sm text-gray-600">
            Top Answer By <span className="font-medium">{author}</span> on {date}
          </p>
        </div>

        {/* Expand/Collapse Icon */}
        <div className={cn(
          'flex-shrink-0 mt-1',
          'transition-transform duration-200',
          isOpen && 'rotate-45'
        )}>
          <div className={cn(
            'w-6 h-6 flex items-center justify-center',
            'text-gray-400 group-hover:text-green-600',
            'transition-colors duration-200'
          )}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="10" y1="5" x2="10" y2="15" />
              <line x1="5" y1="10" x2="15" y2="10" />
            </svg>
          </div>
        </div>
      </button>

      {/* Answer - Expandable */}
      {isOpen && (
        <div className="pb-5 px-1 animate-fadeIn">
          <div className={cn(
            'bg-green-50 rounded-lg p-4',
            'border-l-4 border-green-600'
          )}>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              {answer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

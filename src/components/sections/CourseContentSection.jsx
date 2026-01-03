'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * CourseContentSection - Displays collapsible rich text content for course listing pages
 * Content is managed via the admin panel's rich text editor
 */
export default function CourseContentSection({ content }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content || !content.full_content) return null;

  const { full_content, author, updated_at } = content;

  // Format the updated date
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMonths = Math.floor((now - date) / (1000 * 60 * 60 * 24 * 30));

    if (diffMonths < 1) return 'Updated recently';
    if (diffMonths === 1) return 'Updated 1 month ago';
    return `Updated ${diffMonths}+ months ago`;
  };

  // Extract a preview from full_content (first 300 characters of text)
  const getPreview = (html) => {
    const div = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (div) {
      div.innerHTML = html;
      const text = div.textContent || div.innerText || '';
      return text.substring(0, 300) + (text.length > 300 ? '...' : '');
    }
    // Server-side fallback: strip HTML tags
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    return text.substring(0, 300) + (text.length > 300 ? '...' : '');
  };

  return (
    <div className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Author Info */}
        {author && (
          <div className="flex items-center gap-3 mb-4">
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-200">
              {author.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500 text-lg font-semibold">
                  {author.name?.charAt(0)}
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-orange-600 font-medium text-sm">{author.name}</span>
                {author.is_verified && (
                  <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <p className="text-xs text-gray-500">
                {author.designation} | {formatDate(updated_at)}
              </p>
            </div>
          </div>
        )}

        {/* Content Preview (collapsed state) */}
        {!isExpanded && (
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {getPreview(full_content)}
          </p>
        )}

        {/* Full Content (expanded state) */}
        {isExpanded && (
          <div className="animate-fadeIn">
            <div
              className="prose prose-sm max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-orange-600 prose-strong:text-gray-900 prose-table:border-collapse prose-th:border prose-th:border-gray-200 prose-th:bg-gray-50 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-gray-200 prose-td:px-4 prose-td:py-2 prose-ul:list-disc prose-ol:list-decimal"
              dangerouslySetInnerHTML={{ __html: full_content }}
            />
          </div>
        )}

        {/* Read More / Read Less Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2 text-sm font-medium text-orange-600 border border-orange-600 rounded-full hover:bg-orange-50 transition-colors"
          >
            {isExpanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  );
}

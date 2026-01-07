'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCompare } from '@/context/CompareContext';
import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import { NewsletterSection } from '@/components/sections';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/cn';

// Breadcrumb items
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Compare Colleges', href: '/compare' },
];

// Format currency
function formatCurrency(value) {
  if (!value) return '-';
  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(2)} Lakhs`;
  }
  return `₹${value.toLocaleString()}`;
}

// Format percentage
function formatPercentage(value) {
  if (!value && value !== 0) return '-';
  return `${value}%`;
}

// Comparison Row Component
function CompareRow({ label, values, highlight = false, formatter = (v) => v || '-' }) {
  return (
    <tr className={cn(highlight && 'bg-orange-50')}>
      <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 sticky left-0">
        {label}
      </td>
      {values.map((value, index) => (
        <td key={index} className="px-4 py-3 text-sm text-center border-r border-gray-200 last:border-r-0">
          {formatter(value)}
        </td>
      ))}
    </tr>
  );
}

// Star Rating Component
function StarRating({ rating, reviewCount }) {
  if (!rating) return <span className="text-gray-400">-</span>;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1">
        <Icon name="star" size="sm" className="text-amber-500 fill-amber-500" />
        <span className="font-semibold">{rating.toFixed(1)}</span>
        <span className="text-gray-400">/5</span>
      </div>
      {reviewCount > 0 && (
        <span className="text-xs text-gray-500">({reviewCount} reviews)</span>
      )}
    </div>
  );
}

export default function ComparePage() {
  const { colleges, removeCollege, clearAll, count, maxColleges } = useCompare();
  const [isClient, setIsClient] = useState(false);

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Show loading during hydration
  if (!isClient) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <div className="fixed top-16 left-0 right-0 z-40">
          <Navbar />
          <NewsTicker />
        </div>
        <div className="pt-36 flex items-center justify-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Navigation Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Navbar />
        <NewsTicker />
      </div>

      {/* Page Content */}
      <div className="pt-36 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                {index > 0 && <Icon name="chevronRight" size="xs" className="text-gray-400" />}
                <Link
                  href={item.href}
                  className={cn(
                    'hover:text-orange-600 transition-colors',
                    index === breadcrumbItems.length - 1
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  )}
                >
                  {item.label}
                </Link>
              </span>
            ))}
          </nav>
        </div>

        {/* Page Header */}
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
              <p className="text-gray-600 mt-1">
                Compare up to {maxColleges} colleges side by side
              </p>
            </div>
            {count > 0 && (
              <button
                onClick={clearAll}
                className="text-red-600 hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium flex items-center gap-2"
              >
                <Icon name="close" size="sm" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {count === 0 && (
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Icon name="compare" size="xl" className="text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No Colleges to Compare</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Browse colleges and add them to your compare list to see a detailed side-by-side comparison.
              </p>
              <Link
                href="/universities-colleges"
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Icon name="search" size="sm" />
                Browse Colleges
              </Link>
            </div>
          </div>
        )}

        {/* Comparison Content */}
        {count > 0 && (
          <div className="max-w-7xl mx-auto px-4">
            {/* College Headers */}
            <div className="bg-white rounded-t-xl shadow-sm border border-gray-200 border-b-0">
              <div className="grid" style={{ gridTemplateColumns: `200px repeat(${count}, 1fr)` }}>
                {/* Empty cell for row labels */}
                <div className="p-4 border-r border-gray-200 bg-gray-50" />

                {/* College Cards */}
                {colleges.map((college) => (
                  <div key={college.id} className="p-4 border-r border-gray-200 last:border-r-0">
                    <div className="flex flex-col items-center text-center">
                      {/* Remove Button */}
                      <button
                        onClick={() => removeCollege(college.id)}
                        className="self-end p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors mb-2"
                        title="Remove from compare"
                      >
                        <Icon name="close" size="sm" />
                      </button>

                      {/* Logo */}
                      {college.logo ? (
                        <img
                          src={college.logo}
                          alt={college.name}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200 mb-3"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-green-50 to-green-100 border border-green-200 flex items-center justify-center mb-3">
                          <span className="text-green-700 font-bold text-xl">
                            {college.name?.charAt(0)}
                          </span>
                        </div>
                      )}

                      {/* Name */}
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="font-semibold text-gray-900 hover:text-orange-600 transition-colors line-clamp-2"
                      >
                        {college.name}
                      </Link>

                      {/* Location */}
                      <p className="text-sm text-gray-500 mt-1">{college.location}</p>

                      {/* View Details Link */}
                      <Link
                        href={`/colleges/${college.slug}`}
                        className="text-sm text-orange-600 hover:text-orange-700 mt-2 flex items-center gap-1"
                      >
                        View Details
                        <Icon name="arrowRight" size="xs" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-b-xl shadow-sm border border-gray-200 overflow-x-auto">
              <table className="w-full">
                <tbody>
                  {/* Basic Info Section */}
                  <tr className="bg-gray-100">
                    <td
                      colSpan={count + 1}
                      className="px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      Basic Information
                    </td>
                  </tr>
                  <CompareRow
                    label="College Type"
                    values={colleges.map((c) => c.collegeType)}
                  />
                  <CompareRow
                    label="Ownership"
                    values={colleges.map((c) => c.ownership)}
                  />
                  <CompareRow
                    label="Course"
                    values={colleges.map((c) => c.courseName)}
                  />

                  {/* Fees Section */}
                  <tr className="bg-gray-100">
                    <td
                      colSpan={count + 1}
                      className="px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      Fees
                    </td>
                  </tr>
                  <CompareRow
                    label="Course Fees"
                    values={colleges.map((c) => c.courseFees)}
                    formatter={formatCurrency}
                    highlight
                  />

                  {/* Placement Section */}
                  <tr className="bg-gray-100">
                    <td
                      colSpan={count + 1}
                      className="px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      Placements
                    </td>
                  </tr>
                  <CompareRow
                    label="Average Package"
                    values={colleges.map((c) => c.avgPackage)}
                    formatter={formatCurrency}
                    highlight
                  />
                  <CompareRow
                    label="Highest Package"
                    values={colleges.map((c) => c.highestPackage)}
                    formatter={formatCurrency}
                  />
                  <CompareRow
                    label="Placement Rate"
                    values={colleges.map((c) => c.placementRate)}
                    formatter={formatPercentage}
                  />

                  {/* Ratings Section */}
                  <tr className="bg-gray-100">
                    <td
                      colSpan={count + 1}
                      className="px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      Ratings & Reviews
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 sticky left-0">
                      User Rating
                    </td>
                    {colleges.map((college, index) => (
                      <td key={index} className="px-4 py-3 text-sm text-center border-r border-gray-200 last:border-r-0">
                        <StarRating rating={college.rating} reviewCount={college.reviewCount} />
                      </td>
                    ))}
                  </tr>

                  {/* Rankings Section */}
                  <tr className="bg-gray-100">
                    <td
                      colSpan={count + 1}
                      className="px-4 py-2 text-sm font-semibold text-gray-700"
                    >
                      Rankings
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 border-r border-gray-200 sticky left-0">
                      Top Ranking
                    </td>
                    {colleges.map((college, index) => (
                      <td key={index} className="px-4 py-3 text-sm text-center border-r border-gray-200 last:border-r-0">
                        {college.rankings?.[0] ? (
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-orange-600">
                              #{college.rankings[0].rank}
                            </span>
                            <span className="text-xs text-gray-500">
                              {college.rankings[0].agency} {college.rankings[0].year}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Add More Colleges */}
            {count < maxColleges && (
              <div className="mt-6 text-center">
                <Link
                  href="/universities-colleges"
                  className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium"
                >
                  <Icon name="plus" size="sm" />
                  Add More Colleges ({maxColleges - count} remaining)
                </Link>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={() => {
                  const url = window.location.href;
                  navigator.clipboard.writeText(url);
                  alert('Link copied to clipboard!');
                }}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                <Icon name="link" size="sm" />
                Share Comparison
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                <Icon name="download" size="sm" />
                Download PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

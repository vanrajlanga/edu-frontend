'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import { fetchCollegeBySlug } from '@/lib/api';
import { ApplyNowModal } from '@/components/college';

// Format currency in Lakhs/Crores
const formatCurrency = (amount) => {
  if (!amount) return null;
  const num = parseFloat(amount);
  if (num >= 10000000) {
    return `${(num / 10000000).toFixed(2)} Cr`;
  } else if (num >= 100000) {
    return `${(num / 100000).toFixed(2)} L`;
  }
  return `${num.toLocaleString('en-IN')}`;
};

// Map tab IDs to URL slugs
const tabUrlMapping = {
  'overview': '',
  'courses': 'courses-fees',
  'admission': 'admission',
  'cutoff': 'cutoff',
  'placements': 'placement',
  'reviews': 'reviews',
  'department': 'department',
  'rankings': 'ranking',
  'gallery': 'gallery',
  'scholarships': 'scholarship',
  'faculty': 'faculty',
  'news': 'news',
  'hostel': 'hostel',
  'qna': 'qna',
  'compare': 'compare',
  'profile': 'profile',
};

export default function CollegeDetailClient({ slug, initialTab = 'overview' }) {
  const [college, setCollege] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const activeTab = initialTab;

  useEffect(() => {
    async function loadCollege() {
      try {
        setLoading(true);
        const data = await fetchCollegeBySlug(slug);
        setCollege(data);
      } catch (error) {
        console.error('Error fetching college:', error);
      } finally {
        setLoading(false);
      }
    }

    if (slug) {
      loadCollege();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="fixed top-16 left-0 right-0 z-40">
          <Navbar />
          <NewsTicker />
        </div>
        <div className="pt-36 flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!college) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="fixed top-16 left-0 right-0 z-40">
          <Navbar />
          <NewsTicker />
        </div>
        <div className="pt-36 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
            <p className="text-gray-600 mb-6">College not found</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Go back home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Info' },
    { id: 'courses', label: 'Courses & Fees' },
    { id: 'admission', label: 'Admission' },
    { id: 'cutoff', label: 'Cutoff' },
    { id: 'placements', label: 'Placement' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'department', label: 'Department' },
    { id: 'rankings', label: 'Ranking' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'scholarships', label: 'Scholarship' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'news', label: 'News & Articles' },
    { id: 'hostel', label: 'Hostel' },
    { id: 'qna', label: 'Q&A' },
    { id: 'compare', label: 'College Compare' },
    { id: 'profile', label: 'Profile' },
  ];

  const topRanking = college.rankings?.[0];

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="fixed top-16 left-0 right-0 z-40">
        <Navbar />
        <NewsTicker />
      </div>

      {/* Page Content */}
      <div className="pt-36">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <nav className="flex text-sm text-gray-500">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/universities-colleges" className="hover:text-blue-600">Colleges</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{college.college_name}</span>
            </nav>
          </div>
        </div>

        {/* College Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="flex-shrink-0">
                {college.logo_url ? (
                  <img
                    src={college.logo_url}
                    alt={college.college_name}
                    className="w-24 h-24 rounded-lg object-cover border"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-lg bg-blue-100 flex items-center justify-center border">
                    <span className="text-2xl font-bold text-blue-600">
                      {college.short_name?.substring(0, 2) || college.college_name?.substring(0, 2)}
                    </span>
                  </div>
                )}
              </div>

              {/* College Info */}
              <div className="flex-1">
                <div className="flex flex-wrap items-start gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {college.college_name}
                  </h1>
                  {college.is_verified && (
                    <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {college.city}{college.state ? `, ${college.state}` : ''}
                  </span>
                  {college.established_year && (
                    <span>Est. {college.established_year}</span>
                  )}
                  <span className="px-2 py-0.5 bg-gray-100 rounded text-gray-700">
                    {college.ownership} {college.college_type}
                  </span>
                </div>

                {/* Stats Row */}
                <div className="flex flex-wrap gap-6 mt-4">
                  {/* Rating */}
                  {college.avg_rating && (
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
                        <span className="font-semibold">{parseFloat(college.avg_rating).toFixed(1)}</span>
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-600">
                        {college.total_reviews} reviews
                      </span>
                    </div>
                  )}

                  {/* Ranking */}
                  {topRanking && (
                    <div className="text-sm">
                      <span className="text-gray-600">Ranked </span>
                      <span className="font-semibold text-gray-900">#{topRanking.rank}</span>
                      <span className="text-gray-600"> by {topRanking.agency}</span>
                      {topRanking.category && (
                        <span className="text-gray-500"> ({topRanking.category})</span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={() => setIsApplyModalOpen(true)}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium"
                >
                  Apply Now
                </button>
                <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-medium">
                  Download Brochure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b sticky top-36 z-30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const tabUrl = tabUrlMapping[tab.id];
                const href = tabUrl ? `/colleges/${slug}/${tabUrl}` : `/colleges/${slug}`;
                return (
                  <Link
                    key={tab.id}
                    href={href}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* About */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {college.section_content?.overview?.title || `About ${college.college_name}`}
                    </h2>
                    {college.section_content?.overview?.content ? (
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.overview.content }} />
                    ) : college.description ? (
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.description }} />
                    ) : (
                      <p className="text-gray-600">
                        {college.college_name} is a {college.ownership?.toLowerCase()} {college.college_type?.toLowerCase()}
                        located in {college.city}, {college.state}.
                        {college.established_year && ` Established in ${college.established_year}.`}
                      </p>
                    )}
                  </div>

                  {/* Highlights */}
                  {college.highlights && college.highlights.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Highlights</h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {college.highlights.map((highlight, index) => (
                          <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{highlight.value}</div>
                            <div className="text-sm text-gray-600">{highlight.title}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Approvals & Affiliations */}
                  {(college.approvals || college.affiliations) && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Approvals & Affiliations</h2>
                      <div className="space-y-3">
                        {college.approvals?.map((approval, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-sm rounded">
                              {approval.approval_type}
                            </span>
                            {approval.grade && <span className="text-gray-600">Grade: {approval.grade}</span>}
                          </div>
                        ))}
                        {college.affiliations?.map((affiliation, index) => (
                          <div key={index} className="text-gray-600">
                            Affiliated to: <span className="font-medium">{affiliation.affiliated_to}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Facilities */}
                  {college.facilities && college.facilities.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Facilities</h2>
                      <div className="flex flex-wrap gap-2">
                        {college.facilities.map((facility, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                            {facility.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Courses Tab */}
              {activeTab === 'courses' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.courses?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.courses.title || 'Courses & Fees'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.courses.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.courses?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Courses & Fees</h2>
                    )}
                    {college.courses && college.courses.length > 0 ? (
                    <div className="space-y-4">
                      {college.courses.map((course) => (
                        <div key={course.course_id} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{course.course_name}</h3>
                              <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-600">
                                <span className="px-2 py-0.5 bg-gray-100 rounded">{course.degree_type}</span>
                                {course.stream && <span>{course.stream}</span>}
                                {course.duration && <span>{course.duration}</span>}
                                {course.course_mode && <span>{course.course_mode}</span>}
                              </div>
                            </div>
                            <div className="text-right">
                              {course.total_fees && (
                                <div className="text-lg font-semibold text-gray-900">
                                  &#8377;{formatCurrency(course.total_fees)}
                                </div>
                              )}
                              {course.fees_type && (
                                <div className="text-sm text-gray-500">{course.fees_type}</div>
                              )}
                            </div>
                          </div>
                          {course.eligibility && (
                            <div className="mt-3 text-sm text-gray-600">
                              <span className="font-medium">Eligibility:</span> {course.eligibility}
                            </div>
                          )}
                          {course.seats_available && (
                            <div className="text-sm text-gray-600">
                              <span className="font-medium">Seats:</span> {course.seats_available}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No course information available</p>
                  )}
                  </div>
                </div>
              )}

              {/* Placements Tab */}
              {activeTab === 'placements' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.placement?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.placement.title || 'Placement Statistics'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.placement.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.placement?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Placement Statistics</h2>
                    )}
                    {college.placements && college.placements.length > 0 ? (
                    <div className="space-y-6">
                      {college.placements.map((placement, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-3">
                            Academic Year: {placement.year}
                          </h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {placement.highest_package && (
                              <div className="text-center p-3 bg-green-50 rounded-lg">
                                <div className="text-xl font-bold text-green-600">
                                  &#8377;{formatCurrency(placement.highest_package)}
                                </div>
                                <div className="text-sm text-gray-600">Highest Package</div>
                              </div>
                            )}
                            {placement.average_package && (
                              <div className="text-center p-3 bg-blue-50 rounded-lg">
                                <div className="text-xl font-bold text-blue-600">
                                  &#8377;{formatCurrency(placement.average_package)}
                                </div>
                                <div className="text-sm text-gray-600">Average Package</div>
                              </div>
                            )}
                            {placement.median_package && (
                              <div className="text-center p-3 bg-purple-50 rounded-lg">
                                <div className="text-xl font-bold text-purple-600">
                                  &#8377;{formatCurrency(placement.median_package)}
                                </div>
                                <div className="text-sm text-gray-600">Median Package</div>
                              </div>
                            )}
                            {placement.placement_percentage && (
                              <div className="text-center p-3 bg-orange-50 rounded-lg">
                                <div className="text-xl font-bold text-orange-600">
                                  {placement.placement_percentage}%
                                </div>
                                <div className="text-sm text-gray-600">Placement Rate</div>
                              </div>
                            )}
                          </div>
                          {(placement.total_students || placement.students_placed) && (
                            <div className="mt-3 text-sm text-gray-600">
                              {placement.students_placed} out of {placement.total_students} students placed
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No placement data available</p>
                  )}
                  </div>
                </div>
              )}

              {/* Rankings Tab */}
              {activeTab === 'rankings' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.ranking?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.ranking.title || 'Rankings'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.ranking.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.ranking?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Rankings</h2>
                    )}
                    {college.rankings && college.rankings.length > 0 ? (
                    <div className="space-y-4">
                      {college.rankings.map((ranking, index) => (
                        <div key={index} className="flex items-center justify-between border rounded-lg p-4">
                          <div>
                            <div className="font-semibold text-gray-900">{ranking.agency}</div>
                            <div className="text-sm text-gray-600">
                              {ranking.category && `${ranking.category} - `}Year {ranking.year}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">#{ranking.rank}</div>
                            {ranking.score && (
                              <div className="text-sm text-gray-500">Score: {ranking.score}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No ranking information available</p>
                  )}
                  </div>
                </div>
              )}

              {/* Gallery Tab */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.gallery?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.gallery.title || 'Gallery'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.gallery.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.gallery?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Gallery</h2>
                    )}
                    {college.gallery && college.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {college.gallery.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.image_url}
                            alt={image.caption || 'Gallery image'}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {image.caption && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
                              <p className="text-white text-sm p-3">{image.caption}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : college.media && college.media.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {college.media.filter(m => m.media_type === 'image').map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.media_url}
                            alt={image.title || 'Media image'}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {image.title && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-end">
                              <p className="text-white text-sm p-3">{image.title}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No gallery images available</p>
                  )}
                  </div>
                </div>
              )}

              {/* Admission Tab */}
              {activeTab === 'admission' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      {college.section_content?.admission?.title || `Admission to ${college.college_name}`}
                    </h2>
                    {college.section_content?.admission?.content ? (
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.admission.content }} />
                    ) : college.admission_process ? (
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.admission_process }} />
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Admissions to {college.college_name} are conducted through various entrance exams and merit-based selection.
                        </p>
                        {college.courses && college.courses.length > 0 && (
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-3">Course-wise Eligibility</h3>
                            <div className="space-y-3">
                              {college.courses.filter(c => c.eligibility).map((course) => (
                                <div key={course.course_id} className="border rounded-lg p-4">
                                  <h4 className="font-medium text-gray-900">{course.course_name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{course.eligibility}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Approvals for admission */}
                  {college.approvals && college.approvals.length > 0 && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Recognized By</h3>
                      <div className="flex flex-wrap gap-3">
                        {college.approvals.map((approval, index) => (
                          <div key={index} className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-lg">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium text-green-700">{approval.approval_type}</span>
                            {approval.grade && <span className="text-sm text-green-600">({approval.grade})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Cutoff Tab */}
              {activeTab === 'cutoff' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.cutoff?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.cutoff.title || 'Cutoff Details'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.cutoff.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.cutoff?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Cutoff Details</h2>
                    )}
                    {college.cutoffs && college.cutoffs.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Exam</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Round</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Cutoff</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {college.cutoffs.map((cutoff, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm">
                                <span className="font-medium">{cutoff.exam_short_name || cutoff.exam_name}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">{cutoff.course_name || '-'}</td>
                              <td className="px-4 py-3 text-sm text-gray-600">{cutoff.academic_year}</td>
                              <td className="px-4 py-3 text-sm">
                                <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">{cutoff.category}</span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-600">Round {cutoff.round}</td>
                              <td className="px-4 py-3 text-sm font-semibold">
                                {cutoff.closing_rank ? `Rank ${cutoff.closing_rank}` : cutoff.cutoff_value || '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No cutoff data available</p>
                  )}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  {/* Review Summary */}
                  {college.review_summary && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Review Summary</h2>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{college.review_summary.avg_overall || '-'}</div>
                          <div className="text-sm text-gray-600">Overall</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{college.review_summary.avg_academic || '-'}</div>
                          <div className="text-sm text-gray-600">Academics</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{college.review_summary.avg_infrastructure || '-'}</div>
                          <div className="text-sm text-gray-600">Infrastructure</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{college.review_summary.avg_placement || '-'}</div>
                          <div className="text-sm text-gray-600">Placements</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                          <div className="text-2xl font-bold text-teal-600">{college.review_summary.avg_faculty || '-'}</div>
                          <div className="text-sm text-gray-600">Faculty</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Individual Reviews */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Student Reviews</h2>
                    {college.reviews && college.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {college.reviews.map((review, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">{review.review_title || 'Student Review'}</h3>
                              </div>
                              <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded">
                                <span className="font-semibold">{review.overall_rating}</span>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              </div>
                            </div>
                            {review.review_text && (
                              <p className="mt-3 text-gray-600 text-sm">{review.review_text}</p>
                            )}
                            {(review.pros || review.cons) && (
                              <div className="mt-3 grid grid-cols-2 gap-4">
                                {review.pros && (
                                  <div>
                                    <span className="text-xs font-medium text-green-600">PROS</span>
                                    <p className="text-sm text-gray-600">{review.pros}</p>
                                  </div>
                                )}
                                {review.cons && (
                                  <div>
                                    <span className="text-xs font-medium text-red-600">CONS</span>
                                    <p className="text-sm text-gray-600">{review.cons}</p>
                                  </div>
                                )}
                              </div>
                            )}
                            <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
                              <span>{new Date(review.created_at).toLocaleDateString()}</span>
                              {review.helpful_count > 0 && (
                                <span>{review.helpful_count} found helpful</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                    )}
                  </div>
                </div>
              )}

              {/* Department Tab */}
              {activeTab === 'department' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {college.college_name} Departments
                  </h2>
                  {college.faculty && college.faculty.length > 0 ? (
                    (() => {
                      // Group faculty by department
                      const departments = {};
                      college.faculty.forEach((member) => {
                        const dept = member.department || 'General';
                        if (!departments[dept]) {
                          departments[dept] = [];
                        }
                        departments[dept].push(member);
                      });

                      return (
                        <div className="space-y-6">
                          {Object.entries(departments).map(([deptName, members]) => (
                            <div key={deptName} className="border rounded-lg p-4">
                              <h3 className="font-semibold text-gray-900 text-lg mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                                {deptName}
                              </h3>
                              <div className="text-sm text-gray-600 mb-3">
                                {members.length} Faculty {members.length === 1 ? 'Member' : 'Members'}
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {members.map((member, idx) => (
                                  <div key={idx} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                                    {member.profile_image_url ? (
                                      <img
                                        src={member.profile_image_url}
                                        alt={member.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-sm font-bold text-blue-600">
                                          {member.name?.charAt(0)}
                                        </span>
                                      </div>
                                    )}
                                    <div>
                                      <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                      {member.designation && (
                                        <div className="text-xs text-gray-500">{member.designation}</div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <p className="text-gray-500">Department information coming soon</p>
                    </div>
                  )}
                </div>
              )}

              {/* Scholarships Tab */}
              {activeTab === 'scholarships' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    {college.section_content?.scholarship?.title || 'Scholarships'}
                  </h2>
                  <div className="space-y-4">
                    {college.section_content?.scholarship?.content ? (
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.scholarship.content }} />
                    ) : (
                      <p className="text-gray-600">
                        Various scholarships are available for students at {college.college_name} based on merit, income, and category.
                      </p>
                    )}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-medium text-blue-900 mb-2">Types of Scholarships</h3>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Merit-based Scholarships
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Need-based Financial Aid
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Government Scholarships (SC/ST/OBC)
                        </li>
                        <li className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Sports Quota Scholarships
                        </li>
                      </ul>
                    </div>
                    <div className="text-center pt-4">
                      <Link href="/scholarships" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
                        View All Scholarships
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Hostel Tab */}
              {activeTab === 'hostel' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.hostel?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.hostel.title || 'Hostel & Accommodation'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.hostel.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.hostel?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Hostel & Accommodation</h2>
                    )}
                    {college.hostels && college.hostels.length > 0 ? (
                    <div className="space-y-4">
                      {college.hostels.map((hostel, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-gray-900">{hostel.name}</h3>
                              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-sm">
                                {hostel.hostel_type}
                              </span>
                            </div>
                            <div className="text-right">
                              {hostel.fee_per_semester && (
                                <div className="text-lg font-semibold text-gray-900">
                                  &#8377;{formatCurrency(hostel.fee_per_semester)}/semester
                                </div>
                              )}
                              {hostel.mess_fee_per_semester && (
                                <div className="text-sm text-gray-500">
                                  Mess: &#8377;{formatCurrency(hostel.mess_fee_per_semester)}/semester
                                </div>
                              )}
                            </div>
                          </div>
                          {hostel.description && (
                            <p className="mt-2 text-sm text-gray-600">{hostel.description}</p>
                          )}
                          <div className="mt-3 flex flex-wrap gap-4 text-sm">
                            {hostel.total_capacity && (
                              <div className="text-gray-600">
                                <span className="font-medium">Capacity:</span> {hostel.total_capacity} students
                              </div>
                            )}
                            {hostel.room_types && (
                              <div className="text-gray-600">
                                <span className="font-medium">Rooms:</span> {typeof hostel.room_types === 'object' ? JSON.stringify(hostel.room_types) : hostel.room_types}
                              </div>
                            )}
                          </div>
                          {hostel.amenities && (
                            <div className="mt-3">
                              <span className="text-sm font-medium text-gray-700">Amenities:</span>
                              <p className="text-sm text-gray-600">{typeof hostel.amenities === 'object' ? JSON.stringify(hostel.amenities) : hostel.amenities}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No hostel information available</p>
                  )}
                  </div>
                </div>
              )}

              {/* Faculty Tab */}
              {activeTab === 'faculty' && (
                <div className="space-y-6">
                  {/* CMS Content */}
                  {college.section_content?.faculty?.content && (
                    <div className="bg-white rounded-lg shadow-sm p-6">
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">
                        {college.section_content.faculty.title || 'Faculty Members'}
                      </h2>
                      <div className="prose prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: college.section_content.faculty.content }} />
                    </div>
                  )}
                  {/* Structured Data */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    {!college.section_content?.faculty?.content && (
                      <h2 className="text-xl font-semibold text-gray-900 mb-4">Faculty Members</h2>
                    )}
                    {college.faculty && college.faculty.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {college.faculty.map((member, index) => (
                        <div key={index} className="flex gap-4 border rounded-lg p-4">
                          <div className="flex-shrink-0">
                            {member.profile_image_url ? (
                              <img
                                src={member.profile_image_url}
                                alt={member.name}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-xl font-bold text-blue-600">
                                  {member.name?.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{member.name}</h3>
                            {member.designation && (
                              <p className="text-sm text-blue-600">{member.designation}</p>
                            )}
                            {member.department && (
                              <p className="text-sm text-gray-600">{member.department}</p>
                            )}
                            {member.qualification && (
                              <p className="text-xs text-gray-500 mt-1">{member.qualification}</p>
                            )}
                            {member.experience_years && (
                              <p className="text-xs text-gray-500">{member.experience_years} years experience</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : college.faculty_count > 0 ? (
                    <p className="text-gray-500 text-center py-8">
                      {college.college_name} has {college.faculty_count} faculty members
                    </p>
                  ) : (
                    <p className="text-gray-500 text-center py-8">No faculty information available</p>
                  )}
                  </div>
                </div>
              )}

              {/* News & Articles Tab */}
              {activeTab === 'news' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">News & Articles</h2>
                  {college.news && college.news.length > 0 ? (
                    <div className="space-y-4">
                      {college.news.map((article, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:border-blue-300 transition-colors">
                          <div className="flex gap-4">
                            {article.featured_image_url && (
                              <div className="flex-shrink-0">
                                <img
                                  src={article.featured_image_url}
                                  alt={article.title}
                                  className="w-24 h-20 rounded-lg object-cover"
                                />
                              </div>
                            )}
                            <div className="flex-1">
                              <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                                {article.title}
                              </h3>
                              {article.excerpt && (
                                <div className="text-sm text-gray-600 mt-1 line-clamp-2 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: article.excerpt }} />
                              )}
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                {article.published_at && (
                                  <span>{new Date(article.published_at).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                  })}</span>
                                )}
                                {article.category && (
                                  <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded">
                                    {article.category}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      <p className="text-gray-500 mb-2">No news articles available for this college</p>
                      <Link href="/news" className="text-blue-600 hover:underline text-sm">
                        View all education news
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Q&A Tab */}
              {activeTab === 'qna' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Questions & Answers</h2>
                  {college.faqs && college.faqs.length > 0 ? (
                    <div className="space-y-4">
                      {college.faqs.map((faq, index) => (
                        <div key={index} className="border rounded-lg overflow-hidden">
                          <div className="bg-gray-50 px-4 py-3">
                            <h3 className="font-medium text-gray-900 flex items-start gap-2">
                              <span className="text-orange-500 font-bold">Q:</span>
                              {faq.question}
                            </h3>
                          </div>
                          <div className="px-4 py-3">
                            <div className="flex items-start gap-2">
                              <span className="text-green-600 font-bold">A:</span>
                              <p className="text-gray-700">{faq.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-500 mb-2">No Q&A available yet</p>
                      <button className="text-blue-600 hover:underline text-sm">
                        Ask a question about this college
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* College Compare Tab */}
              {activeTab === 'compare' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Compare {college.college_name} with Other Colleges
                  </h2>
                  <div className="text-center py-8">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <p className="text-gray-600 mb-4">Compare this college with similar institutions</p>
                    <div className="max-w-md mx-auto">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Search college to compare..."
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Compare
                        </button>
                      </div>
                    </div>
                    <div className="mt-6">
                      <p className="text-sm text-gray-500 mb-3">Popular comparisons:</p>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                          vs IIT Delhi
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                          vs IIT Bombay
                        </button>
                        <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
                          vs IIM Ahmedabad
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Students Interested in {college.college_name}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Connect with students who are interested in studying at this institution.
                  </p>
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">Student profiles coming soon</p>
                    <p className="text-sm text-gray-500 mb-4">Students interested in this college will appear here.</p>
                    <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                      Register Your Interest
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Type</span>
                    <span className="font-medium">{college.college_type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ownership</span>
                    <span className="font-medium">{college.ownership}</span>
                  </div>
                  {college.established_year && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Established</span>
                      <span className="font-medium">{college.established_year}</span>
                    </div>
                  )}
                  {college.campus_size && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Campus Size</span>
                      <span className="font-medium">{college.campus_size}</span>
                    </div>
                  )}
                  {college.courses && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Courses</span>
                      <span className="font-medium">{college.courses.length}</span>
                    </div>
                  )}
                  {college.faculty_count > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Faculty Members</span>
                      <span className="font-medium">{college.faculty_count}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <div className="space-y-3 text-sm">
                  {college.address && (
                    <div className="flex gap-2">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-600">{college.address}</span>
                    </div>
                  )}
                  {college.phone && (
                    <div className="flex gap-2">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href={`tel:${college.phone}`} className="text-blue-600 hover:underline">{college.phone}</a>
                    </div>
                  )}
                  {college.email && (
                    <div className="flex gap-2">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href={`mailto:${college.email}`} className="text-blue-600 hover:underline">{college.email}</a>
                    </div>
                  )}
                  {college.website_url && (
                    <div className="flex gap-2">
                      <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <a href={college.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-sm p-6 text-white">
                <h3 className="font-semibold mb-2">Interested in this college?</h3>
                <p className="text-sm text-blue-100 mb-4">Get admission assistance from our counselors</p>
                <button className="w-full py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                  Get Free Counselling
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Apply Now Modal */}
      <ApplyNowModal
        isOpen={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        college={college}
      />
    </main>
  );
}

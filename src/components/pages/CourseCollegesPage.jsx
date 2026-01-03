'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import {
  NewsletterSection,
  CollegeListingHeader,
  CollegeFilterSection,
  CollegeResultsSection,
  CourseContentSection,
} from '@/components/sections';
import { CompareModal, ApplyModal, CompareFeesModal, ComparePlacementModal, ReviewsModal, RankingsModal } from '@/components/common';
import { fetchCollegesByCourse, fetchFilterOptions, fetchCourseContent } from '@/lib/api';

// Course type configuration with default filters
const courseConfig = {
  'btech-colleges': {
    courseType: 'btech',
    displayName: 'B.Tech',
    fullName: 'Bachelor of Technology',
    pageTitle: 'BTech Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['engineering'], degree: ['btech'] },
  },
  'mba-colleges': {
    courseType: 'mba',
    displayName: 'MBA',
    fullName: 'Master of Business Administration',
    pageTitle: 'MBA Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['management'], degree: ['mba'] },
  },
  'mbbs-colleges': {
    courseType: 'mbbs',
    displayName: 'MBBS',
    fullName: 'Bachelor of Medicine',
    pageTitle: 'MBBS Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['medical'], degree: ['mbbs'] },
  },
  'mtech-colleges': {
    courseType: 'mtech',
    displayName: 'M.Tech',
    fullName: 'Master of Technology',
    pageTitle: 'MTech Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['engineering'], degree: ['mtech'] },
  },
  'bsc-colleges': {
    courseType: 'bsc',
    displayName: 'B.Sc',
    fullName: 'Bachelor of Science',
    pageTitle: 'BSc Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['science'], degree: ['bsc'] },
  },
  'ba-colleges': {
    courseType: 'ba',
    displayName: 'BA',
    fullName: 'Bachelor of Arts',
    pageTitle: 'BA Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['arts'], degree: ['ba'] },
  },
  'bcom-colleges': {
    courseType: 'bcom',
    displayName: 'B.Com',
    fullName: 'Bachelor of Commerce',
    pageTitle: 'BCom Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['commerce'], degree: ['bcom'] },
  },
  'bba-colleges': {
    courseType: 'bba',
    displayName: 'BBA',
    fullName: 'Bachelor of Business Administration',
    pageTitle: 'BBA Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['management'], degree: ['bba'] },
  },
  'bca-colleges': {
    courseType: 'bca',
    displayName: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    pageTitle: 'BCA Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['science'], degree: ['bca'] },
  },
  'llb-colleges': {
    courseType: 'llb',
    displayName: 'LLB',
    fullName: 'Bachelor of Laws',
    pageTitle: 'LLB Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['law'], degree: ['llb'] },
  },
  'bed-colleges': {
    courseType: 'bed',
    displayName: 'B.Ed',
    fullName: 'Bachelor of Education',
    pageTitle: 'BEd Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['arts'], degree: ['bed'] },
  },
  'bsc-nursing-colleges': {
    courseType: 'bsc-nursing',
    displayName: 'B.Sc Nursing',
    fullName: 'Bachelor of Science in Nursing',
    pageTitle: 'BSc Nursing Colleges in India 2026: Fees, Admissions, Placements, Rankings',
    defaultFilters: { stream: ['medical'], degree: ['bsc-nursing'] },
  },
};

export default function CourseCollegesPage({ slug }) {
  // Get config for this course
  const config = courseConfig[slug];

  // Get default filters for this course type
  const defaultFilters = config?.defaultFilters || {};

  // State
  const [colleges, setColleges] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [courseContent, setCourseContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, total: 0, total_pages: 0 });
  const [selectedFilters, setSelectedFilters] = useState(defaultFilters);
  const [sortBy, setSortBy] = useState('popularity');
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const [compareColleges, setCompareColleges] = useState([]);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [compareFeesModalOpen, setCompareFeesModalOpen] = useState(false);
  const [selectedCourseName, setSelectedCourseName] = useState('');
  const [comparePlacementModalOpen, setComparePlacementModalOpen] = useState(false);
  const [reviewsModalOpen, setReviewsModalOpen] = useState(false);
  const [selectedCollegeForReview, setSelectedCollegeForReview] = useState(null);
  const [rankingsModalOpen, setRankingsModalOpen] = useState(false);
  const [selectedCollegeForRankings, setSelectedCollegeForRankings] = useState(null);
  const [viewMode, setViewMode] = useState('card');

  // Fetch course content once on mount
  useEffect(() => {
    if (!config) return;

    async function loadCourseContent() {
      try {
        const content = await fetchCourseContent(config.courseType);
        setCourseContent(content);
      } catch (error) {
        console.error('Error fetching course content:', error);
      }
    }

    loadCourseContent();
  }, [config]);

  // Fetch colleges when filters change
  useEffect(() => {
    if (!config) return;

    async function fetchData() {
      setLoading(true);
      try {
        const [collegesData, optionsData] = await Promise.all([
          fetchCollegesByCourse(config.courseType, {
            ...selectedFilters,
            sort_by: sortBy,
            page: pagination.current_page,
            limit: 20,
          }),
          filterOptions ? Promise.resolve(filterOptions) : fetchFilterOptions(config.courseType),
        ]);

        setColleges(collegesData.colleges);
        setPagination(collegesData.pagination);

        if (!filterOptions) {
          setFilterOptions(optionsData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [config, selectedFilters, sortBy, pagination.current_page]);

  // If not a valid course page, show 404
  if (!config) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      </main>
    );
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${config.displayName} Colleges`, href: `/${slug}` },
  ];

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    setPagination((prev) => ({ ...prev, current_page: 1 }));
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setPagination((prev) => ({ ...prev, current_page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, current_page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCompare = (college, isChecked) => {
    if (isChecked) {
      if (compareColleges.length < 4) {
        setCompareColleges((prev) => [...prev, college]);
        setCompareModalOpen(true);
      }
    } else {
      setCompareColleges((prev) => prev.filter((c) => c.college_id !== college.college_id));
      if (compareColleges.length === 1) {
        setCompareModalOpen(false);
      }
    }
  };

  const handleRemoveCollege = (collegeId) => {
    setCompareColleges((prev) => prev.filter((c) => c.college_id !== collegeId));
    if (compareColleges.length === 1) {
      setCompareModalOpen(false);
    }
  };

  const handleCompare = () => {
    console.log('Comparing colleges:', compareColleges);
    setCompareModalOpen(false);
  };

  const handleApplyNow = (college) => {
    setSelectedCollege(college);
    setApplyModalOpen(true);
  };

  const handleCompareFees = (courseName) => {
    setSelectedCourseName(courseName);
    setCompareFeesModalOpen(true);
  };

  const handleComparePlacement = () => {
    setComparePlacementModalOpen(true);
  };

  const handleViewReviews = (college) => {
    setSelectedCollegeForReview(college);
    setReviewsModalOpen(true);
  };

  const handleViewAllRankings = (college) => {
    setSelectedCollegeForRankings(college);
    setRankingsModalOpen(true);
  };

  // Transform API colleges to component format
  const transformedColleges = colleges.map((college) => ({
    id: college.college_id,
    rank: college.display_rank,
    name: college.college_name,
    shortName: college.short_name,
    slug: college.slug,
    location: `${college.city || ''}${college.city && college.state ? ', ' : ''}${college.state || ''}`,
    logoUrl: college.logo_url,
    rating: college.avg_rating,
    reviewCount: college.total_reviews,
    collegeDuniaRank: college.ranking ? `#${college.ranking.rank_position}` : null,
    rankingInfo: college.ranking
      ? `${college.ranking.agency_code || college.ranking.agency_name} #${college.ranking.rank_position}`
      : null,
    fees: college.course?.total_fees
      ? `₹${(parseFloat(college.course.total_fees) / 100000).toFixed(1)}L`
      : null,
    feesLabel: college.course?.degree_type || config.displayName,
    averagePackage: college.placement?.average_package
      ? `₹${(parseFloat(college.placement.average_package) / 100000).toFixed(1)}L`
      : null,
    highestPackage: college.placement?.highest_package
      ? `₹${(parseFloat(college.placement.highest_package) / 100000).toFixed(1)}L`
      : null,
    placementPercentage: college.placement?.placement_percentage
      ? `${college.placement.placement_percentage}%`
      : null,
    isFeatured: college.is_featured,
    isVerified: college.is_verified,
    collegeType: college.college_type,
    ownership: college.ownership,
    course: college.course,
    placement: college.placement,
    ranking: college.ranking,
  }));

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Navigation Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Navbar />
        <NewsTicker />
      </div>

      {/* Page Content */}
      <div className="pt-36">
        {/* Header Section */}
        <CollegeListingHeader
          breadcrumbItems={breadcrumbItems}
          pageTitle={courseContent?.page_title || config.pageTitle}
          showPromoBanners={true}
          banners={courseContent?.banners}
        />

        {/* Course Content Section (Blog/Article) */}
        {courseContent && (
          <CourseContentSection content={courseContent} />
        )}

        {/* Filter Section */}
        {viewMode === 'card' && (
          <CollegeFilterSection
            onFilterChange={handleFilterChange}
            filterOptions={filterOptions}
            initialFilters={defaultFilters}
          />
        )}

        {/* Results Section */}
        <CollegeResultsSection
          totalResults={pagination.total}
          colleges={transformedColleges}
          loading={loading}
          onAddToCompare={handleAddToCompare}
          compareColleges={compareColleges.map((c) => ({ id: c.college_id }))}
          onApplyNow={handleApplyNow}
          onCompareFees={handleCompareFees}
          onComparePlacement={handleComparePlacement}
          onViewReviews={handleViewReviews}
          onViewAllRankings={handleViewAllRankings}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortChange={handleSortChange}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        selectedColleges={compareColleges}
        onRemoveCollege={handleRemoveCollege}
        onCompare={handleCompare}
      />

      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        college={selectedCollege}
      />

      <CompareFeesModal
        isOpen={compareFeesModalOpen}
        onClose={() => setCompareFeesModalOpen(false)}
        courseName={selectedCourseName}
      />

      <ComparePlacementModal
        isOpen={comparePlacementModalOpen}
        onClose={() => setComparePlacementModalOpen(false)}
      />

      <ReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
        collegeName={selectedCollegeForReview?.name}
        reviewCount={selectedCollegeForReview?.reviewCount}
        overallRating={selectedCollegeForReview?.rating}
      />

      <RankingsModal
        isOpen={rankingsModalOpen}
        onClose={() => setRankingsModalOpen(false)}
        collegeName={selectedCollegeForRankings?.name}
        rankings={selectedCollegeForRankings?.rankings || []}
      />
    </main>
  );
}

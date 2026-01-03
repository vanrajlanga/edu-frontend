'use client';

import { useState, useEffect } from 'react';
import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import {
  NewsletterSection,
  CollegeListingHeader,
  CollegeFilterSection,
  CollegeResultsSection,
  CourseContentSection,
} from '@/components/sections';
import { CompareModal, ApplyModal, CompareFeesModal, ComparePlacementModal, ReviewsModal, RankingsModal } from '@/components/common';
import { fetchCollegesByCourse, fetchFilterOptions, fetchCourseLocationContent } from '@/lib/api';

// Course type mapping
const courseTypeMap = {
  'btech': { displayName: 'B.Tech', fullName: 'Bachelor of Technology', degreeType: 'B.Tech' },
  'mba': { displayName: 'MBA', fullName: 'Master of Business Administration', degreeType: 'MBA' },
  'mbbs': { displayName: 'MBBS', fullName: 'Bachelor of Medicine', degreeType: 'MBBS' },
  'mtech': { displayName: 'M.Tech', fullName: 'Master of Technology', degreeType: 'M.Tech' },
  'bsc': { displayName: 'B.Sc', fullName: 'Bachelor of Science', degreeType: 'B.Sc' },
  'ba': { displayName: 'BA', fullName: 'Bachelor of Arts', degreeType: 'BA' },
  'bcom': { displayName: 'B.Com', fullName: 'Bachelor of Commerce', degreeType: 'B.Com' },
  'bba': { displayName: 'BBA', fullName: 'Bachelor of Business Administration', degreeType: 'BBA' },
  'bca': { displayName: 'BCA', fullName: 'Bachelor of Computer Applications', degreeType: 'BCA' },
  'llb': { displayName: 'LLB', fullName: 'Bachelor of Laws', degreeType: 'LLB' },
  'bed': { displayName: 'B.Ed', fullName: 'Bachelor of Education', degreeType: 'B.Ed' },
  'bsc-nursing': { displayName: 'B.Sc Nursing', fullName: 'Bachelor of Science in Nursing', degreeType: 'B.Sc Nursing' },
};

// Extract location name from slug (e.g., "mumbai-colleges" -> "Mumbai")
function parseLocationSlug(slug) {
  if (!slug) return { name: '', type: 'city' };

  // Remove "-colleges" suffix
  const baseName = slug.replace(/-colleges$/, '');

  // Check if it's a state (e.g., "maharashtra-colleges", "tamil-nadu-colleges")
  const statePatterns = ['maharashtra', 'tamil-nadu', 'karnataka', 'kerala', 'gujarat', 'rajasthan', 'uttar-pradesh', 'madhya-pradesh', 'west-bengal', 'delhi', 'punjab', 'haryana', 'andhra-pradesh', 'telangana', 'bihar', 'odisha', 'jharkhand', 'chhattisgarh', 'assam', 'uttarakhand', 'himachal-pradesh', 'goa'];

  const isState = statePatterns.includes(baseName.toLowerCase());

  // Convert slug to display name (e.g., "tamil-nadu" -> "Tamil Nadu")
  const displayName = baseName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    name: displayName,
    type: isState ? 'state' : 'city',
    slug: baseName,
  };
}

export default function CourseLocationCollegesPage({ courseType, locationSlug }) {
  // Get course config
  const courseConfig = courseTypeMap[courseType?.toLowerCase()];
  const location = parseLocationSlug(locationSlug);

  // State
  const [colleges, setColleges] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [courseContent, setCourseContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, total: 0, total_pages: 0 });
  const [selectedFilters, setSelectedFilters] = useState({});
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

  // Set initial location filter
  useEffect(() => {
    if (location.name) {
      setSelectedFilters(prev => ({
        ...prev,
        [location.type]: location.name,
      }));
    }
  }, [location.name, location.type]);

  // Fetch location-specific course content once on mount
  useEffect(() => {
    if (!courseConfig || !locationSlug) return;

    async function loadCourseContent() {
      try {
        const content = await fetchCourseLocationContent(courseType, locationSlug);
        setCourseContent(content);
      } catch (error) {
        console.error('Error fetching location content:', error);
      }
    }

    loadCourseContent();
  }, [courseConfig, courseType, locationSlug]);

  // Fetch colleges when filters change
  useEffect(() => {
    if (!courseConfig) return;

    async function fetchData() {
      setLoading(true);
      try {
        // Add location filter
        const filters = {
          ...selectedFilters,
          [location.type]: location.name,
          sort_by: sortBy,
          page: pagination.current_page,
          limit: 20,
        };

        const [collegesData, optionsData] = await Promise.all([
          fetchCollegesByCourse(courseType, filters),
          filterOptions ? Promise.resolve(filterOptions) : fetchFilterOptions(courseType),
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
  }, [courseConfig, courseType, selectedFilters, sortBy, pagination.current_page, location.name, location.type]);

  // If not a valid course page, show 404
  if (!courseConfig) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-gray-600">Page not found</p>
        </div>
      </main>
    );
  }

  const pageTitle = `${courseConfig.displayName} Colleges in ${location.name} 2027: Fees, Admissions, Placements`;

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: `${courseConfig.displayName} Colleges`, href: `/${courseType}-colleges` },
    { label: location.name, href: `/${courseType}/${locationSlug}` },
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
    feesLabel: college.course?.degree_type || courseConfig.displayName,
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
          pageTitle={courseContent?.page_title || pageTitle}
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
            initialFilters={{ [location.type]: [location.name] }}
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

'use client';

import { useState, useEffect, useCallback } from 'react';
import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import {
  NewsletterSection,
  CollegeListingHeader,
  CollegeFilterSection,
  CollegeResultsSection,
} from '@/components/sections';
import { CompareModal, ApplyModal, CompareFeesModal, ComparePlacementModal, ReviewsModal, RankingsModal, ActiveFilters } from '@/components/common';
import { fetchColleges } from '@/lib/api';
import { useCompare } from '@/context/CompareContext';

// Breadcrumb configuration
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'India Colleges', href: '/universities-colleges' },
];

// Filter label mappings for display
const filterLabels = {
  // Stream
  'management': 'Management',
  'science': 'Science',
  'engineering': 'Engineering',
  'medical': 'Medical',
  'commerce': 'Commerce',
  'arts': 'Arts',
  'law': 'Law',
  'design': 'Design',
  'architecture': 'Architecture',
  // States
  'maharashtra': 'Maharashtra',
  'karnataka': 'Karnataka',
  'delhi': 'Delhi',
  'tamil-nadu': 'Tamil Nadu',
  'uttar-pradesh': 'Uttar Pradesh',
  'gujarat': 'Gujarat',
  'rajasthan': 'Rajasthan',
  'west-bengal': 'West Bengal',
  'telangana': 'Telangana',
  // Cities
  'bangalore': 'Bangalore',
  'mumbai': 'Mumbai',
  'pune': 'Pune',
  'hyderabad': 'Hyderabad',
  'chennai': 'Chennai',
  'kolkata': 'Kolkata',
  'ahmedabad': 'Ahmedabad',
  'jaipur': 'Jaipur',
  // Degrees
  'btech': 'B.Tech',
  'mba': 'MBA',
  'mbbs': 'MBBS',
  'bba': 'BBA',
  'mtech': 'M.Tech',
  'bsc': 'B.Sc',
  'msc': 'M.Sc',
  'bcom': 'B.Com',
  'mcom': 'M.Com',
  'ba': 'BA',
  'bca': 'BCA',
  'llb': 'LLB',
  'bed': 'B.Ed',
  'bsc-nursing': 'B.Sc Nursing',
  // Program Types
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  'online': 'Online',
  'distance': 'Distance Learning',
  // College Types
  'private': 'Private',
  'government': 'Government',
  'deemed': 'Deemed University',
  'autonomous': 'Autonomous',
  // Entrance Exams
  'jee-main': 'JEE Main',
  'neet': 'NEET',
  'cat': 'CAT',
  'gate': 'GATE',
  'cuet': 'CUET',
  'mh-cet': 'MH CET',
  // Fee Ranges
  'below-1l': 'Below ₹1 Lakh',
  '1l-3l': '₹1-3 Lakhs',
  '3l-5l': '₹3-5 Lakhs',
  '5l-10l': '₹5-10 Lakhs',
  'above-10l': 'Above ₹10 Lakhs',
  // Course Types
  'ug': 'Undergraduate',
  'pg': 'Postgraduate',
  'diploma': 'Diploma',
  'certificate': 'Certificate',
  // Agencies
  'nirf': 'NIRF',
  'naac': 'NAAC',
  'nba': 'NBA',
  'aicte': 'AICTE',
  'ugc': 'UGC',
};

// Map frontend sort values to backend
const sortByMap = {
  'popularity': 'popularity',
  'rating': 'rating',
  'fees-high': 'fees_high',
  'fees-low': 'fees_low',
};

// Transform API data to frontend format
function transformCollegeData(apiCollege) {
  return {
    id: apiCollege.college_id,
    name: apiCollege.college_name,
    shortName: apiCollege.short_name,
    slug: apiCollege.slug,
    location: `${apiCollege.city || ''}, ${apiCollege.state || ''}`.replace(/^, |, $/g, ''),
    approvals: apiCollege.is_verified ? ['Verified'] : [],
    logo: apiCollege.logo_url,
    courseName: apiCollege.course?.course_name || 'Various Courses',
    courseFees: apiCollege.course?.total_fees || apiCollege.min_fee || 0,
    totalFees: 'Total Fees',
    avgPackage: apiCollege.placement?.average_package || null,
    highestPackage: apiCollege.placement?.highest_package || null,
    placementRate: apiCollege.placement?.placement_percentage || null,
    placementScore: null,
    rating: parseFloat(apiCollege.avg_rating) || 0,
    reviewCount: apiCollege.total_reviews || 0,
    bestIn: null,
    rankings: apiCollege.ranking ? [{
      rank: apiCollege.ranking.rank_position,
      total: 500,
      location: 'India',
      agency: apiCollege.ranking.agency_code || apiCollege.ranking.agency_name,
      year: apiCollege.ranking.ranking_year?.toString() || '2025',
      logo: null
    }] : [],
    cdScore: null,
    collegeType: apiCollege.college_type,
    ownership: apiCollege.ownership,
    isFeatured: apiCollege.is_featured,
    isVerified: apiCollege.is_verified,
  };
}

export default function UniversitiesColleges() {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [compareModalOpen, setCompareModalOpen] = useState(false);
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

  // Compare context
  const { colleges: compareColleges, addCollege, removeCollege, isInCompare } = useCompare();

  // API data state
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');

  // Fetch colleges from API
  const loadColleges = useCallback(async () => {
    setLoading(true);

    // Build API params from filters
    const apiParams = {
      page: currentPage,
      limit: 20,
      sort_by: sortByMap[sortBy] || 'popularity',
    };

    // Map filters to API params
    if (selectedFilters.state?.length) {
      apiParams.state = selectedFilters.state[0]; // API takes single value
    }
    if (selectedFilters.city?.length) {
      apiParams.city = selectedFilters.city[0];
    }
    if (selectedFilters['college-type']?.length) {
      const typeMap = {
        'private': 'Private',
        'government': 'Government',
        'deemed': 'Deemed University',
        'autonomous': 'Autonomous',
      };
      apiParams.college_type = typeMap[selectedFilters['college-type'][0]] || selectedFilters['college-type'][0];
    }
    if (selectedFilters.stream?.length) {
      apiParams.stream = selectedFilters.stream[0];
    }
    if (selectedFilters.degree?.length) {
      apiParams.degree = selectedFilters.degree[0];
    }
    // Map fee range filter
    if (selectedFilters['total-fee']?.length) {
      const feeRanges = {
        'below-1l': { min: 0, max: 100000 },
        '1l-3l': { min: 100000, max: 300000 },
        '3l-5l': { min: 300000, max: 500000 },
        '5l-10l': { min: 500000, max: 1000000 },
        'above-10l': { min: 1000000, max: null },
      };
      const range = feeRanges[selectedFilters['total-fee'][0]];
      if (range) {
        if (range.min) apiParams.min_fees = range.min;
        if (range.max) apiParams.max_fees = range.max;
      }
    }

    try {
      const result = await fetchColleges(apiParams);
      const transformedColleges = result.colleges.map(transformCollegeData);
      setColleges(transformedColleges);
      setTotalResults(result.pagination?.total || 0);
    } catch (error) {
      console.error('Error loading colleges:', error);
      setColleges([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  }, [currentPage, sortBy, selectedFilters]);

  // Load colleges on mount and when filters/sort change
  useEffect(() => {
    loadColleges();
  }, [loadColleges]);

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleRemoveFilter = (category, value) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[category] || [];
      const newOptions = currentOptions.filter((v) => v !== value);

      const newFilters = { ...prev };
      if (newOptions.length === 0) {
        delete newFilters[category];
      } else {
        newFilters[category] = newOptions;
      }

      return newFilters;
    });
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedFilters({});
    setCurrentPage(1);
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleAddToCompare = (college, isChecked) => {
    if (isChecked) {
      addCollege(college);
    } else {
      removeCollege(college.id);
    }
  };

  const handleRemoveCollege = (collegeId) => {
    removeCollege(collegeId);
    if (compareColleges.length === 1) {
      setCompareModalOpen(false);
    }
  };

  const handleCompare = () => {
    // Navigate to compare page - handled by CompareWidget
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
          pageTitle="List of Top Colleges in India Based on 2025 Ranking"
          showPromoBanners={true}
        />

        {/* Filter Section */}
        {viewMode === 'card' && (
          <CollegeFilterSection onFilterChange={handleFilterChange} />
        )}

        {/* Active Filters */}
        {Object.keys(selectedFilters).length > 0 && (
          <div className="max-w-[1400px] mx-auto px-4 py-2">
            <ActiveFilters
              filters={selectedFilters}
              filterLabels={filterLabels}
              onRemove={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>
        )}

        {/* Results Section */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <CollegeResultsSection
            colleges={colleges}
            totalResults={totalResults}
            onAddToCompare={handleAddToCompare}
            compareColleges={compareColleges}
            onApplyNow={handleApplyNow}
            onCompareFees={handleCompareFees}
            onComparePlacement={handleComparePlacement}
            onViewReviews={handleViewReviews}
            onViewAllRankings={handleViewAllRankings}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            sortBy={sortBy}
            onSortChange={handleSortChange}
          />
        )}
      </div>

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />

      {/* Compare Modal */}
      <CompareModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        selectedColleges={compareColleges}
        onRemoveCollege={handleRemoveCollege}
        onCompare={handleCompare}
      />

      {/* Apply Modal */}
      <ApplyModal
        isOpen={applyModalOpen}
        onClose={() => setApplyModalOpen(false)}
        college={selectedCollege}
      />

      {/* Compare Fees Modal */}
      <CompareFeesModal
        isOpen={compareFeesModalOpen}
        onClose={() => setCompareFeesModalOpen(false)}
        courseName={selectedCourseName}
      />

      {/* Compare Placement Modal */}
      <ComparePlacementModal
        isOpen={comparePlacementModalOpen}
        onClose={() => setComparePlacementModalOpen(false)}
      />

      {/* Reviews Modal */}
      <ReviewsModal
        isOpen={reviewsModalOpen}
        onClose={() => setReviewsModalOpen(false)}
        collegeName={selectedCollegeForReview?.name}
        reviewCount={selectedCollegeForReview?.reviewCount}
        overallRating={selectedCollegeForReview?.rating}
      />

      {/* Rankings Modal */}
      <RankingsModal
        isOpen={rankingsModalOpen}
        onClose={() => setRankingsModalOpen(false)}
        collegeName={selectedCollegeForRankings?.name}
        rankings={selectedCollegeForRankings?.rankings || []}
      />
    </main>
  );
}

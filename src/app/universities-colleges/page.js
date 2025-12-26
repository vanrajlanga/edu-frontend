'use client';

import { useState } from 'react';
import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import {
  NewsletterSection,
  CollegeListingHeader,
  CollegeFilterSection,
  CollegeResultsSection,
} from '@/components/sections';
import { CompareModal, ApplyModal, CompareFeesModal, ComparePlacementModal, ReviewsModal, RankingsModal } from '@/components/common';

// Breadcrumb configuration
const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'India Colleges', href: '/universities-colleges' },
];

export default function UniversitiesColleges() {
  const [selectedFilters, setSelectedFilters] = useState({});
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
  const [viewMode, setViewMode] = useState('card'); // 'card' = table, 'grid' = grid, 'list' = list

  const handleFilterChange = (filters) => {
    setSelectedFilters(filters);
    // Here you would typically fetch filtered college data from an API
    console.log('Filters changed:', filters);
  };

  const handleAddToCompare = (college, isChecked) => {
    if (isChecked) {
      // Maximum 4 colleges can be compared
      if (compareColleges.length < 4) {
        setCompareColleges((prev) => [...prev, college]);
        setCompareModalOpen(true);
      }
    } else {
      setCompareColleges((prev) => prev.filter((c) => c.id !== college.id));
      // Close modal if no colleges left
      if (compareColleges.length === 1) {
        setCompareModalOpen(false);
      }
    }
  };

  const handleRemoveCollege = (collegeId) => {
    setCompareColleges((prev) => prev.filter((c) => c.id !== collegeId));
    // Close modal if no colleges left
    if (compareColleges.length === 1) {
      setCompareModalOpen(false);
    }
  };

  const handleCompare = () => {
    // Navigate to compare page or show comparison view
    console.log('Comparing colleges:', compareColleges);
    // TODO: Implement actual comparison functionality
    // For now, just close the modal
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
        {/* Header Section - Breadcrumb, Title, Promo Banners */}
        <CollegeListingHeader
          breadcrumbItems={breadcrumbItems}
          pageTitle="List of Top Colleges in India Based on 2025 Ranking"
          showPromoBanners={true}
        />

        {/* Filter Section - Hidden in Grid View and List View */}
        {viewMode === 'card' && (
          <CollegeFilterSection onFilterChange={handleFilterChange} />
        )}

        {/* Results Section */}
        <CollegeResultsSection
          totalResults={20557}
          onAddToCompare={handleAddToCompare}
          compareColleges={compareColleges}
          onApplyNow={handleApplyNow}
          onCompareFees={handleCompareFees}
          onComparePlacement={handleComparePlacement}
          onViewReviews={handleViewReviews}
          onViewAllRankings={handleViewAllRankings}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          // colleges prop can be passed here when you have API data
        />
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

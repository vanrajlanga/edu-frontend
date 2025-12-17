import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import { HeroSection, StudyGoalSection, ExploreProgramsSection, TopCollegesSection, TopUniversitiesSection, AdmissionBanner, CollegeRankingSection, SubscribeBanner, TopStudyPlacesSection, ExploreCoursesSection, CourseFinderBanner, BoardExamSection, TopExamsSection, AdmissionLinksSection, LatestNewsSection, StudyAbroadSection, TopCoursesLinksSection, NewsletterSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header transparent />

      {/* Navigation Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Navbar variant="transparent" />
        <NewsTicker />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Study Goal Section */}
      <StudyGoalSection />

      {/* Explore Programs Section */}
      <ExploreProgramsSection />

      {/* Top Colleges Section */}
      <TopCollegesSection />

      {/* Top Universities Section */}
      <TopUniversitiesSection />

      {/* Admission Banner */}
      <AdmissionBanner />

      {/* College Ranking Section */}
      <CollegeRankingSection />

      {/* Subscribe Banner */}
      <SubscribeBanner />

      {/* Top Study Places Section */}
      <TopStudyPlacesSection />

      {/* Explore Courses Section */}
      <ExploreCoursesSection />

      {/* Course Finder Banner */}
      <CourseFinderBanner />

      {/* Board Exam Section */}
      <BoardExamSection />

      {/* Top Exams Section */}
      <TopExamsSection />

      {/* Admission Links Section */}
      <AdmissionLinksSection />

      {/* Latest News Section */}
      <LatestNewsSection />

      {/* Study Abroad Section */}
      <StudyAbroadSection />

      {/* Top Courses Links Section */}
      <TopCoursesLinksSection />

      {/* Newsletter Section */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

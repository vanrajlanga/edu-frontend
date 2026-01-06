import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import CourseHeroSection from '@/components/sections/CourseHeroSection';
import CourseLevelSection from '@/components/sections/CourseLevelSection';
import CourseInterestSection from '@/components/sections/CourseInterestSection';
import TrendingCourseSection from '@/components/sections/TrendingCourseSection';
import { NewsletterSection } from '@/components/sections';

export const metadata = {
  title: 'Top Courses in India - Search from 10000+ Courses | EduPortal',
  description:
    'Explore over 10,000 courses in India including Engineering, Medical, Management, Arts, Science, Commerce and more. Find the perfect course for your career goals.',
  keywords: 'courses in India, engineering courses, medical courses, MBA, B.Tech, MBBS, BA, B.Com',
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header transparent />

      {/* Navigation Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Navbar variant="transparent" />
        <NewsTicker />
      </div>

      {/* Hero Section with Search */}
      <CourseHeroSection />

      {/* Course Level Selection */}
      <CourseLevelSection />

      {/* Choose by Interest */}
      <CourseInterestSection />

      {/* Trending Course Search */}
      <TrendingCourseSection />

      {/* Newsletter Subscription */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

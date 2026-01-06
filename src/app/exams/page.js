import { Header, Navbar, NewsTicker, Footer } from '@/components/layout';
import ExamHeroSection from '@/components/sections/ExamHeroSection';
import ExamCategorySection from '@/components/sections/ExamCategorySection';
import ExamNewsSection from '@/components/sections/ExamNewsSection';
import ConceptArticlesSection from '@/components/sections/ConceptArticlesSection';
import PreviousYearPapersSection from '@/components/sections/PreviousYearPapersSection';
import FAQSection from '@/components/sections/FAQSection';
import { NewsletterSection } from '@/components/sections';

export const metadata = {
  title: 'Entrance Exams in India 2026 - Dates, Application, Syllabus | EduPortal',
  description:
    'Complete information about entrance exams in India including JEE Main, NEET, CAT, GATE, CLAT and more. Get exam dates, application forms, syllabus, and preparation tips.',
  keywords: 'entrance exams India, JEE Main, NEET, CAT, GATE, CLAT, exam dates, application form, syllabus',
};

export default function ExamsPage() {
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
      <ExamHeroSection />

      {/* Two Column Layout: Category + News */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left: Exams Category (66% width) */}
            <div className="lg:col-span-8 space-y-6">
              <ExamCategorySection />
              <ConceptArticlesSection />
              <PreviousYearPapersSection />
              <FAQSection />
            </div>

            {/* Right: Exams News (33% width) */}
            <div className="lg:col-span-4">
              <ExamNewsSection />
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section - Full Width */}
      <NewsletterSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}

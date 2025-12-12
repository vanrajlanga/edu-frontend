import { Header, Navbar } from '@/components/layout';
import { HeroSection, StudyGoalSection, ExploreProgramsSection, TopCollegesSection, TopUniversitiesSection, AdmissionBanner } from '@/components/sections';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <Header transparent />

      {/* Navigation Bar */}
      <div className="fixed top-16 left-0 right-0 z-40">
        <Navbar variant="transparent" />
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

      {/* Placeholder for other sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            More Sections Coming Soon
          </h2>
          <p className="text-gray-600">
            College Discovery, Top Courses, Exam Alerts, Study Abroad, and more...
          </p>
        </div>
      </section>
    </main>
  );
}

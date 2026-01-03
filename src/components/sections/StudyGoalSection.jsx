'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { StudyGoalCard, StudyGoalSeeAllCard } from '../cards/StudyGoalCard';
import { StudyGoalModal } from '../common/StudyGoalModal';
import { fetchStudyGoals } from '@/lib/api';

function StudyGoalSection({ className }) {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [studyGoals, setStudyGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch study goals from API
  useEffect(() => {
    const loadStudyGoals = async () => {
      setLoading(true);
      const data = await fetchStudyGoals();
      // Filter out categories with 0 colleges
      const filteredData = data.filter(goal => goal.collegeCount > 0 || goal.courses.some(c => c.collegeCount > 0));
      setStudyGoals(filteredData);
      setLoading(false);
    };
    loadStudyGoals();
  }, []);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition();
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, [studyGoals]);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className={cn('py-12 bg-white', className)}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Select Your Study Goal
          </h2>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[280px] h-[180px] bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn('py-12 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
          Select Your Study Goal
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 z-10',
                '-ml-4 lg:-ml-6',
                'w-12 h-12 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-green-800 hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronLeft" size="lg" />
            </button>
          )}

          {/* Scrollable Cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {studyGoals.map((goal) => (
              <StudyGoalCard
                key={goal.id}
                icon={goal.icon}
                title={goal.title}
                collegeCount={goal.collegeCount}
                courses={goal.courses}
                href={goal.href}
              />
            ))}

            {/* See All Card */}
            <StudyGoalSeeAllCard onClick={() => setIsModalOpen(true)} />
          </div>

          {/* Study Goal Modal */}
          <StudyGoalModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            studyGoals={studyGoals}
          />

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className={cn(
                'absolute right-0 top-1/2 -translate-y-1/2 z-10',
                '-mr-4 lg:-mr-6',
                'w-12 h-12 rounded-full',
                'bg-white border border-gray-200 shadow-lg',
                'flex items-center justify-center',
                'text-gray-500 hover:text-green-800 hover:border-green-300',
                'transition-all duration-200'
              )}
            >
              <Icon name="chevronRight" size="lg" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export { StudyGoalSection };
export default StudyGoalSection;

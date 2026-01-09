'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { staticCoursesData, fetchCoursesMenu, fetchCourseDetails } from '@/lib/coursesData';

function AllCoursesMenu({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLevel, setCurrentLevel] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [coursesData, setCoursesData] = useState(staticCoursesData);
  const [isLoading, setIsLoading] = useState(false);
  const [courseDetailsLoading, setCourseDetailsLoading] = useState(false);
  const menuRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch courses data on mount
  useEffect(() => {
    async function loadCourses() {
      setIsLoading(true);
      try {
        const data = await fetchCoursesMenu();
        if (data && data.length > 0) {
          setCoursesData(data);
        }
      } catch (error) {
        console.error('Error loading courses:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCourses();
  }, []);

  // Reset state when menu closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setCurrentLevel(1);
      setSelectedCourse(null);
      setSelectedCategory(null);
      setExpandedSections({});
    }
  }, [isOpen]);

  // Focus search input when menu opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (currentLevel > 1) {
          handleBack();
        } else {
          onClose();
        }
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, currentLevel, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Filter courses based on search
  const filteredCourses = coursesData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle course selection
  const handleCourseClick = async (course) => {
    setCourseDetailsLoading(true);
    setCurrentLevel(2);
    setSearchQuery('');

    try {
      // Fetch full course details including streams and cities
      const courseDetails = await fetchCourseDetails(course.id);
      if (courseDetails) {
        setSelectedCourse(courseDetails);
      } else {
        // Fallback to basic course info
        setSelectedCourse(course);
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      setSelectedCourse(course);
    } finally {
      setCourseDetailsLoading(false);
    }
  };

  // Handle category selection (streams or cities)
  const handleCategoryClick = (category, type) => {
    setSelectedCategory({ ...category, type });
    setCurrentLevel(3);
  };

  // Handle back navigation
  const handleBack = () => {
    if (currentLevel === 3) {
      setCurrentLevel(2);
      setSelectedCategory(null);
    } else if (currentLevel === 2) {
      setCurrentLevel(1);
      setSelectedCourse(null);
    }
    setSearchQuery('');
  };

  // Toggle section expansion
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-[100]',
          'transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      />

      {/* Slide-in panel */}
      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 left-0 h-full z-[101]',
          'w-full sm:w-[320px] md:w-[360px]',
          'bg-white shadow-2xl',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Level 1: All Courses List */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col',
            'transition-transform duration-300 ease-out',
            currentLevel === 1 ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">All Courses</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon name="close" size="md" />
            </button>
          </div>

          {/* Search */}
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="relative">
              <Icon
                name="search"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search All Courses"
                className={cn(
                  'w-full pl-10 pr-4 py-2.5',
                  'bg-gray-50 rounded-lg',
                  'border border-gray-200 focus:border-blue-400',
                  'text-sm text-gray-900 placeholder:text-gray-400',
                  'outline-none transition-colors'
                )}
              />
            </div>
          </div>

          {/* Course List */}
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : (
              <div className="py-2">
                {filteredCourses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleCourseClick(course)}
                    className={cn(
                      'flex items-center justify-between w-full',
                      'px-4 py-3',
                      'text-left',
                      'hover:bg-gray-50 transition-colors',
                      'group'
                    )}
                  >
                    <div>
                      <span className="font-medium text-gray-900 group-hover:text-blue-700">
                        {course.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        [{(course.collegeCount || 0).toLocaleString()}]
                      </span>
                    </div>
                    <Icon
                      name="chevronRight"
                      size="sm"
                      className="text-gray-400 group-hover:text-blue-600"
                    />
                  </button>
                ))}
                {filteredCourses.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500">
                    No courses found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Level 2: Course Categories */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col',
            'transition-transform duration-300 ease-out',
            currentLevel === 2 ? 'translate-x-0' : currentLevel > 2 ? '-translate-x-full' : 'translate-x-full'
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon name="arrowLeft" size="md" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900">All Categories</h2>
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-y-auto">
            {courseDetailsLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
              </div>
            ) : selectedCourse && (
              <div className="py-2">
                {/* Top Cities Section */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection('cities')}
                    className={cn(
                      'flex items-center justify-between w-full',
                      'px-4 py-3',
                      'hover:bg-gray-50 transition-colors'
                    )}
                  >
                    <span className="font-medium text-gray-900">Top Cities & States</span>
                    <Icon
                      name={expandedSections.cities ? 'minus' : 'plus'}
                      size="sm"
                      className="text-gray-400"
                    />
                  </button>
                  {expandedSections.cities && selectedCourse.cities && selectedCourse.cities.length > 0 && (
                    <div className="pb-2">
                      {selectedCourse.cities.slice(0, 3).map((city) => (
                        <Link
                          key={city.id}
                          href={city.slug}
                          onClick={onClose}
                          className={cn(
                            'flex items-center justify-between',
                            'px-6 py-2.5',
                            'text-sm text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                            'transition-colors'
                          )}
                        >
                          <span>Top {selectedCourse.name} Colleges in {city.name}</span>
                          <Icon name="chevronRight" size="xs" className="text-gray-400" />
                        </Link>
                      ))}
                      <button
                        onClick={() => handleCategoryClick({ items: selectedCourse.cities, title: 'Top Cities & States' }, 'cities')}
                        className={cn(
                          'flex items-center gap-1',
                          'px-6 py-2.5',
                          'text-sm font-medium text-blue-700 hover:text-blue-800',
                          'transition-colors'
                        )}
                      >
                        View More Top Cities & States
                        <Icon name="chevronRight" size="xs" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Streams Section */}
                <div className="border-b border-gray-100">
                  <button
                    onClick={() => toggleSection('streams')}
                    className={cn(
                      'flex items-center justify-between w-full',
                      'px-4 py-3',
                      'hover:bg-gray-50 transition-colors'
                    )}
                  >
                    <span className="font-medium text-gray-900">
                      Browse By {selectedCourse.name} Streams
                    </span>
                    <Icon
                      name={expandedSections.streams ? 'minus' : 'plus'}
                      size="sm"
                      className="text-gray-400"
                    />
                  </button>
                  {expandedSections.streams && selectedCourse.streams && selectedCourse.streams.length > 0 && (
                    <div className="pb-2">
                      {selectedCourse.streams.slice(0, 3).map((stream) => (
                        <Link
                          key={stream.id}
                          href={stream.slug}
                          onClick={onClose}
                          className={cn(
                            'flex items-center justify-between',
                            'px-6 py-2.5',
                            'text-sm text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                            'transition-colors'
                          )}
                        >
                          <span>
                            {stream.name}
                            {stream.count && <span className="ml-1 text-gray-400">[{stream.count.toLocaleString()}]</span>}
                          </span>
                          <Icon name="chevronRight" size="xs" className="text-gray-400" />
                        </Link>
                      ))}
                      {selectedCourse.streams.length > 3 && (
                        <button
                          onClick={() => handleCategoryClick({ items: selectedCourse.streams, title: `Browse By ${selectedCourse.name} Streams` }, 'streams')}
                          className={cn(
                            'flex items-center gap-1',
                            'px-6 py-2.5',
                            'text-sm font-medium text-blue-700 hover:text-blue-800',
                            'transition-colors'
                          )}
                        >
                          View More {selectedCourse.name} Streams
                          <Icon name="chevronRight" size="xs" />
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* All Colleges Link */}
                <Link
                  href={selectedCourse.slug}
                  onClick={onClose}
                  className={cn(
                    'flex items-center justify-between',
                    'px-4 py-3',
                    'text-gray-900 hover:text-blue-700 hover:bg-gray-50',
                    'transition-colors'
                  )}
                >
                  <span className="font-medium">
                    View All {selectedCourse.name} Colleges
                  </span>
                  <Icon name="chevronRight" size="sm" className="text-gray-400" />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Level 3: Category Details */}
        <div
          className={cn(
            'absolute inset-0 flex flex-col',
            'transition-transform duration-300 ease-out',
            currentLevel === 3 ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-gray-100">
            <button
              onClick={handleBack}
              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon name="arrowLeft" size="md" />
            </button>
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              {selectedCategory?.title || 'Details'}
            </h2>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto">
            {selectedCategory && (
              <div className="py-2">
                {selectedCategory.type === 'cities' && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    All Cities
                  </div>
                )}
                {selectedCategory.type === 'streams' && (
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Commonly Opted
                  </div>
                )}
                {selectedCategory.items?.map((item) => (
                  <Link
                    key={item.id}
                    href={item.slug}
                    onClick={onClose}
                    className={cn(
                      'flex items-center justify-between',
                      'px-4 py-3',
                      'text-gray-700 hover:text-blue-700 hover:bg-gray-50',
                      'transition-colors',
                      'group'
                    )}
                  >
                    <span>
                      {selectedCategory.type === 'cities'
                        ? `Top ${selectedCourse?.name} Colleges in ${item.name}`
                        : item.name}
                      {item.count && (
                        <span className="ml-1 text-sm text-gray-400">
                          [{item.count.toLocaleString()}]
                        </span>
                      )}
                    </span>
                    <Icon
                      name="chevronRight"
                      size="sm"
                      className="text-gray-400 group-hover:text-blue-600"
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export { AllCoursesMenu };
export default AllCoursesMenu;

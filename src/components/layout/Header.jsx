'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Logo } from '../common/Logo';
import { GoalSelector } from '../common/GoalSelector';
import { ExploreDropdown } from '../common/ExploreDropdown';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { fetchStudyGoals } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { AuthModal, UserDropdown } from '../auth';

function Header({ transparent = false, className }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGoalSelectorOpen, setIsGoalSelectorOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [studyGoals, setStudyGoals] = useState([]);

  // Auth context
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const goalSelectorRef = useRef(null);
  const exploreButtonRef = useRef(null);
  const exploreTimeoutRef = useRef(null);
  const notificationButtonRef = useRef(null);

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch study goals for the dropdown
  useEffect(() => {
    const loadStudyGoals = async () => {
      const data = await fetchStudyGoals();
      if (data && data.length > 0) {
        setStudyGoals(data);
      }
    };
    loadStudyGoals();
  }, []);

  // Handle goal selection
  const handleGoalSelect = ({ goal, city }) => {
    if (goal) setSelectedGoal(goal);
    if (city) setSelectedCity(city);
  };

  // Handle explore hover with delay
  const handleExploreMouseEnter = () => {
    if (exploreTimeoutRef.current) {
      clearTimeout(exploreTimeoutRef.current);
    }
    setIsExploreOpen(true);
  };

  const handleExploreMouseLeave = () => {
    exploreTimeoutRef.current = setTimeout(() => {
      setIsExploreOpen(false);
    }, 150);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50',
        'transition-all duration-300',
        'bg-white border-b border-gray-100',
        isScrolled && 'shadow-md',
        className
      )}
    >
      <div className="w-full px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left Section: Logo + Goal Selector */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
            <Logo size="sm" className="sm:size-md" variant="default" />

            {/* Goal & City Selector - Desktop */}
            <div className="hidden lg:block relative" ref={goalSelectorRef}>
              <button
                type="button"
                onClick={() => setIsGoalSelectorOpen(!isGoalSelectorOpen)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-full',
                  'text-sm font-medium',
                  'bg-gray-50 border border-gray-200',
                  'hover:bg-gray-100 hover:border-gray-300 transition-all duration-200',
                  isGoalSelectorOpen && 'bg-blue-50 border-blue-200'
                )}
              >
                <Icon name="graduationCap" size="sm" className="text-blue-500" />
                <span className="text-gray-700">
                  {selectedGoal ? selectedGoal.label : 'Select Goal'}
                </span>
                <span className="text-gray-400">&</span>
                <Icon name="mapPin" size="sm" className="text-blue-500" />
                <span className="text-gray-700">
                  {selectedCity ? selectedCity.label : 'City'}
                </span>
                <Icon
                  name="chevronDown"
                  size="sm"
                  className={cn(
                    'text-gray-400 transition-transform duration-200',
                    isGoalSelectorOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Goal Selector Dropdown */}
              <GoalSelector
                isOpen={isGoalSelectorOpen}
                onClose={() => setIsGoalSelectorOpen(false)}
                onSelect={handleGoalSelect}
                triggerRef={goalSelectorRef}
                studyGoals={studyGoals}
              />
            </div>
          </div>

          {/* Center Section: Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-6">
            <div
              className={cn(
                'flex items-center w-full gap-3 px-4 py-2.5',
                'rounded-full',
                'bg-gray-50 border border-gray-200',
                'hover:bg-white hover:border-gray-300 hover:shadow-sm',
                'focus-within:bg-white focus-within:border-blue-300 focus-within:shadow-sm focus-within:ring-2 focus-within:ring-blue-100',
                'transition-all duration-200'
              )}
            >
              <Icon name="search" size="sm" className="text-gray-400" />
              <input
                type="text"
                placeholder="Search for Colleges, Exams, Courses..."
                className="flex-1 bg-transparent border-0 outline-none text-sm text-gray-700 placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Write Review - Desktop */}
            <Link
              href="/write-review"
              className={cn(
                'hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg',
                'text-sm font-medium text-gray-600',
                'hover:text-gray-900 hover:bg-gray-50',
                'transition-colors duration-200'
              )}
            >
              <Icon name="edit" size="sm" />
              <span>Write a Review</span>
              <span className="px-1.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded">
                Earn
              </span>
            </Link>

            {/* Explore - Desktop */}
            <div
              className="hidden lg:block relative"
              onMouseEnter={handleExploreMouseEnter}
              onMouseLeave={handleExploreMouseLeave}
            >
              <button
                ref={exploreButtonRef}
                type="button"
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg',
                  'text-sm font-medium text-gray-600',
                  'hover:text-gray-900 hover:bg-gray-50',
                  'transition-colors duration-200',
                  isExploreOpen && 'text-blue-900 bg-blue-50'
                )}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="5" r="2" />
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="19" cy="5" r="2" />
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                  <circle cx="5" cy="19" r="2" />
                  <circle cx="12" cy="19" r="2" />
                  <circle cx="19" cy="19" r="2" />
                </svg>
                <span>Explore</span>
                <Icon
                  name="chevronDown"
                  size="sm"
                  className={cn(
                    'transition-transform duration-200',
                    isExploreOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Explore Dropdown */}
              <ExploreDropdown
                isOpen={isExploreOpen}
                onClose={() => setIsExploreOpen(false)}
                triggerRef={exploreButtonRef}
              />
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                ref={notificationButtonRef}
                type="button"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className={cn(
                  'relative p-2 rounded-lg',
                  'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                  'transition-colors duration-200',
                  isNotificationOpen && 'text-blue-900 bg-blue-50'
                )}
              >
                <Icon name="bell" size="md" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              </button>

              {/* Notification Dropdown */}
              <NotificationDropdown
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
                triggerRef={notificationButtonRef}
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg',
                'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                'transition-colors duration-200'
              )}
            >
              <Icon name="search" size="md" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 rounded-lg',
                'text-gray-500 hover:text-gray-700 hover:bg-gray-50',
                'transition-colors duration-200'
              )}
            >
              <Icon name="menu" size="md" />
            </button>

            {/* Login/Signup or User Dropdown - Desktop */}
            <div className="hidden lg:flex items-center gap-2 ml-2">
              {authLoading ? (
                <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />
              ) : isAuthenticated ? (
                <UserDropdown />
              ) : (
                <>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors leading-none"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg hover:from-blue-800 hover:to-blue-950 shadow-sm hover:shadow transition-all leading-none whitespace-nowrap"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 p-4 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-gray-50 border border-gray-200">
            <Icon name="search" size="md" className="text-gray-400" />
            <input
              type="text"
              placeholder="Search colleges, exams, courses..."
              className="flex-1 bg-transparent border-0 outline-none text-gray-700 placeholder:text-gray-400"
              autoFocus
            />
            <button onClick={() => setIsSearchOpen(false)}>
              <Icon name="close" size="md" className="text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg animate-in slide-in-from-top-2">
          <div className="p-4 space-y-4">
            {/* Goal Selector */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsGoalSelectorOpen(true);
              }}
              className="flex items-center gap-2 w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Icon name="graduationCap" size="sm" className="text-blue-500" />
              <span>
                {selectedGoal && selectedCity
                  ? `${selectedGoal.label} • ${selectedCity.label}`
                  : 'Select Goal & City'}
              </span>
              <Icon name="chevronRight" size="sm" className="ml-auto text-gray-400" />
            </button>

            {/* Menu Items */}
            <div className="space-y-1">
              <Link href="/write-review" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Icon name="edit" size="md" />
                <span>Write a Review</span>
                <span className="ml-auto px-2 py-0.5 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded">Earn</span>
              </Link>
              <Link href="/explore" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                <Icon name="globe" size="md" />
                <span>Explore</span>
              </Link>
            </div>

            {/* Auth Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {isAuthenticated ? (
                <div className="flex-1 flex items-center justify-center">
                  <UserDropdown />
                </div>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors leading-none"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsAuthModalOpen(true);
                    }}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg hover:from-blue-800 hover:to-blue-950 transition-all leading-none whitespace-nowrap"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </header>
  );
}

export { Header };
export default Header;

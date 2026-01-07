'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const MAX_COMPARE_COLLEGES = 4;
const STORAGE_KEY = 'compare_colleges';

// Default compare context value
const defaultCompareValue = {
  colleges: [],
  addCollege: () => false,
  removeCollege: () => {},
  clearAll: () => {},
  isInCompare: () => false,
  canAddMore: true,
  count: 0,
  maxColleges: MAX_COMPARE_COLLEGES,
};

// Compare Context
const CompareContext = createContext(defaultCompareValue);

// Compare Provider Component
export function CompareProvider({ children }) {
  const [colleges, setColleges] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setColleges(parsed.slice(0, MAX_COMPARE_COLLEGES));
        }
      }
    } catch (error) {
      console.error('Error loading compare colleges:', error);
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage when colleges change
  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(colleges));
      } catch (error) {
        console.error('Error saving compare colleges:', error);
      }
    }
  }, [colleges, isInitialized]);

  // Add college to compare
  const addCollege = useCallback((college) => {
    if (!college?.id) return false;

    setColleges((prev) => {
      // Check if already exists
      if (prev.some((c) => c.id === college.id)) {
        return prev;
      }
      // Check if max reached
      if (prev.length >= MAX_COMPARE_COLLEGES) {
        return prev;
      }
      // Add college with necessary fields
      return [...prev, {
        id: college.id,
        name: college.name,
        slug: college.slug,
        location: college.location,
        logo: college.logo,
        courseName: college.courseName,
        courseFees: college.courseFees,
        rating: college.rating,
        reviewCount: college.reviewCount,
        avgPackage: college.avgPackage,
        highestPackage: college.highestPackage,
        placementRate: college.placementRate,
        collegeType: college.collegeType,
        ownership: college.ownership,
        rankings: college.rankings || [],
      }];
    });
    return true;
  }, []);

  // Remove college from compare
  const removeCollege = useCallback((collegeId) => {
    setColleges((prev) => prev.filter((c) => c.id !== collegeId));
  }, []);

  // Clear all colleges
  const clearAll = useCallback(() => {
    setColleges([]);
  }, []);

  // Check if college is in compare
  const isInCompare = useCallback((collegeId) => {
    return colleges.some((c) => c.id === collegeId);
  }, [colleges]);

  const value = {
    colleges,
    addCollege,
    removeCollege,
    clearAll,
    isInCompare,
    canAddMore: colleges.length < MAX_COMPARE_COLLEGES,
    count: colleges.length,
    maxColleges: MAX_COMPARE_COLLEGES,
  };

  return (
    <CompareContext.Provider value={value}>
      {children}
    </CompareContext.Provider>
  );
}

// Custom hook to use compare context
export function useCompare() {
  return useContext(CompareContext);
}

export default CompareContext;

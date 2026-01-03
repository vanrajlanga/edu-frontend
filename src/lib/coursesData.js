// Comprehensive course data for All Courses menu
// This file provides both static fallback data and API fetching functions

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

// Static fallback data for when API is unavailable
export const staticCoursesData = [
  {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'Bachelor of Technology',
    slug: '/btech-colleges',
    collegeCount: 6350,
    streams: [
      { id: 'cs', name: 'Computer Science', count: 4127, slug: '/btech-colleges?stream=cs' },
      { id: 'mech', name: 'Mechanical Engineering', count: 3609, slug: '/btech-colleges?stream=mech' },
      { id: 'ece', name: 'Electronics & Communication', count: 3401, slug: '/btech-colleges?stream=ece' },
      { id: 'civil', name: 'Civil Engineering', count: 3292, slug: '/btech-colleges?stream=civil' },
      { id: 'it', name: 'Information Technology', count: 1981, slug: '/btech-colleges?stream=it' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 450, slug: '/btech/delhi-colleges' },
      { id: 'mumbai', name: 'Mumbai', count: 380, slug: '/btech/mumbai-colleges' },
      { id: 'bangalore', name: 'Bangalore', count: 420, slug: '/btech/bangalore-colleges' },
      { id: 'chennai', name: 'Chennai', count: 310, slug: '/btech/chennai-colleges' },
      { id: 'hyderabad', name: 'Hyderabad', count: 340, slug: '/btech/hyderabad-colleges' },
    ],
  },
  {
    id: 'mba',
    name: 'MBA',
    fullName: 'Master of Business Administration',
    slug: '/mba-colleges',
    collegeCount: 7983,
    streams: [
      { id: 'finance', name: 'Finance', count: 2450, slug: '/mba-colleges?stream=finance' },
      { id: 'marketing', name: 'Marketing', count: 2180, slug: '/mba-colleges?stream=marketing' },
      { id: 'hr', name: 'Human Resources', count: 1890, slug: '/mba-colleges?stream=hr' },
      { id: 'operations', name: 'Operations', count: 1200, slug: '/mba-colleges?stream=operations' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 580, slug: '/mba/delhi-colleges' },
      { id: 'mumbai', name: 'Mumbai', count: 520, slug: '/mba/mumbai-colleges' },
      { id: 'bangalore', name: 'Bangalore', count: 490, slug: '/mba/bangalore-colleges' },
    ],
  },
  {
    id: 'mbbs',
    name: 'MBBS',
    fullName: 'Bachelor of Medicine and Surgery',
    slug: '/mbbs-colleges',
    collegeCount: 612,
    streams: [
      { id: 'general', name: 'General Medicine', count: 612, slug: '/mbbs-colleges' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 45, slug: '/mbbs/delhi-colleges' },
      { id: 'mumbai', name: 'Mumbai', count: 38, slug: '/mbbs/mumbai-colleges' },
      { id: 'bangalore', name: 'Bangalore', count: 42, slug: '/mbbs/bangalore-colleges' },
    ],
  },
  {
    id: 'mtech',
    name: 'M.Tech',
    fullName: 'Master of Technology',
    slug: '/mtech-colleges',
    collegeCount: 2890,
    streams: [
      { id: 'cs', name: 'Computer Science', count: 1200, slug: '/mtech-colleges?stream=cs' },
      { id: 'mech', name: 'Mechanical Engineering', count: 890, slug: '/mtech-colleges?stream=mech' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 280, slug: '/mtech/delhi-colleges' },
      { id: 'bangalore', name: 'Bangalore', count: 310, slug: '/mtech/bangalore-colleges' },
    ],
  },
  {
    id: 'bsc',
    name: 'B.Sc',
    fullName: 'Bachelor of Science',
    slug: '/bsc-colleges',
    collegeCount: 4520,
    streams: [
      { id: 'physics', name: 'Physics', count: 1890, slug: '/bsc-colleges?stream=physics' },
      { id: 'chemistry', name: 'Chemistry', count: 1780, slug: '/bsc-colleges?stream=chemistry' },
      { id: 'mathematics', name: 'Mathematics', count: 1650, slug: '/bsc-colleges?stream=mathematics' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 420, slug: '/bsc/delhi-colleges' },
      { id: 'mumbai', name: 'Mumbai', count: 380, slug: '/bsc/mumbai-colleges' },
    ],
  },
  {
    id: 'ba',
    name: 'BA',
    fullName: 'Bachelor of Arts',
    slug: '/ba-colleges',
    collegeCount: 5702,
    streams: [
      { id: 'english', name: 'English', count: 2100, slug: '/ba-colleges?stream=english' },
      { id: 'economics', name: 'Economics', count: 1890, slug: '/ba-colleges?stream=economics' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 580, slug: '/ba/delhi-colleges' },
      { id: 'kolkata', name: 'Kolkata', count: 480, slug: '/ba/kolkata-colleges' },
    ],
  },
  {
    id: 'bcom',
    name: 'B.Com',
    fullName: 'Bachelor of Commerce',
    slug: '/bcom-colleges',
    collegeCount: 5068,
    streams: [
      { id: 'accounting', name: 'Accounting & Finance', count: 2100, slug: '/bcom-colleges?stream=accounting' },
      { id: 'banking', name: 'Banking & Insurance', count: 1450, slug: '/bcom-colleges?stream=banking' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 520, slug: '/bcom/delhi-colleges' },
      { id: 'mumbai', name: 'Mumbai', count: 480, slug: '/bcom/mumbai-colleges' },
    ],
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    slug: '/bba-colleges',
    collegeCount: 3890,
    streams: [
      { id: 'general', name: 'General Management', count: 2100, slug: '/bba-colleges?stream=general' },
      { id: 'finance', name: 'Finance', count: 980, slug: '/bba-colleges?stream=finance' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 380, slug: '/bba/delhi-colleges' },
      { id: 'mumbai', name: 'Mumbai', count: 320, slug: '/bba/mumbai-colleges' },
    ],
  },
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    slug: '/bca-colleges',
    collegeCount: 2980,
    streams: [
      { id: 'general', name: 'General', count: 2980, slug: '/bca-colleges' },
    ],
    cities: [
      { id: 'delhi', name: 'Delhi NCR', count: 290, slug: '/bca/delhi-colleges' },
      { id: 'bangalore', name: 'Bangalore', count: 310, slug: '/bca/bangalore-colleges' },
    ],
  },
];

// Static quick tabs fallback
export const staticQuickCourseTabs = [
  { id: 'btech', name: 'B.Tech', slug: '/btech-colleges' },
  { id: 'mba', name: 'MBA', slug: '/mba-colleges' },
  { id: 'mbbs', name: 'MBBS', slug: '/mbbs-colleges' },
  { id: 'mtech', name: 'M.Tech', slug: '/mtech-colleges' },
  { id: 'bsc', name: 'B.Sc', slug: '/bsc-colleges' },
  { id: 'ba', name: 'BA', slug: '/ba-colleges' },
  { id: 'bcom', name: 'B.Com', slug: '/bcom-colleges' },
  { id: 'bba', name: 'BBA', slug: '/bba-colleges' },
  { id: 'bca', name: 'BCA', slug: '/bca-colleges' },
];

// API Fetching functions

/**
 * Fetch all courses for the menu
 * @returns {Promise<Array>} Array of course objects
 */
export async function fetchCoursesMenu() {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/menu`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch courses menu');
    const data = await response.json();
    return data.success ? data.data : staticCoursesData;
  } catch (error) {
    console.error('Error fetching courses menu:', error);
    return staticCoursesData;
  }
}

/**
 * Fetch quick tabs for secondary navigation
 * @returns {Promise<Array>} Array of quick tab objects
 */
export async function fetchQuickTabs() {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/quick-tabs`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch quick tabs');
    const data = await response.json();
    return data.success ? data.data : staticQuickCourseTabs;
  } catch (error) {
    console.error('Error fetching quick tabs:', error);
    return staticQuickCourseTabs;
  }
}

/**
 * Fetch course details including streams and cities
 * @param {string} degreeType - The degree type ID (e.g., 'btech', 'mba')
 * @returns {Promise<Object>} Course details with streams and cities
 */
export async function fetchCourseDetails(degreeType) {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${degreeType}/details`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch course details');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    // Fall back to static data
    const staticCourse = staticCoursesData.find(c => c.id === degreeType);
    return staticCourse || null;
  } catch (error) {
    console.error('Error fetching course details:', error);
    const staticCourse = staticCoursesData.find(c => c.id === degreeType);
    return staticCourse || null;
  }
}

/**
 * Fetch streams for a specific course
 * @param {string} degreeType - The degree type ID (e.g., 'btech', 'mba')
 * @returns {Promise<Array>} Array of stream objects
 */
export async function fetchCourseStreams(degreeType) {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${degreeType}/streams`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch course streams');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    const staticCourse = staticCoursesData.find(c => c.id === degreeType);
    return staticCourse?.streams || [];
  } catch (error) {
    console.error('Error fetching course streams:', error);
    const staticCourse = staticCoursesData.find(c => c.id === degreeType);
    return staticCourse?.streams || [];
  }
}

/**
 * Fetch cities for a specific course
 * @param {string} degreeType - The degree type ID (e.g., 'btech', 'mba')
 * @returns {Promise<Array>} Array of city objects
 */
export async function fetchCourseCities(degreeType) {
  try {
    const response = await fetch(`${API_BASE_URL}/courses/${degreeType}/cities`, {
      cache: 'no-store',
    });
    if (!response.ok) throw new Error('Failed to fetch course cities');
    const data = await response.json();
    if (data.success) {
      return data.data;
    }
    const staticCourse = staticCoursesData.find(c => c.id === degreeType);
    return staticCourse?.cities || [];
  } catch (error) {
    console.error('Error fetching course cities:', error);
    const staticCourse = staticCoursesData.find(c => c.id === degreeType);
    return staticCourse?.cities || [];
  }
}

// Legacy exports for backward compatibility
export const coursesData = staticCoursesData;
export const quickCourseTabs = staticQuickCourseTabs;
export const getCourseById = (id) => staticCoursesData.find(course => course.id === id);

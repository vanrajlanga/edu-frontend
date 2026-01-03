const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

/**
 * Fetch colleges by course type with filters
 * @param {string} courseType - Course type (btech, mba, mbbs, etc.)
 * @param {Object} filters - Filter options
 * @returns {Promise<Object>} Response with colleges and pagination
 */
export async function fetchCollegesByCourse(courseType, filters = {}) {
  try {
    const params = new URLSearchParams();

    // Add all filters to params
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.append(key, value.toString());
      }
    });

    const url = `${API_BASE_URL}/colleges/by-course/${courseType}${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch colleges');
    }

    return {
      colleges: data.data,
      pagination: data.pagination,
      meta: data.meta
    };
  } catch (error) {
    console.error('Error fetching colleges by course:', error);
    return {
      colleges: [],
      pagination: { current_page: 1, total: 0, total_pages: 0 },
      meta: {}
    };
  }
}

/**
 * Fetch filter options for a course type
 * @param {string} courseType - Course type (btech, mba, mbbs, etc.)
 * @returns {Promise<Object>} Filter options with counts
 */
export async function fetchFilterOptions(courseType) {
  try {
    const url = `${API_BASE_URL}/colleges/filter-options/${courseType}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch filter options: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch filter options');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching filter options:', error);
    return {
      total_colleges: 0,
      states: [],
      cities: [],
      streams: [],
      college_types: [],
      ownership_types: [],
      exams: [],
      fees_range: null
    };
  }
}

/**
 * Fetch top colleges from the API
 * @param {string} courseType - Course type filter (btech, mba, mbbs, etc.)
 * @param {number} limit - Number of colleges to fetch
 * @returns {Promise<Array>} Array of college objects
 */
export async function fetchTopColleges(courseType = '', limit = 10) {
  try {
    const params = new URLSearchParams();
    if (courseType) params.append('course_type', courseType);
    if (limit) params.append('limit', limit.toString());

    const url = `${API_BASE_URL}/colleges/top${params.toString() ? `?${params}` : ''}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch colleges: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch colleges');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching top colleges:', error);
    return [];
  }
}

/**
 * Fetch course page content (blog/article)
 * @param {string} courseType - Course type (btech, mba, mbbs, etc.)
 * @returns {Promise<Object|null>} Course content object or null
 */
export async function fetchCourseContent(courseType) {
  try {
    const url = `${API_BASE_URL}/courses/${courseType}/content`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null; // No content available
      }
      throw new Error(`Failed to fetch course content: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch course content');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching course content:', error);
    return null;
  }
}

/**
 * Fetch course location content (for city/state specific pages)
 * @param {string} courseType - Course type (btech, mba, mbbs, etc.)
 * @param {string} locationSlug - Location slug (e.g., "mumbai-colleges")
 * @returns {Promise<Object|null>} Location content object or null
 */
export async function fetchCourseLocationContent(courseType, locationSlug) {
  try {
    const url = `${API_BASE_URL}/courses/${courseType}/location/${locationSlug}/content`;
    const response = await fetch(url);

    if (!response.ok) {
      if (response.status === 404) {
        return null; // No content available
      }
      throw new Error(`Failed to fetch location content: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch location content');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching location content:', error);
    return null;
  }
}

/**
 * Fetch study goals (categories with courses) for homepage
 * @returns {Promise<Array>} Array of study goal objects
 */
export async function fetchStudyGoals() {
  try {
    const url = `${API_BASE_URL}/courses/study-goals`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch study goals: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch study goals');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching study goals:', error);
    return [];
  }
}

/**
 * Fetch explore programs data for homepage
 * @returns {Promise<Object>} Explore programs data
 */
export async function fetchExploreProgramsData() {
  try {
    const url = `${API_BASE_URL}/courses/explore-programs`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch explore programs data: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch explore programs data');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching explore programs data:', error);
    return {
      filters: [],
      courseCounts: [],
      exams: [],
      rankings: [],
      predictorExams: [],
      totalColleges: 0,
    };
  }
}

/**
 * Fetch college details by slug
 * @param {string} slug - College slug
 * @returns {Promise<Object|null>} College object or null
 */
export async function fetchCollegeBySlug(slug) {
  try {
    const response = await fetch(`${API_BASE_URL}/colleges/${slug}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch college: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch college');
    }

    return data.data;
  } catch (error) {
    console.error('Error fetching college:', error);
    return null;
  }
}

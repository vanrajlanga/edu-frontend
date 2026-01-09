'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/cn';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export default function SavedCollegesPage() {
  const { token } = useAuth();
  const [savedColleges, setSavedColleges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSavedColleges = async () => {
      if (!token) return;

      try {
        const response = await fetch(`${API_BASE_URL}/user/favorites?type=college`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setSavedColleges(data.data || []);
          }
        }
      } catch (error) {
        console.error('Error fetching saved colleges:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedColleges();
  }, [token]);

  const handleRemoveFavorite = async (collegeId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/favorites`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          entity_type: 'college',
          entity_id: collegeId,
        }),
      });

      if (response.ok) {
        setSavedColleges(savedColleges.filter((c) => c.college_id !== collegeId));
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Saved Colleges</h1>
        <p className="text-gray-500 mt-1">Your shortlisted colleges for easy access</p>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading saved colleges...</p>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && savedColleges.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Saved Colleges</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Save colleges you're interested in to easily compare and apply later.
          </p>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Explore Colleges
          </Link>
        </div>
      )}

      {/* Saved Colleges Grid */}
      {!isLoading && savedColleges.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {savedColleges.map((college) => (
            <div
              key={college.college_id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* College Image */}
              <div className="h-40 bg-gray-100 relative">
                {college.banner_image ? (
                  <img
                    src={college.banner_image}
                    alt={college.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                )}
                {/* Remove Button */}
                <button
                  onClick={() => handleRemoveFavorite(college.college_id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md text-red-500 hover:bg-red-50 transition-colors"
                  title="Remove from saved"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* College Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 truncate">{college.name}</h3>
                <p className="text-sm text-gray-500 mt-1 truncate">
                  {college.city}, {college.state}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-sm">
                  {college.rating && (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                      {college.rating}
                    </span>
                  )}
                  {college.type && (
                    <span className="text-gray-500">{college.type}</span>
                  )}
                </div>

                {/* Action */}
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/colleges/${college.slug}`}
                    className="flex-1 text-center py-2 px-4 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    View Details
                  </Link>
                  <button
                    className="flex-1 py-2 px-4 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

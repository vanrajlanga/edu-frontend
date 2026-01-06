'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthModal } from '@/components/auth';
import { cn } from '@/lib/cn';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api/v1';

export function ApplyNowModal({ isOpen, onClose, college }) {
  const { isAuthenticated, user, token } = useAuth();
  const [step, setStep] = useState('details'); // 'details' | 'courses' | 'success'
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    course: '',
    academic_year: new Date().getFullYear().toString(),
  });

  // Pre-fill form with user data
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.profile?.first_name
          ? `${user.profile.first_name} ${user.profile.last_name || ''}`.trim()
          : user.name || '',
        email: user.email || '',
        phone: user.phone?.replace('+91', '') || '',
        city: user.city || user.profile?.city || '',
      }));
    }
  }, [user]);

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('details');
        setError('');
      }, 300);
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!formData.name || !formData.phone) {
      setError('Please fill in all required fields');
      return;
    }

    // If not authenticated, show login
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/user/applications`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          college_id: college.college_id,
          course_id: formData.course || null,
          academic_year: formData.academic_year,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to submit application');
      }

      setStep('success');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle auth modal close
  const handleAuthClose = () => {
    setShowAuthModal(false);
    // After login, continue with application
    if (isAuthenticated) {
      handleSubmit({ preventDefault: () => {} });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-6 text-white">
            <div className="flex items-center gap-4">
              {college.logo_url ? (
                <img
                  src={college.logo_url}
                  alt={college.college_name}
                  className="w-14 h-14 rounded-lg object-cover bg-white"
                />
              ) : (
                <div className="w-14 h-14 rounded-lg bg-white/20 flex items-center justify-center">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              )}
              <div>
                <h2 className="text-lg font-semibold">Apply to {college.college_name}</h2>
                <p className="text-orange-100 text-sm">{college.city}, {college.state}</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Success State */}
            {step === 'success' && (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Application Submitted!</h3>
                <p className="text-gray-500 mb-6">
                  Your application to {college.college_name} has been submitted successfully.
                  You will receive updates via email and SMS.
                </p>
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href="/dashboard/applied-colleges"
                    className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-green-700 text-white font-medium rounded-lg hover:from-green-700 hover:to-green-800 transition-all"
                  >
                    View Applications
                  </a>
                </div>
              </div>
            )}

            {/* Details Form */}
            {step === 'details' && (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                      required
                    />
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 text-gray-500 bg-gray-50 border border-r-0 border-gray-200 rounded-l-lg text-sm">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value.replace(/\D/g, '').slice(0, 10),
                            }))
                          }
                          placeholder="Phone number"
                          className="flex-1 px-3 py-2.5 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email address"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                    />
                  </div>

                  {/* Course Selection */}
                  {college.courses && college.courses.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Select Course
                      </label>
                      <select
                        name="course"
                        value={formData.course}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-100 focus:border-orange-500 transition-all"
                      >
                        <option value="">Select a course</option>
                        {college.courses.map((course) => (
                          <option key={course.course_id} value={course.course_id}>
                            {course.course_name} {course.degree_type ? `(${course.degree_type})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Consent */}
                <p className="mt-4 text-xs text-gray-500">
                  By submitting this form, you agree to receive communications from {college.college_name} and PlanEdu.
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full mt-6 py-3 px-4 rounded-lg font-medium text-white',
                    'bg-gradient-to-r from-orange-500 to-orange-600',
                    'hover:from-orange-600 hover:to-orange-700',
                    'disabled:opacity-50 disabled:cursor-not-allowed',
                    'transition-all duration-200 shadow-sm hover:shadow'
                  )}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Submitting...
                    </span>
                  ) : isAuthenticated ? (
                    'Submit Application'
                  ) : (
                    'Continue to Apply'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={handleAuthClose} />
    </>
  );
}

export default ApplyNowModal;

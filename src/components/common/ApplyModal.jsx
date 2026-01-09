'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

// Admission help features
const admissionFeatures = [
  {
    id: 1,
    title: 'Brochure Details',
    icon: 'document',
  },
  {
    id: 2,
    title: 'Check Detailed Fees',
    icon: 'currency',
  },
  {
    id: 3,
    title: 'Shortlist & Apply',
    icon: 'filter',
  },
  {
    id: 4,
    title: '24/7 Counselling',
    icon: 'phone',
  },
  {
    id: 5,
    title: 'Scholarships',
    icon: 'trophy',
  },
  {
    id: 6,
    title: 'Application Deadlines',
    icon: 'calendar',
  },
];

// Mock testimonials
const testimonials = [
  {
    id: 1,
    name: 'Ridhima Sharma',
    text: 'No need to remember deadlines as I get timely updates now.',
    avatar: null,
  },
  {
    id: 2,
    name: 'Aakash Kumar',
    text: 'The application process was so smooth and easy to follow.',
    avatar: null,
  },
  {
    id: 3,
    name: 'Priya Patel',
    text: 'Got all the information I needed in one place. Highly recommend!',
    avatar: null,
  },
];

function ApplyModal({ isOpen, onClose, college }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    city: '',
    course: '',
    agreeTerms: false,
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isOnlineDistance, setIsOnlineDistance] = useState(true);

  if (!isOpen || !college) return null;

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
    onClose();
  };

  const handlePrevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-x-0 top-1/2 -translate-y-1/2 z-50 max-w-5xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="relative bg-white rounded-xl shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Icon name="close" size="sm" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
            {/* Left Side - Admission Help */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                How Collegedunia helps you in Admission
              </h2>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {admissionFeatures.map((feature) => (
                  <div
                    key={feature.id}
                    className="bg-white border border-gray-200 rounded-lg p-3 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer"
                  >
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <Icon name={feature.icon} size="md" className="text-gray-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-900 leading-tight">{feature.title}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Testimonials */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">What people say</h3>
                <div className="relative bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      {testimonials[currentTestimonial].avatar ? (
                        <img
                          src={testimonials[currentTestimonial].avatar}
                          alt={testimonials[currentTestimonial].name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-bold text-base">
                            {testimonials[currentTestimonial].name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Testimonial Content */}
                    <div className="flex-1">
                      <p className="text-gray-700 text-xs mb-1.5">
                        {testimonials[currentTestimonial].text}
                      </p>
                      <p className="text-gray-900 font-semibold text-xs">
                        {testimonials[currentTestimonial].name}
                      </p>
                    </div>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center justify-between mt-3">
                    <button
                      onClick={handlePrevTestimonial}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Icon name="chevronLeft" size="xs" className="text-gray-600" />
                    </button>
                    <div className="flex gap-1.5">
                      {testimonials.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTestimonial(index)}
                          className={cn(
                            'w-1.5 h-1.5 rounded-full transition-colors',
                            index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                          )}
                        />
                      ))}
                    </div>
                    <button
                      onClick={handleNextTestimonial}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Icon name="chevronRight" size="xs" className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Registration Form */}
            <div>
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-orange-600 mb-3">Register Now To Apply</h2>

                {/* College Logo and Name */}
                <div className="flex items-center justify-center gap-3 mb-4">
                  {college.logo ? (
                    <img src={college.logo} alt={college.name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 flex items-center justify-center">
                      <span className="text-blue-700 font-bold text-lg">{college.name?.charAt(0)}</span>
                    </div>
                  )}
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm leading-tight">{college.name}</h3>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* Full Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <div className="relative">
                      <Icon name="user" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name *"
                        required
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Icon name="mail" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Email Address *"
                        required
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Mobile and City */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  <div>
                    <div className="relative flex">
                      <div className="flex items-center px-2.5 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg">
                        <span className="text-sm text-gray-700">+91</span>
                      </div>
                      <div className="relative flex-1">
                        <Icon name="phone" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleInputChange}
                          placeholder="Mobile Number *"
                          required
                          maxLength={10}
                          className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-r-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <Icon name="location" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="City You Live In *"
                        required
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Course Interested In */}
                <div>
                  <div className="relative">
                    <Icon name="book" size="sm" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      placeholder="Course Interested In *"
                      required
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-100 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Online/Distance Toggle - Shows after course selection */}
                {formData.course && (
                  <div className="flex items-center gap-3 py-1">
                    <div className="flex items-center gap-2">
                      {/* Toggle Switch */}
                      <button
                        type="button"
                        onClick={() => setIsOnlineDistance(!isOnlineDistance)}
                        className={cn(
                          'relative inline-flex items-center h-7 w-14 rounded-full transition-colors duration-200 ease-in-out focus:outline-none',
                          isOnlineDistance ? 'bg-orange-500' : 'bg-gray-300'
                        )}
                      >
                        <span
                          className={cn(
                            'inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 ease-in-out',
                            isOnlineDistance ? 'translate-x-8' : 'translate-x-1'
                          )}
                        />
                        <span
                          className={cn(
                            'absolute text-[10px] font-bold transition-opacity duration-200',
                            isOnlineDistance ? 'left-2 text-white' : 'right-2 text-gray-600'
                          )}
                        >
                          {isOnlineDistance ? 'YES' : 'NO'}
                        </span>
                      </button>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Looking For Online/Distance Course?
                    </span>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleInputChange}
                    required
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-orange-600 focus:ring-orange-500 flex-shrink-0"
                  />
                  <label className="text-xs text-gray-700 leading-tight">
                    By submitting this form, you accept and agree to our{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-1">
                  <Button
                    type="submit"
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2.5 rounded-lg text-sm"
                    disabled={!formData.agreeTerms}
                  >
                    SUBMIT
                  </Button>
                </div>

                {/* Login Link */}
                <div className="text-center pt-1">
                  <a href="#" className="text-orange-600 hover:underline text-xs font-medium">
                    Already Registered? Click Here To Login.
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export { ApplyModal };
export default ApplyModal;

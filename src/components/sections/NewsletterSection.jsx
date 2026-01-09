'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';

// Course options for dropdown
const courseOptions = [
  { value: '', label: 'Choose your course' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'medical', label: 'Medical' },
  { value: 'management', label: 'Management' },
  { value: 'law', label: 'Law' },
  { value: 'arts', label: 'Arts & Humanities' },
  { value: 'science', label: 'Science' },
  { value: 'commerce', label: 'Commerce' },
  { value: 'design', label: 'Design' },
  { value: 'pharmacy', label: 'Pharmacy' },
  { value: 'agriculture', label: 'Agriculture' },
];

function NewsletterSection({ className }) {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    course: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('Newsletter subscription:', formData);
    setIsSubmitting(false);
    // Reset form
    setFormData({ email: '', phone: '', course: '' });
  };

  return (
    <section className={cn('py-12 bg-gradient-to-r from-blue-900 via-blue-700 to-blue-600 relative overflow-hidden', className)}>
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-300 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Compact Header with Icon */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-300/20 backdrop-blur-sm flex items-center justify-center">
                <Icon name="bell" size="lg" className="text-blue-50" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Subscribe To Our Newsletter
              </h2>
            </div>
            <p className="text-blue-50/90 text-base max-w-2xl mx-auto">
              Get College Notifications, Exam Notifications and News Updates directly in your inbox
            </p>
          </div>

          {/* Compact Form */}
          <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="email" size="sm" className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  required
                  className={cn(
                    'w-full pl-10 pr-3 py-3 rounded-lg',
                    'border border-gray-300',
                    'text-gray-900 placeholder-gray-400 text-sm',
                    'focus:border-blue-800 focus:ring-1 focus:ring-blue-800',
                    'transition-all duration-200 outline-none'
                  )}
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="phone" size="sm" className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile no"
                  required
                  className={cn(
                    'w-full pl-10 pr-3 py-3 rounded-lg',
                    'border border-gray-300',
                    'text-gray-900 placeholder-gray-400 text-sm',
                    'focus:border-blue-800 focus:ring-1 focus:ring-blue-800',
                    'transition-all duration-200 outline-none'
                  )}
                />
              </div>

              {/* Course Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="graduationCap" size="sm" className="text-gray-400" />
                </div>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className={cn(
                    'w-full pl-10 pr-8 py-3 rounded-lg appearance-none',
                    'border border-gray-300',
                    'text-gray-900 text-sm',
                    'focus:border-blue-800 focus:ring-1 focus:ring-blue-800',
                    'transition-all duration-200 outline-none',
                    'bg-white cursor-pointer',
                    !formData.course && 'text-gray-400'
                  )}
                >
                  {courseOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <Icon name="chevronDown" size="sm" className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Submit Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <Icon name="shield" size="sm" className="text-emerald-500" />
                We respect your privacy. Unsubscribe anytime.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full sm:w-auto px-8 py-3 rounded-lg',
                  'bg-blue-800 hover:bg-blue-900',
                  'text-white font-semibold text-sm',
                  'shadow-md hover:shadow-lg',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-2',
                  'disabled:opacity-70 disabled:cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe Now</span>
                    <Icon name="send" size="sm" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Compact Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Icon name="check" size="sm" className="text-emerald-400" />
              <span>100K+ Subscribers</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Icon name="check" size="sm" className="text-emerald-400" />
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Icon name="check" size="sm" className="text-emerald-400" />
              <span>Exam Alerts</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-sm">
              <Icon name="check" size="sm" className="text-emerald-400" />
              <span>Admission Updates</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { NewsletterSection };
export default NewsletterSection;

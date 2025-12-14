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
    <section className={cn('py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden', className)}>
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient circles */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
              <Icon name="bell" size="xl" className="text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
              Subscribe To Our Newsletter
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto">
              Get College Notifications, Exam Notifications and News Updates directly in your inbox
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="email" size="md" className="text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email id"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5 rounded-xl',
                    'border-2 border-gray-200',
                    'text-gray-900 placeholder-gray-400',
                    'focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
                    'transition-all duration-200 outline-none'
                  )}
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="phone" size="md" className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your mobile no"
                  required
                  className={cn(
                    'w-full pl-12 pr-4 py-3.5 rounded-xl',
                    'border-2 border-gray-200',
                    'text-gray-900 placeholder-gray-400',
                    'focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
                    'transition-all duration-200 outline-none'
                  )}
                />
              </div>

              {/* Course Dropdown */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Icon name="graduationCap" size="md" className="text-gray-400" />
                </div>
                <select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  required
                  className={cn(
                    'w-full pl-12 pr-10 py-3.5 rounded-xl appearance-none',
                    'border-2 border-gray-200',
                    'text-gray-900',
                    'focus:border-blue-500 focus:ring-2 focus:ring-blue-100',
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
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <Icon name="chevronDown" size="md" className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Icon name="shield" size="sm" className="text-green-500" />
                We respect your privacy. Unsubscribe anytime.
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  'w-full sm:w-auto px-8 py-3.5 rounded-xl',
                  'bg-gradient-to-r from-blue-500 to-blue-600',
                  'text-white font-semibold text-base',
                  'hover:from-blue-600 hover:to-blue-700',
                  'shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40',
                  'transform hover:-translate-y-0.5',
                  'transition-all duration-200',
                  'flex items-center justify-center gap-2',
                  'disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none'
                )}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Subscribing...</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe Now</span>
                    <Icon name="send" size="md" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-blue-100/80 text-sm">
              <Icon name="check" size="sm" className="text-green-400" />
              <span>100K+ Subscribers</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100/80 text-sm">
              <Icon name="check" size="sm" className="text-green-400" />
              <span>Daily Updates</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100/80 text-sm">
              <Icon name="check" size="sm" className="text-green-400" />
              <span>Exam Alerts</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100/80 text-sm">
              <Icon name="check" size="sm" className="text-green-400" />
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

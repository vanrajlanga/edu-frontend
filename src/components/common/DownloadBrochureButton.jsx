'use client';

import { useState } from 'react';
import { downloadBrochure } from '@/lib/api';
import { cn } from '@/lib/cn';

/**
 * Download Brochure Button component
 * @param {Object} props
 * @param {number} props.collegeId - College ID
 * @param {string} props.collegeName - College name for display
 * @param {string} props.variant - Button variant: 'button' | 'link' | 'icon'
 * @param {string} props.className - Additional CSS classes
 */
export function DownloadBrochureButton({
  collegeId,
  collegeName = 'College',
  variant = 'button',
  className
}) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const result = await downloadBrochure(collegeId);

      if (result?.brochure_url) {
        // Open brochure in new tab
        window.open(result.brochure_url, '_blank');
      } else {
        // No brochure available, show modal
        setShowModal(true);
      }
    } catch (error) {
      console.error('Download error:', error);
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  // Download Icon
  const DownloadIcon = () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  // Render based on variant
  if (variant === 'icon') {
    return (
      <>
        <button
          onClick={handleDownload}
          disabled={loading}
          className={cn(
            'p-2 rounded-lg transition-colors',
            'text-gray-600 hover:text-orange-600 hover:bg-orange-50',
            loading && 'opacity-50 cursor-not-allowed',
            className
          )}
          title="Download Brochure"
        >
          {loading ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <DownloadIcon />
          )}
        </button>
        {showModal && <NoBrochureModal collegeName={collegeName} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  if (variant === 'link') {
    return (
      <>
        <button
          onClick={handleDownload}
          disabled={loading}
          className={cn(
            'inline-flex items-center gap-1 text-sm text-orange-600 hover:text-orange-700 transition-colors',
            loading && 'opacity-50 cursor-not-allowed',
            className
          )}
        >
          <DownloadIcon />
          <span>{loading ? 'Loading...' : 'Download Brochure'}</span>
        </button>
        {showModal && <NoBrochureModal collegeName={collegeName} onClose={() => setShowModal(false)} />}
      </>
    );
  }

  // Default button variant
  return (
    <>
      <button
        onClick={handleDownload}
        disabled={loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg',
          'bg-orange-50 text-orange-600 border border-orange-200',
          'hover:bg-orange-100 transition-colors',
          'text-sm font-medium',
          loading && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <DownloadIcon />
        <span>{loading ? 'Loading...' : 'Download Brochure'}</span>
      </button>
      {showModal && <NoBrochureModal collegeName={collegeName} onClose={() => setShowModal(false)} />}
    </>
  );
}

// Modal shown when brochure is not available
function NoBrochureModal({ collegeName, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="text-center">
          <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Brochure Not Available</h3>
          <p className="text-gray-600 mb-4">
            The brochure for <strong>{collegeName}</strong> is not available at the moment.
            Please check back later or visit the college's official website.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default DownloadBrochureButton;

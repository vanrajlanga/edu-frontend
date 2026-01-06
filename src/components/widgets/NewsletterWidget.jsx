'use client';

import { cn } from '@/lib/cn';
import { Icon } from '@/components/ui';

export default function NewsletterWidget({ className }) {
  return (
    <div
      className={cn(
        'bg-gradient-to-br from-green-50 to-emerald-50',
        'rounded-lg p-4',
        'border border-green-100',
        className
      )}
    >
      {/* Header with Icon */}
      <div className="flex items-start gap-2 mb-3">
        <div className="flex-1">
          <h3 className="text-base font-bold text-gray-900 leading-tight">
            Subscribe to our
          </h3>
          <h3 className="text-base font-bold text-green-600 leading-tight">
            Newsletter
          </h3>
        </div>

        {/* Email Illustration */}
        <div className="flex-shrink-0">
          <svg viewBox="0 0 64 64" className="w-12 h-12">
            {/* Envelope Base */}
            <rect
              x="8"
              y="20"
              width="48"
              height="32"
              rx="3"
              fill="white"
              stroke="#3DA35D"
              strokeWidth="2"
            />

            {/* Envelope Flap */}
            <path
              d="M8 23 L32 40 L56 23"
              fill="none"
              stroke="#3DA35D"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Lines inside envelope */}
            <line x1="16" y1="32" x2="28" y2="32" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="16" y1="38" x2="24" y2="38" stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round" />

            {/* Success Checkmark Badge */}
            <circle cx="48" cy="16" r="10" fill="#10B981" />
            <path
              d="M44 16 L47 19 L52 13"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 mb-3 leading-relaxed">
        Get latest exam updates, college notifications, and admission alerts
      </p>

      {/* Subscribe Button */}
      <a
        href="/subscribe"
        className={cn(
          'block w-full text-center',
          'px-4 py-2 rounded-lg',
          'bg-gradient-to-r from-green-600 to-emerald-600',
          'hover:from-green-700 hover:to-emerald-700',
          'text-white font-semibold text-xs',
          'shadow-md hover:shadow-lg',
          'transition-all duration-200',
          'flex items-center justify-center gap-1.5'
        )}
      >
        <span>Subscribe Now</span>
        <Icon name="send" size="sm" className="text-white" />
      </a>

      {/* Trust Indicators */}
      <div className="flex items-center justify-center gap-3 mt-3 pt-3 border-t border-green-200">
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Icon name="check" size="sm" className="text-green-600" />
          <span>100K+ Subscribers</span>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600">
          <Icon name="shield" size="sm" className="text-green-600" />
          <span>No Spam</span>
        </div>
      </div>
    </div>
  );
}

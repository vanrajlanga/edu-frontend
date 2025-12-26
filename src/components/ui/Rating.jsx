'use client';

import { cn } from '@/lib/cn';

function StarIcon({ filled, half, className }) {
  if (half) {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="half-star">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
          fill="url(#half-star)"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}

const ratingSizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

function Rating({
  value = 0,
  max = 5,
  size = 'md',
  showValue = true,
  reviewCount,
  className,
  ...props
}) {
  const stars = [];
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;

  for (let i = 0; i < max; i++) {
    if (i < fullStars) {
      stars.push(
        <StarIcon
          key={i}
          filled
          className={cn(ratingSizes[size], 'text-amber-500')}
        />
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(
        <StarIcon
          key={i}
          half
          className={cn(ratingSizes[size], 'text-amber-500')}
        />
      );
    } else {
      stars.push(
        <StarIcon
          key={i}
          filled={false}
          className={cn(ratingSizes[size], 'text-indigo-200 dark:text-green-600')}
        />
      );
    }
  }

  return (
    <div className={cn('flex items-center gap-1.5', className)} {...props}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showValue && (
        <span className="text-sm font-medium text-text-primary">
          {value.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-sm text-text-muted">
          ({reviewCount.toLocaleString()} reviews)
        </span>
      )}
    </div>
  );
}

export { Rating, StarIcon };
export default Rating;

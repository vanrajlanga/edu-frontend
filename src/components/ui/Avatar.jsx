'use client';

import { cn } from '@/lib/cn';
import Image from 'next/image';

const avatarSizes = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
  xl: 'w-16 h-16 text-xl',
  '2xl': 'w-20 h-20 text-2xl',
};

function Avatar({
  src,
  alt = '',
  name,
  size = 'md',
  ring = false,
  ringColor = 'blue',
  className,
  ...props
}) {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '';

  const ringStyles = {
    blue: 'ring-blue-500',
    slate: 'ring-slate-500',
    emerald: 'ring-emerald-500',
    amber: 'ring-amber-500',
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center',
        'rounded-full overflow-hidden',
        'bg-slate-100 dark:bg-slate-800',
        avatarSizes[size],
        ring && ['ring-2 ring-offset-2 ring-offset-background', ringStyles[ringColor]],
        className
      )}
      {...props}
    >
      {src ? (
        <Image
          src={src}
          alt={alt || name || 'Avatar'}
          fill
          className="object-cover"
        />
      ) : (
        <span className="font-medium text-slate-600 dark:text-slate-300">
          {initials}
        </span>
      )}
    </div>
  );
}

function AvatarGroup({ children, max = 4, size = 'md', className }) {
  const childArray = Array.isArray(children) ? children : [children];
  const visibleAvatars = childArray.slice(0, max);
  const remainingCount = childArray.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((child, index) => (
        <div
          key={index}
          className="ring-2 ring-background rounded-full"
          style={{ zIndex: visibleAvatars.length - index }}
        >
          {child}
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={cn(
            'inline-flex items-center justify-center',
            'rounded-full bg-slate-200 dark:bg-slate-700',
            'ring-2 ring-background',
            avatarSizes[size]
          )}
        >
          <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}

export { Avatar, AvatarGroup, avatarSizes };
export default Avatar;

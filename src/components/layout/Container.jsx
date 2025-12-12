'use client';

import { cn } from '@/lib/cn';

const containerSizes = {
  sm: 'max-w-3xl',      // 768px
  md: 'max-w-5xl',      // 1024px
  lg: 'max-w-6xl',      // 1152px
  xl: 'max-w-7xl',      // 1280px
  full: 'max-w-full',
};

function Container({
  size = 'xl',
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        containerSizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Container, containerSizes };
export default Container;

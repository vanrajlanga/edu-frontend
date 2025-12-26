'use client';

import { cn } from '@/lib/cn';
import Link from 'next/link';

function Logo({ size = 'md', className, ...props }) {
  const sizeStyles = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <Link
      href="/"
      className={cn(
        'font-bold tracking-tight inline-flex items-center',
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span className="text-green-800">Edu</span>
      <span className="text-gray-800">Portal</span>
    </Link>
  );
}

export { Logo };
export default Logo;

'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const buttonVariants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-900 shadow-green',
  secondary: 'bg-slate-800 text-white hover:bg-slate-900',
  outline: 'border-2 border-blue-800 text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-500/10',
  ghost: 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
  link: 'text-blue-800 hover:text-blue-900 underline-offset-4 hover:underline',
};

const buttonSizes = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-base',
  lg: 'h-13 px-8 text-lg',
};

const Button = forwardRef(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      leftIcon,
      rightIcon,
      loading = false,
      disabled = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          'inline-flex items-center justify-center gap-2',
          'font-medium rounded-[var(--radius-md)]',
          'transition-all duration-[var(--duration-fast)]',
          'focus-ring',
          // Variant
          buttonVariants[variant],
          // Size
          buttonSizes[size],
          // States
          isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none',
          !isDisabled && 'hover:scale-[1.02] active:scale-[0.98]',
          // Full width
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...props}
      >
        {loading ? (
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants, buttonSizes };
export default Button;

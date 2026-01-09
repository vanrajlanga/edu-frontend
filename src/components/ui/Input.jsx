'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const inputVariants = {
  default: 'bg-surface border-border focus:border-blue-800',
  filled: 'bg-surface-alt border-transparent focus:border-blue-800',
};

const inputSizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-13 px-5 text-lg',
};

const Input = forwardRef(
  (
    {
      className,
      type = 'text',
      variant = 'default',
      size = 'md',
      leftIcon,
      rightIcon,
      error,
      helperText,
      label,
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-text-primary mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              // Base styles
              'w-full rounded-[var(--radius-md)]',
              'border transition-colors duration-[var(--duration-fast)]',
              'placeholder:text-text-muted',
              'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
              // Variant
              inputVariants[variant],
              // Size
              inputSizes[size],
              // Icons padding
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              // Error state
              error && 'border-error focus:border-error focus:ring-error/20',
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <p
            className={cn(
              'mt-1.5 text-sm',
              error ? 'text-error' : 'text-text-muted'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants, inputSizes };
export default Input;

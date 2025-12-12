'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

const Card = forwardRef(
  (
    {
      className,
      padding = 'md',
      shadow = 'md',
      hover = false,
      bordered = true,
      glass = false,
      children,
      ...props
    },
    ref
  ) => {
    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const shadowStyles = {
      none: '',
      sm: 'shadow-sm',
      md: 'shadow-md',
      lg: 'shadow-lg',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[var(--radius-lg)]',
          // Background
          glass ? 'glass' : 'bg-surface',
          // Border
          bordered && !glass && 'border border-border',
          // Shadow
          shadowStyles[shadow],
          // Padding
          paddingStyles[padding],
          // Hover effect
          hover && [
            'transition-all duration-[var(--duration-normal)]',
            'hover:-translate-y-1 hover:shadow-lg',
          ],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

function CardHeader({ className, children, ...props }) {
  return (
    <div
      className={cn('flex flex-col space-y-1.5', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardTitle({ className, children, ...props }) {
  return (
    <h3
      className={cn(
        'text-xl font-semibold text-text-primary leading-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function CardDescription({ className, children, ...props }) {
  return (
    <p
      className={cn('text-sm text-text-secondary', className)}
      {...props}
    >
      {children}
    </p>
  );
}

function CardContent({ className, children, ...props }) {
  return (
    <div className={cn('pt-4', className)} {...props}>
      {children}
    </div>
  );
}

function CardFooter({ className, children, ...props }) {
  return (
    <div
      className={cn('flex items-center pt-4', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
export default Card;

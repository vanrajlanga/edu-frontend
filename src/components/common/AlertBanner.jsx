'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

const alertVariants = {
  info: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-800',
    text: 'text-green-800 dark:text-green-200',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-900/20',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: 'text-emerald-500',
    text: 'text-emerald-800 dark:text-emerald-200',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-900/20',
    border: 'border-amber-200 dark:border-amber-800',
    icon: 'text-amber-500',
    text: 'text-amber-800 dark:text-amber-200',
  },
  error: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-500',
    text: 'text-green-800 dark:text-red-200',
  },
  promotional: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    icon: 'text-green-800',
    text: 'text-green-800 dark:text-green-200',
  },
};

const alertIcons = {
  info: 'info',
  success: 'check',
  warning: 'info',
  error: 'info',
  promotional: 'bell',
};

function AlertBanner({
  variant = 'info',
  title,
  message,
  action,
  actionText = 'Learn More',
  dismissible = true,
  onDismiss,
  sticky = false,
  className,
  ...props
}) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  if (!isVisible) return null;

  const styles = alertVariants[variant];
  const iconName = alertIcons[variant];

  return (
    <div
      role="alert"
      className={cn(
        'border rounded-[var(--radius-md)]',
        styles.bg,
        styles.border,
        sticky && 'sticky top-0 z-40',
        className
      )}
      {...props}
    >
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div className={cn('flex-shrink-0 mt-0.5', styles.icon)}>
          <Icon name={iconName} size="md" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn('font-semibold', styles.text)}>
              {title}
            </h4>
          )}
          {message && (
            <p className={cn('text-sm mt-1', styles.text, 'opacity-90')}>
              {message}
            </p>
          )}
          {action && (
            <div className="mt-3">
              <Button
                variant={variant === 'promotional' ? 'primary' : 'outline'}
                size="sm"
                onClick={action}
              >
                {actionText}
              </Button>
            </div>
          )}
        </div>

        {/* Dismiss Button */}
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className={cn(
              'flex-shrink-0 p-1 rounded-[var(--radius-sm)]',
              'hover:bg-black/5 dark:hover:bg-white/5',
              'transition-colors',
              styles.text
            )}
            aria-label="Dismiss"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
      </div>
    </div>
  );
}

function TopBanner({
  message,
  actionText,
  actionHref,
  onAction,
  dismissible = true,
  className,
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'bg-green-500 text-white',
        'py-2 px-4',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm">
        <p className="text-center">{message}</p>
        {(actionHref || onAction) && (
          actionHref ? (
            <a
              href={actionHref}
              className="font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
            >
              {actionText}
            </a>
          ) : (
            <button
              type="button"
              onClick={onAction}
              className="font-semibold underline underline-offset-2 hover:no-underline whitespace-nowrap"
            >
              {actionText}
            </button>
          )
        )}
        {dismissible && (
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="absolute right-4 p-1 hover:bg-white/10 rounded"
            aria-label="Dismiss"
          >
            <Icon name="close" size="sm" />
          </button>
        )}
      </div>
    </div>
  );
}

export { AlertBanner, TopBanner, alertVariants };
export default AlertBanner;

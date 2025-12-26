'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';
import { Badge } from '../ui/Badge';

function FilterTabs({
  items,
  defaultValue,
  value,
  onChange,
  variant = 'underline',
  showCount = false,
  scrollable = true,
  className,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue || items[0]?.value);
  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const variantStyles = {
    underline: {
      container: 'border-b border-border',
      tab: (isActive) =>
        cn(
          'relative px-4 py-3 font-medium text-sm whitespace-nowrap',
          'transition-colors duration-[var(--duration-fast)]',
          isActive
            ? 'text-green-800'
            : 'text-text-secondary hover:text-text-primary',
          isActive && [
            'after:absolute after:bottom-0 after:left-0 after:right-0',
            'after:h-0.5 after:bg-green-500 after:rounded-full',
          ]
        ),
    },
    pills: {
      container: 'gap-2',
      tab: (isActive) =>
        cn(
          'px-4 py-2 rounded-[var(--radius-full)] font-medium text-sm whitespace-nowrap',
          'transition-all duration-[var(--duration-fast)]',
          isActive
            ? 'bg-green-500 text-white'
            : 'bg-surface-alt text-text-secondary hover:bg-green-50 hover:text-green-900'
        ),
    },
    boxed: {
      container: 'bg-surface-alt p-1 rounded-[var(--radius-lg)] gap-1',
      tab: (isActive) =>
        cn(
          'px-4 py-2 rounded-[var(--radius-md)] font-medium text-sm whitespace-nowrap',
          'transition-all duration-[var(--duration-fast)]',
          isActive
            ? 'bg-surface text-text-primary shadow-sm'
            : 'text-text-secondary hover:text-text-primary'
        ),
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'flex items-center',
        styles.container,
        scrollable && 'overflow-x-auto scrollbar-hide',
        className
      )}
      role="tablist"
      {...props}
    >
      {items.map((item) => {
        const isActive = currentValue === item.value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => handleChange(item.value)}
            disabled={item.disabled}
            className={cn(
              styles.tab(isActive),
              'flex items-center gap-2',
              item.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span>{item.label}</span>
            {showCount && item.count !== undefined && (
              <Badge
                variant={isActive ? 'primary' : 'default'}
                size="sm"
              >
                {item.count}
              </Badge>
            )}
          </button>
        );
      })}
    </div>
  );
}

export { FilterTabs };
export default FilterTabs;

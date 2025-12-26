'use client';

import { useState, createContext, useContext } from 'react';
import { cn } from '@/lib/cn';

const TabsContext = createContext(null);

function Tabs({
  defaultValue,
  value,
  onValueChange,
  variant = 'underline',
  fullWidth = false,
  className,
  children,
  ...props
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  return (
    <TabsContext.Provider
      value={{ value: currentValue, onValueChange: handleValueChange, variant, fullWidth }}
    >
      <div className={cn('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}

function TabsList({ className, children, ...props }) {
  const { variant, fullWidth } = useContext(TabsContext);

  const variantStyles = {
    underline: 'border-b border-border gap-0',
    pills: 'bg-surface-alt p-1 rounded-[var(--radius-lg)] gap-1',
    boxed: 'border border-border rounded-[var(--radius-lg)] p-1 gap-1',
  };

  return (
    <div
      role="tablist"
      className={cn(
        'flex items-center',
        variantStyles[variant],
        fullWidth && 'w-full',
        // Scrollable on mobile
        'overflow-x-auto scrollbar-hide',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ value, disabled = false, className, children, ...props }) {
  const { value: selectedValue, onValueChange, variant, fullWidth } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  const baseStyles = 'relative px-4 py-2.5 font-medium text-sm transition-all duration-[var(--duration-fast)] whitespace-nowrap focus-ring';

  const variantStyles = {
    underline: cn(
      'text-text-secondary hover:text-text-primary',
      isSelected && [
        'text-green-800',
        'after:absolute after:bottom-0 after:left-0 after:right-0',
        'after:h-0.5 after:bg-green-500 after:rounded-full',
      ]
    ),
    pills: cn(
      'rounded-[var(--radius-md)]',
      isSelected
        ? 'bg-surface text-text-primary shadow-sm'
        : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
    ),
    boxed: cn(
      'rounded-[var(--radius-md)]',
      isSelected
        ? 'bg-green-500 text-white'
        : 'text-text-secondary hover:text-text-primary hover:bg-surface'
    ),
  };

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isSelected}
      disabled={disabled}
      onClick={() => !disabled && onValueChange(value)}
      className={cn(
        baseStyles,
        variantStyles[variant],
        fullWidth && 'flex-1',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, className, children, ...props }) {
  const { value: selectedValue } = useContext(TabsContext);

  if (selectedValue !== value) return null;

  return (
    <div
      role="tabpanel"
      className={cn('mt-4 animate-fade-in', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
export default Tabs;

'use client';

import { useState, useRef, useEffect, createContext, useContext } from 'react';
import { cn } from '@/lib/cn';

const DropdownContext = createContext(null);

function Dropdown({ children, closeOnSelect = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSelect = () => {
    if (closeOnSelect) {
      setIsOpen(false);
    }
  };

  return (
    <DropdownContext.Provider value={{ isOpen, setIsOpen, handleSelect }}>
      <div ref={dropdownRef} className="relative inline-block">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

function DropdownTrigger({ asChild = false, className, children, ...props }) {
  const { isOpen, setIsOpen } = useContext(DropdownContext);

  const handleClick = () => setIsOpen(!isOpen);

  if (asChild) {
    return (
      <div onClick={handleClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-expanded={isOpen}
      className={cn(
        'inline-flex items-center gap-2',
        'px-4 py-2 rounded-[var(--radius-md)]',
        'text-text-primary hover:bg-surface-alt',
        'transition-colors duration-[var(--duration-fast)]',
        'focus-ring',
        className
      )}
      {...props}
    >
      {children}
      <svg
        className={cn(
          'w-4 h-4 transition-transform duration-[var(--duration-fast)]',
          isOpen && 'rotate-180'
        )}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>
  );
}

function DropdownContent({
  align = 'start',
  sideOffset = 4,
  className,
  children,
  ...props
}) {
  const { isOpen } = useContext(DropdownContext);

  if (!isOpen) return null;

  const alignStyles = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  return (
    <div
      className={cn(
        'absolute z-50',
        'min-w-[200px] py-2',
        'bg-surface border border-border',
        'rounded-[var(--radius-lg)] shadow-lg',
        'animate-scale-in origin-top',
        alignStyles[align],
        className
      )}
      style={{ marginTop: sideOffset }}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownItem({ disabled = false, className, children, onClick, ...props }) {
  const { handleSelect } = useContext(DropdownContext);

  const handleClick = (e) => {
    if (!disabled) {
      onClick?.(e);
      handleSelect();
    }
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      className={cn(
        'w-full px-4 py-2 text-left text-sm',
        'text-text-primary hover:bg-surface-alt',
        'transition-colors duration-[var(--duration-fast)]',
        'focus:bg-surface-alt focus:outline-none',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function DropdownSeparator({ className }) {
  return (
    <div className={cn('my-1 h-px bg-border', className)} />
  );
}

function DropdownLabel({ className, children }) {
  return (
    <div
      className={cn(
        'px-4 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider',
        className
      )}
    >
      {children}
    </div>
  );
}

export {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
};
export default Dropdown;

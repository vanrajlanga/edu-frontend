'use client';

import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

function SearchBar({
  placeholder = 'Search colleges, courses, exams...',
  size = 'lg',
  variant = 'default',
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  onSearch,
  onSuggestionClick,
  className,
  ...props
}) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const sizeStyles = {
    md: 'h-12',
    lg: 'h-14',
    xl: 'h-16',
  };

  const variantStyles = {
    default: 'bg-surface border border-border shadow-md',
    glass: 'glass shadow-lg',
    filled: 'bg-surface-alt border-0',
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch?.(query.trim());
      setShowDropdown(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowDropdown(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSuggestionSelect = (suggestion) => {
    setQuery(suggestion);
    onSuggestionClick?.(suggestion);
    setShowDropdown(false);
    inputRef.current?.blur();
  };

  const hasDropdownContent =
    suggestions.length > 0 ||
    recentSearches.length > 0 ||
    popularSearches.length > 0;

  return (
    <div className={cn('relative w-full', className)}>
      <form onSubmit={handleSubmit}>
        <div
          className={cn(
            'flex items-center gap-3 px-4 rounded-[var(--radius-xl)]',
            'transition-all duration-[var(--duration-normal)]',
            sizeStyles[size],
            variantStyles[variant],
            isFocused && 'ring-2 ring-green-500/30 border-green-800'
          )}
        >
          <Icon
            name="search"
            size="lg"
            className="text-text-muted flex-shrink-0"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            className={cn(
              'flex-1 bg-transparent border-0 outline-none',
              'text-text-primary placeholder:text-text-muted',
              size === 'xl' ? 'text-lg' : 'text-base'
            )}
            {...props}
          />
          <Button
            type="submit"
            variant="primary"
            size={size === 'xl' ? 'md' : 'sm'}
            className="flex-shrink-0"
          >
            Search
          </Button>
        </div>
      </form>

      {/* Dropdown */}
      {showDropdown && hasDropdownContent && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute top-full left-0 right-0 mt-2 z-50',
            'bg-surface border border-border rounded-[var(--radius-lg)]',
            'shadow-lg overflow-hidden animate-scale-in'
          )}
        >
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(suggestion.text || suggestion)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)]',
                    'text-left hover:bg-surface-alt transition-colors'
                  )}
                >
                  <Icon name="search" size="sm" className="text-text-muted" />
                  <span className="text-text-primary">
                    {suggestion.text || suggestion}
                  </span>
                  {suggestion.category && (
                    <span className="ml-auto text-xs text-text-muted">
                      {suggestion.category}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div className="border-t border-border p-2">
              <p className="px-3 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider">
                Recent Searches
              </p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionSelect(search)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-[var(--radius-md)]',
                    'text-left hover:bg-surface-alt transition-colors'
                  )}
                >
                  <Icon name="clock" size="sm" className="text-text-muted" />
                  <span className="text-text-primary">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Popular Searches */}
          {popularSearches.length > 0 && (
            <div className="border-t border-border p-3">
              <p className="px-1 py-1.5 text-xs font-medium text-text-muted uppercase tracking-wider">
                Popular Searches
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {popularSearches.map((search, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleSuggestionSelect(search)}
                    className={cn(
                      'px-3 py-1.5 rounded-[var(--radius-full)]',
                      'bg-surface-alt hover:bg-green-50 hover:text-green-900',
                      'text-sm text-text-secondary',
                      'transition-colors'
                    )}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { SearchBar };
export default SearchBar;

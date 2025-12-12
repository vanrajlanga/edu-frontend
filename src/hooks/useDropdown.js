'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook to manage dropdown state and behavior
 * @param {Object} options - Dropdown options
 * @param {boolean} options.closeOnEscape - Close on Escape key
 * @param {boolean} options.closeOnClickOutside - Close on click outside
 * @param {boolean} options.closeOnSelect - Close when an item is selected
 * @returns {Object} Dropdown state and controls
 */
export function useDropdown({
  closeOnEscape = true,
  closeOnClickOutside = true,
  closeOnSelect = true,
} = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);

  const open = useCallback(() => {
    setIsOpen(true);
    setHighlightedIndex(-1);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSelect = useCallback(() => {
    if (closeOnSelect) {
      close();
    }
  }, [closeOnSelect, close]);

  // Handle click outside
  useEffect(() => {
    if (!closeOnClickOutside || !isOpen) return;

    const handleClickOutside = (event) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        close();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeOnClickOutside, close]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        close();
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, closeOnEscape, close]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event, itemCount) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev < itemCount - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setHighlightedIndex((prev) =>
            prev > 0 ? prev - 1 : itemCount - 1
          );
          break;
        case 'Home':
          event.preventDefault();
          setHighlightedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setHighlightedIndex(itemCount - 1);
          break;
        case 'Enter':
        case ' ':
          if (highlightedIndex >= 0) {
            event.preventDefault();
            handleSelect();
          }
          break;
        default:
          break;
      }
    },
    [isOpen, highlightedIndex, handleSelect]
  );

  return {
    // State
    isOpen,
    highlightedIndex,

    // Refs
    triggerRef,
    contentRef,

    // Actions
    open,
    close,
    toggle,
    handleSelect,
    handleKeyDown,
    setHighlightedIndex,
  };
}

export default useDropdown;

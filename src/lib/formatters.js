/**
 * Formatting utilities for currency, numbers, and dates
 */

/**
 * Format number to Indian currency format
 * @param {number} amount - Amount in rupees
 * @param {boolean} showDecimal - Whether to show decimal places
 * @returns {string} Formatted currency string
 */
export function formatINR(amount, showDecimal = false) {
  if (amount === null || amount === undefined) return '—';

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimal ? 2 : 0,
    maximumFractionDigits: showDecimal ? 2 : 0,
  });

  return formatter.format(amount);
}

/**
 * Format amount in Lacs (Indian numbering)
 * @param {number} amount - Amount in rupees
 * @returns {string} Formatted string like "7.68 Lacs"
 */
export function formatLacs(amount) {
  if (amount === null || amount === undefined) return '—';

  const lacs = amount / 100000;

  if (lacs >= 100) {
    return `${(lacs / 100).toFixed(2)} Cr`;
  }

  return `${lacs.toFixed(2)} Lacs`;
}

/**
 * Format USD currency
 * @param {number} amount - Amount in dollars
 * @param {boolean} showK - Whether to show in K format for thousands
 * @returns {string} Formatted currency string
 */
export function formatUSD(amount, showK = true) {
  if (amount === null || amount === undefined) return '—';

  if (showK && amount >= 1000) {
    return `$${(amount / 1000).toFixed(2)}K`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number with commas (Indian format)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export function formatNumber(num) {
  if (num === null || num === undefined) return '—';

  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Format number with + suffix for large numbers
 * @param {number} num - Number to format
 * @returns {string} Formatted string like "19,000+"
 */
export function formatCount(num) {
  if (num === null || num === undefined) return '—';

  if (num >= 1000) {
    const rounded = Math.floor(num / 1000) * 1000;
    return `${formatNumber(rounded)}+`;
  }

  return formatNumber(num);
}

/**
 * Format relative time
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string like "2 hours ago"
 */
export function formatRelativeTime(date) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min${diffMins > 1 ? 's' : ''} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  return then.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: then.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Format date for display
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'full'
 * @returns {string} Formatted date string
 */
export function formatDate(date, format = 'short') {
  const d = new Date(date);

  const options = {
    short: { day: 'numeric', month: 'short' },
    long: { day: 'numeric', month: 'long', year: 'numeric' },
    full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' },
  };

  return d.toLocaleDateString('en-IN', options[format] || options.short);
}

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export function truncate(text, maxLength = 100) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

/**
 * Format duration string
 * @param {number} years - Duration in years
 * @returns {string} Formatted duration
 */
export function formatDuration(years) {
  if (!years) return '—';

  if (years < 1) {
    const months = Math.round(years * 12);
    return `${months} Month${months > 1 ? 's' : ''}`;
  }

  if (years % 1 === 0) {
    return `${years} Year${years > 1 ? 's' : ''}`;
  }

  return `${years} Years`;
}

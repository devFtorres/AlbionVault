/**
 * Formatting utilities for numbers, dates, and text
 */

import { format as dateFnsFormat } from 'date-fns';
import type { ItemTier, ItemEnchantment } from '@/src/types';

/**
 * Format a number with thousands separators
 * @example formatNumber(1234567) // "1,234,567"
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

/**
 * Format a number as currency (silver in Albion)
 * @example formatSilver(123456) // "123,456"
 */
export function formatSilver(value: number): string {
  return formatNumber(Math.round(value));
}

/**
 * Format large numbers with K/M/B suffixes
 * @example formatCompactNumber(1234567) // "1.2M"
 */
export function formatCompactNumber(value: number): string {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toString();
}

/**
 * Format a percentage value
 * @example formatPercentage(0.1234) // "12.3%"
 */
export function formatPercentage(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

/**
 * Format a date to a readable string
 * @example formatDate(new Date()) // "Jan 1, 2025"
 */
export function formatDate(date: Date | string, formatStr = 'MMM d, yyyy'): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateFnsFormat(dateObj, formatStr);
}

/**
 * Format a date with time
 * @example formatDateTime(new Date()) // "Jan 1, 2025 12:00 PM"
 */
export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'MMM d, yyyy h:mm a');
}

/**
 * Format a relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const interval = Math.floor(seconds / secondsInUnit);
    if (interval >= 1) {
      return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
    }
  }

  return 'just now';
}

/**
 * Format item tier with enchantment
 * @example formatItemTier('T4', 2) // "T4.2"
 */
export function formatItemTier(tier: ItemTier, enchantment: ItemEnchantment = 0): string {
  return enchantment > 0 ? `${tier}.${enchantment}` : tier;
}

/**
 * Format item power
 * @example formatItemPower(1200) // "1,200 IP"
 */
export function formatItemPower(value: number): string {
  return `${formatNumber(value)} IP`;
}

/**
 * Truncate text to a maximum length
 * @example truncateText("Hello World", 8) // "Hello..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
}

/**
 * Capitalize first letter of a string
 * @example capitalize("hello") // "Hello"
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert snake_case to Title Case
 * @example toTitleCase("hello_world") // "Hello World"
 */
export function toTitleCase(text: string): string {
  return text
    .split('_')
    .map(capitalize)
    .join(' ');
}

/**
 * Format a duration in seconds to readable format
 * @example formatDuration(3665) // "1h 1m 5s"
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);

  return parts.join(' ');
}

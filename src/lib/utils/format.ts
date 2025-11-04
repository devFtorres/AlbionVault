/**
 * Formatting utilities
 * Utilitários de formatação
 */

import { format, formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format large numbers with abbreviations (1.5K, 2.3M, etc.)
 */
export function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  }
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return num.toString();
}

/**
 * Format number with commas (1,234,567)
 */
export function formatNumberWithCommas(num: number): string {
  return num.toLocaleString('en-US');
}

/**
 * Format currency (silver in Albion)
 */
export function formatSilver(amount: number): string {
  return `${formatNumberWithCommas(amount)} silver`;
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format fame ratio (K/D ratio)
 */
export function formatFameRatio(killFame: number, deathFame: number): string {
  if (deathFame === 0) return killFame > 0 ? '' : '0';
  return (killFame / deathFame).toFixed(2);
}

/**
 * Format date to readable string
 */
export function formatDate(
  date: string | Date,
  formatStr: string = 'PPP'
): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
}

/**
 * Format date to relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, { addSuffix: true });
}

/**
 * Format item power
 */
export function formatItemPower(power: number): string {
  return `${power.toFixed(0)} IP`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

/**
 * Format player name with guild tag
 */
export function formatPlayerName(
  name: string,
  guildName?: string,
  allianceName?: string
): string {
  let formatted = name;
  if (guildName) formatted += ` [${guildName}]`;
  if (allianceName) formatted += ` (${allianceName})`;
  return formatted;
}

/**
 * Format duration in milliseconds to readable string
 */
export function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Convert tier and enchantment to display string (e.g., "T8.3")
 */
export function formatTierEnchantment(
  tier: number,
  enchantment: number
): string {
  if (enchantment === 0) return `T${tier}`;
  return `T${tier}.${enchantment}`;
}

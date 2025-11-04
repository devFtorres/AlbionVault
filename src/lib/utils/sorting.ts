/**
 * Sorting utilities
 * Utilitários de ordenação
 */

import { SortDirection } from '@/types/common.types';

/**
 * Generic sort function for arrays
 */
export function sortBy<T>(
  array: T[],
  key: keyof T,
  direction: SortDirection = 'asc'
): T[] {
  return [...array].sort((a, b) => {
    const aVal = a[key];
    const bVal = b[key];

    if (aVal === bVal) return 0;

    let result = 0;
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      result = aVal.localeCompare(bVal);
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
      result = aVal - bVal;
    } else {
      result = String(aVal).localeCompare(String(bVal));
    }

    return direction === 'asc' ? result : -result;
  });
}

/**
 * Sort by multiple keys
 */
export function sortByMultiple<T>(
  array: T[],
  keys: { key: keyof T; direction: SortDirection }[]
): T[] {
  return [...array].sort((a, b) => {
    for (const { key, direction } of keys) {
      const aVal = a[key];
      const bVal = b[key];

      if (aVal === bVal) continue;

      let result = 0;
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        result = aVal.localeCompare(bVal);
      } else if (typeof aVal === 'number' && typeof bVal === 'number') {
        result = aVal - bVal;
      } else {
        result = String(aVal).localeCompare(String(bVal));
      }

      return direction === 'asc' ? result : -result;
    }
    return 0;
  });
}

/**
 * Sort by date
 */
export function sortByDate<T>(
  array: T[],
  key: keyof T,
  direction: SortDirection = 'desc'
): T[] {
  return [...array].sort((a, b) => {
    const aDate = new Date(a[key] as any).getTime();
    const bDate = new Date(b[key] as any).getTime();

    return direction === 'asc' ? aDate - bDate : bDate - aDate;
  });
}

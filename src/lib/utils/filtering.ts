/**
 * Filtering utilities
 * Utilitários de filtragem
 */

/**
 * Filter array by search query
 */
export function filterBySearch<T>(
  array: T[],
  searchQuery: string,
  searchKeys: (keyof T)[]
): T[] {
  if (!searchQuery || searchQuery.trim() === '') return array;

  const query = searchQuery.toLowerCase().trim();

  return array.filter((item) => {
    return searchKeys.some((key) => {
      const value = item[key];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(query);
      }
      if (typeof value === 'number') {
        return value.toString().includes(query);
      }
      return false;
    });
  });
}

/**
 * Filter by range (for numbers)
 */
export function filterByRange<T>(
  array: T[],
  key: keyof T,
  min?: number,
  max?: number
): T[] {
  return array.filter((item) => {
    const value = item[key];
    if (typeof value !== 'number') return true;

    if (min !== undefined && value < min) return false;
    if (max !== undefined && value > max) return false;
    return true;
  });
}

/**
 * Filter by multiple criteria
 */
export function filterBy<T>(
  array: T[],
  filters: Partial<Record<keyof T, any>>
): T[] {
  return array.filter((item) => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null) return true;
      return item[key as keyof T] === value;
    });
  });
}

/**
 * Remove duplicates from array
 */
export function removeDuplicates<T>(array: T[], key?: keyof T): T[] {
  if (!key) {
    return Array.from(new Set(array));
  }

  const seen = new Set();
  return array.filter((item) => {
    const value = item[key];
    if (seen.has(value)) return false;
    seen.add(value);
    return true;
  });
}

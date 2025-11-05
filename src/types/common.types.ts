/**
 * Common type definitions used across the application
 */

export type ItemTier = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8';

export type ItemEnchantment = 0 | 1 | 2 | 3 | 4;

export type ItemRarity = 'Normal' | 'Good' | 'Outstanding' | 'Excellent' | 'Masterpiece';

export interface ItemQuality {
  tier: ItemTier;
  enchantment: ItemEnchantment;
  rarity?: ItemRarity;
}

/**
 * Server/Location types
 */
export type AlbionServer = 'live' | 'west' | 'east';

export type AlbionLocation =
  | 'Caerleon'
  | 'Martlock'
  | 'Bridgewatch'
  | 'Lymhurst'
  | 'FortSterling'
  | 'Thetford'
  | 'BlackMarket';

/**
 * Time range for statistics
 */
export type TimeRange = '24h' | '7d' | '30d' | '90d' | 'all';

/**
 * Generic API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
  timestamp?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}

/**
 * Search parameters
 */
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Loading states
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Date range for filtering
 */
export interface DateRange {
  from: Date;
  to: Date;
}

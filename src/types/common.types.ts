/**
 * Common shared types used across the application
 * Tipos comuns compartilhados em toda aplicação
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchParams {
  query: string;
  limit?: number;
  offset?: number;
}

export interface FilterOptions {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
}

export interface DateRange {
  startDate: Date | string;
  endDate: Date | string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  status: LoadingState;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  timestamp?: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  description?: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig<T> {
  key: keyof T;
  direction: SortDirection;
}

export interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

// Error types
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export interface ErrorResponse {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Utility types
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type WithTimestamps<T> = T & {
  createdAt: string;
  updatedAt: string;
};

/**
 * Central export point for all stores
 * Ponto central de exportação para todos os stores
 */

export { useUserStore } from './user-store';
export type { User, UserPreferences } from './user-store';

export { useFavoritesStore } from './favorites-store';
export type { Favorite } from './favorites-store';

export { useThemeStore } from './theme-store';
export type { Theme } from './theme-store';

export { useSearchHistoryStore } from './search-history-store';
export type { SearchHistoryItem } from './search-history-store';

export { useNotificationStore, notify } from './notification-store';
export type { Notification } from './notification-store';

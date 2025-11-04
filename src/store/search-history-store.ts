/**
 * Search history store for managing search history
 * Store de histórico de busca para gerenciar histórico de buscas
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SearchHistoryItem {
  id: string;
  type: 'player' | 'guild' | 'item';
  query: string;
  resultName?: string;
  timestamp: string;
}

interface SearchHistoryState {
  history: SearchHistoryItem[];
  maxHistorySize: number;

  // Actions
  addToHistory: (item: Omit<SearchHistoryItem, 'id' | 'timestamp'>) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
  getHistoryByType: (type: SearchHistoryItem['type']) => SearchHistoryItem[];
  getRecentSearches: (limit?: number) => SearchHistoryItem[];
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      maxHistorySize: 50,

      addToHistory: (item) =>
        set((state) => {
          const id = `${item.type}-${item.query}-${Date.now()}`;
          const newItem: SearchHistoryItem = {
            ...item,
            id,
            timestamp: new Date().toISOString(),
          };

          // Remove duplicates (same type and query)
          const filtered = state.history.filter(
            (h) => !(h.type === item.type && h.query === item.query)
          );

          // Add new item at the beginning
          let newHistory = [newItem, ...filtered];

          // Limit history size
          if (newHistory.length > state.maxHistorySize) {
            newHistory = newHistory.slice(0, state.maxHistorySize);
          }

          return { history: newHistory };
        }),

      removeFromHistory: (id) =>
        set((state) => ({
          history: state.history.filter((h) => h.id !== id),
        })),

      clearHistory: () =>
        set({
          history: [],
        }),

      getHistoryByType: (type) => {
        return get().history.filter((h) => h.type === type);
      },

      getRecentSearches: (limit = 10) => {
        return get().history.slice(0, limit);
      },
    }),
    {
      name: 'albion-vault-search-history',
    }
  )
);

/**
 * Favorites store for managing user favorites
 * Store de favoritos para gerenciar favoritos do usuário
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Favorite {
  id: string;
  type: 'player' | 'guild' | 'item';
  name: string;
  addedAt: string;
  metadata?: Record<string, any>;
}

interface FavoritesState {
  favorites: Favorite[];

  // Actions
  addFavorite: (favorite: Omit<Favorite, 'addedAt'>) => void;
  removeFavorite: (id: string) => void;
  clearFavorites: () => void;
  isFavorite: (id: string) => boolean;
  getFavoritesByType: (type: Favorite['type']) => Favorite[];
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (favorite) =>
        set((state) => {
          // Check if already exists
          const exists = state.favorites.some((f) => f.id === favorite.id);
          if (exists) return state;

          return {
            favorites: [
              ...state.favorites,
              {
                ...favorite,
                addedAt: new Date().toISOString(),
              },
            ],
          };
        }),

      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== id),
        })),

      clearFavorites: () =>
        set({
          favorites: [],
        }),

      isFavorite: (id) => {
        return get().favorites.some((f) => f.id === id);
      },

      getFavoritesByType: (type) => {
        return get().favorites.filter((f) => f.type === type);
      },
    }),
    {
      name: 'albion-vault-favorites',
    }
  )
);

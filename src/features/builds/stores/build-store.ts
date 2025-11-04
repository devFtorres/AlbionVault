import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Build, BuildFilters } from '../types/builds.types';

interface BuildStore {
  // State
  builds: Build[];
  currentBuild: Build | null;

  // Actions
  addBuild: (build: Omit<Build, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBuild: (id: string, build: Partial<Build>) => void;
  deleteBuild: (id: string) => void;
  setCurrentBuild: (build: Build | null) => void;
  getBuildById: (id: string) => Build | undefined;
  toggleFavorite: (id: string) => void;
  duplicateBuild: (id: string) => void;
  getFilteredBuilds: (filters: BuildFilters) => Build[];
}

export const useBuildStore = create<BuildStore>()(
  persist(
    (set, get) => ({
      builds: [],
      currentBuild: null,

      addBuild: (buildData) => {
        const newBuild: Build = {
          ...buildData,
          id: `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        set((state) => ({
          builds: [...state.builds, newBuild],
        }));
      },

      updateBuild: (id, updates) => {
        set((state) => ({
          builds: state.builds.map((build) =>
            build.id === id
              ? { ...build, ...updates, updatedAt: new Date() }
              : build
          ),
          currentBuild:
            state.currentBuild?.id === id
              ? { ...state.currentBuild, ...updates, updatedAt: new Date() }
              : state.currentBuild,
        }));
      },

      deleteBuild: (id) => {
        set((state) => ({
          builds: state.builds.filter((build) => build.id !== id),
          currentBuild: state.currentBuild?.id === id ? null : state.currentBuild,
        }));
      },

      setCurrentBuild: (build) => {
        set({ currentBuild: build });
      },

      getBuildById: (id) => {
        return get().builds.find((build) => build.id === id);
      },

      toggleFavorite: (id) => {
        set((state) => ({
          builds: state.builds.map((build) =>
            build.id === id
              ? { ...build, isFavorite: !build.isFavorite, updatedAt: new Date() }
              : build
          ),
        }));
      },

      duplicateBuild: (id) => {
        const buildToDuplicate = get().builds.find((b) => b.id === id);
        if (buildToDuplicate) {
          const newBuild: Build = {
            ...buildToDuplicate,
            id: `build_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: `${buildToDuplicate.name} (Copy)`,
            createdAt: new Date(),
            updatedAt: new Date(),
            isFavorite: false,
          };

          set((state) => ({
            builds: [...state.builds, newBuild],
          }));
        }
      },

      getFilteredBuilds: (filters) => {
        const builds = get().builds;

        return builds.filter((build) => {
          // Search filter
          if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            const nameMatch = build.name.toLowerCase().includes(searchLower);
            const descMatch = build.description?.toLowerCase().includes(searchLower);
            if (!nameMatch && !descMatch) {
              return false;
            }
          }

          // Tags filter
          if (filters.tags && filters.tags.length > 0) {
            const buildTags = build.tags || [];
            const hasTag = filters.tags.some((tag) => buildTags.includes(tag));
            if (!hasTag) {
              return false;
            }
          }

          return true;
        }).sort((a, b) => {
          if (!filters.sortBy) return 0;

          const order = filters.sortOrder === 'desc' ? -1 : 1;

          switch (filters.sortBy) {
            case 'name':
              return order * a.name.localeCompare(b.name);
            case 'createdAt':
              return order * (a.createdAt.getTime() - b.createdAt.getTime());
            case 'updatedAt':
              return order * (a.updatedAt.getTime() - b.updatedAt.getTime());
            case 'itemPower':
              return order * ((a.totalItemPower || 0) - (b.totalItemPower || 0));
            default:
              return 0;
          }
        });
      },
    }),
    {
      name: 'albion-builds-storage',
      // Convert dates to strings for storage
      partialize: (state) => ({
        builds: state.builds.map((build) => ({
          ...build,
          createdAt: build.createdAt.toISOString(),
          updatedAt: build.updatedAt.toISOString(),
        })),
      }),
      // Convert dates back from strings
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.builds = state.builds.map((build: any) => ({
            ...build,
            createdAt: new Date(build.createdAt),
            updatedAt: new Date(build.updatedAt),
          }));
        }
      },
    }
  )
);

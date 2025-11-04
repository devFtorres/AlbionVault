import { useState, useEffect, useCallback } from 'react';
import { AlbionItem, ItemFilters, ItemCategory } from '../types/builds.types';
import { searchItems, getItemsByCategory, getAllItems } from '../services/item-service';

export function useItems(initialFilters?: ItemFilters) {
  const [items, setItems] = useState<AlbionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<ItemFilters>(initialFilters || {});

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const results = await searchItems(filters);
      setItems(results);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch items'));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const updateFilters = useCallback((newFilters: Partial<ItemFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    items,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchItems,
  };
}

export function useItemsByCategory(category: ItemCategory) {
  const [items, setItems] = useState<AlbionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await getItemsByCategory(category);
        setItems(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch items'));
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [category]);

  return { items, loading, error };
}

export function useAllItems() {
  const [items, setItems] = useState<AlbionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await getAllItems();
        setItems(results);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch items'));
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return { items, loading, error };
}

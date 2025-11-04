/**
 * Market hook for fetching and managing market data
 * Hook para buscar e gerenciar dados de mercado
 */

import { useCallback } from 'react';
import { useAsync } from './use-async';
import { marketService } from '@/lib/api/services';
import { MarketPrice, PriceHistory, City } from '@/types/market.types';

export function useMarket() {
  // Get current prices
  const {
    data: prices,
    loading: pricesLoading,
    error: pricesError,
    execute: executeGetPrices,
  } = useAsync<MarketPrice[]>(
    (itemIds: string[], locations?: string[]) =>
      marketService.getPrices(itemIds, locations),
    false
  );

  // Get price history
  const {
    data: priceHistory,
    loading: historyLoading,
    error: historyError,
    execute: executeGetHistory,
  } = useAsync<PriceHistory>(
    (
      itemId: string,
      location: string,
      timescale?: '1' | '6' | '24' | '168'
    ) => marketService.getPriceHistory(itemId, location, timescale),
    false
  );

  // Get item comparison
  const {
    data: comparison,
    loading: comparisonLoading,
    error: comparisonError,
    execute: executeGetComparison,
  } = useAsync<Map<string, Map<City, MarketPrice>>>(
    (itemIds: string[], cities: string[]) =>
      marketService.getItemComparison(itemIds, cities),
    false
  );

  const getPrices = useCallback(
    async (itemIds: string[], locations?: string[]) => {
      if (!itemIds || itemIds.length === 0) return [];
      return executeGetPrices(itemIds, locations);
    },
    [executeGetPrices]
  );

  const getPriceHistory = useCallback(
    async (
      itemId: string,
      location: string,
      timescale: '1' | '6' | '24' | '168' = '24'
    ) => {
      return executeGetHistory(itemId, location, timescale);
    },
    [executeGetHistory]
  );

  const getItemComparison = useCallback(
    async (itemIds: string[], cities: string[]) => {
      if (!itemIds || itemIds.length === 0) return new Map();
      return executeGetComparison(itemIds, cities);
    },
    [executeGetComparison]
  );

  return {
    // Prices
    prices,
    pricesLoading,
    pricesError,
    getPrices,

    // Price history
    priceHistory,
    historyLoading,
    historyError,
    getPriceHistory,

    // Comparison
    comparison,
    comparisonLoading,
    comparisonError,
    getItemComparison,
  };
}

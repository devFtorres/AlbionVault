/**
 * Market API Service
 * Serviço de API para mercado
 */

import { HttpClient } from '../http-client';
import { API_CONFIG, CACHE_CONFIG, RATE_LIMIT_CONFIG } from '../../constants/config';
import {
  MarketPrice,
  PriceHistory,
  MarketPriceApiResponse,
  PriceHistoryApiResponse,
  PriceDataPoint,
  City,
} from '@/types/market.types';

export class MarketService {
  private client: HttpClient;

  constructor() {
    this.client = new HttpClient(
      API_CONFIG.ALBION_DATA,
      CACHE_CONFIG.MARKET,
      RATE_LIMIT_CONFIG.ALBION_API
    );
  }

  /**
   * Get current market prices for items
   */
  async getPrices(
    itemIds: string[],
    locations?: string[]
  ): Promise<MarketPrice[]> {
    const params = new URLSearchParams();
    params.append('items', itemIds.join(','));

    if (locations && locations.length > 0) {
      params.append('locations', locations.join(','));
    }

    const response = await this.client.get<MarketPriceApiResponse[]>(
      `/stats/prices/${itemIds.join(',')}?${params.toString()}`
    );

    return response.map(this.mapPrice);
  }

  /**
   * Get price history for an item
   */
  async getPriceHistory(
    itemId: string,
    location: string,
    timescale: '1' | '6' | '24' | '168' = '24'
  ): Promise<PriceHistory> {
    const response = await this.client.get<PriceHistoryApiResponse>(
      `/stats/history/${itemId}?locations=${location}&timescale=${timescale}`
    );

    return this.mapPriceHistory(response, location as City, timescale);
  }

  /**
   * Get prices for multiple items across cities (for comparison)
   */
  async getItemComparison(
    itemIds: string[],
    cities: string[]
  ): Promise<Map<string, Map<City, MarketPrice>>> {
    const prices = await this.getPrices(itemIds, cities);

    const comparison = new Map<string, Map<City, MarketPrice>>();

    prices.forEach((price) => {
      if (!comparison.has(price.itemId)) {
        comparison.set(price.itemId, new Map());
      }
      comparison.get(price.itemId)!.set(price.city, price);
    });

    return comparison;
  }

  /**
   * Clear market cache
   */
  clearCache() {
    this.client.clearCache();
  }

  // Mappers
  private mapPrice(response: MarketPriceApiResponse): MarketPrice {
    return {
      itemId: response.item_id,
      city: response.city as City,
      sellPriceMin: response.sell_price_min,
      sellPriceMinDate: response.sell_price_min_date,
      sellPriceMax: response.sell_price_max,
      sellPriceMaxDate: response.sell_price_max_date,
      buyPriceMin: response.buy_price_min,
      buyPriceMinDate: response.buy_price_min_date,
      buyPriceMax: response.buy_price_max,
      buyPriceMaxDate: response.buy_price_max_date,
    };
  }

  private mapPriceHistory(
    response: PriceHistoryApiResponse,
    location: City,
    timescale: string
  ): PriceHistory {
    const data: PriceDataPoint[] = response.data.map((point) => ({
      timestamp: new Date(point.timestamp * 1000).toISOString(),
      avgPrice: point.avg_price,
      volume: point.item_count,
    }));

    return {
      itemId: response.item_id,
      city: location,
      quality: response.quality,
      data,
      timescale:
        timescale === '1'
          ? '1h'
          : timescale === '6'
            ? '6h'
            : timescale === '24'
              ? '24h'
              : '7d',
    };
  }
}

// Singleton instance
export const marketService = new MarketService();

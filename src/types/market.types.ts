/**
 * Market and Economy-related types
 * Tipos relacionados ao mercado e economia do Albion Online
 */

export interface MarketItem {
  itemId: string;
  name: string;
  tier: number;
  enchantment: number;
  quality: number;
  category: ItemCategory;
  subcategory?: string;
}

export type ItemCategory =
  | 'Weapon'
  | 'Armor'
  | 'Consumable'
  | 'Resource'
  | 'Mount'
  | 'Furniture'
  | 'Trophy'
  | 'Journal'
  | 'Laborer'
  | 'Other';

export interface MarketPrice {
  itemId: string;
  city: City;
  sellPriceMin: number;
  sellPriceMinDate: string;
  sellPriceMax: number;
  sellPriceMaxDate: string;
  buyPriceMin: number;
  buyPriceMinDate: string;
  buyPriceMax: number;
  buyPriceMaxDate: string;
}

export type City =
  | 'Caerleon'
  | 'Bridgewatch'
  | 'Fortsterling'
  | 'Lymhurst'
  | 'Martlock'
  | 'Thetford'
  | 'BlackMarket';

export interface PriceHistory {
  itemId: string;
  city: City;
  quality: number;
  data: PriceDataPoint[];
  timescale: Timescale;
}

export type Timescale = '1h' | '6h' | '24h' | '7d' | '30d';

export interface PriceDataPoint {
  timestamp: string;
  avgPrice: number;
  volume: number;
}

export interface MarketTrend {
  itemId: string;
  name: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercent: number;
  volume24h: number;
  trend: 'up' | 'down' | 'stable';
}

export interface ItemComparison {
  items: MarketItem[];
  cities: City[];
  prices: Map<string, Map<City, MarketPrice>>;
  bestBuyCity: City;
  bestSellCity: City;
  profit: number;
}

export interface CraftingProfit {
  itemId: string;
  itemName: string;
  tier: number;
  craftingCost: number;
  marketPrice: number;
  profit: number;
  profitPercent: number;
  returnRate: number;
}

// API Response types
export interface MarketPriceApiResponse {
  item_id: string;
  city: string;
  quality: number;
  sell_price_min: number;
  sell_price_min_date: string;
  sell_price_max: number;
  sell_price_max_date: string;
  buy_price_min: number;
  buy_price_min_date: string;
  buy_price_max: number;
  buy_price_max_date: string;
}

export interface PriceHistoryApiResponse {
  item_id: string;
  location: string;
  quality: number;
  data: {
    timestamp: number;
    avg_price: number;
    item_count: number;
  }[];
}

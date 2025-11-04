/**
 * Zod schemas for market data validation
 * Schemas Zod para validação de dados de mercado
 */

import { z } from 'zod';

export const citySchema = z.enum([
  'Caerleon',
  'Bridgewatch',
  'Fortsterling',
  'Lymhurst',
  'Martlock',
  'Thetford',
  'BlackMarket',
]);

export const itemCategorySchema = z.enum([
  'Weapon',
  'Armor',
  'Consumable',
  'Resource',
  'Mount',
  'Furniture',
  'Trophy',
  'Journal',
  'Laborer',
  'Other',
]);

export const marketPriceRequestSchema = z.object({
  itemIds: z.array(z.string()).min(1, 'At least one item ID is required'),
  locations: z.array(citySchema).optional(),
  qualities: z.array(z.number().min(1).max(5)).optional(),
});

export const priceHistoryRequestSchema = z.object({
  itemId: z.string().min(1, 'Item ID is required'),
  location: citySchema,
  quality: z.number().min(1).max(5).optional(),
  timescale: z.enum(['1', '6', '24', '168']).optional(),
});

export const marketItemSchema = z.object({
  itemId: z.string(),
  name: z.string(),
  tier: z.number().min(1).max(8),
  enchantment: z.number().min(0).max(4),
  quality: z.number().min(1).max(5),
  category: itemCategorySchema,
  subcategory: z.string().optional(),
});

export type MarketPriceRequestInput = z.infer<
  typeof marketPriceRequestSchema
>;
export type PriceHistoryRequestInput = z.infer<
  typeof priceHistoryRequestSchema
>;
export type MarketItemInput = z.infer<typeof marketItemSchema>;

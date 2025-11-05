/**
 * Validation utilities
 */

import { z } from 'zod';

/**
 * Validate player name (Albion Online format)
 * - 3-16 characters
 * - Letters, numbers, spaces allowed
 * - No special characters except spaces
 */
export const playerNameSchema = z
  .string()
  .min(3, 'Player name must be at least 3 characters')
  .max(16, 'Player name must be at most 16 characters')
  .regex(/^[a-zA-Z0-9 ]+$/, 'Player name can only contain letters, numbers, and spaces');

/**
 * Validate guild name
 */
export const guildNameSchema = z
  .string()
  .min(3, 'Guild name must be at least 3 characters')
  .max(50, 'Guild name must be at most 50 characters');

/**
 * Validate guild ID
 */
export const guildIdSchema = z.string().min(1, 'Guild ID is required');

/**
 * Validate item tier
 */
export const itemTierSchema = z.enum(['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8']);

/**
 * Validate enchantment level
 */
export const enchantmentSchema = z.number().int().min(0).max(4);

/**
 * Validate search query
 */
export const searchQuerySchema = z.object({
  query: z.string().optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
});

/**
 * Validate email
 */
export const emailSchema = z.string().email('Invalid email address');

/**
 * Validate URL
 */
export const urlSchema = z.string().url('Invalid URL');

/**
 * Validate positive number
 */
export const positiveNumberSchema = z.number().positive('Must be a positive number');

/**
 * Validate price
 */
export const priceSchema = z.number().int().nonnegative('Price must be a non-negative integer');

/**
 * Check if a string is a valid player name
 */
export function isValidPlayerName(name: string): boolean {
  try {
    playerNameSchema.parse(name);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if a string is a valid guild ID
 */
export function isValidGuildId(id: string): boolean {
  try {
    guildIdSchema.parse(id);
    return true;
  } catch {
    return false;
  }
}

/**
 * Sanitize search input
 */
export function sanitizeSearchInput(input: string): string {
  return input.trim().replace(/[<>'"]/g, '');
}

/**
 * Validate and parse pagination params
 */
export function validatePagination(params: {
  page?: string | number;
  limit?: string | number;
}): { page: number; limit: number } {
  const page = Math.max(1, Number(params.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(params.limit) || 20));

  return { page, limit };
}

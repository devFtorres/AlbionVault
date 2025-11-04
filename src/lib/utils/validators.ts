/**
 * Validation utilities
 * Utilitários de validação
 */

/**
 * Check if string is a valid player name
 */
export function isValidPlayerName(name: string): boolean {
  // Albion player names: 3-16 characters, alphanumeric
  const regex = /^[a-zA-Z0-9]{3,16}$/;
  return regex.test(name);
}

/**
 * Check if string is a valid guild name
 */
export function isValidGuildName(name: string): boolean {
  // Guild names: 3-50 characters
  return name.length >= 3 && name.length <= 50;
}

/**
 * Check if string is a valid item ID
 */
export function isValidItemId(itemId: string): boolean {
  // Item IDs typically start with T followed by tier
  const regex = /^T\d+/;
  return regex.test(itemId);
}

/**
 * Check if tier is valid (1-8)
 */
export function isValidTier(tier: number): boolean {
  return tier >= 1 && tier <= 8;
}

/**
 * Check if enchantment is valid (0-4)
 */
export function isValidEnchantment(enchantment: number): boolean {
  return enchantment >= 0 && enchantment <= 4;
}

/**
 * Check if quality is valid (1-5)
 */
export function isValidQuality(quality: number): boolean {
  return quality >= 1 && quality <= 5;
}

/**
 * Check if email is valid
 */
export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Sanitize search query
 */
export function sanitizeSearchQuery(query: string): string {
  return query.trim().replace(/[<>]/g, '');
}

/**
 * Check if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

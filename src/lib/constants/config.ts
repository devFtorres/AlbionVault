/**
 * Application configuration constants
 */

export const APP_CONFIG = {
  name: 'AlbionVault',
  description: 'Albion Online stats and guild management platform',
  version: '1.0.0',
  author: 'AlbionVault Team',
} as const;

/**
 * API configuration
 */
export const API_CONFIG = {
  // Albion Online API endpoints
  albionDataProject: 'https://www.albion-online-data.com/api/v2',
  albionGameInfo: 'https://gameinfo.albiononline.com/api/gameinfo',

  // Request timeouts
  timeout: 30000, // 30 seconds
  retryAttempts: 3,
  retryDelay: 1000, // 1 second
} as const;

/**
 * Pagination defaults
 */
export const PAGINATION = {
  defaultPage: 1,
  defaultLimit: 20,
  maxLimit: 100,
} as const;

/**
 * Item tiers
 */
export const ITEM_TIERS = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'] as const;

/**
 * Item enchantment levels
 */
export const ENCHANTMENT_LEVELS = [0, 1, 2, 3, 4] as const;

/**
 * Albion cities
 */
export const CITIES = [
  'Caerleon',
  'Martlock',
  'Bridgewatch',
  'Lymhurst',
  'FortSterling',
  'Thetford',
  'BlackMarket',
] as const;

/**
 * Equipment slots in order for UI display
 */
export const EQUIPMENT_SLOTS = [
  'mainhand',
  'offhand',
  'head',
  'armor',
  'shoes',
  'cape',
  'bag',
  'mount',
  'potion',
  'food',
] as const;

/**
 * Weapon categories with display names
 */
export const WEAPON_CATEGORIES = {
  // Melee weapons
  sword: { name: 'Sword', type: 'melee' },
  axe: { name: 'Axe', type: 'melee' },
  mace: { name: 'Mace', type: 'melee' },
  dagger: { name: 'Dagger', type: 'melee' },
  spear: { name: 'Spear', type: 'melee' },
  quarterstaff: { name: 'Quarterstaff', type: 'melee' },
  hammer: { name: 'Hammer', type: 'melee' },

  // Ranged weapons
  bow: { name: 'Bow', type: 'ranged' },
  crossbow: { name: 'Crossbow', type: 'ranged' },

  // Magic weapons
  firestaff: { name: 'Fire Staff', type: 'magic' },
  froststaff: { name: 'Frost Staff', type: 'magic' },
  holystaff: { name: 'Holy Staff', type: 'magic' },
  naturestaff: { name: 'Nature Staff', type: 'magic' },
  arcanestaff: { name: 'Arcane Staff', type: 'magic' },
  cursedstaff: { name: 'Cursed Staff', type: 'magic' },
} as const;

/**
 * Armor categories
 */
export const ARMOR_CATEGORIES = {
  cloth: { name: 'Cloth', description: 'Energy regeneration and magic damage' },
  leather: { name: 'Leather', description: 'Mobility and crowd control resistance' },
  plate: { name: 'Plate', description: 'High defense and crowd control' },
} as const;

/**
 * Cache durations (in milliseconds)
 */
export const CACHE_DURATION = {
  short: 5 * 60 * 1000, // 5 minutes
  medium: 30 * 60 * 1000, // 30 minutes
  long: 60 * 60 * 1000, // 1 hour
  day: 24 * 60 * 60 * 1000, // 24 hours
} as const;

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  theme: 'albionvault-theme',
  favorites: 'albionvault-favorites',
  recentSearches: 'albionvault-recent-searches',
  builds: 'albionvault-builds',
  userPreferences: 'albionvault-preferences',
} as const;

/**
 * Application configuration constants
 * Constantes de configuração da aplicação
 */

export const API_CONFIG = {
  ALBION_OFFICIAL: {
    baseUrl: 'https://gameinfo.albiononline.com/api/gameinfo',
    timeout: 30000,
  },
  ALBION_DATA: {
    baseUrl: 'https://www.albion-online-data.com/api/v2',
    timeout: 30000,
  },
  ALBION_KILLS: {
    baseUrl: 'https://gameinfo.albiononline.com/api/gameinfo',
    timeout: 30000,
  },
} as const;

export const CACHE_CONFIG = {
  PLAYER: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 100,
  },
  GUILD: {
    ttl: 10 * 60 * 1000, // 10 minutes
    maxSize: 50,
  },
  MARKET: {
    ttl: 2 * 60 * 1000, // 2 minutes
    maxSize: 200,
  },
  EVENTS: {
    ttl: 1 * 60 * 1000, // 1 minute
    maxSize: 50,
  },
} as const;

export const RATE_LIMIT_CONFIG = {
  ALBION_API: {
    maxRequests: 300,
    windowMs: 60 * 1000, // 300 requests per minute
  },
} as const;

export const APP_CONFIG = {
  name: 'AlbionVault',
  version: '0.1.0',
  description: 'Albion Online Stats & Guild Management Platform',
} as const;

export const CITIES = [
  'Caerleon',
  'Bridgewatch',
  'Fortsterling',
  'Lymhurst',
  'Martlock',
  'Thetford',
] as const;

export const ITEM_TIERS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const ITEM_ENCHANTMENTS = [0, 1, 2, 3, 4] as const;
export const ITEM_QUALITIES = [1, 2, 3, 4, 5] as const;

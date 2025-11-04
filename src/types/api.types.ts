/**
 * API-specific types
 * Tipos específicos para comunicação com APIs
 */

import { Player, PlayerApiResponse } from './player.types';
import { Guild, GuildApiResponse } from './guild.types';
import {
  MarketPriceApiResponse,
  PriceHistoryApiResponse,
} from './market.types';

// Base API Configuration
export interface ApiConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
  retries?: number;
}

// Albion Online Official API endpoints
export interface AlbionApiEndpoints {
  player: (playerId: string) => string;
  guild: (guildId: string) => string;
  search: {
    player: (name: string) => string;
    guild: (name: string) => string;
  };
  events: {
    recent: () => string;
    player: (playerId: string) => string;
    guild: (guildId: string) => string;
  };
}

// Albion Data Project API (for market data)
export interface AlbionDataEndpoints {
  prices: (itemIds: string[], locations?: string[]) => string;
  history: (itemId: string, location: string, quality?: number) => string;
}

// Request types
export interface PlayerSearchRequest {
  name: string;
}

export interface GuildSearchRequest {
  name: string;
}

export interface EventsRequest {
  limit?: number;
  offset?: number;
  timestamp?: number;
  guildId?: string;
  allianceId?: string;
}

export interface MarketPriceRequest {
  itemIds: string[];
  locations?: string[];
  qualities?: number[];
}

export interface PriceHistoryRequest {
  itemId: string;
  location: string;
  quality?: number;
  timescale?: '1' | '6' | '24' | '168'; // hours
}

// Response mappers (para transformar responses da API em tipos internos)
export type PlayerResponseMapper = (
  response: PlayerApiResponse
) => Player;
export type GuildResponseMapper = (response: GuildApiResponse) => Guild;

// Cache types
export interface CacheConfig {
  ttl: number; // Time to live in milliseconds
  maxSize?: number;
}

export interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

// Rate limiting
export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export interface RateLimitState {
  count: number;
  resetAt: number;
}

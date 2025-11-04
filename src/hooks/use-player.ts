/**
 * Player hook for fetching and managing player data
 * Hook para buscar e gerenciar dados de jogadores
 */

import { useCallback } from 'react';
import { useAsync } from './use-async';
import { playerService } from '@/lib/api/services';
import {
  Player,
  PlayerSearchResult,
  DeathEvent,
  KillEvent,
} from '@/types/player.types';

export function usePlayer() {
  // Search players
  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
    execute: executeSearch,
  } = useAsync<PlayerSearchResult[]>(
    (name: string) => playerService.searchPlayer(name),
    false
  );

  // Get player details
  const {
    data: player,
    loading: playerLoading,
    error: playerError,
    execute: executeGetPlayer,
  } = useAsync<Player>(
    (playerId: string) => playerService.getPlayer(playerId),
    false
  );

  // Get player deaths
  const {
    data: deaths,
    loading: deathsLoading,
    error: deathsError,
    execute: executeGetDeaths,
  } = useAsync<DeathEvent[]>(
    (playerId: string, options?: { limit?: number; offset?: number }) =>
      playerService.getPlayerDeaths(playerId, options),
    false
  );

  // Get player kills
  const {
    data: kills,
    loading: killsLoading,
    error: killsError,
    execute: executeGetKills,
  } = useAsync<KillEvent[]>(
    (playerId: string, options?: { limit?: number; offset?: number }) =>
      playerService.getPlayerKills(playerId, options),
    false
  );

  const searchPlayer = useCallback(
    async (name: string) => {
      if (!name || name.trim().length === 0) return [];
      return executeSearch(name);
    },
    [executeSearch]
  );

  const getPlayer = useCallback(
    async (playerId: string) => {
      return executeGetPlayer(playerId);
    },
    [executeGetPlayer]
  );

  const getPlayerDeaths = useCallback(
    async (
      playerId: string,
      options?: { limit?: number; offset?: number }
    ) => {
      return executeGetDeaths(playerId, options);
    },
    [executeGetDeaths]
  );

  const getPlayerKills = useCallback(
    async (
      playerId: string,
      options?: { limit?: number; offset?: number }
    ) => {
      return executeGetKills(playerId, options);
    },
    [executeGetKills]
  );

  return {
    // Search
    searchResults,
    searchLoading,
    searchError,
    searchPlayer,

    // Player details
    player,
    playerLoading,
    playerError,
    getPlayer,

    // Deaths
    deaths,
    deathsLoading,
    deathsError,
    getPlayerDeaths,

    // Kills
    kills,
    killsLoading,
    killsError,
    getPlayerKills,
  };
}

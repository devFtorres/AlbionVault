/**
 * Guild hook for fetching and managing guild data
 * Hook para buscar e gerenciar dados de guildas
 */

import { useCallback } from 'react';
import { useAsync } from './use-async';
import { guildService } from '@/lib/api/services';
import { Guild, GuildSearchResult, GuildMember } from '@/types/guild.types';

export function useGuild() {
  // Search guilds
  const {
    data: searchResults,
    loading: searchLoading,
    error: searchError,
    execute: executeSearch,
  } = useAsync<GuildSearchResult[]>(
    (name: string) => guildService.searchGuild(name),
    false
  );

  // Get guild details
  const {
    data: guild,
    loading: guildLoading,
    error: guildError,
    execute: executeGetGuild,
  } = useAsync<Guild>(
    (guildId: string) => guildService.getGuild(guildId),
    false
  );

  // Get guild members
  const {
    data: members,
    loading: membersLoading,
    error: membersError,
    execute: executeGetMembers,
  } = useAsync<GuildMember[]>(
    (guildId: string) => guildService.getGuildMembers(guildId),
    false
  );

  const searchGuild = useCallback(
    async (name: string) => {
      if (!name || name.trim().length === 0) return [];
      return executeSearch(name);
    },
    [executeSearch]
  );

  const getGuild = useCallback(
    async (guildId: string) => {
      return executeGetGuild(guildId);
    },
    [executeGetGuild]
  );

  const getGuildMembers = useCallback(
    async (guildId: string) => {
      return executeGetMembers(guildId);
    },
    [executeGetMembers]
  );

  return {
    // Search
    searchResults,
    searchLoading,
    searchError,
    searchGuild,

    // Guild details
    guild,
    guildLoading,
    guildError,
    getGuild,

    // Members
    members,
    membersLoading,
    membersError,
    getGuildMembers,
  };
}

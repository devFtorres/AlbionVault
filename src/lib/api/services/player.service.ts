/**
 * Player API Service
 * Serviço de API para jogadores
 */

import { HttpClient } from '../http-client';
import { API_CONFIG, CACHE_CONFIG, RATE_LIMIT_CONFIG } from '../../constants/config';
import {
  Player,
  PlayerApiResponse,
  PlayerSearchResult,
  DeathEvent,
  KillEvent,
} from '@/types/player.types';

export class PlayerService {
  private client: HttpClient;

  constructor() {
    this.client = new HttpClient(
      API_CONFIG.ALBION_OFFICIAL,
      CACHE_CONFIG.PLAYER,
      RATE_LIMIT_CONFIG.ALBION_API
    );
  }

  /**
   * Search for players by name
   */
  async searchPlayer(name: string): Promise<PlayerSearchResult[]> {
    const response = await this.client.get<any>(
      `/search?q=${encodeURIComponent(name)}`
    );

    return response.players?.map(this.mapSearchResult) || [];
  }

  /**
   * Get player by ID
   */
  async getPlayer(playerId: string): Promise<Player> {
    const response = await this.client.get<PlayerApiResponse>(
      `/players/${playerId}`
    );

    return this.mapPlayer(response);
  }

  /**
   * Get player deaths
   */
  async getPlayerDeaths(
    playerId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<DeathEvent[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const response = await this.client.get<any>(
      `/players/${playerId}/deaths?${params.toString()}`
    );

    return response.map(this.mapEvent);
  }

  /**
   * Get player kills
   */
  async getPlayerKills(
    playerId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<KillEvent[]> {
    const params = new URLSearchParams();
    if (options?.limit) params.append('limit', options.limit.toString());
    if (options?.offset) params.append('offset', options.offset.toString());

    const response = await this.client.get<any>(
      `/players/${playerId}/kills?${params.toString()}`
    );

    return response.map(this.mapEvent);
  }

  /**
   * Get player statistics
   */
  async getPlayerStats(playerId: string): Promise<Player> {
    return this.getPlayer(playerId);
  }

  /**
   * Clear player cache
   */
  clearCache() {
    this.client.clearCache();
  }

  // Mappers
  private mapPlayer(response: PlayerApiResponse): Player {
    return {
      id: response.playerId || response.Id,
      name: response.name || response.Name,
      guildId: response.guildId || response.GuildId,
      guildName: response.guildName || response.GuildName,
      allianceId: response.allianceId || response.AllianceId,
      allianceName: response.allianceName || response.AllianceName,
      avatar: response.avatar || response.Avatar,
      avatarRing: response.avatarRing || response.AvatarRing,
      killFame: response.killFame || response.KillFame || 0,
      deathFame: response.deathFame || response.DeathFame || 0,
      fameRatio:
        response.fameRatio ||
        (response.killFame && response.deathFame
          ? response.killFame / response.deathFame
          : 0),
      totalKills: response.totalKills || 0,
      gvgKills: response.gvgKills || 0,
      gvgWon: response.gvgWon || 0,
      lifeTimeStatistics: response.lifeTimeStatistics,
    };
  }

  private mapSearchResult(result: any): PlayerSearchResult {
    return {
      id: result.Id,
      name: result.Name,
      guildName: result.GuildName,
      allianceName: result.AllianceName,
      killFame: result.KillFame || 0,
      deathFame: result.DeathFame || 0,
    };
  }

  private mapEvent(event: any): DeathEvent | KillEvent {
    return {
      eventId: event.EventId,
      timestamp: event.TimeStamp,
      killer: event.Killer
        ? {
            id: event.Killer.Id,
            name: event.Killer.Name,
            guildId: event.Killer.GuildId,
            guildName: event.Killer.GuildName,
            allianceId: event.Killer.AllianceId,
            allianceName: event.Killer.AllianceName,
            avatar: event.Killer.Avatar,
            avatarRing: event.Killer.AvatarRing,
            equipment: event.Killer.Equipment || {},
            averageItemPower: event.Killer.AverageItemPower || 0,
            damage: event.Killer.DamageDone || 0,
            supportHealingDone: event.Killer.SupportHealingDone || 0,
            damageDone: event.Killer.DamageDone || 0,
          }
        : ({} as any),
      victim: {
        id: event.Victim.Id,
        name: event.Victim.Name,
        guildId: event.Victim.GuildId,
        guildName: event.Victim.GuildName,
        allianceId: event.Victim.AllianceId,
        allianceName: event.Victim.AllianceName,
        avatar: event.Victim.Avatar,
        avatarRing: event.Victim.AvatarRing,
        equipment: event.Victim.Equipment || {},
        averageItemPower: event.Victim.AverageItemPower || 0,
        damage: event.Victim.DamageDone || 0,
        supportHealingDone: event.Victim.SupportHealingDone || 0,
        damageDone: event.Victim.DamageDone || 0,
      },
      totalVictimKillFame: event.TotalVictimKillFame || 0,
      location: event.Location || '',
      participants: event.Participants?.map((p: any) => ({
        id: p.Id,
        name: p.Name,
        guildId: p.GuildId,
        guildName: p.GuildName,
        allianceId: p.AllianceId,
        allianceName: p.AllianceName,
        avatar: p.Avatar,
        avatarRing: p.AvatarRing,
        equipment: p.Equipment || {},
        averageItemPower: p.AverageItemPower || 0,
        damage: p.DamageDone || 0,
        supportHealingDone: p.SupportHealingDone || 0,
        damageDone: p.DamageDone || 0,
      })) || [],
      groupMemberCount: event.GroupMemberCount || 0,
      numberOfParticipants: event.NumberOfParticipants || 0,
      battleId: event.BattleId || 0,
      type: event.Type || 'PvP',
    };
  }
}

// Singleton instance
export const playerService = new PlayerService();

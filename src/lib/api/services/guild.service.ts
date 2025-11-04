/**
 * Guild API Service
 * Serviço de API para guildas
 */

import { HttpClient } from '../http-client';
import { API_CONFIG, CACHE_CONFIG, RATE_LIMIT_CONFIG } from '../../constants/config';
import {
  Guild,
  GuildApiResponse,
  GuildMember,
  GuildSearchResult,
} from '@/types/guild.types';

export class GuildService {
  private client: HttpClient;

  constructor() {
    this.client = new HttpClient(
      API_CONFIG.ALBION_OFFICIAL,
      CACHE_CONFIG.GUILD,
      RATE_LIMIT_CONFIG.ALBION_API
    );
  }

  /**
   * Search for guilds by name
   */
  async searchGuild(name: string): Promise<GuildSearchResult[]> {
    const response = await this.client.get<any>(
      `/search?q=${encodeURIComponent(name)}`
    );

    return response.guilds?.map(this.mapSearchResult) || [];
  }

  /**
   * Get guild by ID
   */
  async getGuild(guildId: string): Promise<Guild> {
    const response = await this.client.get<GuildApiResponse>(
      `/guilds/${guildId}`
    );

    return this.mapGuild(response);
  }

  /**
   * Get guild members
   */
  async getGuildMembers(guildId: string): Promise<GuildMember[]> {
    const response = await this.client.get<any>(
      `/guilds/${guildId}/members`
    );

    return response.map(this.mapMember);
  }

  /**
   * Get guild statistics
   */
  async getGuildStats(guildId: string): Promise<Guild> {
    return this.getGuild(guildId);
  }

  /**
   * Clear guild cache
   */
  clearCache() {
    this.client.clearCache();
  }

  // Mappers
  private mapGuild(response: GuildApiResponse | any): Guild {
    return {
      id: response.guildId || response.Id,
      name: response.guildName || response.Name,
      founderId: response.founderId || response.FounderId || '',
      founderName: response.founderName || response.FounderName || '',
      foundedDate: response.foundedDate || response.Founded || '',
      allianceId: response.allianceId || response.AllianceId,
      allianceName: response.allianceName || response.AllianceName,
      allianceTag: response.allianceTag || response.AllianceTag,
      logo: response.logo || response.Logo,
      killFame: response.killFame || response.KillFame || 0,
      deathFame: response.deathFame || response.DeathFame || 0,
      attackPoints: response.attackPoints || response.AttackPoints || 0,
      defensePoints: response.defensePoints || response.DefensePoints || 0,
      memberCount: response.memberCount || response.MemberCount || 0,
      gvgKills: response.gvgKills,
      gvgWon: response.gvgWon,
    };
  }

  private mapSearchResult(result: any): GuildSearchResult {
    return {
      id: result.Id,
      name: result.Name,
      allianceName: result.AllianceName,
      memberCount: result.MemberCount || 0,
      killFame: result.KillFame || 0,
      deathFame: result.DeathFame || 0,
    };
  }

  private mapMember(member: any): GuildMember {
    return {
      id: member.Id,
      name: member.Name,
      avatar: member.Avatar,
      avatarRing: member.AvatarRing,
      killFame: member.KillFame || 0,
      deathFame: member.DeathFame || 0,
      fameRatio:
        member.KillFame && member.DeathFame
          ? member.KillFame / member.DeathFame
          : 0,
      joinedAt: member.JoinedAt,
      role: member.Role,
    };
  }
}

// Singleton instance
export const guildService = new GuildService();

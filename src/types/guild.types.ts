/**
 * Guild-related types
 * Tipos relacionados a guildas do Albion Online
 */

export interface Guild {
  id: string;
  name: string;
  founderId: string;
  founderName: string;
  foundedDate: string;
  allianceId?: string;
  allianceName?: string;
  allianceTag?: string;
  logo?: string;
  killFame: number;
  deathFame: number;
  attackPoints: number;
  defensePoints: number;
  memberCount: number;
  gvgKills?: number;
  gvgWon?: number;
}

export interface GuildMember {
  id: string;
  name: string;
  avatar?: string;
  avatarRing?: string;
  killFame: number;
  deathFame: number;
  fameRatio: number;
  joinedAt?: string;
  role?: GuildRole;
}

export type GuildRole =
  | 'Leader'
  | 'Officer'
  | 'Member'
  | 'Recruit'
  | 'Trial';

export interface GuildStats {
  totalKillFame: number;
  totalDeathFame: number;
  fameRatio: number;
  totalMembers: number;
  pvpStats: GuildPvpStats;
  territoryStats: GuildTerritoryStats;
  economyStats: GuildEconomyStats;
}

export interface GuildPvpStats {
  totalKills: number;
  totalDeaths: number;
  gvgKills: number;
  gvgWon: number;
  zvzKills: number;
  topKillers: GuildMember[];
}

export interface GuildTerritoryStats {
  totalTerritories: number;
  territories: Territory[];
  attackPoints: number;
  defensePoints: number;
}

export interface Territory {
  id: string;
  name: string;
  type: TerritoryType;
  cluster: string;
  ownedBy: string;
  ownedSince: string;
}

export type TerritoryType =
  | 'City'
  | 'Hideout'
  | 'Tower'
  | 'Castle'
  | 'Territory';

export interface GuildEconomyStats {
  totalWealth?: number;
  taxRevenue?: number;
  marketActivity?: number;
}

export interface GuildSearchResult {
  id: string;
  name: string;
  allianceName?: string;
  memberCount: number;
  killFame: number;
  deathFame: number;
}

// API Response types
export interface GuildApiResponse {
  guildId: string;
  guildName: string;
  founderId: string;
  founderName: string;
  foundedDate: string;
  allianceId: string;
  allianceName: string;
  allianceTag: string;
  logo: string;
  killFame: number;
  deathFame: number;
  attackPoints: number;
  defensePoints: number;
  memberCount: number;
}

export interface GuildMembersApiResponse {
  guildId: string;
  members: GuildMember[];
}

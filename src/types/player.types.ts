/**
 * Player-related types
 * Tipos relacionados a jogadores do Albion Online
 */

export interface Player {
  id: string;
  name: string;
  guildId?: string;
  guildName?: string;
  allianceId?: string;
  allianceName?: string;
  avatar?: string;
  avatarRing?: string;
  killFame: number;
  deathFame: number;
  fameRatio: number;
  totalKills: number;
  gvgKills: number;
  gvgWon: number;
  lifeTimeStatistics?: LifeTimeStatistics;
}

export interface LifeTimeStatistics {
  pvp: PvpStats;
  gathering: GatheringStats;
  crafting: CraftingStats;
  pve: PveStats;
  timestamp: string;
}

export interface PvpStats {
  total: number;
  royal: number;
  outlands: number;
  hellgate: number;
  corruptedDungeon: number;
  mists: number;
}

export interface GatheringStats {
  fiber: FameStats;
  hide: FameStats;
  ore: FameStats;
  rock: FameStats;
  wood: FameStats;
  all: FameStats;
}

export interface FameStats {
  fame: number;
  total: number;
}

export interface CraftingStats {
  total: number;
  royal: number;
  other: number;
}

export interface PveStats {
  total: number;
  royal: number;
  outlands: number;
  avalon: number;
  hellgate: number;
  corruptedDungeon: number;
  mists: number;
}

export interface PlayerSearchResult {
  id: string;
  name: string;
  guildName?: string;
  allianceName?: string;
  killFame: number;
  deathFame: number;
}

export interface PlayerDeaths {
  player: Player;
  deaths: DeathEvent[];
  totalDeaths: number;
}

export interface PlayerKills {
  player: Player;
  kills: KillEvent[];
  totalKills: number;
}

export interface DeathEvent {
  eventId: string;
  timestamp: string;
  killer: EventParticipant;
  victim: EventParticipant;
  totalVictimKillFame: number;
  location: string;
  participants: EventParticipant[];
  groupMemberCount: number;
  numberOfParticipants: number;
  battleId: number;
  type: 'PvP' | 'PvE';
}

export interface KillEvent extends DeathEvent {}

export interface EventParticipant {
  id: string;
  name: string;
  guildId?: string;
  guildName?: string;
  allianceId?: string;
  allianceName?: string;
  avatar?: string;
  avatarRing?: string;
  equipment: Equipment;
  averageItemPower: number;
  damage: number;
  supportHealingDone: number;
  damageDone: number;
}

export interface Equipment {
  mainHand?: Item;
  offHand?: Item;
  head?: Item;
  armor?: Item;
  shoes?: Item;
  bag?: Item;
  cape?: Item;
  mount?: Item;
  potion?: Item;
  food?: Item;
}

export interface Item {
  type: string;
  count: number;
  quality: number;
  activeSpells?: string[];
  passiveSpells?: string[];
}

// Utility types for API responses
export interface PlayerApiResponse {
  playerId: string;
  name: string;
  guildId: string;
  guildName: string;
  allianceId: string;
  allianceName: string;
  avatar: string;
  avatarRing: string;
  killFame: number;
  deathFame: number;
  fameRatio: number;
  totalKills: number;
  gvgKills: number;
  gvgWon: number;
  lifeTimeStatistics: LifeTimeStatistics;
}

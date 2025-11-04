/**
 * Zod schemas for player data validation
 * Schemas Zod para validação de dados de jogadores
 */

import { z } from 'zod';

export const playerSearchSchema = z.object({
  name: z.string().min(1, 'Player name is required'),
});

export const playerSchema = z.object({
  id: z.string(),
  name: z.string(),
  guildId: z.string().optional(),
  guildName: z.string().optional(),
  allianceId: z.string().optional(),
  allianceName: z.string().optional(),
  avatar: z.string().optional(),
  avatarRing: z.string().optional(),
  killFame: z.number(),
  deathFame: z.number(),
  fameRatio: z.number(),
  totalKills: z.number(),
  gvgKills: z.number(),
  gvgWon: z.number(),
});

export const fameStatsSchema = z.object({
  fame: z.number(),
  total: z.number(),
});

export const gatheringStatsSchema = z.object({
  fiber: fameStatsSchema,
  hide: fameStatsSchema,
  ore: fameStatsSchema,
  rock: fameStatsSchema,
  wood: fameStatsSchema,
  all: fameStatsSchema,
});

export const pvpStatsSchema = z.object({
  total: z.number(),
  royal: z.number(),
  outlands: z.number(),
  hellgate: z.number(),
  corruptedDungeon: z.number(),
  mists: z.number(),
});

export type PlayerSearchInput = z.infer<typeof playerSearchSchema>;
export type PlayerInput = z.infer<typeof playerSchema>;

/**
 * Zod schemas for guild data validation
 * Schemas Zod para validação de dados de guildas
 */

import { z } from 'zod';

export const guildSearchSchema = z.object({
  name: z.string().min(1, 'Guild name is required'),
});

export const guildSchema = z.object({
  id: z.string(),
  name: z.string(),
  founderId: z.string(),
  founderName: z.string(),
  foundedDate: z.string(),
  allianceId: z.string().optional(),
  allianceName: z.string().optional(),
  allianceTag: z.string().optional(),
  logo: z.string().optional(),
  killFame: z.number(),
  deathFame: z.number(),
  attackPoints: z.number(),
  defensePoints: z.number(),
  memberCount: z.number(),
});

export const guildMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatar: z.string().optional(),
  avatarRing: z.string().optional(),
  killFame: z.number(),
  deathFame: z.number(),
  fameRatio: z.number(),
  joinedAt: z.string().optional(),
  role: z
    .enum(['Leader', 'Officer', 'Member', 'Recruit', 'Trial'])
    .optional(),
});

export type GuildSearchInput = z.infer<typeof guildSearchSchema>;
export type GuildInput = z.infer<typeof guildSchema>;
export type GuildMemberInput = z.infer<typeof guildMemberSchema>;

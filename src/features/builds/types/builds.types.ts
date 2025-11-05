/**
 * Build system type definitions
 */

import type { AlbionItem, WeaponItem, ArmorItem, OffhandItem } from '@/src/types';

/**
 * Equipment build state
 */
export interface Build {
  id: string;
  name: string;
  description?: string;
  equipment: BuildEquipment;
  stats?: BuildStats;
  createdAt: Date;
  updatedAt: Date;
  author?: string;
  tags?: string[];
  isPublic?: boolean;
}

/**
 * Build equipment slots
 */
export interface BuildEquipment {
  mainhand: WeaponItem | null;
  offhand: OffhandItem | null;
  head: ArmorItem | null;
  armor: ArmorItem | null;
  shoes: ArmorItem | null;
  cape: AlbionItem | null;
  bag: AlbionItem | null;
  mount: AlbionItem | null;
  potion: AlbionItem | null;
  food: AlbionItem | null;
}

/**
 * Calculated build statistics
 */
export interface BuildStats {
  totalItemPower: number;
  averageItemPower: number;
  offense: OffenseStats;
  defense: DefenseStats;
  utility: UtilityStats;
}

export interface OffenseStats {
  damage: number;
  attackSpeed: number;
  critChance: number;
  critDamage: number;
}

export interface DefenseStats {
  armor: number;
  magicResist: number;
  health: number;
  healthRegen: number;
}

export interface UtilityStats {
  moveSpeed: number;
  cooldownReduction: number;
  energyCost: number;
}

/**
 * Equipment slot type
 */
export type EquipmentSlotType = keyof BuildEquipment;

/**
 * Item selection context
 */
export interface ItemSelectionContext {
  slot: EquipmentSlotType;
  currentItem: AlbionItem | null;
  isOffhandDisabled: boolean;
}

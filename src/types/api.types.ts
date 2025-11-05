/**
 * API-specific type definitions
 */

import { ItemQuality } from './common.types';

/**
 * Equipment slot types - matching Albion Online slots
 */
export type EquipmentSlot =
  | 'mainhand'
  | 'offhand'
  | 'head'
  | 'armor'
  | 'shoes'
  | 'cape'
  | 'bag'
  | 'mount'
  | 'potion'
  | 'food';

/**
 * Weapon hand types
 */
export type WeaponHandType = '1H' | '2H';

/**
 * Weapon categories
 */
export type WeaponCategory =
  | 'sword'
  | 'axe'
  | 'mace'
  | 'dagger'
  | 'spear'
  | 'quarterstaff'
  | 'hammer'
  | 'crossbow'
  | 'bow'
  | 'cursedstaff'
  | 'firestaff'
  | 'froststaff'
  | 'arcanestaff'
  | 'holystaff'
  | 'naturestaff';

/**
 * Armor categories
 */
export type ArmorCategory = 'cloth' | 'leather' | 'plate';

/**
 * Off-hand categories
 */
export type OffhandCategory = 'shield' | 'tome' | 'torch' | 'horn' | 'orb' | 'totem';

/**
 * Item categories
 */
export type ItemCategory =
  | 'weapon'
  | 'armor'
  | 'offhand'
  | 'cape'
  | 'bag'
  | 'mount'
  | 'consumable'
  | 'accessory';

/**
 * Base item interface
 */
export interface AlbionItem {
  id: string;
  name: string;
  uniqueName: string;
  category: ItemCategory;
  tier: string;
  enchantment: number;
  icon?: string;
  description?: string;
}

/**
 * Weapon item
 */
export interface WeaponItem extends AlbionItem {
  category: 'weapon';
  weaponCategory: WeaponCategory;
  handType: WeaponHandType;
  damage?: number;
  attackSpeed?: number;
}

/**
 * Armor piece item
 */
export interface ArmorItem extends AlbionItem {
  category: 'armor';
  slot: 'head' | 'armor' | 'shoes';
  armorCategory: ArmorCategory;
  defense?: number;
}

/**
 * Off-hand item
 */
export interface OffhandItem extends AlbionItem {
  category: 'offhand';
  offhandCategory: OffhandCategory;
  defense?: number;
}

/**
 * Equipment build
 */
export interface EquipmentBuild {
  id?: string;
  name: string;
  description?: string;
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
  totalItemPower?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Build stats
 */
export interface BuildStats {
  itemPower: number;
  offense: {
    damage: number;
    attackSpeed: number;
    critChance: number;
    critDamage: number;
  };
  defense: {
    armor: number;
    magicResist: number;
    health: number;
    healthRegen: number;
  };
  utility: {
    moveSpeed: number;
    cooldownReduction: number;
    energyCost: number;
  };
}

/**
 * Market price data
 */
export interface ItemPrice {
  itemId: string;
  city: string;
  quality: number;
  sellPriceMin: number;
  sellPriceMinDate: string;
  sellPriceMax: number;
  sellPriceMaxDate: string;
  buyPriceMin: number;
  buyPriceMinDate: string;
  buyPriceMax: number;
  buyPriceMaxDate: string;
}

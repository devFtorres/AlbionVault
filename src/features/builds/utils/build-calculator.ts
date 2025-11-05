/**
 * Build Statistics Calculator
 * Calculates combat stats based on equipped items
 */

import type { BuildEquipment, BuildStats } from '../types/builds.types';
import type { WeaponItem, ArmorItem, OffhandItem } from '@/src/types';

/**
 * Calculate item power for a single item based on tier
 */
function calculateItemPower(tier: string, enchantment: number = 0): number {
  const tierValue = parseInt(tier.replace('T', ''));
  const baseIP = tierValue * 100;
  const enchantmentBonus = enchantment * 100;
  return baseIP + enchantmentBonus;
}

/**
 * Calculate total damage from weapon
 */
function calculateDamage(weapon: WeaponItem | null): number {
  if (!weapon) return 0;
  return weapon.damage || 0;
}

/**
 * Calculate total defense from armor and offhand
 */
function calculateDefense(
  head: ArmorItem | null,
  armor: ArmorItem | null,
  shoes: ArmorItem | null,
  offhand: OffhandItem | null
): number {
  let totalDefense = 0;

  if (head?.defense) totalDefense += head.defense;
  if (armor?.defense) totalDefense += armor.defense;
  if (shoes?.defense) totalDefense += shoes.defense;
  if (offhand?.defense) totalDefense += offhand.defense;

  return totalDefense;
}

/**
 * Calculate total item power
 */
function calculateTotalItemPower(equipment: BuildEquipment): number {
  let total = 0;

  Object.values(equipment).forEach((item) => {
    if (item) {
      total += calculateItemPower(item.tier, item.enchantment);
    }
  });

  return total;
}

/**
 * Calculate average item power (only counting equipped slots)
 */
function calculateAverageItemPower(equipment: BuildEquipment): number {
  const equippedItems = Object.values(equipment).filter((item) => item !== null);
  if (equippedItems.length === 0) return 0;

  const total = calculateTotalItemPower(equipment);
  return Math.round(total / equippedItems.length);
}

/**
 * Main build stats calculator
 */
export function calculateBuildStats(equipment: BuildEquipment): BuildStats {
  const totalItemPower = calculateTotalItemPower(equipment);
  const averageItemPower = calculateAverageItemPower(equipment);

  // Calculate offense stats
  const baseDamage = calculateDamage(equipment.mainhand);
  const attackSpeed = (equipment.mainhand as WeaponItem)?.attackSpeed || 1.0;

  // Calculate defense stats
  const armor = calculateDefense(equipment.head, equipment.armor, equipment.shoes, equipment.offhand);

  // Calculate derived stats
  const health = 1000 + totalItemPower * 2; // Base health + IP bonus
  const magicResist = Math.floor(armor * 0.3); // Magic resist is 30% of armor

  return {
    totalItemPower,
    averageItemPower,
    offense: {
      damage: baseDamage,
      attackSpeed: attackSpeed,
      critChance: 0.05, // Base 5%
      critDamage: 1.5, // Base 150%
    },
    defense: {
      armor,
      magicResist,
      health,
      healthRegen: 10 + Math.floor(totalItemPower * 0.01),
    },
    utility: {
      moveSpeed: 100, // Base 100%
      cooldownReduction: 0,
      energyCost: 0,
    },
  };
}

/**
 * Format stat value for display
 */
export function formatStatValue(value: number, type: 'number' | 'percentage' = 'number'): string {
  if (type === 'percentage') {
    return `${(value * 100).toFixed(1)}%`;
  }
  return value.toFixed(0);
}

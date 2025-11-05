/**
 * Albion Online Item Database
 * Includes weapons, armor, and equipment
 */

import type { WeaponItem, ArmorItem, OffhandItem, AlbionItem } from '@/src/types';

/**
 * WEAPONS DATABASE
 */
export const WEAPONS: WeaponItem[] = [
  // SWORDS
  {
    id: 'T4_MAIN_SWORD',
    name: 'Broadsword',
    uniqueName: 'T4_MAIN_SWORD',
    category: 'weapon',
    weaponCategory: 'sword',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 65,
    attackSpeed: 1.2,
  },
  {
    id: 'T4_2H_SWORD',
    name: 'Claymore',
    uniqueName: 'T4_2H_SWORD',
    category: 'weapon',
    weaponCategory: 'sword',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 98,
    attackSpeed: 1.0,
  },
  {
    id: 'T4_2H_CLEAVER',
    name: 'Clarent Blade',
    uniqueName: 'T4_2H_CLEAVER',
    category: 'weapon',
    weaponCategory: 'sword',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 95,
    attackSpeed: 1.1,
  },

  // AXES
  {
    id: 'T4_MAIN_AXE',
    name: 'Battleaxe',
    uniqueName: 'T4_MAIN_AXE',
    category: 'weapon',
    weaponCategory: 'axe',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 70,
    attackSpeed: 1.1,
  },
  {
    id: 'T4_2H_AXE',
    name: 'Greataxe',
    uniqueName: 'T4_2H_AXE',
    category: 'weapon',
    weaponCategory: 'axe',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 105,
    attackSpeed: 0.9,
  },
  {
    id: 'T4_2H_HALBERD',
    name: 'Halberd',
    uniqueName: 'T4_2H_HALBERD',
    category: 'weapon',
    weaponCategory: 'axe',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 100,
    attackSpeed: 1.0,
  },

  // MACES
  {
    id: 'T4_MAIN_MACE',
    name: 'Mace',
    uniqueName: 'T4_MAIN_MACE',
    category: 'weapon',
    weaponCategory: 'mace',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 62,
    attackSpeed: 1.3,
  },
  {
    id: 'T4_2H_MACE',
    name: 'Heavy Mace',
    uniqueName: 'T4_2H_MACE',
    category: 'weapon',
    weaponCategory: 'mace',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 93,
    attackSpeed: 1.1,
  },

  // HAMMERS
  {
    id: 'T4_MAIN_HAMMER',
    name: 'Hammer',
    uniqueName: 'T4_MAIN_HAMMER',
    category: 'weapon',
    weaponCategory: 'hammer',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 68,
    attackSpeed: 1.1,
  },
  {
    id: 'T4_2H_POLEHAMMER',
    name: 'Polehammer',
    uniqueName: 'T4_2H_POLEHAMMER',
    category: 'weapon',
    weaponCategory: 'hammer',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 102,
    attackSpeed: 0.95,
  },

  // SPEARS
  {
    id: 'T4_MAIN_SPEAR',
    name: 'Spear',
    uniqueName: 'T4_MAIN_SPEAR',
    category: 'weapon',
    weaponCategory: 'spear',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 64,
    attackSpeed: 1.25,
  },
  {
    id: 'T4_2H_SPEAR',
    name: 'Pike',
    uniqueName: 'T4_2H_SPEAR',
    category: 'weapon',
    weaponCategory: 'spear',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 96,
    attackSpeed: 1.05,
  },

  // DAGGERS (All 1H)
  {
    id: 'T4_MAIN_DAGGER',
    name: 'Dagger',
    uniqueName: 'T4_MAIN_DAGGER',
    category: 'weapon',
    weaponCategory: 'dagger',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 58,
    attackSpeed: 1.4,
  },
  {
    id: 'T4_2H_DAGGER_KATAR',
    name: 'Claws',
    uniqueName: 'T4_2H_DAGGER_KATAR',
    category: 'weapon',
    weaponCategory: 'dagger',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 60,
    attackSpeed: 1.35,
  },

  // QUARTERSTAFFS (All 2H)
  {
    id: 'T4_2H_QUARTERSTAFF',
    name: 'Quarterstaff',
    uniqueName: 'T4_2H_QUARTERSTAFF',
    category: 'weapon',
    weaponCategory: 'quarterstaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 88,
    attackSpeed: 1.15,
  },
  {
    id: 'T4_2H_IRONCLADEDSTAFF',
    name: 'Iron-clad Staff',
    uniqueName: 'T4_2H_IRONCLADEDSTAFF',
    category: 'weapon',
    weaponCategory: 'quarterstaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 90,
    attackSpeed: 1.1,
  },

  // BOWS (All 2H)
  {
    id: 'T4_2H_BOW',
    name: 'Bow',
    uniqueName: 'T4_2H_BOW',
    category: 'weapon',
    weaponCategory: 'bow',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 92,
    attackSpeed: 1.1,
  },
  {
    id: 'T4_2H_WARBOW',
    name: 'Warbow',
    uniqueName: 'T4_2H_WARBOW',
    category: 'weapon',
    weaponCategory: 'bow',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 110,
    attackSpeed: 0.85,
  },
  {
    id: 'T4_2H_LONGBOW',
    name: 'Longbow',
    uniqueName: 'T4_2H_LONGBOW',
    category: 'weapon',
    weaponCategory: 'bow',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 105,
    attackSpeed: 0.9,
  },

  // CROSSBOWS (All 2H)
  {
    id: 'T4_2H_CROSSBOW',
    name: 'Crossbow',
    uniqueName: 'T4_2H_CROSSBOW',
    category: 'weapon',
    weaponCategory: 'crossbow',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 115,
    attackSpeed: 0.8,
  },
  {
    id: 'T4_2H_CROSSBOWLARGE',
    name: 'Heavy Crossbow',
    uniqueName: 'T4_2H_CROSSBOWLARGE',
    category: 'weapon',
    weaponCategory: 'crossbow',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 125,
    attackSpeed: 0.7,
  },

  // FIRE STAFF
  {
    id: 'T4_MAIN_FIRESTAFF',
    name: 'Fire Staff',
    uniqueName: 'T4_MAIN_FIRESTAFF',
    category: 'weapon',
    weaponCategory: 'firestaff',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 63,
    attackSpeed: 1.2,
  },
  {
    id: 'T4_2H_FIRESTAFF',
    name: 'Great Fire Staff',
    uniqueName: 'T4_2H_FIRESTAFF',
    category: 'weapon',
    weaponCategory: 'firestaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 94,
    attackSpeed: 1.0,
  },
  {
    id: 'T4_2H_INFERNOSTAFF',
    name: 'Infernal Staff',
    uniqueName: 'T4_2H_INFERNOSTAFF',
    category: 'weapon',
    weaponCategory: 'firestaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 97,
    attackSpeed: 0.95,
  },

  // FROST STAFF (All 2H)
  {
    id: 'T4_MAIN_FROSTSTAFF',
    name: 'Frost Staff',
    uniqueName: 'T4_MAIN_FROSTSTAFF',
    category: 'weapon',
    weaponCategory: 'froststaff',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 61,
    attackSpeed: 1.25,
  },
  {
    id: 'T4_2H_FROSTSTAFF',
    name: 'Great Frost Staff',
    uniqueName: 'T4_2H_FROSTSTAFF',
    category: 'weapon',
    weaponCategory: 'froststaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 91,
    attackSpeed: 1.05,
  },
  {
    id: 'T4_2H_GLACIALSTAFF',
    name: 'Glacial Staff',
    uniqueName: 'T4_2H_GLACIALSTAFF',
    category: 'weapon',
    weaponCategory: 'froststaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 89,
    attackSpeed: 1.1,
  },

  // HOLY STAFF
  {
    id: 'T4_MAIN_HOLYSTAFF',
    name: 'Holy Staff',
    uniqueName: 'T4_MAIN_HOLYSTAFF',
    category: 'weapon',
    weaponCategory: 'holystaff',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 59,
    attackSpeed: 1.3,
  },
  {
    id: 'T4_2H_HOLYSTAFF',
    name: 'Great Holy Staff',
    uniqueName: 'T4_2H_HOLYSTAFF',
    category: 'weapon',
    weaponCategory: 'holystaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 88,
    attackSpeed: 1.1,
  },

  // NATURE STAFF
  {
    id: 'T4_MAIN_NATURESTAFF',
    name: 'Nature Staff',
    uniqueName: 'T4_MAIN_NATURESTAFF',
    category: 'weapon',
    weaponCategory: 'naturestaff',
    handType: '1H',
    tier: 'T4',
    enchantment: 0,
    damage: 57,
    attackSpeed: 1.35,
  },
  {
    id: 'T4_2H_NATURESTAFF',
    name: 'Great Nature Staff',
    uniqueName: 'T4_2H_NATURESTAFF',
    category: 'weapon',
    weaponCategory: 'naturestaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 86,
    attackSpeed: 1.15,
  },

  // ARCANE STAFF (All 2H)
  {
    id: 'T4_2H_ARCANESTAFF',
    name: 'Arcane Staff',
    uniqueName: 'T4_2H_ARCANESTAFF',
    category: 'weapon',
    weaponCategory: 'arcanestaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 93,
    attackSpeed: 1.05,
  },
  {
    id: 'T4_2H_ENIGMATICSTAFF',
    name: 'Enigmatic Staff',
    uniqueName: 'T4_2H_ENIGMATICSTAFF',
    category: 'weapon',
    weaponCategory: 'arcanestaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 96,
    attackSpeed: 1.0,
  },

  // CURSED STAFF (All 2H)
  {
    id: 'T4_2H_CURSEDSTAFF',
    name: 'Cursed Staff',
    uniqueName: 'T4_2H_CURSEDSTAFF',
    category: 'weapon',
    weaponCategory: 'cursedstaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 90,
    attackSpeed: 1.1,
  },
  {
    id: 'T4_2H_DEMONICSTAFF',
    name: 'Demonic Staff',
    uniqueName: 'T4_2H_DEMONICSTAFF',
    category: 'weapon',
    weaponCategory: 'cursedstaff',
    handType: '2H',
    tier: 'T4',
    enchantment: 0,
    damage: 94,
    attackSpeed: 1.05,
  },
];

/**
 * OFF-HAND ITEMS
 */
export const OFFHANDS: OffhandItem[] = [
  // SHIELDS
  {
    id: 'T4_OFF_SHIELD',
    name: 'Shield',
    uniqueName: 'T4_OFF_SHIELD',
    category: 'offhand',
    offhandCategory: 'shield',
    tier: 'T4',
    enchantment: 0,
    defense: 35,
  },
  {
    id: 'T4_OFF_TOWERSHIELD',
    name: 'Tower Shield',
    uniqueName: 'T4_OFF_TOWERSHIELD',
    category: 'offhand',
    offhandCategory: 'shield',
    tier: 'T4',
    enchantment: 0,
    defense: 45,
  },
  {
    id: 'T4_OFF_SPIKEDSHIELD',
    name: 'Spiked Shield',
    uniqueName: 'T4_OFF_SPIKEDSHIELD',
    category: 'offhand',
    offhandCategory: 'shield',
    tier: 'T4',
    enchantment: 0,
    defense: 30,
  },

  // TOMES
  {
    id: 'T4_OFF_TOME',
    name: 'Tome of Insight',
    uniqueName: 'T4_OFF_TOME',
    category: 'offhand',
    offhandCategory: 'tome',
    tier: 'T4',
    enchantment: 0,
    defense: 15,
  },

  // TORCHES
  {
    id: 'T4_OFF_TORCH',
    name: 'Torch',
    uniqueName: 'T4_OFF_TORCH',
    category: 'offhand',
    offhandCategory: 'torch',
    tier: 'T4',
    enchantment: 0,
    defense: 10,
  },

  // HORNS
  {
    id: 'T4_OFF_HORN',
    name: 'Horn',
    uniqueName: 'T4_OFF_HORN',
    category: 'offhand',
    offhandCategory: 'horn',
    tier: 'T4',
    enchantment: 0,
    defense: 12,
  },

  // ORBS
  {
    id: 'T4_OFF_ORB',
    name: 'Orb',
    uniqueName: 'T4_OFF_ORB',
    category: 'offhand',
    offhandCategory: 'orb',
    tier: 'T4',
    enchantment: 0,
    defense: 8,
  },

  // TOTEMS
  {
    id: 'T4_OFF_TOTEM',
    name: 'Totem',
    uniqueName: 'T4_OFF_TOTEM',
    category: 'offhand',
    offhandCategory: 'totem',
    tier: 'T4',
    enchantment: 0,
    defense: 10,
  },
];

/**
 * ARMOR ITEMS
 */
export const ARMOR_PIECES: ArmorItem[] = [
  // CLOTH ARMOR
  {
    id: 'T4_HEAD_CLOTH_SET1',
    name: 'Scholar Cowl',
    uniqueName: 'T4_HEAD_CLOTH_SET1',
    category: 'armor',
    slot: 'head',
    armorCategory: 'cloth',
    tier: 'T4',
    enchantment: 0,
    defense: 25,
  },
  {
    id: 'T4_ARMOR_CLOTH_SET1',
    name: 'Scholar Robe',
    uniqueName: 'T4_ARMOR_CLOTH_SET1',
    category: 'armor',
    slot: 'armor',
    armorCategory: 'cloth',
    tier: 'T4',
    enchantment: 0,
    defense: 40,
  },
  {
    id: 'T4_SHOES_CLOTH_SET1',
    name: 'Scholar Sandals',
    uniqueName: 'T4_SHOES_CLOTH_SET1',
    category: 'armor',
    slot: 'shoes',
    armorCategory: 'cloth',
    tier: 'T4',
    enchantment: 0,
    defense: 20,
  },

  // LEATHER ARMOR
  {
    id: 'T4_HEAD_LEATHER_SET1',
    name: 'Mercenary Hood',
    uniqueName: 'T4_HEAD_LEATHER_SET1',
    category: 'armor',
    slot: 'head',
    armorCategory: 'leather',
    tier: 'T4',
    enchantment: 0,
    defense: 30,
  },
  {
    id: 'T4_ARMOR_LEATHER_SET1',
    name: 'Mercenary Jacket',
    uniqueName: 'T4_ARMOR_LEATHER_SET1',
    category: 'armor',
    slot: 'armor',
    armorCategory: 'leather',
    tier: 'T4',
    enchantment: 0,
    defense: 48,
  },
  {
    id: 'T4_SHOES_LEATHER_SET1',
    name: 'Mercenary Shoes',
    uniqueName: 'T4_SHOES_LEATHER_SET1',
    category: 'armor',
    slot: 'shoes',
    armorCategory: 'leather',
    tier: 'T4',
    enchantment: 0,
    defense: 24,
  },

  // PLATE ARMOR
  {
    id: 'T4_HEAD_PLATE_SET1',
    name: 'Soldier Helmet',
    uniqueName: 'T4_HEAD_PLATE_SET1',
    category: 'armor',
    slot: 'head',
    armorCategory: 'plate',
    tier: 'T4',
    enchantment: 0,
    defense: 38,
  },
  {
    id: 'T4_ARMOR_PLATE_SET1',
    name: 'Soldier Armor',
    uniqueName: 'T4_ARMOR_PLATE_SET1',
    category: 'armor',
    slot: 'armor',
    armorCategory: 'plate',
    tier: 'T4',
    enchantment: 0,
    defense: 60,
  },
  {
    id: 'T4_SHOES_PLATE_SET1',
    name: 'Soldier Boots',
    uniqueName: 'T4_SHOES_PLATE_SET1',
    category: 'armor',
    slot: 'shoes',
    armorCategory: 'plate',
    tier: 'T4',
    enchantment: 0,
    defense: 30,
  },
];

/**
 * CAPES
 */
export const CAPES: AlbionItem[] = [
  {
    id: 'T4_CAPE',
    name: 'Cape',
    uniqueName: 'T4_CAPE',
    category: 'accessory',
    tier: 'T4',
    enchantment: 0,
  },
  {
    id: 'T4_CAPE_UNDEAD',
    name: 'Undead Cape',
    uniqueName: 'T4_CAPE_UNDEAD',
    category: 'accessory',
    tier: 'T4',
    enchantment: 0,
  },
  {
    id: 'T4_CAPE_KEEPER',
    name: 'Keeper Cape',
    uniqueName: 'T4_CAPE_KEEPER',
    category: 'accessory',
    tier: 'T4',
    enchantment: 0,
  },
  {
    id: 'T4_CAPE_DEMON',
    name: 'Demon Cape',
    uniqueName: 'T4_CAPE_DEMON',
    category: 'accessory',
    tier: 'T4',
    enchantment: 0,
  },
];

/**
 * BAGS
 */
export const BAGS: AlbionItem[] = [
  {
    id: 'T4_BAG',
    name: 'Bag',
    uniqueName: 'T4_BAG',
    category: 'bag',
    tier: 'T4',
    enchantment: 0,
  },
];

/**
 * Utility functions
 */

/**
 * Get all weapons of a specific hand type
 */
export function getWeaponsByHandType(handType: '1H' | '2H'): WeaponItem[] {
  return WEAPONS.filter((weapon) => weapon.handType === handType);
}

/**
 * Get weapons by category
 */
export function getWeaponsByCategory(category: string): WeaponItem[] {
  return WEAPONS.filter((weapon) => weapon.weaponCategory === category);
}

/**
 * Get armor by slot
 */
export function getArmorBySlot(slot: 'head' | 'armor' | 'shoes'): ArmorItem[] {
  return ARMOR_PIECES.filter((armor) => armor.slot === slot);
}

/**
 * Get armor by category
 */
export function getArmorByCategory(category: 'cloth' | 'leather' | 'plate'): ArmorItem[] {
  return ARMOR_PIECES.filter((armor) => armor.armorCategory === category);
}

/**
 * Check if a weapon is two-handed
 */
export function isTwoHandedWeapon(weapon: WeaponItem | null): boolean {
  return weapon?.handType === '2H';
}

/**
 * Get all items
 */
export function getAllItems(): AlbionItem[] {
  return [...WEAPONS, ...OFFHANDS, ...ARMOR_PIECES, ...CAPES, ...BAGS];
}

/**
 * Find item by ID
 */
export function findItemById(id: string): AlbionItem | undefined {
  return getAllItems().find((item) => item.id === id);
}

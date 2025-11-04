// Types for Albion Online items and builds

export enum ItemCategory {
  WEAPON = 'weapon',
  HELMET = 'helmet',
  ARMOR = 'armor',
  BOOTS = 'boots',
  CAPE = 'cape',
  OFF_HAND = 'offhand',
  BAG = 'bag',
  MOUNT = 'mount',
  FOOD = 'food',
  POTION = 'potion',
}

export enum ItemTier {
  T1 = 1,
  T2 = 2,
  T3 = 3,
  T4 = 4,
  T5 = 5,
  T6 = 6,
  T7 = 7,
  T8 = 8,
}

export enum WeaponType {
  // Melee
  AXE = 'axe',
  DAGGER = 'dagger',
  HAMMER = 'hammer',
  MACE = 'mace',
  QUARTERSTAFF = 'quarterstaff',
  SPEAR = 'spear',
  SWORD = 'sword',

  // Ranged
  BOW = 'bow',
  CROSSBOW = 'crossbow',

  // Magic
  ARCANE = 'arcane',
  CURSE = 'curse',
  FIRE = 'fire',
  FROST = 'frost',
  HOLY = 'holy',
  NATURE = 'nature',
}

export enum ArmorType {
  CLOTH = 'cloth',
  LEATHER = 'leather',
  PLATE = 'plate',
}

export interface ItemAbility {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  cooldown?: number;
  energyCost?: number;
  slot: 'Q' | 'W' | 'E' | 'R' | 'D' | 'F' | 'passive';
}

export interface AlbionItem {
  id: string; // e.g., "T4_HEAD_CLOTH_SET1"
  uniqueName: string;
  localizedNames?: {
    'EN-US': string;
    'PT-BR'?: string;
    [key: string]: string | undefined;
  };
  tier: ItemTier;
  enchantment: 0 | 1 | 2 | 3 | 4;
  category: ItemCategory;
  subcategory?: string; // e.g., "cloth_helmet", "great_axe"

  // For weapons
  weaponType?: WeaponType;

  // For armor
  armorType?: ArmorType;

  // Available abilities for this item
  availableAbilities?: ItemAbility[];

  // Item stats
  itemPower?: number;

  // Icon URL
  iconUrl?: string;
}

export interface SelectedItemAbilities {
  itemId: string;
  selectedAbilities: {
    Q?: ItemAbility;
    W?: ItemAbility;
    E?: ItemAbility;
    passive?: ItemAbility;
  };
}

export interface BuildEquipment {
  weapon?: AlbionItem;
  helmet?: AlbionItem;
  armor?: AlbionItem;
  boots?: AlbionItem;
  cape?: AlbionItem;
  offHand?: AlbionItem;
  bag?: AlbionItem;
  mount?: AlbionItem;

  // Selected abilities for each equipment
  weaponAbilities?: SelectedItemAbilities;
  helmetAbilities?: SelectedItemAbilities;
  armorAbilities?: SelectedItemAbilities;
  bootsAbilities?: SelectedItemAbilities;
  capeAbilities?: SelectedItemAbilities;
  offHandAbilities?: SelectedItemAbilities;
}

export interface BuildConsumables {
  food?: AlbionItem;
  potion?: AlbionItem;
}

export interface Build {
  id: string;
  name: string;
  description?: string;

  // Equipment and their abilities
  equipment: BuildEquipment;

  // Consumables
  consumables: BuildConsumables;

  // Metadata
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  isFavorite?: boolean;

  // Stats (calculated)
  totalItemPower?: number;
}

export interface BuildFilters {
  search?: string;
  tags?: string[];
  sortBy?: 'name' | 'createdAt' | 'updatedAt' | 'itemPower';
  sortOrder?: 'asc' | 'desc';
}

export interface ItemFilters {
  search?: string;
  category?: ItemCategory;
  tier?: ItemTier;
  enchantment?: 0 | 1 | 2 | 3 | 4;
  weaponType?: WeaponType;
  armorType?: ArmorType;
}

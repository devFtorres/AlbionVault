import { AlbionItem, ItemCategory, ItemTier, ItemFilters, WeaponType, ArmorType, ItemAbility } from '../types/builds.types';

// Base URL for Albion Online gameinfo API
const GAMEINFO_API_BASE = 'https://gameinfo.albiononline.com/api/gameinfo';

// Raw GitHub URL for items data
const ITEMS_DATA_URL = 'https://raw.githubusercontent.com/broderickhyman/ao-bin-dumps/master/formatted/items.txt';

/**
 * Parse item ID to extract tier, enchantment, and category info
 */
export function parseItemId(itemId: string): {
  tier: ItemTier;
  enchantment: 0 | 1 | 2 | 3 | 4;
  category: ItemCategory | null;
  subcategory: string | null;
} {
  // Example: T4_HEAD_CLOTH_SET1@2
  const enchantmentMatch = itemId.match(/@(\d)$/);
  const enchantment = enchantmentMatch ? parseInt(enchantmentMatch[1]) as 0 | 1 | 2 | 3 | 4 : 0;

  const baseId = itemId.replace(/@\d$/, '');
  const tierMatch = baseId.match(/^T(\d+)_/);
  const tier = tierMatch ? parseInt(tierMatch[1]) as ItemTier : ItemTier.T1;

  let category: ItemCategory | null = null;
  let subcategory: string | null = null;

  // Determine category from item ID pattern
  if (baseId.includes('_HEAD_')) {
    category = ItemCategory.HELMET;
    if (baseId.includes('_CLOTH_')) subcategory = 'cloth_helmet';
    if (baseId.includes('_LEATHER_')) subcategory = 'leather_helmet';
    if (baseId.includes('_PLATE_')) subcategory = 'plate_helmet';
  } else if (baseId.includes('_ARMOR_')) {
    category = ItemCategory.ARMOR;
    if (baseId.includes('_CLOTH_')) subcategory = 'cloth_armor';
    if (baseId.includes('_LEATHER_')) subcategory = 'leather_armor';
    if (baseId.includes('_PLATE_')) subcategory = 'plate_armor';
  } else if (baseId.includes('_SHOES_')) {
    category = ItemCategory.BOOTS;
    if (baseId.includes('_CLOTH_')) subcategory = 'cloth_boots';
    if (baseId.includes('_LEATHER_')) subcategory = 'leather_boots';
    if (baseId.includes('_PLATE_')) subcategory = 'plate_boots';
  } else if (baseId.includes('_CAPE')) {
    category = ItemCategory.CAPE;
  } else if (baseId.includes('_BAG')) {
    category = ItemCategory.BAG;
  } else if (baseId.includes('_2H_') || baseId.includes('_MAIN_')) {
    category = ItemCategory.WEAPON;
    // Determine weapon type
    if (baseId.includes('_AXE')) subcategory = 'axe';
    if (baseId.includes('_SWORD')) subcategory = 'sword';
    if (baseId.includes('_HAMMER')) subcategory = 'hammer';
    if (baseId.includes('_MACE')) subcategory = 'mace';
    if (baseId.includes('_BOW')) subcategory = 'bow';
    if (baseId.includes('_CROSSBOW')) subcategory = 'crossbow';
    if (baseId.includes('_FIRE')) subcategory = 'fire';
    if (baseId.includes('_HOLY')) subcategory = 'holy';
    if (baseId.includes('_NATURE')) subcategory = 'nature';
    if (baseId.includes('_FROST')) subcategory = 'frost';
    if (baseId.includes('_CURSE')) subcategory = 'curse';
    if (baseId.includes('_ARCANE')) subcategory = 'arcane';
    if (baseId.includes('_DAGGER')) subcategory = 'dagger';
    if (baseId.includes('_SPEAR')) subcategory = 'spear';
    if (baseId.includes('_QUARTERSTAFF')) subcategory = 'quarterstaff';
  } else if (baseId.includes('_OFF_')) {
    category = ItemCategory.OFF_HAND;
  } else if (baseId.includes('_MOUNT_')) {
    category = ItemCategory.MOUNT;
  } else if (baseId.includes('_MEAL_') || baseId.includes('_FISH_')) {
    category = ItemCategory.FOOD;
  } else if (baseId.includes('_POTION_')) {
    category = ItemCategory.POTION;
  }

  return { tier, enchantment, category, subcategory };
}

/**
 * Generate localized item name from ID
 */
export function generateItemName(itemId: string): string {
  const { tier, enchantment } = parseItemId(itemId);
  const baseId = itemId.replace(/@\d$/, '').replace(/^T\d+_/, '');

  // Tier names
  const tierNames = {
    [ItemTier.T1]: 'Beginner\'s',
    [ItemTier.T2]: 'Novice\'s',
    [ItemTier.T3]: 'Journeyman\'s',
    [ItemTier.T4]: 'Adept\'s',
    [ItemTier.T5]: 'Expert\'s',
    [ItemTier.T6]: 'Master\'s',
    [ItemTier.T7]: 'Grandmaster\'s',
    [ItemTier.T8]: 'Elder\'s',
  };

  // Clean up the name
  let name = baseId
    .replace(/_/g, ' ')
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  const tierName = tierNames[tier];
  const enchantmentSuffix = enchantment > 0 ? `.${enchantment}` : '';

  return `${tierName} ${name}${enchantmentSuffix}`;
}

/**
 * Mock data for item abilities (will be replaced with real API data)
 */
export function getItemAbilities(itemId: string): ItemAbility[] {
  const { category } = parseItemId(itemId);

  // Mock abilities - in production, this should come from API or database
  const mockAbilities: Record<ItemCategory, ItemAbility[]> = {
    [ItemCategory.WEAPON]: [
      { id: 'q1', name: 'Basic Attack', description: 'Standard weapon attack', slot: 'Q' },
      { id: 'w1', name: 'Power Strike', description: 'Deal increased damage', slot: 'W', cooldown: 10 },
      { id: 'w2', name: 'Cleave', description: 'Hit multiple enemies', slot: 'W', cooldown: 12 },
      { id: 'e1', name: 'Execute', description: 'Finishing move', slot: 'E', cooldown: 15 },
      { id: 'e2', name: 'Charge', description: 'Rush forward', slot: 'E', cooldown: 20 },
      { id: 'passive1', name: 'Aggressive', description: '+10% damage', slot: 'passive' },
      { id: 'passive2', name: 'Defensive', description: '+10% defense', slot: 'passive' },
    ],
    [ItemCategory.HELMET]: [
      { id: 'q1', name: 'Protection', description: 'Reduce incoming damage', slot: 'Q', cooldown: 30 },
      { id: 'q2', name: 'Mind Shield', description: 'Resist CC effects', slot: 'Q', cooldown: 25 },
      { id: 'passive1', name: 'Fortitude', description: '+5% HP', slot: 'passive' },
    ],
    [ItemCategory.ARMOR]: [
      { id: 'w1', name: 'Iron Will', description: 'Temporary damage immunity', slot: 'W', cooldown: 60 },
      { id: 'w2', name: 'Berserk', description: 'Increase attack speed', slot: 'W', cooldown: 45 },
      { id: 'passive1', name: 'Resilience', description: '+10% defense', slot: 'passive' },
    ],
    [ItemCategory.BOOTS]: [
      { id: 'e1', name: 'Sprint', description: 'Increase movement speed', slot: 'E', cooldown: 20 },
      { id: 'e2', name: 'Teleport', description: 'Blink forward', slot: 'E', cooldown: 30 },
      { id: 'passive1', name: 'Swift', description: '+5% move speed', slot: 'passive' },
    ],
    [ItemCategory.CAPE]: [
      { id: 'passive1', name: 'Energy Regen', description: '+5 energy/sec', slot: 'passive' },
    ],
    [ItemCategory.OFF_HAND]: [],
    [ItemCategory.BAG]: [],
    [ItemCategory.MOUNT]: [],
    [ItemCategory.FOOD]: [],
    [ItemCategory.POTION]: [],
  };

  return category ? mockAbilities[category] || [] : [];
}

/**
 * Fetch item icon URL
 */
export function getItemIconUrl(itemId: string): string {
  // Remove enchantment suffix for icon URL
  const baseId = itemId.replace(/@\d$/, '');
  return `https://render.albiononline.com/v1/item/${baseId}.png`;
}

/**
 * Create AlbionItem from item ID
 */
export function createAlbionItem(itemId: string): AlbionItem {
  const { tier, enchantment, category, subcategory } = parseItemId(itemId);
  const name = generateItemName(itemId);
  const availableAbilities = getItemAbilities(itemId);

  return {
    id: itemId,
    uniqueName: itemId,
    localizedNames: {
      'EN-US': name,
    },
    tier,
    enchantment,
    category: category || ItemCategory.WEAPON,
    subcategory: subcategory || undefined,
    availableAbilities,
    iconUrl: getItemIconUrl(itemId),
  };
}

/**
 * Generate all variations of an item (with enchantments)
 */
export function generateItemVariations(baseItemId: string): AlbionItem[] {
  const items: AlbionItem[] = [];

  // Base item (no enchantment)
  items.push(createAlbionItem(baseItemId));

  // Enchanted variations
  for (let enchant = 1; enchant <= 4; enchant++) {
    items.push(createAlbionItem(`${baseItemId}@${enchant}`));
  }

  return items;
}

/**
 * Mock database of base item IDs (subset for demonstration)
 * In production, this would be fetched from the items.txt or a proper API
 */
const MOCK_ITEMS_DATABASE = [
  // Cloth Helmets
  'T4_HEAD_CLOTH_SET1',
  'T4_HEAD_CLOTH_SET2',
  'T4_HEAD_CLOTH_SET3',
  'T5_HEAD_CLOTH_SET1',
  'T6_HEAD_CLOTH_SET1',
  'T7_HEAD_CLOTH_SET1',
  'T8_HEAD_CLOTH_SET1',

  // Cloth Armor
  'T4_ARMOR_CLOTH_SET1',
  'T4_ARMOR_CLOTH_SET2',
  'T4_ARMOR_CLOTH_SET3',
  'T5_ARMOR_CLOTH_SET1',
  'T6_ARMOR_CLOTH_SET1',
  'T7_ARMOR_CLOTH_SET1',
  'T8_ARMOR_CLOTH_SET1',

  // Cloth Boots
  'T4_SHOES_CLOTH_SET1',
  'T4_SHOES_CLOTH_SET2',
  'T4_SHOES_CLOTH_SET3',
  'T5_SHOES_CLOTH_SET1',
  'T6_SHOES_CLOTH_SET1',
  'T7_SHOES_CLOTH_SET1',
  'T8_SHOES_CLOTH_SET1',

  // Leather
  'T4_HEAD_LEATHER_SET1',
  'T4_ARMOR_LEATHER_SET1',
  'T4_SHOES_LEATHER_SET1',
  'T5_HEAD_LEATHER_SET1',
  'T5_ARMOR_LEATHER_SET1',
  'T5_SHOES_LEATHER_SET1',

  // Plate
  'T4_HEAD_PLATE_SET1',
  'T4_ARMOR_PLATE_SET1',
  'T4_SHOES_PLATE_SET1',
  'T5_HEAD_PLATE_SET1',
  'T5_ARMOR_PLATE_SET1',
  'T5_SHOES_PLATE_SET1',

  // Weapons - Swords
  'T4_2H_CLAYMORE',
  'T4_MAIN_SWORD',
  'T5_2H_CLAYMORE',
  'T6_2H_CLAYMORE',

  // Weapons - Axes
  'T4_2H_HALBERD',
  'T4_MAIN_AXE',
  'T5_2H_HALBERD',

  // Weapons - Maces
  'T4_2H_MACE',
  'T4_MAIN_MACE',

  // Weapons - Magic
  'T4_MAIN_FIRE',
  'T4_2H_FIRE',
  'T4_MAIN_NATURE',
  'T4_2H_NATURE',
  'T4_MAIN_HOLY',
  'T4_2H_HOLY',

  // Capes
  'T4_CAPE',
  'T5_CAPE',
  'T6_CAPE',

  // Bags
  'T4_BAG',
  'T5_BAG',
  'T6_BAG',

  // Mounts
  'T5_MOUNT_OX',
  'T5_MOUNT_HORSE',
  'T6_MOUNT_ARMORED_HORSE',

  // Food
  'T4_MEAL_STEW',
  'T5_MEAL_ROAST',
  'T6_MEAL_MEAT_PIE',

  // Potions
  'T4_POTION_HEAL',
  'T4_POTION_ENERGY',
];

/**
 * Get all items from database
 */
export async function getAllItems(): Promise<AlbionItem[]> {
  // In production, this would fetch from the actual API or load from local cache
  // For now, we'll generate items from our mock database

  const allItems: AlbionItem[] = [];

  for (const baseId of MOCK_ITEMS_DATABASE) {
    const variations = generateItemVariations(baseId);
    allItems.push(...variations);
  }

  return allItems;
}

/**
 * Search items with filters
 */
export async function searchItems(filters: ItemFilters): Promise<AlbionItem[]> {
  const allItems = await getAllItems();

  return allItems.filter((item) => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const name = item.localizedNames?.['EN-US']?.toLowerCase() || '';
      const id = item.id.toLowerCase();
      if (!name.includes(searchLower) && !id.includes(searchLower)) {
        return false;
      }
    }

    // Category filter
    if (filters.category && item.category !== filters.category) {
      return false;
    }

    // Tier filter
    if (filters.tier !== undefined && item.tier !== filters.tier) {
      return false;
    }

    // Enchantment filter
    if (filters.enchantment !== undefined && item.enchantment !== filters.enchantment) {
      return false;
    }

    return true;
  });
}

/**
 * Get item by ID
 */
export async function getItemById(itemId: string): Promise<AlbionItem | null> {
  const allItems = await getAllItems();
  return allItems.find((item) => item.id === itemId) || null;
}

/**
 * Get items by category
 */
export async function getItemsByCategory(category: ItemCategory): Promise<AlbionItem[]> {
  return searchItems({ category });
}

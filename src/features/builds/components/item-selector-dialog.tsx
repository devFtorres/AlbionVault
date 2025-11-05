'use client';

/**
 * Item Selector Dialog
 * Modal for selecting items from the database
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { AlbionItem, WeaponItem, ArmorItem, OffhandItem } from '@/src/types';
import type { EquipmentSlotType } from '../types/builds.types';
import {
  WEAPONS,
  OFFHANDS,
  ARMOR_PIECES,
  CAPES,
  BAGS,
  getWeaponsByHandType,
  getArmorBySlot,
} from '@/src/lib/data/items';
import { Search, X } from 'lucide-react';

interface ItemSelectorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  slot: EquipmentSlotType;
  onSelectItem: (item: AlbionItem | null) => void;
  currentItem?: AlbionItem | null;
}

/**
 * Get available items for a slot
 */
function getItemsForSlot(slot: EquipmentSlotType): AlbionItem[] {
  switch (slot) {
    case 'mainhand':
      return WEAPONS;
    case 'offhand':
      return OFFHANDS;
    case 'head':
      return getArmorBySlot('head');
    case 'armor':
      return getArmorBySlot('armor');
    case 'shoes':
      return getArmorBySlot('shoes');
    case 'cape':
      return CAPES;
    case 'bag':
      return BAGS;
    default:
      return [];
  }
}

/**
 * Get slot display name
 */
function getSlotDisplayName(slot: EquipmentSlotType): string {
  const names: Record<EquipmentSlotType, string> = {
    mainhand: 'Main Hand Weapon',
    offhand: 'Off Hand',
    head: 'Head Armor',
    armor: 'Chest Armor',
    shoes: 'Boots',
    cape: 'Cape',
    bag: 'Bag',
    mount: 'Mount',
    potion: 'Potion',
    food: 'Food',
  };
  return names[slot];
}

export function ItemSelectorDialog({
  open,
  onOpenChange,
  slot,
  onSelectItem,
  currentItem,
}: ItemSelectorDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState('');

  // Get items for this slot
  const allItems = React.useMemo(() => getItemsForSlot(slot), [slot]);

  // Filter items by search query
  const filteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return allItems;

    const query = searchQuery.toLowerCase();
    return allItems.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.uniqueName.toLowerCase().includes(query) ||
        item.tier.toLowerCase().includes(query)
    );
  }, [allItems, searchQuery]);

  // Group items by type/category
  const groupedItems = React.useMemo(() => {
    const groups = new Map<string, AlbionItem[]>();

    filteredItems.forEach((item) => {
      let groupKey = 'Other';

      if ('weaponCategory' in item) {
        const weapon = item as WeaponItem;
        groupKey = `${weapon.weaponCategory} (${weapon.handType})`;
      } else if ('armorCategory' in item) {
        const armor = item as ArmorItem;
        groupKey = armor.armorCategory;
      } else if ('offhandCategory' in item) {
        const offhand = item as OffhandItem;
        groupKey = offhand.offhandCategory;
      }

      if (!groups.has(groupKey)) {
        groups.set(groupKey, []);
      }
      groups.get(groupKey)!.push(item);
    });

    return Array.from(groups.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [filteredItems]);

  const handleSelectItem = (item: AlbionItem) => {
    onSelectItem(item);
    onOpenChange(false);
    setSearchQuery('');
  };

  const handleClearSlot = () => {
    onSelectItem(null);
    onOpenChange(false);
    setSearchQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select {getSlotDisplayName(slot)}</DialogTitle>
          <DialogDescription>
            Choose an item from the list below{' '}
            {currentItem && `(Current: ${currentItem.name})`}
          </DialogDescription>
        </DialogHeader>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {groupedItems.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
              No items found
            </div>
          ) : (
            groupedItems.map(({ category, items }) => (
              <div key={category}>
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {category}
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelectItem(item)}
                      className={cn(
                        'group relative flex flex-col items-start rounded-lg border p-3 text-left transition-all',
                        'hover:border-primary hover:bg-accent/5',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                        currentItem?.id === item.id &&
                          'border-primary bg-primary/10'
                      )}
                    >
                      {/* Item tier badge */}
                      <div className="mb-2 flex w-full items-center justify-between">
                        <span className="bg-primary/20 text-primary rounded px-2 py-0.5 text-xs font-medium">
                          {item.tier}
                          {item.enchantment > 0 && `.${item.enchantment}`}
                        </span>
                        {currentItem?.id === item.id && (
                          <span className="text-primary text-xs font-medium"> Equipped</span>
                        )}
                      </div>

                      {/* Item name */}
                      <div className="text-sm font-medium leading-tight">{item.name}</div>

                      {/* Item details */}
                      <div className="mt-1 text-xs text-muted-foreground">
                        {'weaponCategory' in item && (
                          <span className="capitalize">
                            {(item as WeaponItem).weaponCategory} "{' '}
                            {(item as WeaponItem).handType}
                          </span>
                        )}
                        {'armorCategory' in item && (
                          <span className="capitalize">
                            {(item as ArmorItem).armorCategory}
                          </span>
                        )}
                        {'offhandCategory' in item && (
                          <span className="capitalize">
                            {(item as OffhandItem).offhandCategory}
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={handleClearSlot}>
            Clear Slot
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

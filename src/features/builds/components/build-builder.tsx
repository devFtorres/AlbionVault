'use client';

import { useState } from 'react';
import {
  AlbionItem,
  ItemCategory,
  SelectedItemAbilities,
  BuildEquipment,
  BuildConsumables,
} from '../types/builds.types';
import { useBuildStore } from '../stores/build-store';
import { ItemSelector } from './item-selector';
import { AbilitySelectorDialog } from './ability-selector-dialog';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, X, Save } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type EquipmentSlot =
  | 'weapon'
  | 'helmet'
  | 'armor'
  | 'boots'
  | 'cape'
  | 'offHand'
  | 'bag'
  | 'mount';
type ConsumableSlot = 'food' | 'potion';

export function BuildBuilder() {
  const { addBuild } = useBuildStore();

  const [buildName, setBuildName] = useState('');
  const [buildDescription, setBuildDescription] = useState('');
  const [equipment, setEquipment] = useState<BuildEquipment>({});
  const [consumables, setConsumables] = useState<BuildConsumables>({});

  // Dialog states
  const [itemSelectorOpen, setItemSelectorOpen] = useState(false);
  const [abilitySelectorOpen, setAbilitySelectorOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | ConsumableSlot | null>(null);
  const [selectedItem, setSelectedItem] = useState<AlbionItem | null>(null);

  // Category mapping
  const slotCategories: Record<EquipmentSlot | ConsumableSlot, ItemCategory> = {
    weapon: ItemCategory.WEAPON,
    helmet: ItemCategory.HELMET,
    armor: ItemCategory.ARMOR,
    boots: ItemCategory.BOOTS,
    cape: ItemCategory.CAPE,
    offHand: ItemCategory.OFF_HAND,
    bag: ItemCategory.BAG,
    mount: ItemCategory.MOUNT,
    food: ItemCategory.FOOD,
    potion: ItemCategory.POTION,
  };

  const handleSlotClick = (slot: EquipmentSlot | ConsumableSlot) => {
    setSelectedSlot(slot);
    setItemSelectorOpen(true);
  };

  const handleItemSelect = (item: AlbionItem) => {
    setSelectedItem(item);
    setItemSelectorOpen(false);

    // Check if item has abilities
    if (item.availableAbilities && item.availableAbilities.length > 0) {
      setAbilitySelectorOpen(true);
    } else {
      // No abilities, directly equip
      equipItem(item, { itemId: item.id, selectedAbilities: {} });
    }
  };

  const equipItem = (item: AlbionItem, abilities: SelectedItemAbilities) => {
    if (!selectedSlot) return;

    if (selectedSlot === 'food' || selectedSlot === 'potion') {
      setConsumables((prev) => ({ ...prev, [selectedSlot]: item }));
    } else {
      setEquipment((prev) => ({
        ...prev,
        [selectedSlot]: item,
        [`${selectedSlot}Abilities`]: abilities,
      }));
    }

    setSelectedSlot(null);
    setSelectedItem(null);
  };

  const removeItem = (slot: EquipmentSlot | ConsumableSlot) => {
    if (slot === 'food' || slot === 'potion') {
      setConsumables((prev) => ({ ...prev, [slot]: undefined }));
    } else {
      setEquipment((prev) => ({
        ...prev,
        [slot]: undefined,
        [`${slot}Abilities`]: undefined,
      }));
    }
  };

  const handleSaveBuild = () => {
    if (!buildName.trim()) {
      alert('Please enter a build name');
      return;
    }

    addBuild({
      name: buildName,
      description: buildDescription || undefined,
      equipment,
      consumables,
    });

    // Reset form
    setBuildName('');
    setBuildDescription('');
    setEquipment({});
    setConsumables({});

    alert('Build saved successfully!');
  };

  const equipmentSlots: { slot: EquipmentSlot; label: string }[] = [
    { slot: 'weapon', label: 'Weapon' },
    { slot: 'offHand', label: 'Off-Hand' },
    { slot: 'helmet', label: 'Helmet' },
    { slot: 'armor', label: 'Armor' },
    { slot: 'boots', label: 'Boots' },
    { slot: 'cape', label: 'Cape' },
    { slot: 'bag', label: 'Bag' },
    { slot: 'mount', label: 'Mount' },
  ];

  const consumableSlots: { slot: ConsumableSlot; label: string }[] = [
    { slot: 'food', label: 'Food' },
    { slot: 'potion', label: 'Potion' },
  ];

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Build Info */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Build Information</h2>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Build Name *</label>
            <Input
              placeholder="e.g., Tank PvP Build"
              value={buildName}
              onChange={(e) => setBuildName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Input
              placeholder="Optional description..."
              value={buildDescription}
              onChange={(e) => setBuildDescription(e.target.value)}
            />
          </div>
        </div>
      </Card>

      {/* Equipment */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Equipment</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {equipmentSlots.map(({ slot, label }) => (
            <EquipmentSlot
              key={slot}
              label={label}
              item={equipment[slot]}
              onAdd={() => handleSlotClick(slot)}
              onRemove={() => removeItem(slot)}
            />
          ))}
        </div>
      </Card>

      {/* Consumables */}
      <Card className="p-6 space-y-4">
        <h2 className="text-2xl font-bold">Consumables</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {consumableSlots.map(({ slot, label }) => (
            <EquipmentSlot
              key={slot}
              label={label}
              item={consumables[slot]}
              onAdd={() => handleSlotClick(slot)}
              onRemove={() => removeItem(slot)}
            />
          ))}
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSaveBuild} size="lg" className="gap-2">
          <Save className="h-5 w-5" />
          Save Build
        </Button>
      </div>

      {/* Item Selector Dialog */}
      <Dialog open={itemSelectorOpen} onOpenChange={setItemSelectorOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              Select {selectedSlot ? slotCategories[selectedSlot] : 'Item'}
            </DialogTitle>
          </DialogHeader>
          <ItemSelector
            onItemSelect={handleItemSelect}
            category={selectedSlot ? slotCategories[selectedSlot] : undefined}
          />
        </DialogContent>
      </Dialog>

      {/* Ability Selector Dialog */}
      <AbilitySelectorDialog
        item={selectedItem}
        open={abilitySelectorOpen}
        onOpenChange={setAbilitySelectorOpen}
        onConfirm={equipItem}
      />
    </div>
  );
}

interface EquipmentSlotProps {
  label: string;
  item?: AlbionItem;
  onAdd: () => void;
  onRemove: () => void;
}

function EquipmentSlot({ label, item, onAdd, onRemove }: EquipmentSlotProps) {
  return (
    <div className="relative">
      <div className="text-sm font-medium mb-2">{label}</div>
      {item ? (
        <div className="group relative aspect-square rounded-lg border-2 border-blue-500 bg-white dark:bg-gray-800 p-2 flex flex-col items-center justify-center">
          <button
            onClick={onRemove}
            className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
          <img
            src={item.iconUrl}
            alt={item.localizedNames?.['EN-US'] || item.id}
            className="h-16 w-16 object-contain"
          />
          <div className="text-xs text-center mt-2 line-clamp-2">
            {item.localizedNames?.['EN-US'] || item.id}
          </div>
        </div>
      ) : (
        <button
          onClick={onAdd}
          className="aspect-square w-full rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-500 bg-gray-50 dark:bg-gray-900 flex items-center justify-center transition-colors"
        >
          <Plus className="h-8 w-8 text-gray-400" />
        </button>
      )}
    </div>
  );
}

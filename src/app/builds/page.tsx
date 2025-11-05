'use client';

/**
 * Build Builder Page
 * Main page for creating and managing character builds
 */

import * as React from 'react';
import { BuildBuilder } from '@/src/features/builds/components/build-builder';
import { BuildStats } from '@/src/features/builds/components/build-stats';
import { ItemSelectorDialog } from '@/src/features/builds/components/item-selector-dialog';
import { isTwoHandedWeapon } from '@/src/lib/data/items';
import type { BuildEquipment, EquipmentSlotType } from '@/src/features/builds/types/builds.types';
import type { AlbionItem, WeaponItem } from '@/src/types';

const initialEquipment: BuildEquipment = {
  mainhand: null,
  offhand: null,
  head: null,
  armor: null,
  shoes: null,
  cape: null,
  bag: null,
  mount: null,
  potion: null,
  food: null,
};

export default function BuildsPage() {
  const [equipment, setEquipment] = React.useState<BuildEquipment>(initialEquipment);

  const [selectedSlot, setSelectedSlot] = React.useState<EquipmentSlotType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  // Automatically clear offhand when 2H weapon is equipped
  React.useEffect(() => {
    if (isTwoHandedWeapon(equipment.mainhand) && equipment.offhand) {
      setEquipment((prev) => ({ ...prev, offhand: null }));
    }
  }, [equipment.mainhand, equipment.offhand]);

  const handleSelectItem = (slot: EquipmentSlotType) => {
    setSelectedSlot(slot);
    setIsDialogOpen(true);
  };

  const handleItemSelected = (item: AlbionItem | null) => {
    if (selectedSlot) {
      setEquipment((prev) => ({
        ...prev,
        [selectedSlot]: item,
      }));
    }
  };

  const handleReset = () => {
    setEquipment(initialEquipment);
  };

  const handleSave = (equipment: BuildEquipment) => {
    // In a real app, save to database/local storage
    console.log('Saving build:', equipment);
    alert('Build saved! (This is a demo - not actually saved)');
  };

  return (
    <div className="container mx-auto space-y-6 py-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Build Builder</h1>
        <p className="text-muted-foreground">
          Create and optimize your character builds for Albion Online
        </p>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Build Builder */}
        <div className="space-y-6">
          <BuildBuilder
            equipment={equipment}
            onSelectItem={handleSelectItem}
            onSave={handleSave}
            onReset={handleReset}
          />
        </div>

        {/* Stats Panel */}
        <div className="space-y-6">
          <BuildStats equipment={equipment} />
        </div>
      </div>

      {/* Item Selector Dialog */}
      {selectedSlot && (
        <ItemSelectorDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          slot={selectedSlot}
          onSelectItem={handleItemSelected}
          currentItem={equipment[selectedSlot]}
        />
      )}
    </div>
  );
}

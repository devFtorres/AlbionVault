'use client';

/**
 * Build Builder Component
 * Main interface for creating and editing character builds
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EquipmentSlot } from './equipment-slot';
import { isTwoHandedWeapon } from '@/src/lib/data/items';
import type { BuildEquipment, EquipmentSlotType } from '../types/builds.types';
import type { AlbionItem, WeaponItem } from '@/src/types';
import { Save, RotateCcw } from 'lucide-react';

interface BuildBuilderProps {
  onSelectItem?: (slot: EquipmentSlotType) => void;
  onSave?: (equipment: BuildEquipment) => void;
  onReset?: () => void;
  equipment?: BuildEquipment;
  className?: string;
}

export function BuildBuilder({
  onSelectItem,
  onSave,
  onReset,
  equipment: controlledEquipment,
  className,
}: BuildBuilderProps) {
  // Use controlled equipment or internal state
  const equipment = controlledEquipment ?? {
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

  // Check if offhand should be disabled (2H weapon equipped)
  const isOffhandDisabled = React.useMemo(() => {
    return isTwoHandedWeapon(equipment.mainhand);
  }, [equipment.mainhand]);

  const handleSelectSlot = (slot: EquipmentSlotType) => {
    if (slot === 'offhand' && isOffhandDisabled) return;
    onSelectItem?.(slot);
  };

  const handleReset = () => {
    onReset?.();
  };

  const handleSave = () => {
    onSave?.(equipment);
  };

  return (
    <Card className={cn('mx-auto w-full max-w-5xl', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Build Builder</CardTitle>
            <CardDescription>Create and customize your character build</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Build
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Main Equipment Grid */}
        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Equipment
          </h3>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-5">
            {/* Weapons Column */}
            <div className="space-y-3">
              <div className="text-center text-xs font-medium text-muted-foreground">Weapon</div>
              <div className="space-y-2">
                <EquipmentSlot
                  slot="mainhand"
                  item={equipment.mainhand}
                  onSelect={() => handleSelectSlot('mainhand')}
                  className="w-full"
                />
                <EquipmentSlot
                  slot="offhand"
                  item={equipment.offhand}
                  onSelect={() => handleSelectSlot('offhand')}
                  disabled={isOffhandDisabled}
                  className="w-full"
                />
              </div>
            </div>

            {/* Armor Column */}
            <div className="space-y-3">
              <div className="text-center text-xs font-medium text-muted-foreground">Armor</div>
              <div className="space-y-2">
                <EquipmentSlot
                  slot="head"
                  item={equipment.head}
                  onSelect={() => handleSelectSlot('head')}
                  className="w-full"
                />
                <EquipmentSlot
                  slot="armor"
                  item={equipment.armor}
                  onSelect={() => handleSelectSlot('armor')}
                  className="w-full"
                />
                <EquipmentSlot
                  slot="shoes"
                  item={equipment.shoes}
                  onSelect={() => handleSelectSlot('shoes')}
                  className="w-full"
                />
              </div>
            </div>

            {/* Accessories Column */}
            <div className="space-y-3">
              <div className="text-center text-xs font-medium text-muted-foreground">
                Accessories
              </div>
              <div className="space-y-2">
                <EquipmentSlot
                  slot="cape"
                  item={equipment.cape}
                  onSelect={() => handleSelectSlot('cape')}
                  className="w-full"
                />
                <EquipmentSlot
                  slot="bag"
                  item={equipment.bag}
                  onSelect={() => handleSelectSlot('bag')}
                  className="w-full"
                />
              </div>
            </div>

            {/* Mount Column */}
            <div className="space-y-3">
              <div className="text-center text-xs font-medium text-muted-foreground">Mount</div>
              <div className="space-y-2">
                <EquipmentSlot
                  slot="mount"
                  item={equipment.mount}
                  onSelect={() => handleSelectSlot('mount')}
                  className="w-full"
                />
              </div>
            </div>

            {/* Consumables Column */}
            <div className="space-y-3">
              <div className="text-center text-xs font-medium text-muted-foreground">
                Consumables
              </div>
              <div className="space-y-2">
                <EquipmentSlot
                  slot="potion"
                  item={equipment.potion}
                  onSelect={() => handleSelectSlot('potion')}
                  className="w-full"
                />
                <EquipmentSlot
                  slot="food"
                  item={equipment.food}
                  onSelect={() => handleSelectSlot('food')}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 2H Weapon Warning */}
        {isOffhandDisabled && (
          <div className="bg-primary/10 border-primary/30 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="text-primary mt-0.5">�</div>
              <div>
                <div className="text-primary text-sm font-medium">Two-Handed Weapon Equipped</div>
                <div className="text-muted-foreground text-xs">
                  Off-hand slot is disabled because you have a two-handed weapon equipped.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Equipment Summary */}
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="mb-2 text-sm font-medium">Equipment Summary</div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-5">
            {Object.entries(equipment).map(([slot, item]) => (
              <div key={slot} className="flex flex-col">
                <span className="text-muted-foreground capitalize">{slot}:</span>
                <span className={cn('font-medium', item ? 'text-foreground' : 'text-muted-foreground/50')}>
                  {item ? item.name : 'Empty'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

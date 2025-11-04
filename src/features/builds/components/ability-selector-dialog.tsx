'use client';

import { useState } from 'react';
import { AlbionItem, ItemAbility, SelectedItemAbilities } from '../types/builds.types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

interface AbilitySelectorDialogProps {
  item: AlbionItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (item: AlbionItem, abilities: SelectedItemAbilities) => void;
}

export function AbilitySelectorDialog({
  item,
  open,
  onOpenChange,
  onConfirm,
}: AbilitySelectorDialogProps) {
  const [selectedAbilities, setSelectedAbilities] = useState<{
    Q?: ItemAbility;
    W?: ItemAbility;
    E?: ItemAbility;
    passive?: ItemAbility;
  }>({});

  if (!item) return null;

  const availableAbilities = item.availableAbilities || [];
  const qAbilities = availableAbilities.filter((a) => a.slot === 'Q');
  const wAbilities = availableAbilities.filter((a) => a.slot === 'W');
  const eAbilities = availableAbilities.filter((a) => a.slot === 'E');
  const passives = availableAbilities.filter((a) => a.slot === 'passive');

  const hasAbilities = availableAbilities.length > 0;

  const handleAbilitySelect = (slot: 'Q' | 'W' | 'E' | 'passive', ability: ItemAbility) => {
    setSelectedAbilities((prev) => ({
      ...prev,
      [slot]: prev[slot]?.id === ability.id ? undefined : ability,
    }));
  };

  const handleConfirm = () => {
    const abilities: SelectedItemAbilities = {
      itemId: item.id,
      selectedAbilities,
    };
    onConfirm(item, abilities);
    onOpenChange(false);
    setSelectedAbilities({});
  };

  const handleSkip = () => {
    const abilities: SelectedItemAbilities = {
      itemId: item.id,
      selectedAbilities: {},
    };
    onConfirm(item, abilities);
    onOpenChange(false);
    setSelectedAbilities({});
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <img
              src={item.iconUrl}
              alt={item.localizedNames?.['EN-US'] || item.id}
              className="h-12 w-12 object-contain"
            />
            <div>
              <div>{item.localizedNames?.['EN-US'] || item.id}</div>
              <div className="text-sm text-gray-500 font-normal">
                Select abilities and passives
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        {!hasAbilities ? (
          <div className="py-8 text-center text-gray-500">
            This item has no selectable abilities.
          </div>
        ) : (
          <Tabs defaultValue="abilities" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="abilities">Abilities</TabsTrigger>
              <TabsTrigger value="passives">Passives</TabsTrigger>
            </TabsList>

            <TabsContent value="abilities" className="space-y-6 mt-4">
              {/* Q Slot */}
              {qAbilities.length > 0 && (
                <AbilitySlot
                  slot="Q"
                  abilities={qAbilities}
                  selected={selectedAbilities.Q}
                  onSelect={(ability) => handleAbilitySelect('Q', ability)}
                />
              )}

              {/* W Slot */}
              {wAbilities.length > 0 && (
                <AbilitySlot
                  slot="W"
                  abilities={wAbilities}
                  selected={selectedAbilities.W}
                  onSelect={(ability) => handleAbilitySelect('W', ability)}
                />
              )}

              {/* E Slot */}
              {eAbilities.length > 0 && (
                <AbilitySlot
                  slot="E"
                  abilities={eAbilities}
                  selected={selectedAbilities.E}
                  onSelect={(ability) => handleAbilitySelect('E', ability)}
                />
              )}
            </TabsContent>

            <TabsContent value="passives" className="space-y-4 mt-4">
              {passives.length === 0 ? (
                <div className="py-8 text-center text-gray-500">
                  No passives available for this item.
                </div>
              ) : (
                <AbilitySlot
                  slot="Passive"
                  abilities={passives}
                  selected={selectedAbilities.passive}
                  onSelect={(ability) => handleAbilitySelect('passive', ability)}
                />
              )}
            </TabsContent>
          </Tabs>
        )}

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={handleSkip}>
            Skip
          </Button>
          <Button onClick={handleConfirm} disabled={!hasAbilities}>
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface AbilitySlotProps {
  slot: string;
  abilities: ItemAbility[];
  selected?: ItemAbility;
  onSelect: (ability: ItemAbility) => void;
}

function AbilitySlot({ slot, abilities, selected, onSelect }: AbilitySlotProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="font-mono">
          {slot}
        </Badge>
        <span className="text-sm font-medium">
          {selected ? selected.name : `Select ${slot} ability`}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {abilities.map((ability) => (
          <AbilityCard
            key={ability.id}
            ability={ability}
            selected={selected?.id === ability.id}
            onSelect={() => onSelect(ability)}
          />
        ))}
      </div>
    </div>
  );
}

interface AbilityCardProps {
  ability: ItemAbility;
  selected: boolean;
  onSelect: () => void;
}

function AbilityCard({ ability, selected, onSelect }: AbilityCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`group relative flex flex-col gap-2 rounded-lg border-2 p-3 text-left transition-all hover:shadow-md ${
        selected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950'
          : 'border-gray-200 bg-white hover:border-gray-300 dark:border-gray-700 dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="font-medium">{ability.name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {ability.description}
          </div>
        </div>
        {selected && (
          <div className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
            ✓
          </div>
        )}
      </div>

      {(ability.cooldown || ability.energyCost) && (
        <div className="flex gap-3 text-xs text-gray-500">
          {ability.cooldown && <span>CD: {ability.cooldown}s</span>}
          {ability.energyCost && <span>Energy: {ability.energyCost}</span>}
        </div>
      )}
    </button>
  );
}

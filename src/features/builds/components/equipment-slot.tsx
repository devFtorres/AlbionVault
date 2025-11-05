'use client';

/**
 * Equipment Slot Component
 * Displays a single equipment slot with item preview
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import type { AlbionItem } from '@/src/types';
import type { EquipmentSlotType } from '../types/builds.types';
import { Sword, Shield, CircleHelp, Shirt, Footprints } from 'lucide-react';

interface EquipmentSlotProps {
  slot: EquipmentSlotType;
  item: AlbionItem | null;
  onSelect: () => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Get icon for equipment slot
 */
function getSlotIcon(slot: EquipmentSlotType): React.ReactNode {
  const iconClass = 'w-8 h-8 text-muted-foreground/30';

  switch (slot) {
    case 'mainhand':
      return <Sword className={iconClass} />;
    case 'offhand':
      return <Shield className={iconClass} />;
    case 'head':
      return <CircleHelp className={iconClass} />;
    case 'armor':
      return <Shirt className={iconClass} />;
    case 'shoes':
      return <Footprints className={iconClass} />;
    default:
      return <CircleHelp className={iconClass} />;
  }
}

/**
 * Format slot name for display
 */
function formatSlotName(slot: EquipmentSlotType): string {
  const names: Record<EquipmentSlotType, string> = {
    mainhand: 'Main Hand',
    offhand: 'Off Hand',
    head: 'Head',
    armor: 'Armor',
    shoes: 'Shoes',
    cape: 'Cape',
    bag: 'Bag',
    mount: 'Mount',
    potion: 'Potion',
    food: 'Food',
  };

  return names[slot];
}

export function EquipmentSlot({
  slot,
  item,
  onSelect,
  disabled = false,
  className,
}: EquipmentSlotProps) {
  const isEmpty = !item;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={onSelect}
          disabled={disabled}
          className={cn(
            // Base styles
            'group relative flex aspect-square w-full items-center justify-center rounded-lg border-2 transition-all',
            // Background
            'bg-card hover:bg-accent/5',
            // Border
            'border-border',
            // States
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
            // Hover effect
            !disabled && 'hover:border-primary/50 hover:shadow-md',
            // Disabled state
            disabled &&
              'cursor-not-allowed opacity-40 hover:border-border hover:bg-card hover:shadow-none',
            // Empty state
            isEmpty && 'border-dashed',
            // Has item
            !isEmpty && 'border-solid',
            className
          )}
          aria-label={`${formatSlotName(slot)} slot${item ? `: ${item.name}` : ' (empty)'}`}
        >
          {/* Empty slot icon */}
          {isEmpty && <div className="flex flex-col items-center gap-1">{getSlotIcon(slot)}</div>}

          {/* Item preview */}
          {!isEmpty && (
            <div className="flex h-full w-full flex-col items-center justify-center p-2">
              {/* Item icon placeholder - In a real app, you'd show actual item icon */}
              <div className="text-foreground flex h-full w-full items-center justify-center rounded bg-gradient-to-br from-primary/20 to-accent/20 text-xs font-medium">
                {item.tier}
              </div>
            </div>
          )}

          {/* Disabled overlay for offhand when 2H weapon equipped */}
          {disabled && slot === 'offhand' && (
            <div className="bg-destructive/10 absolute inset-0 flex items-center justify-center rounded-lg backdrop-blur-[1px]">
              <div className="text-destructive/80 rotate-45 text-2xl font-bold"></div>
            </div>
          )}
        </button>
      </TooltipTrigger>

      <TooltipContent side="right" className="max-w-xs">
        <div className="space-y-1">
          <div className="font-semibold">{formatSlotName(slot)}</div>
          {item ? (
            <>
              <div className="text-primary text-sm font-medium">{item.name}</div>
              <div className="text-muted-foreground text-xs">
                {item.tier}
                {item.enchantment > 0 && `.${item.enchantment}`}
              </div>
              {item.description && (
                <div className="text-muted-foreground mt-2 text-xs">{item.description}</div>
              )}
            </>
          ) : disabled ? (
            <div className="text-destructive text-xs">Cannot equip (2H weapon equipped)</div>
          ) : (
            <div className="text-muted-foreground text-xs">Click to select item</div>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { AlbionItem, ItemCategory, ItemTier } from '../types/builds.types';
import { useItems } from '../hooks/use-items';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface ItemSelectorProps {
  onItemSelect: (item: AlbionItem) => void;
  category?: ItemCategory;
  className?: string;
}

export function ItemSelector({ onItemSelect, category, className }: ItemSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const { items, loading, filters, updateFilters } = useItems(
    category ? { category } : {}
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  const toggleTierFilter = (tier: ItemTier) => {
    updateFilters({ tier: filters.tier === tier ? undefined : tier });
  };

  const toggleEnchantmentFilter = (enchantment: 0 | 1 | 2 | 3 | 4) => {
    updateFilters({
      enchantment: filters.enchantment === enchantment ? undefined : enchantment,
    });
  };

  const filteredItems = items.slice(0, 100); // Limit display

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* Search and Filters */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Tier</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[4, 5, 6, 7, 8].map((tier) => (
              <DropdownMenuCheckboxItem
                key={tier}
                checked={filters.tier === tier}
                onCheckedChange={() => toggleTierFilter(tier as ItemTier)}
              >
                Tier {tier}
              </DropdownMenuCheckboxItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuLabel>Enchantment</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[0, 1, 2, 3, 4].map((enchant) => (
              <DropdownMenuCheckboxItem
                key={enchant}
                checked={filters.enchantment === enchant}
                onCheckedChange={() =>
                  toggleEnchantmentFilter(enchant as 0 | 1 | 2 | 3 | 4)
                }
              >
                {enchant === 0 ? 'No Enchantment' : `.${enchant}`}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto">
        {loading ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            Loading items...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No items found
          </div>
        ) : (
          filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} onClick={() => onItemSelect(item)} />
          ))
        )}
      </div>

      {items.length > 100 && (
        <div className="text-center text-sm text-gray-500">
          Showing 100 of {items.length} items. Use filters to narrow down results.
        </div>
      )}
    </div>
  );
}

interface ItemCardProps {
  item: AlbionItem;
  onClick: () => void;
}

function ItemCard({ item, onClick }: ItemCardProps) {
  const tierColors: Record<number, string> = {
    1: 'border-gray-500',
    2: 'border-gray-500',
    3: 'border-gray-500',
    4: 'border-blue-500',
    5: 'border-green-500',
    6: 'border-purple-500',
    7: 'border-orange-500',
    8: 'border-red-500',
  };
  const tierColor = tierColors[item.tier] || 'border-gray-500';

  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-2 rounded-lg border-2 ${tierColor} bg-white p-3 transition-all hover:scale-105 hover:shadow-lg dark:bg-gray-800`}
    >
      {/* Item Icon */}
      <div className="relative h-16 w-16">
        <img
          src={item.iconUrl}
          alt={item.localizedNames?.['EN-US'] || item.id}
          className="h-full w-full object-contain"
          onError={(e) => {
            // Fallback to placeholder if image fails to load
            e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64"%3E%3Crect fill="%23ddd" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3E?%3C/text%3E%3C/svg%3E';
          }}
        />
        {item.enchantment > 0 && (
          <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-white">
            {item.enchantment}
          </div>
        )}
      </div>

      {/* Item Name */}
      <div className="text-xs text-center font-medium line-clamp-2">
        {item.localizedNames?.['EN-US'] || item.id}
      </div>

      {/* Tier Badge */}
      <div className="text-xs font-semibold text-gray-500">T{item.tier}</div>
    </button>
  );
}

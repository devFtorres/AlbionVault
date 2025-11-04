'use client';

import { useState } from 'react';
import { Build } from '../types/builds.types';
import { useBuildStore } from '../stores/build-store';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Edit, Trash2, Copy, Star } from 'lucide-react';
import { format } from 'date-fns';

export function BuildList() {
  const { builds, deleteBuild, duplicateBuild, toggleFavorite } = useBuildStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBuilds = builds.filter((build) => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      build.name.toLowerCase().includes(search) ||
      build.description?.toLowerCase().includes(search) ||
      build.tags?.some((tag) => tag.toLowerCase().includes(search))
    );
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this build?')) {
      deleteBuild(id);
    }
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Builds</h1>
        <Badge variant="outline">{builds.length} builds</Badge>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search builds..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Builds Grid */}
      {filteredBuilds.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            {searchTerm
              ? 'No builds found matching your search'
              : 'No builds yet. Create your first build!'}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBuilds.map((build) => (
            <BuildCard
              key={build.id}
              build={build}
              onDelete={() => handleDelete(build.id)}
              onDuplicate={() => duplicateBuild(build.id)}
              onToggleFavorite={() => toggleFavorite(build.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface BuildCardProps {
  build: Build;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleFavorite: () => void;
}

function BuildCard({ build, onDelete, onDuplicate, onToggleFavorite }: BuildCardProps) {
  const equipmentCount =
    [
      build.equipment.weapon,
      build.equipment.helmet,
      build.equipment.armor,
      build.equipment.boots,
      build.equipment.cape,
      build.equipment.offHand,
      build.equipment.bag,
      build.equipment.mount,
    ].filter(Boolean).length;

  const consumablesCount = [build.consumables.food, build.consumables.potion].filter(
    Boolean
  ).length;

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg">{build.name}</h3>
              {build.isFavorite && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />}
            </div>
            {build.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                {build.description}
              </p>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onToggleFavorite}>
                <Star className="h-4 w-4 mr-2" />
                {build.isFavorite ? 'Unfavorite' : 'Favorite'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Equipment Preview */}
        <div className="flex gap-2 flex-wrap">
          {build.equipment.weapon && (
            <ItemPreview item={build.equipment.weapon} />
          )}
          {build.equipment.helmet && (
            <ItemPreview item={build.equipment.helmet} />
          )}
          {build.equipment.armor && (
            <ItemPreview item={build.equipment.armor} />
          )}
          {build.equipment.boots && (
            <ItemPreview item={build.equipment.boots} />
          )}
        </div>

        {/* Stats */}
        <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
          <span>{equipmentCount} equipment</span>
          <span>{consumablesCount} consumables</span>
        </div>

        {/* Tags */}
        {build.tags && build.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {build.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="text-xs text-gray-500 pt-2 border-t">
          Updated {format(new Date(build.updatedAt), 'MMM dd, yyyy')}
        </div>
      </div>
    </Card>
  );
}

interface ItemPreviewProps {
  item: any;
}

function ItemPreview({ item }: ItemPreviewProps) {
  return (
    <div className="relative h-12 w-12 rounded border-2 border-gray-200 dark:border-gray-700 p-1">
      <img
        src={item.iconUrl}
        alt={item.localizedNames?.['EN-US'] || item.id}
        className="h-full w-full object-contain"
      />
      {item.enchantment > 0 && (
        <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-[10px] font-bold text-white">
          {item.enchantment}
        </div>
      )}
    </div>
  );
}

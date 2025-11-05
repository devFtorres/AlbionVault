'use client';

/**
 * Build Stats Display Component
 * Shows calculated statistics for the current build
 */

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BuildEquipment } from '../types/builds.types';
import { calculateBuildStats, formatStatValue } from '../utils/build-calculator';
import { Swords, Shield, Zap, Heart, Activity, TrendingUp } from 'lucide-react';

interface BuildStatsProps {
  equipment: BuildEquipment;
  className?: string;
}

interface StatItemProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  highlight?: boolean;
}

function StatItem({ label, value, icon, highlight }: StatItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        {icon && <span className="text-muted-foreground/50">{icon}</span>}
        <span>{label}</span>
      </div>
      <span
        className={cn(
          'text-sm font-medium',
          highlight && 'text-primary'
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function BuildStats({ equipment, className }: BuildStatsProps) {
  const stats = React.useMemo(() => calculateBuildStats(equipment), [equipment]);

  const hasAnyEquipment = Object.values(equipment).some((item) => item !== null);

  if (!hasAnyEquipment) {
    return (
      <Card className={cn('w-full', className)}>
        <CardHeader>
          <CardTitle>Build Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            Equip items to see statistics
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>Build Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Item Power Summary */}
        <div className="border-b pb-4">
          <div className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Item Power
          </div>
          <div className="space-y-2">
            <StatItem
              label="Total IP"
              value={stats.totalItemPower.toLocaleString()}
              icon={<TrendingUp className="h-4 w-4" />}
              highlight
            />
            <StatItem
              label="Average IP"
              value={stats.averageItemPower.toLocaleString()}
              icon={<Activity className="h-4 w-4" />}
            />
          </div>
        </div>

        {/* Offense Stats */}
        <div className="border-b pb-4">
          <div className="mb-3 flex items-center gap-2">
            <Swords className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Offense
            </span>
          </div>
          <div className="space-y-2">
            <StatItem label="Damage" value={stats.offense.damage} />
            <StatItem
              label="Attack Speed"
              value={`${stats.offense.attackSpeed.toFixed(2)}s`}
            />
            <StatItem
              label="Crit Chance"
              value={formatStatValue(stats.offense.critChance, 'percentage')}
            />
            <StatItem
              label="Crit Damage"
              value={`${(stats.offense.critDamage * 100).toFixed(0)}%`}
            />
          </div>
        </div>

        {/* Defense Stats */}
        <div className="border-b pb-4">
          <div className="mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Defense
            </span>
          </div>
          <div className="space-y-2">
            <StatItem label="Armor" value={stats.defense.armor} />
            <StatItem label="Magic Resist" value={stats.defense.magicResist} />
            <StatItem
              label="Health"
              value={stats.defense.health.toLocaleString()}
              icon={<Heart className="h-4 w-4" />}
            />
            <StatItem
              label="Health Regen"
              value={`${stats.defense.healthRegen}/s`}
            />
          </div>
        </div>

        {/* Utility Stats */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Utility
            </span>
          </div>
          <div className="space-y-2">
            <StatItem label="Move Speed" value={`${stats.utility.moveSpeed}%`} />
            <StatItem
              label="CDR"
              value={formatStatValue(stats.utility.cooldownReduction, 'percentage')}
            />
            <StatItem
              label="Energy Cost"
              value={formatStatValue(stats.utility.energyCost, 'percentage')}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Compact PlayerCard component
 * Componente PlayerCard compacto reutilizável
 */

'use client';

import Link from 'next/link';
import { User, Shield, Skull, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Player, PlayerSearchResult } from '@/types/player.types';
import { cn, formatNumber, formatFameRatio } from '@/lib/utils';

export interface PlayerCardCompactProps {
  player: PlayerSearchResult | Player;
  className?: string;
  showStats?: boolean;
}

export function PlayerCardCompact({
  player,
  className,
  showStats = true,
}: PlayerCardCompactProps) {
  const killFame = player.killFame || 0;
  const deathFame = player.deathFame || 0;
  const fameRatio =
    'fameRatio' in player
      ? player.fameRatio
      : parseFloat(formatFameRatio(killFame, deathFame));

  return (
    <Link href={`/players/${player.name}`}>
      <Card
        className={cn(
          'transition-all hover:shadow-md hover:border-primary/50',
          className
        )}
      >
        <CardContent className="flex items-center gap-4 p-4">
          <Avatar className="h-12 w-12">
            <AvatarImage
              src={
                'avatar' in player
                  ? player.avatar
                  : `/api/placeholder/avatar/${player.name}`
              }
              alt={player.name}
            />
            <AvatarFallback>
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold truncate">{player.name}</h3>
              {fameRatio > 2 && (
                <TrendingUp className="h-4 w-4 text-green-500" />
              )}
            </div>

            {(player.guildName || player.allianceName) && (
              <div className="flex items-center gap-1 mt-1">
                {player.guildName && (
                  <Badge variant="secondary" className="text-xs">
                    <Shield className="h-3 w-3 mr-1" />
                    {player.guildName}
                  </Badge>
                )}
                {player.allianceName && (
                  <Badge variant="outline" className="text-xs">
                    {player.allianceName}
                  </Badge>
                )}
              </div>
            )}

            {showStats && (
              <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="text-green-500">
                    {formatNumber(killFame)}
                  </span>
                  <span>Kill Fame</span>
                </div>
                <div className="flex items-center gap-1">
                  <Skull className="h-3 w-3" />
                  <span className="text-red-500">
                    {formatNumber(deathFame)}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold">
                    {formatFameRatio(killFame, deathFame)}
                  </span>
                  <span>K/D</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

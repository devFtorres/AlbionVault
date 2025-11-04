/**
 * Player details page
 * Pagina de detalhes do jogador
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  User,
  Shield,
  Skull,
  TrendingUp,
  Heart,
  Award,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePlayer } from '@/hooks';
import { useFavoritesStore } from '@/store';
import {
  formatNumber,
  formatFameRatio,
  formatRelativeTime,
} from '@/lib/utils';

export default function PlayerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const playerName = params?.name as string;

  const [activeTab, setActiveTab] = useState('overview');

  const {
    player,
    playerLoading,
    playerError,
    getPlayer,
    kills,
    killsLoading,
    getPlayerKills,
    deaths,
    deathsLoading,
    getPlayerDeaths,
    searchPlayer,
  } = usePlayer();

  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const isPlayerFavorite = player ? isFavorite(player.id) : false;

  // Search for player by name first, then get details
  useEffect(() => {
    if (playerName) {
      const fetchPlayer = async () => {
        try {
          // Search for player by name
          const results = await searchPlayer(decodeURIComponent(playerName));
          if (results && results.length > 0) {
            // Get full player details
            await getPlayer(results[0].id);
          }
        } catch (error) {
          console.error('Error fetching player:', error);
        }
      };

      fetchPlayer();
    }
  }, [playerName, searchPlayer, getPlayer]);

  // Load kills and deaths when switching tabs
  useEffect(() => {
    if (player && activeTab === 'kills' && !kills) {
      getPlayerKills(player.id, { limit: 20 });
    }
    if (player && activeTab === 'deaths' && !deaths) {
      getPlayerDeaths(player.id, { limit: 20 });
    }
  }, [activeTab, player, kills, deaths, getPlayerKills, getPlayerDeaths]);

  const handleToggleFavorite = () => {
    if (!player) return;

    if (isPlayerFavorite) {
      removeFavorite(player.id);
    } else {
      addFavorite({
        id: player.id,
        type: 'player',
        name: player.name,
        metadata: {
          guildName: player.guildName,
          killFame: player.killFame,
        },
      });
    }
  };

  if (playerLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (playerError || !player) {
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {playerError || 'Player not found'}
          </AlertDescription>
        </Alert>
        <Button onClick={() => router.push('/players')} className="mt-4">
          Back to Search
        </Button>
      </div>
    );
  }

  const killFame = player.killFame || 0;
  const deathFame = player.deathFame || 0;

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Player Header */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={player.avatar} alt={player.name} />
              <AvatarFallback>
                <User className="h-12 w-12" />
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{player.name}</h1>
                  <div className="flex items-center gap-2">
                    {player.guildName && (
                      <Badge variant="secondary" className="text-sm">
                        <Shield className="h-4 w-4 mr-1" />
                        {player.guildName}
                      </Badge>
                    )}
                    {player.allianceName && (
                      <Badge variant="outline" className="text-sm">
                        {player.allianceName}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant={isPlayerFavorite ? 'default' : 'outline'}
                  size="sm"
                  onClick={handleToggleFavorite}
                >
                  <Heart
                    className={`h-4 w-4 mr-2 ${isPlayerFavorite ? 'fill-current' : ''}`}
                  />
                  {isPlayerFavorite ? 'Favorited' : 'Add to Favorites'}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Kill Fame</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {formatNumber(killFame)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Death Fame</CardTitle>
            <Skull className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {formatNumber(deathFame)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">K/D Ratio</CardTitle>
            <Award className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatFameRatio(killFame, deathFame)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Kills</CardTitle>
            <Skull className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{player.totalKills || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kills">Kills</TabsTrigger>
          <TabsTrigger value="deaths">Deaths</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Player Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Guild</p>
                    <p className="font-medium">
                      {player.guildName || 'No Guild'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Alliance</p>
                    <p className="font-medium">
                      {player.allianceName || 'No Alliance'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GvG Kills</p>
                    <p className="font-medium">{player.gvgKills || 0}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GvG Won</p>
                    <p className="font-medium">{player.gvgWon || 0}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kills">
          <Card>
            <CardHeader>
              <CardTitle>Recent Kills</CardTitle>
            </CardHeader>
            <CardContent>
              {killsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : kills && kills.length > 0 ? (
                <div className="space-y-4">
                  {kills.map((kill) => (
                    <div
                      key={kill.eventId}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{kill.victim.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {kill.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          {formatNumber(kill.totalVictimKillFame)} fame
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(kill.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No recent kills found
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deaths">
          <Card>
            <CardHeader>
              <CardTitle>Recent Deaths</CardTitle>
            </CardHeader>
            <CardContent>
              {deathsLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : deaths && deaths.length > 0 ? (
                <div className="space-y-4">
                  {deaths.map((death) => (
                    <div
                      key={death.eventId}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{death.killer.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {death.location}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm">
                          {formatNumber(death.totalVictimKillFame)} fame lost
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(death.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  No recent deaths found
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

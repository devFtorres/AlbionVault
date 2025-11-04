/**
 * Players search and listing page
 * Página de busca e listagem de jogadores
 */

'use client';

import { useState, useCallback } from 'react';
import { Users, AlertCircle, Search as SearchIcon } from 'lucide-react';
import { SearchBar } from '@/components/shared/search-bar';
import { PlayerCardCompact } from '@/components/shared/player-card-compact';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { usePlayer } from '@/hooks';
import { useSearchHistoryStore } from '@/store';

export default function PlayersPage() {
  const [hasSearched, setHasSearched] = useState(false);
  const { searchResults, searchLoading, searchError, searchPlayer } =
    usePlayer();
  const addToHistory = useSearchHistoryStore((state) => state.addToHistory);
  const recentSearches = useSearchHistoryStore((state) =>
    state.getHistoryByType('player')
  );

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query || query.trim().length === 0) {
        setHasSearched(false);
        return;
      }

      setHasSearched(true);
      try {
        const results = await searchPlayer(query);

        // Add to search history
        if (results && results.length > 0) {
          addToHistory({
            type: 'player',
            query,
            resultName: results[0].name,
          });
        }
      } catch (error) {
        console.error('Search error:', error);
      }
    },
    [searchPlayer, addToHistory]
  );

  const handleClear = useCallback(() => {
    setHasSearched(false);
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Player Search</h1>
        </div>
        <p className="text-muted-foreground">
          Search for Albion Online players and view their stats
        </p>
      </div>

      <div className="mb-8">
        <SearchBar
          placeholder="Search for players..."
          onSearch={handleSearch}
          onClear={handleClear}
          loading={searchLoading}
          autoFocus
          className="max-w-2xl"
        />
      </div>

      {/* Recent searches */}
      {!hasSearched && recentSearches.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Recent Searches</h2>
          <div className="flex flex-wrap gap-2">
            {recentSearches.slice(0, 5).map((search) => (
              <button
                key={search.id}
                onClick={() => handleSearch(search.query)}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-md text-sm transition-colors"
              >
                {search.resultName || search.query}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search results */}
      {hasSearched && (
        <div>
          {searchError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}

          {!searchLoading && searchResults && searchResults.length === 0 && (
            <Alert className="mb-6">
              <SearchIcon className="h-4 w-4" />
              <AlertTitle>No results found</AlertTitle>
              <AlertDescription>
                Try adjusting your search query or check the spelling.
              </AlertDescription>
            </Alert>
          )}

          {searchResults && searchResults.length > 0 && (
            <div>
              <div className="mb-4 text-sm text-muted-foreground">
                Found {searchResults.length} player
                {searchResults.length !== 1 ? 's' : ''}
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {searchResults.map((player) => (
                  <PlayerCardCompact key={player.id} player={player} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!hasSearched && recentSearches.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Search for Albion Online Players
          </h3>
          <p className="text-muted-foreground max-w-md">
            Enter a player name in the search bar above to find their stats,
            kills, deaths, and more.
          </p>
        </div>
      )}
    </div>
  );
}

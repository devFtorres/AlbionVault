/**
 * Application route constants
 */

export const ROUTES = {
  // Public routes
  home: '/',
  about: '/about',

  // Dashboard
  dashboard: '/dashboard',

  // Players
  players: '/players',
  playerDetail: (name: string) => `/players/${encodeURIComponent(name)}`,

  // Guilds
  guilds: '/guilds',
  guildDetail: (id: string) => `/guilds/${id}`,

  // Economy
  economy: '/economy',

  // Stats
  stats: '/stats',

  // Build Builder
  builds: '/builds',
  buildDetail: (id: string) => `/builds/${id}`,
  buildCreate: '/builds/new',

  // API routes
  api: {
    player: '/api/albion/player',
    guild: '/api/albion/guild',
    stats: '/api/stats',
    items: '/api/albion/items',
    prices: '/api/albion/prices',
  },
} as const;

/**
 * Navigation items for the main menu
 */
export const NAVIGATION_ITEMS = [
  {
    name: 'Dashboard',
    href: ROUTES.dashboard,
    icon: 'LayoutDashboard',
  },
  {
    name: 'Players',
    href: ROUTES.players,
    icon: 'Users',
  },
  {
    name: 'Guilds',
    href: ROUTES.guilds,
    icon: 'Shield',
  },
  {
    name: 'Economy',
    href: ROUTES.economy,
    icon: 'TrendingUp',
  },
  {
    name: 'Build Builder',
    href: ROUTES.builds,
    icon: 'Hammer',
  },
  {
    name: 'Stats',
    href: ROUTES.stats,
    icon: 'BarChart3',
  },
] as const;

/**
 * Breadcrumb helper
 */
export const getBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment.charAt(0).toUpperCase() + segment.slice(1);

    return { href, label };
  });
};

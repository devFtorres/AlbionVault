'use client';

/**
 * Navigation Component
 * Main navigation menu
 */

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { NAVIGATION_ITEMS } from '@/src/lib/constants/routes';
import {
  LayoutDashboard,
  Users,
  Shield,
  TrendingUp,
  Hammer,
  BarChart3,
} from 'lucide-react';

const iconMap = {
  LayoutDashboard,
  Users,
  Shield,
  TrendingUp,
  Hammer,
  BarChart3,
};

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1">
      {NAVIGATION_ITEMS.map((item) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
              'hover:bg-accent hover:text-accent-foreground',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isActive
                ? 'bg-accent text-accent-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            <span className="hidden md:inline">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}

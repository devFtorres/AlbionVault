/**
 * Footer Component
 * Application footer
 */

import * as React from 'react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <div className="flex items-center gap-2 font-bold">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-xs text-primary-foreground">
              AV
            </div>
            <span>AlbionVault</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} AlbionVault. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          <Link
            href="/about"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            About
          </Link>
          <Link
            href="/players"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Players
          </Link>
          <Link
            href="/guilds"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Guilds
          </Link>
          <Link
            href="/builds"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Builds
          </Link>
        </nav>
      </div>
    </footer>
  );
}

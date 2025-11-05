/**
 * Sidebar Component
 * Optional sidebar for dashboard layout
 */

import * as React from 'react';

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 border-r bg-background">
      <div className="flex h-full flex-col gap-4 p-4">
        <div className="flex-1">
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Quick Links
          </h3>
          {/* Sidebar content can be added here */}
        </div>
      </div>
    </aside>
  );
}

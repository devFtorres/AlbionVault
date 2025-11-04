import { BuildList } from '@/features/builds/components/build-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export const metadata = {
  title: 'My Builds - AlbionVault',
  description: 'View and manage your Albion Online builds',
};

export default function BuildsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Build Builder</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Create and manage your Albion Online character builds
            </p>
          </div>
          <Link href="/builds/new">
            <Button size="lg" className="gap-2">
              <Plus className="h-5 w-5" />
              New Build
            </Button>
          </Link>
        </div>

        <BuildList />
      </div>
    </div>
  );
}

import { BuildBuilder } from '@/features/builds/components/build-builder';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Create New Build - AlbionVault',
  description: 'Create a new Albion Online build',
};

export default function NewBuildPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <Link href="/builds">
            <Button variant="ghost" className="gap-2 mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to Builds
            </Button>
          </Link>
          <h1 className="text-4xl font-bold">Create New Build</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Build your perfect Albion Online character setup
          </p>
        </div>

        <BuildBuilder />
      </div>
    </div>
  );
}

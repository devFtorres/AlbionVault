import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Shield, TrendingUp, Hammer, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto py-12">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center space-y-6 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Welcome to <span className="text-primary">AlbionVault</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Your ultimate companion for Albion Online. Track player stats, manage guilds,
            analyze the economy, and create optimal character builds.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link href="/builds">
            <Button size="lg" className="w-full sm:w-auto">
              <Hammer className="mr-2 h-5 w-5" />
              Build Creator
            </Button>
          </Link>
          <Link href="/players">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Users className="mr-2 h-5 w-5" />
              Search Players
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <Users className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Player Stats</CardTitle>
            <CardDescription>
              Track detailed player statistics, equipment, and progression history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/players">
              <Button variant="outline" size="sm">
                View Players
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Shield className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Guild Management</CardTitle>
            <CardDescription>
              Monitor guild members, territories, and overall performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/guilds">
              <Button variant="outline" size="sm">
                View Guilds
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <TrendingUp className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Economy Tracker</CardTitle>
            <CardDescription>
              Analyze market trends, item prices, and trading opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/economy">
              <Button variant="outline" size="sm">
                View Economy
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Hammer className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Build Creator</CardTitle>
            <CardDescription>
              Design and optimize character builds with our interactive builder
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/builds">
              <Button variant="outline" size="sm">
                Create Build
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BarChart3 className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>Statistics</CardTitle>
            <CardDescription>
              View comprehensive stats and analytics for better gameplay decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/stats">
              <Button variant="outline" size="sm">
                View Stats
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="mb-2 h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
              AV
            </div>
            <CardTitle>More Coming Soon</CardTitle>
            <CardDescription>
              We're constantly adding new features to enhance your Albion experience
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-8 text-center">
        <h2 className="text-2xl font-bold">Ready to get started?</h2>
        <p className="max-w-md text-muted-foreground">
          Explore all features and take your Albion Online gameplay to the next level
        </p>
        <Link href="/dashboard">
          <Button size="lg">
            Go to Dashboard
          </Button>
        </Link>
      </section>
    </div>
  );
}

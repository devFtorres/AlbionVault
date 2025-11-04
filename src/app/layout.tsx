import type { Metadata } from 'next'
import './globals.css'
import { Navigation } from '@/components/layout/navigation'

export const metadata: Metadata = {
  title: 'AlbionVault - Albion Online Stats & Build Builder',
  description: 'Albion Online stats, guild management, and build builder platform',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  )
}

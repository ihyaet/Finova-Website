import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistPixelSquare } from 'geist/font/pixel'
import './globals.css'
import { AnnouncementRibbon } from '@/components/layout/AnnouncementRibbon'
import { Navbar } from '@/components/layout/Navbar'

export const metadata: Metadata = {
  title: 'Finova — Financial Infrastructure for Modern Teams',
  description:
    'AI-powered financial infrastructure for fintech startups, consultants, and investment firms.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistPixelSquare.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base">
        <AnnouncementRibbon />
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
      </body>
    </html>
  )
}

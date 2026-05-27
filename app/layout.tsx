import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistPixelSquare } from 'geist/font/pixel'
import './globals.css'
import { AnnouncementRibbon } from '@/components/layout/AnnouncementRibbon'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { LenisContextProvider } from '@/components/providers/LenisContext'
import { SmoothScroll } from '@/components/providers/SmoothScroll'

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
        <LenisContextProvider>
          <SmoothScroll>
            <div className="w-full flex flex-col min-h-screen">
              <AnnouncementRibbon />
              <Navbar />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </LenisContextProvider>
      </body>
    </html>
  )
}

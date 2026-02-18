import type { Metadata } from 'next'
import { Inter, Press_Start_2P } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/sonner";
import JsonLd from '@/components/JsonLd';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.ttf',
  variable: '--font-mono',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
})

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel',
  display: 'swap',
})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://www.clasely.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'SnipieAI - The #1 No-Subscription AI Video Clipper',
    template: '%s | SnipieAI'
  },
  description: 'The best local, no-subscription alternative to Opus Clip. SnipieAI runs 100% offline on your device. Pay once, use forever. Create viral shorts with AI.',
  keywords: ['Opus Clip alternative', 'no subscription AI clipper', 'local video AI', 'offline video clipper', 'AI tools', 'video creation', 'SnipieAI', 'lifetime license', 'AI clipping', 'automatic video editor', 'free AI clipper'],
  authors: [{ name: 'SnipieAI Team' }],
  creator: 'SnipieAI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'SnipieAI - No Subscription AI Clipper',
    description: 'Stop paying monthly fees. SnipieAI is the local, offline, one-time payment alternative to Opus Clip. Viral shorts in seconds.',
    siteName: 'SnipieAI',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SnipieAI Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnipieAI - No Subscription AI Clipper',
    description: 'The best local alternative to Opus Clip. No monthly fees. 100% Offline privacy.',
    images: ['/logo.png'],
    creator: '@clipieeexplore',
  },
  icons: {
    icon: [
      { url: '/logo.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart2P.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="font-sans bg-background text-foreground overflow-x-hidden">
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}

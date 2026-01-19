import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import SmoothScroll from '@/components/providers/SmoothScroll';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from "@/components/ui/sonner";
import JsonLd from '@/components/JsonLd';

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.ttf',
  variable: '--font-mono',
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
    default: 'Clasely - Clipiee: The #1 No-Subscription AI Video Clipper',
    template: '%s | Clasely'
  },
  description: 'The best local, no-subscription alternative to Opus Clip. Clipiee runs 100% offline on your device. Pay once, use forever. Create viral shorts with AI.',
  keywords: ['Opus Clip alternative', 'no subscription AI clipper', 'local video AI', 'offline video clipper', 'AI tools', 'video creation', 'Clipiee', 'lifetime license', 'AI clipping', 'automatic video editor', 'free AI clipper'],
  authors: [{ name: 'Clasely Team' }],
  creator: 'Clasely',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Clasely - Clipiee: No Subscription AI Clipper',
    description: 'Stop paying monthly fees. Clipiee is the local, offline, one-time payment alternative to Opus Clip. Viral shorts in seconds.',
    siteName: 'Clasely',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Clasely - Clipiee Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clasely - Clipiee: No Subscription AI Clipper',
    description: 'The best local alternative to Opus Clip. No monthly fees. 100% Offline privacy.',
    images: ['/icon.png'],
    creator: '@claselyexplore',
  },
  icons: {
    icon: '/icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable} suppressHydrationWarning>
      <body className="font-mono bg-background text-foreground">
        <JsonLd />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>{children}</SmoothScroll>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

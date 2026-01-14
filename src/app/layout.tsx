import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.ttf',
  variable: '--font-mono',
  display: 'swap',
})

// Define the base URL relative to the environment
const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  ? `https://${process.env.NEXT_PUBLIC_APP_URL}`
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Clasely - Build without limits',
    template: '%s | Clasely'
  },
  description: 'AI-powered efficiency tools for the next generation of creators. Home of Clipiee and the lifetime license ecosystem.',
  keywords: ['AI tools', 'video creation', 'productivity', 'Clipiee', 'lifetime license', 'creator economy'],
  authors: [{ name: 'Clasely Team' }],
  creator: 'Clasely',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'Clasely - Build without limits',
    description: 'AI-powered efficiency tools for the next generation of creators. Pay once, use forever.',
    siteName: 'Clasely',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Clasely Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clasely - Build without limits',
    description: 'AI-powered efficiency tools. Home of Clipiee.',
    images: ['/icon.png'],
    creator: '@claselyexplore',
  },
  icons: {
    icon: '/icon.png',
  },
}

import SmoothScroll from '@/components/providers/SmoothScroll';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-background text-foreground">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  )
}

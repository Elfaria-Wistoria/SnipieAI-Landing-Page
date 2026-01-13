import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.ttf',
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clipiee | Auto Clip Long Videos',
  description: 'AI-powered video clipping software. Buy once, use forever.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono bg-background text-foreground">{children}</body>
    </html>
  )
}

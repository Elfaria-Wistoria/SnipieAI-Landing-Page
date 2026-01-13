import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const jetbrainsMono = localFont({
  src: './fonts/JetBrainsMono-Regular.ttf',
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clasely',
  description: 'AI-powered efficiency tools. Home of Clipiee.',
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

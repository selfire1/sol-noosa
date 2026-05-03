import type { Metadata } from 'next'
import { Caladea, Cabin, Caveat } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import Providers from '@/lib/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

const caladea = Caladea({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-caladea',
})

const cabin = Cabin({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cabin',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
})

export const metadata: Metadata = {
  title: 'Sol Noosa Car Rentals — easy car hire in Noosa',
  description:
    'Locally-owned car hire on the Sunshine Coast. Honest pricing, easy airport pickup, real humans on call.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={cn(
        'h-full',
        'antialiased',
        'font-sans',
        caladea.variable,
        cabin.variable,
        caveat.variable
      )}
    >
      <Providers>
        <body className="min-h-full flex flex-col">
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  )
}

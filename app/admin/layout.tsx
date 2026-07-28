import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

import { Button } from '@/components/ui/button'
import { hasValidSession } from '@/lib/auth'
import { logout } from '@/lib/auth/actions'

export const metadata: Metadata = {
  title: 'Sol Noosa Admin',
  robots: { index: false, follow: false },
}

async function AdminNav() {
  const authed = await hasValidSession()
  if (!authed) {
    return null
  }
  return (
    <nav className="flex items-center gap-1.5">
      <Button asChild variant="ghost" size="lg" className="h-11">
        <Link href="/admin/fleet">Fleet</Link>
      </Button>
      <Button asChild variant="ghost" size="lg" className="h-11">
        <Link href="/admin/enquiries">Enquiries</Link>
      </Button>
      <form action={logout}>
        <Button type="submit" variant="outline" size="lg" className="h-11">
          Log out
        </Button>
      </form>
    </nav>
  )
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="min-h-dvh w-full bg-sol-cream flex flex-col">
      <header className="border-b border-sol-beige-deep bg-sol-paper">
        <div className="page-container flex items-center justify-between gap-3 py-3">
          <Link href="/admin" className="font-display font-bold text-lg text-sol-brown-deep">
            Sol Noosa <span className="text-sol-yellow">Admin</span>
          </Link>
          <Suspense fallback={null}>
            <AdminNav />
          </Suspense>
        </div>
      </header>
      <main className="page-container flex-1 py-6 w-full">
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </div>
  )
}

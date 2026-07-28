import Link from 'next/link'

import { requireAdmin } from '@/lib/auth'

const sections = [
  {
    href: '/admin/fleet',
    title: 'Fleet',
    description: 'Add, edit, reorder and publish your cars.',
  },
  {
    href: '/admin/enquiries',
    title: 'Enquiries',
    description: 'Read messages sent through the contact form.',
  },
]

export default async function AdminHomePage() {
  await requireAdmin()
  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <h1 className="font-display font-bold text-2xl text-sol-brown-deep">G’day 👋</h1>
      <div className="grid gap-4">
        {sections.map((section) => {
          return (
            <Link
              key={section.href}
              href={section.href}
              className="block rounded-2xl border border-sol-beige-deep bg-sol-paper p-5 shadow-xs hover:shadow-md active:translate-y-px transition-all"
            >
              <div className="font-bold text-lg text-sol-brown-deep">{section.title}</div>
              <p className="text-sm text-sol-brown-soft">{section.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

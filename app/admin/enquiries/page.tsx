import { desc } from 'drizzle-orm'

import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { enquiries } from '@/lib/db/schema'

const formatReceived = (receivedAt: Date): string => {
  return new Intl.DateTimeFormat('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Australia/Brisbane',
  }).format(receivedAt)
}

export default async function AdminEnquiriesPage() {
  await requireAdmin()
  const rows = await db.query.enquiries.findMany({ orderBy: [desc(enquiries.receivedAt)] })

  return (
    <div className="max-w-xl mx-auto w-full space-y-5">
      <h1 className="font-display font-bold text-2xl text-sol-brown-deep">Enquiries</h1>

      {rows.length === 0 && (
        <p className="text-sol-brown-soft text-sm rounded-2xl border border-sol-beige-deep bg-sol-paper p-5">
          No enquiries yet — messages from the contact form will show up here.
        </p>
      )}

      <ul className="space-y-4">
        {rows.map((enquiry) => {
          return (
            <li
              key={enquiry.id}
              className="rounded-2xl border border-sol-beige-deep bg-sol-paper p-5 space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="font-bold text-sol-brown-deep">{enquiry.fullName}</div>
                <time className="text-xs text-sol-brown-soft shrink-0">
                  {formatReceived(enquiry.receivedAt)}
                </time>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <a
                  href={`tel:${enquiry.phoneNumber}`}
                  className="text-sol-brown underline underline-offset-2 py-1"
                >
                  {enquiry.phoneNumber}
                </a>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="text-sol-brown underline underline-offset-2 py-1 break-all"
                >
                  {enquiry.email}
                </a>
              </div>
              <p className="text-sm text-sol-ink whitespace-pre-wrap break-words">{enquiry.message}</p>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

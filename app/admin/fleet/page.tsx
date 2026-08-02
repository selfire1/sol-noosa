import Image from 'next/image'
import Link from 'next/link'
import { asc } from 'drizzle-orm'

import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/ui/submit-button'
import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { cars } from '@/lib/db/schema'
import { moveCar, setCarPublished } from '@/lib/fleet-actions'

export default async function AdminFleetPage() {
  await requireAdmin()
  const rows = await db.query.cars.findMany({ orderBy: [asc(cars.sortOrder)] })

  return (
    <div className="max-w-xl mx-auto w-full space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display font-bold text-2xl text-sol-brown-deep">Fleet</h1>
        <Button asChild size="lg">
          <Link href="/admin/fleet/new">Add a car</Link>
        </Button>
      </div>

      {rows.length === 0 && (
        <p className="text-sol-brown-soft text-sm rounded-2xl border border-sol-beige-deep bg-sol-paper p-5">
          No cars yet — add your first one.
        </p>
      )}

      <ul className="space-y-4">
        {rows.map((car, index) => {
          return (
            <li
              key={car.id}
              className="rounded-2xl border border-sol-beige-deep bg-sol-paper p-4 space-y-3"
            >
              <div className="flex gap-3">
                <div className="relative w-20 h-15 shrink-0 overflow-hidden rounded-md bg-sol-beige flex items-center justify-center text-[10px] italic text-sol-brown-soft">
                  {car.imageUrl ? (
                    <Image src={car.imageUrl} alt={car.name} fill sizes="80px" className="object-cover" />
                  ) : (
                    'no photo'
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-bold text-sol-brown-deep truncate">{car.name}</div>
                    <span
                      className={
                        car.published
                          ? 'shrink-0 rounded-full bg-sol-yellow-soft px-2.5 py-0.5 text-xs font-medium text-sol-brown-deep'
                          : 'shrink-0 rounded-full bg-sol-beige px-2.5 py-0.5 text-xs font-medium text-sol-brown-soft'
                      }
                    >
                      {car.published ? 'Published' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-sm text-sol-brown-soft truncate">{car.type}</p>
                  <p className="text-sm text-sol-brown-deep font-medium">${car.pricePerDay}/day</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <form action={moveCar.bind(null, car.id, 'up')}>
                  <SubmitButton
                    variant="outline"
                    size="icon-lg"
                    disabled={index === 0}
                    aria-label={`Move ${car.name} up`}
                  >
                    ↑
                  </SubmitButton>
                </form>
                <form action={moveCar.bind(null, car.id, 'down')}>
                  <SubmitButton
                    variant="outline"
                    size="icon-lg"
                    disabled={index === rows.length - 1}
                    aria-label={`Move ${car.name} down`}
                  >
                    ↓
                  </SubmitButton>
                </form>
                <form action={setCarPublished.bind(null, car.id, !car.published)} className="flex-1">
                  <SubmitButton
                    variant="outline"
                    size="lg"
                    className="w-full"
                    pendingLabel={car.published ? 'Hiding…' : 'Publishing…'}
                  >
                    {car.published ? 'Hide' : 'Publish'}
                  </SubmitButton>
                </form>
                <Button asChild variant="secondary" size="lg" className="flex-1">
                  <Link href={`/admin/fleet/${car.id}`}>Edit</Link>
                </Button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

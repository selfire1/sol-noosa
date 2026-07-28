import { asc, eq } from 'drizzle-orm'
import { cacheTag } from 'next/cache'

import { cars } from '@/lib/db/schema'

export type FleetCar = {
  id: string
  name: string
  type: string
  seats: number
  transmission: string
  pricePerDay: number
  imageUrl: string | null
  published: boolean
}

export const getPublishedFleet = async (): Promise<FleetCar[]> => {
  'use cache'
  cacheTag('fleet')
  // Imported lazily so this module stays loadable by `bun test` without varlock (KTD-8)
  const { db } = await import('@/lib/db')
  const rows = await db.query.cars.findMany({
    where: eq(cars.published, true),
    orderBy: [asc(cars.sortOrder)],
  })
  return rows.map((row) => {
    return {
      id: row.id,
      name: row.name,
      type: row.type,
      seats: row.seats,
      transmission: row.transmission,
      pricePerDay: row.pricePerDay,
      imageUrl: row.imageUrl,
      published: row.published,
    }
  })
}

const countWords = [
  'No',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
]

export const deriveFleetBlurb = (
  fleet: { pricePerDay: number; published: boolean }[],
): string => {
  const published = fleet.filter((car) => {
    return car.published
  })
  if (published.length === 0) {
    return 'Our fleet is getting a refresh — get in touch and we’ll sort you out.'
  }
  const minPrice = Math.min(
    ...published.map((car) => {
      return car.pricePerDay
    }),
  )
  if (published.length === 1) {
    return `One car, all local, all yours from $${minPrice} a day.`
  }
  const count = countWords[published.length] ?? `${published.length}`
  return `${count} cars, all local, all yours from $${minPrice} a day.`
}

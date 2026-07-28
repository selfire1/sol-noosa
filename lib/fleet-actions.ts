'use server'

import { asc, eq } from 'drizzle-orm'
import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { cars } from '@/lib/db/schema'

export type CarFormState = {
  errors: Record<string, string>
} | null

type ParsedCar = {
  name: string
  type: string
  seats: number
  transmission: string
  pricePerDay: number
  published: boolean
}

const parseCarForm = (formData: FormData): { car?: ParsedCar; errors: Record<string, string> } => {
  const errors: Record<string, string> = {}
  const name = String(formData.get('name') ?? '').trim()
  const type = String(formData.get('type') ?? '').trim()
  const transmission = String(formData.get('transmission') ?? '').trim()
  const seats = Number(formData.get('seats'))
  const pricePerDay = Number(formData.get('pricePerDay'))
  const published = formData.get('published') === 'on'

  if (name.length === 0) {
    errors.name = 'Give the car a name.'
  }
  if (!Number.isFinite(seats) || !Number.isInteger(seats) || seats <= 0) {
    errors.seats = 'Seats must be a positive whole number.'
  }
  if (!Number.isFinite(pricePerDay) || pricePerDay <= 0) {
    errors.pricePerDay = 'Price must be a positive number.'
  }
  if (Object.keys(errors).length > 0) {
    return { errors }
  }
  return { car: { name, type, seats, transmission, pricePerDay, published }, errors }
}

export const createCar = async (_previous: CarFormState, formData: FormData): Promise<CarFormState> => {
  await requireAdmin()
  const { car, errors } = parseCarForm(formData)
  if (!car) {
    return { errors }
  }
  const existing = await db.query.cars.findMany({ columns: { sortOrder: true } })
  const nextSortOrder =
    existing.length === 0
      ? 0
      : Math.max(
          ...existing.map((row) => {
            return row.sortOrder
          }),
        ) + 1
  await db.insert(cars).values({ ...car, sortOrder: nextSortOrder })
  updateTag('fleet')
  redirect('/admin/fleet')
}

export const updateCar = async (
  id: string,
  _previous: CarFormState,
  formData: FormData,
): Promise<CarFormState> => {
  await requireAdmin()
  const { car, errors } = parseCarForm(formData)
  if (!car) {
    return { errors }
  }
  await db
    .update(cars)
    .set({ ...car, updatedAt: new Date() })
    .where(eq(cars.id, id))
  updateTag('fleet')
  redirect('/admin/fleet')
}

export const deleteCar = async (id: string): Promise<void> => {
  await requireAdmin()
  await db.delete(cars).where(eq(cars.id, id))
  updateTag('fleet')
  redirect('/admin/fleet')
}

export const setCarPublished = async (id: string, published: boolean): Promise<void> => {
  await requireAdmin()
  await db.update(cars).set({ published, updatedAt: new Date() }).where(eq(cars.id, id))
  updateTag('fleet')
}

export const moveCar = async (id: string, direction: 'up' | 'down'): Promise<void> => {
  await requireAdmin()
  const rows = await db.query.cars.findMany({ orderBy: [asc(cars.sortOrder)] })
  const index = rows.findIndex((row) => {
    return row.id === id
  })
  const neighbourIndex = direction === 'up' ? index - 1 : index + 1
  if (index === -1 || neighbourIndex < 0 || neighbourIndex >= rows.length) {
    return
  }
  const current = rows[index]
  const neighbour = rows[neighbourIndex]
  await db.update(cars).set({ sortOrder: neighbour.sortOrder }).where(eq(cars.id, current.id))
  await db.update(cars).set({ sortOrder: current.sortOrder }).where(eq(cars.id, neighbour.id))
  updateTag('fleet')
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { eq } from 'drizzle-orm'

import CarForm from '@/components/admin/car-form'
import DeleteCarButton from '@/components/admin/delete-car-button'
import { requireAdmin } from '@/lib/auth'
import { db } from '@/lib/db'
import { cars } from '@/lib/db/schema'
import { deleteCar, updateCar } from '@/lib/fleet-actions'

export default async function EditCarPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>
}>) {
  await requireAdmin()
  const { id } = await params
  const car = await db.query.cars.findFirst({ where: eq(cars.id, id) })
  if (!car) {
    notFound()
  }

  return (
    <div className="max-w-xl mx-auto w-full space-y-5">
      <div className="space-y-1">
        <Link href="/admin/fleet" className="text-sm text-sol-brown-soft hover:text-sol-brown">
          ← Back to fleet
        </Link>
        <h1 className="font-display font-bold text-2xl text-sol-brown-deep">Edit {car.name}</h1>
      </div>
      <CarForm
        action={updateCar.bind(null, car.id)}
        initialValues={{
          name: car.name,
          type: car.type,
          seats: car.seats,
          transmission: car.transmission,
          pricePerDay: car.pricePerDay,
          published: car.published,
        }}
        submitLabel="Save changes"
      />
      <div className="pt-4 border-t border-sol-beige-deep">
        <DeleteCarButton action={deleteCar.bind(null, car.id)} carName={car.name} />
      </div>
    </div>
  )
}

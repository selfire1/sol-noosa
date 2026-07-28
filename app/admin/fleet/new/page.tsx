import Link from 'next/link'

import CarForm from '@/components/admin/car-form'
import { requireAdmin } from '@/lib/auth'
import { createCar } from '@/lib/fleet-actions'

export default async function NewCarPage() {
  await requireAdmin()
  return (
    <div className="max-w-xl mx-auto w-full space-y-5">
      <div className="space-y-1">
        <Link href="/admin/fleet" className="text-sm text-sol-brown-soft hover:text-sol-brown">
          ← Back to fleet
        </Link>
        <h1 className="font-display font-bold text-2xl text-sol-brown-deep">Add a car</h1>
      </div>
      <CarForm action={createCar} submitLabel="Add car" />
    </div>
  )
}

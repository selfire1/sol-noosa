import { db } from './index'
import { cars } from './schema'

const initialCars = [
  {
    id: 'beach-cruiser',
    name: 'Beach Cruiser',
    type: 'Convertible',
    seats: 4,
    transmission: 'Automatic',
    pricePerDay: 89,
  },
  {
    id: 'coast-runner',
    name: 'Coast Runner',
    type: 'SUV',
    seats: 5,
    transmission: 'Automatic',
    pricePerDay: 119,
  },
  {
    id: 'noosa-classic',
    name: 'Noosa Classic',
    type: 'Sedan',
    seats: 5,
    transmission: 'Automatic',
    pricePerDay: 79,
  },
  {
    id: 'sunshine-wagon',
    name: 'Sunshine Wagon',
    type: 'Hatchback',
    seats: 4,
    transmission: 'Manual',
    pricePerDay: 69,
  },
  {
    id: 'hinterland-explorer',
    name: 'Hinterland Explorer',
    type: '4WD',
    seats: 7,
    transmission: 'Automatic',
    pricePerDay: 149,
  },
]

const seed = async () => {
  const existing = await db.query.cars.findMany()
  if (existing.length > 0) {
    console.log(`Skipping seed: ${existing.length} cars already present`)
    return
  }
  await db.insert(cars).values(
    initialCars.map((car, index) => {
      return { ...car, published: true, sortOrder: index }
    }),
  )
  console.log(`Seeded ${initialCars.length} cars`)
}

await seed()

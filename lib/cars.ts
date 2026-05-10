export type Car = {
  id: string
  name: string
  type: string
  seats: number
  transmission: 'Automatic' | 'Manual'
  pricePerDay: number
}

export const cars: Car[] = [
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

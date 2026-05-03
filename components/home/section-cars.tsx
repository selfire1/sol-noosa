'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BookNowButton from '@/components/book-now-button'
import CallButton from '@/components/call-button'

const cars = [
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

export default function SectionCars() {
  return (
    <div className="page-container py-24">
      <div className="max-w-xl space-y-2 mb-16">
        <p className="text-sm uppercase">Our fleet</p>
        <h2 className="font-bold text-3xl">Pick your ride</h2>
        <p>Subheadline</p>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!pb-12"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id} className="h-auto">
            <article className="flex flex-col gap-4 rounded-lg border border-sol-beige bg-white p-4 h-full">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-sol-beige flex items-center justify-center text-sol-brown text-sm">
                {/* TODO: replace with real car image */}
                Car image
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-lg">{car.name}</h3>
                <p className="text-sm text-muted-foreground">{car.type}</p>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{car.seats} seats</li>
                <li>{car.transmission}</li>
                <li>From ${car.pricePerDay}/day</li>
              </ul>
              <BookNowButton className="mt-auto w-full" />
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="flex justify-center mt-12">
        <CallButton size="lg" />
      </div>
    </div>
  )
}

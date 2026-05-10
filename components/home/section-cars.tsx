'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import BookNowButton from '@/components/book-now-button'
import { cars } from '@/lib/cars'

type SectionCarsProps = {
  eyebrow?: string
  title?: string
  description?: string
}

export default function SectionCars({
  eyebrow = 'Our fleet',
  title = 'Pick your ride',
  description = 'Five cars, all local, all yours from $69 a day.',
}: SectionCarsProps = {}) {
  return (
    <section id="fleet" className="page-container py-24">
      <div className="max-w-xl space-y-2 mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sol-brown">
          {eyebrow}
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
          {title}
        </h2>
        <p className="text-sol-brown-soft leading-relaxed">{description}</p>
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
        style={{ '--swiper-theme-color': 'var(--sol-brown-deep)' } as React.CSSProperties}
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id} className="h-auto">
            <article className="flex flex-col gap-4 rounded-2xl border border-sol-beige-deep bg-sol-paper p-4 h-full shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-md bg-sol-beige flex items-center justify-center text-sol-brown-soft text-sm italic">
                {car.name} photo
              </div>
              <div className="flex flex-col gap-0.5">
                <h3 className="font-bold text-lg text-sol-brown-deep">{car.name}</h3>
                <p className="text-sm text-sol-brown-soft">{car.type}</p>
              </div>
              <ul className="flex gap-3 text-sm text-sol-brown-soft">
                <li>{car.seats} seats</li>
                <li aria-hidden="true" className="opacity-50">
                  ·
                </li>
                <li>{car.transmission}</li>
              </ul>
              <div className="mt-auto flex items-center justify-between gap-3 pt-2">
                <p className="font-display font-bold text-2xl text-sol-yellow leading-none">
                  ${car.pricePerDay}
                  <span className="ml-1 text-sm font-normal not-italic text-sol-brown-soft font-sans">
                    /day
                  </span>
                </p>
                <BookNowButton variant="secondary" />
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

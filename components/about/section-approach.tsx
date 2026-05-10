import Image from 'next/image'
import HeroImage from '@/public/hero.jpg'

export default function SectionApproach() {
  return (
    <section className="bg-sol-beige">
      <div className="page-container py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div className="aspect-[4/5] rounded-xl overflow-hidden lg:order-1 order-2">
          <Image
            src={HeroImage}
            alt="Noosa coastline at golden hour"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-4 max-w-prose lg:order-2 order-1">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sol-brown">
            How we do things
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
            Small enough to actually care.
          </h2>
          <div className="space-y-4 leading-[1.7] text-sol-ink">
            <p>
              We&rsquo;re not a chain and we&rsquo;re not trying to become one. Every booking comes
              through a real person, every car is checked over by hand between hires, and every
              question gets a straight answer — usually within the hour.
            </p>
            <p>
              Our fleet is chosen for the kind of driving people actually do here: beach runs,
              hinterland day trips, the slow loop up to Rainbow Beach. Compact, easy to park, and
              comfortable on a long weekend. Nothing flashy, nothing you&rsquo;ll be afraid to take
              down a dirt road.
            </p>
            <p>
              And when something doesn&rsquo;t go to plan — a flat on the way to Eumundi, a flight
              that lands at midnight — we pick up the phone.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

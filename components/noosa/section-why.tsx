import {
  AirplaneTakeOff01Icon,
  Calendar03Icon,
  Car03Icon,
  HeadsetIcon,
  Location01Icon,
  Tag01Icon,
} from '@hugeicons/core-free-icons'
import Icon from '@/components/icon'

const reasons = [
  {
    icon: Tag01Icon,
    title: 'No-surprises Noosa pricing',
    body: 'No airport-counter markups, no last-minute admin fees. The price you see on our fleet is the price you pay — local rates from a local team.',
  },
  {
    icon: AirplaneTakeOff01Icon,
    title: 'Easy Sunshine Coast pickup',
    body: 'We meet you at Sunshine Coast Airport (MCY), or drop the keys to your hotel in Noosa Heads, Sunshine Beach, or Noosaville. Land and go — no shuttle queues.',
  },
  {
    icon: Car03Icon,
    title: 'Cars built for the coast',
    body: 'From easy-park hatchbacks for Hastings Street to seven-seat 4WDs for the Hinterland, every car is serviced, detailed, and ready for the kind of driving you’ll actually do here.',
  },
  {
    icon: Location01Icon,
    title: 'Real local knowledge',
    body: 'We live in Noosa. Ask us which beach to chase the sunrise, where to park for the National Park walk, or which back road skips the holiday traffic.',
  },
  {
    icon: Calendar03Icon,
    title: 'Flexible bookings',
    body: 'Flights shift. Plans change. Free amendments and cancellations up to 48 hours before pickup, no questions asked.',
  },
  {
    icon: HeadsetIcon,
    title: 'A real human on call',
    body: 'A flat tyre on the way to Eumundi? A late flight into MCY? One call and a real person from our Noosa team picks up — not a contact centre overseas.',
  },
]

export default function SectionWhy() {
  return (
    <section className="bg-sol-beige">
      <div className="page-container py-24">
        <div className="max-w-xl space-y-2 mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sol-brown">
            Why choose us
          </p>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
            Why hire your car in Noosa with Sol.
          </h2>
          <p className="text-sol-brown-soft leading-relaxed">
            Six small things that add up to a much better Noosa holiday.
          </p>
        </div>
        <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <li key={reason.title} className="space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sol-cream text-sol-brown shadow-xs">
                <Icon icon={reason.icon} size={24} strokeWidth={1.5} />
              </div>
              <h3 className="font-bold text-lg text-sol-brown-deep">{reason.title}</h3>
              <p className="text-sol-brown-soft leading-[1.6]">{reason.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

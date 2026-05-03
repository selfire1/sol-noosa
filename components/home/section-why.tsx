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
    title: 'Honest local pricing',
    body: 'No hidden fees, no surprise charges. What you see is what you pay — straightforward rates from a Noosa team.',
  },
  {
    icon: Car03Icon,
    title: 'A fleet you can trust',
    body: 'Every car is regularly serviced and detailed, so you can hit the coast without a second thought.',
  },
  {
    icon: AirplaneTakeOff01Icon,
    title: 'Easy airport pickup',
    body: 'Land, grab your bags, and go. We meet you at Sunshine Coast Airport with the keys ready.',
  },
  {
    icon: Calendar03Icon,
    title: 'Flexible bookings',
    body: 'Plans change. Free amendments and cancellations up to 48 hours before your pickup.',
  },
  {
    icon: Location01Icon,
    title: 'Locally owned and run',
    body: 'We live here. Ask us about the best beaches, hinterland drives, and where to grab a sunset feed.',
  },
  {
    icon: HeadsetIcon,
    title: 'Real humans on call',
    body: 'A flat tyre on the way to Eumundi? One call and a real person from our team picks up.',
  },
]

export default function SectionWhy() {
  return (
    <section className="bg-sol-beige">
      <div className="page-container py-24">
        <div className="max-w-xl space-y-2 mb-14">
          <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
            Why Sol Noosa
          </h2>
          <p className="text-sol-brown-soft leading-relaxed">
            Six small things that add up to a much better holiday.
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

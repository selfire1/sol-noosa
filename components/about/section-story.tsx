import Image from 'next/image'
import AboutImage from '@/public/about-image.jpg'

export default function SectionStory() {
  return (
    <section className="page-container py-24 grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-4 max-w-prose">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sol-brown">
          Our story
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
          Born from a love of the Sunshine Coast.
        </h2>
        <div className="space-y-4 leading-[1.7] text-sol-ink">
          <p>
            Sol Noosa started in 2019, after one too many holiday horror stories about hidden fees,
            queues that wrapped around the airport terminal, and rental cars that smelled like
            disinfectant. We thought there had to be a better way to put friends behind the wheel
            for their week up the coast.
          </p>
          <p>
            So we bought one car, parked it in the driveway, and started lending it out. Word spread
            quickly — turns out a lot of people wanted the same thing: a clean car, a real human to
            talk to, and a fair price. A few years on, we have a small fleet, a proper depot, and
            the same simple promise.
          </p>
        </div>
      </div>
      <div className="aspect-[4/5] rounded-xl overflow-hidden">
        <Image
          src={AboutImage}
          alt="A small blue rental car on the Sunshine Coast"
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

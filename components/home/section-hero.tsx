import Image from 'next/image'
import HeroImage from '@/public/hero.jpg'
import SolImage from '@/public/sol.png'
import LongWayHomeImage from '@/public/the-long-way-home.jpg'
import SlowDownImage from '@/public/slow-down.jpg'
import BookNowButton from '@/components/book-now-button'
import WhatsappButton from '@/components/whatsapp-button'

const polaroids = [
  {
    src: HeroImage,
    alt: 'Noosa Main Beach',
    caption: 'main beach',
    rotate: 'rotate-2',
    objectPosition: 'center 40%',
  },
  {
    src: LongWayHomeImage,
    alt: 'Coastal road on the Sunshine Coast',
    caption: 'the long way home',
    rotate: '-rotate-1',
    objectPosition: 'left center',
  },
  {
    src: SlowDownImage,
    alt: 'Blue rental car at golden hour',
    caption: 'take it slow',
    rotate: '-rotate-3',
    objectPosition: 'center',
  },
]

export default function SectionHero() {
  return (
    <section className="relative isolate overflow-hidden bg-sol-cream">
      <SunDecoration />

      <div className="page-container relative pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <span className="font-hand text-sol-sunset text-3xl sm:text-4xl leading-none">
            rolling out of noosa since &rsquo;19
          </span>
          <h1
            className="font-display font-bold text-sol-brown-deep leading-[0.95] tracking-[-0.01em] m-0"
            style={{ fontSize: 'clamp(56px, 9vw, 112px)' }}
          >
            <em className="not-italic font-display font-bold italic text-sol-yellow">
              Sun-soaked
            </em>
            <br />
            car rentals.
          </h1>
          <p className="text-base sm:text-lg text-sol-brown-deep/80 max-w-lg">
            A small, friendly fleet for the Sunshine Coast. No queues, no
            corporate speak — just keys, sunshine, and a full tank.
          </p>
          <div className="gap-4 items-center flex flex-wrap justify-center pt-2">
            <BookNowButton size="lg" />
            <WhatsappButton size="lg" />
          </div>
        </div>

        <div className="mt-16 lg:mt-20 flex flex-wrap justify-center gap-8 lg:gap-12">
          {polaroids.map((p, i) => (
            <div
              key={i}
              className={`relative ${p.rotate} bg-sol-paper p-2.5 pb-10 sm:p-3 sm:pb-12`}
              style={{ boxShadow: 'var(--shadow-md)' }}
            >
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 overflow-hidden bg-sol-beige">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(max-width: 640px) 10rem, 12rem"
                  className="object-cover"
                  style={{ objectPosition: p.objectPosition }}
                />
              </div>
              <span className="absolute bottom-1.5 inset-x-0 text-center font-hand text-sol-brown-deep text-2xl leading-none">
                {p.caption}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SunDecoration() {
  return (
    <Image
      aria-hidden
      src={SolImage}
      alt=""
      sizes="(min-width: 576px) 576px, 100vw"
      quality={40}
      loading="eager"
      fetchPriority="high"
      className="absolute left-1/2 top-12 -translate-x-1/2 w-[36rem] max-w-full h-auto opacity-10 pointer-events-none"
    />
  )
}

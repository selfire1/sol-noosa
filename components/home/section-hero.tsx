import Image from 'next/image'
import HeroImage from '@/public/hero.jpg'
import BookNowButton from '@/components/book-now-button'
import CallButton from '@/components/call-button'
import { Button } from '@/components/ui/button'

export default function SectionHero() {
  return (
    <section className="relative isolate overflow-hidden min-h-[36rem] flex items-center">
      <Image
        src={HeroImage}
        alt="Noosa Main Beach"
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(180deg, rgba(42,31,18,0) 30%, rgba(42,31,18,0.25) 100%)',
        }}
      />
      <div className="page-container py-24 w-full">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1
            className="font-display font-bold text-sol-yellow leading-[0.95] tracking-[-0.01em] m-0"
            style={{
              fontSize: 'clamp(56px, 9vw, 110px)',
              textShadow: 'var(--shadow-text-soft)',
            }}
          >
            Sol Noosa
            <br />
            Car Rentals
          </h1>
          <p>
            Two or three sentences about SUP. Non anim amet irure Lorem et ex eu laborum esse
            officia est proident. Ad duis reprehenderit aute qui.
          </p>
          <div className="gap-4 items-center flex">
            <CallButton size="lg" />
            <BookNowButton size="lg" />
          </div>
        </div>
      </div>
    </section>
  )
}

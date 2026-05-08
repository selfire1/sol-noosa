import Image, { type StaticImageData } from 'next/image'
import type { ReactNode } from 'react'
import HeroImage from '@/public/hero.jpg'
import BookNowButton from '@/components/book-now-button'

type PageHeroProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  image?: StaticImageData
  imageAlt?: string
  showActions?: boolean
}

export default function PageHero({
  eyebrow,
  title,
  description,
  image = HeroImage,
  imageAlt = 'Noosa coast',
  showActions = true,
}: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden min-h-[44rem] lg:min-h-[40rem] flex items-end">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover -z-10"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(180deg, rgba(42,31,18,0.45) 0%, rgba(42,31,18,0.05) 35%, rgba(42,31,18,0.55) 75%, rgba(42,31,18,0.85) 100%)',
        }}
      />

      <div className="page-container py-20 lg:py-24 w-full">
        <div className="flex flex-col gap-6 max-w-3xl">
          {eyebrow && (
            <span
              className="font-hand text-sol-yellow-soft text-3xl sm:text-4xl leading-none"
              style={{ textShadow: 'var(--shadow-text-soft)' }}
            >
              {eyebrow}
            </span>
          )}
          <h1
            className="font-display font-bold text-sol-cream leading-[0.92] tracking-[-0.01em] m-0"
            style={{
              fontSize: 'clamp(56px, 9vw, 112px)',
              textShadow: 'var(--shadow-text-soft)',
            }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-sol-cream/95 text-base sm:text-lg max-w-md"
              style={{ textShadow: 'var(--shadow-text-soft)' }}
            >
              {description}
            </p>
          )}
          {showActions && (
            <div className="gap-4 items-center flex flex-wrap pt-2">
              <BookNowButton size="lg" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

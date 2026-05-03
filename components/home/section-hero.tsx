import Image from 'next/image'
import HeroImage from '@/public/hero.jpg'
import BookNowButton from '@/components/book-now-button'
import CallButton from '@/components/call-button'

export default function SectionHero() {
  // TODO: optimise the heck out of this image
  return (
    <div className="relative isolate overflow-hidden py-24 min-h-[30rem] flex">
      <div className="page-container relative z-20 flex flex-col justify-center w-full">
        <div className="flex flex-col gap-4 max-w-xl">
          <h1 className="font-bold text-5xl leading-tight">
            Sol Noosa
            <br />
            Car Rentals
          </h1>
          <p>
            Two or three sentences about SUP. Non anim amet irure Lorem et ex eu laborum esse
            officia est proident. Ad duis reprehenderit aute qui.{' '}
          </p>
          <div className="gap-4 items-center flex">
            <CallButton size="lg" />
            <BookNowButton size="lg" />
          </div>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <Image src={HeroImage} alt="Noosa Main Beach" className="object-cover z-10 h-full w-full" />
      </div>
    </div>
  )
}

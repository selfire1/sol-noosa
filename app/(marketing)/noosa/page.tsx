import type { Metadata } from 'next'
import PageHero from '@/components/page-hero'
import SectionAbout from '@/components/noosa/section-about'
import SectionWhy from '@/components/noosa/section-why'
import SectionCars from '@/components/home/section-cars'
import SectionContact from '@/components/home/section-contact'
import { deriveFleetBlurb, getPublishedFleet } from '@/lib/fleet'

export const metadata: Metadata = {
  title: 'Car Hire Noosa — easy, local car rentals from Sol Noosa',
  description:
    'Locally-run car hire in Noosa. Honest pricing, easy Sunshine Coast Airport pickup, and a fleet built for Main Beach, the Hinterland, and everywhere in between.',
  alternates: {
    canonical: '/noosa',
  },
}

export default async function NoosaPage() {
  const fleet = await getPublishedFleet()
  return (
    <main>
      <PageHero
        eyebrow="car hire noosa"
        title={
          <>
            <em className="not-italic italic font-display font-bold text-sol-yellow">
              Noosa
            </em>{' '}
            car hire, the easy way.
          </>
        }
        description="Drive Noosa your way. Honest local pricing, easy Sunshine Coast Airport pickup, and a small fleet of well-kept cars from the team that actually lives here."
      />
      <SectionAbout />
      <SectionWhy />
      <SectionCars
        cars={fleet}
        eyebrow="Noosa fleet"
        title="A fleet built for Noosa driving."
        description={`From easy-park hatchbacks for Hastings Street to seven-seat 4WDs for the Hinterland. ${deriveFleetBlurb(fleet)}`}
      />
      <SectionContact
        title="Plan your Noosa trip with us"
        description="Tell us your dates and where you’re landing — we’ll have a couple of options and the keys ready."
      />
    </main>
  )
}

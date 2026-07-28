import SectionAbout from '@/components/home/section-about'
import SectionCars from '@/components/home/section-cars'
import SectionContact from '@/components/home/section-contact'
import SectionHero from '@/components/home/section-hero'
import SectionWhy from '@/components/home/section-why'
import { deriveFleetBlurb, getPublishedFleet } from '@/lib/fleet'

export default async function Home() {
  const fleet = await getPublishedFleet()
  return (
    <main>
      <SectionHero />
      <SectionAbout />
      <SectionWhy />
      <SectionCars cars={fleet} description={deriveFleetBlurb(fleet)} />
      <SectionContact />
    </main>
  )
}

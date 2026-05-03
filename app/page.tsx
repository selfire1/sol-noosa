import SectionAbout from '@/components/home/section-about'
import SectionCars from '@/components/home/section-cars'
import SectionContact from '@/components/home/section-contact'
import SectionHero from '@/components/home/section-hero'
import SectionWhy from '@/components/home/section-why'

export default function Home() {
  return (
    <main>
      <SectionHero />
      <SectionAbout />
      <SectionWhy />
      <SectionCars />
      <SectionContact />
    </main>
  )
}

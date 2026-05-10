import type { Metadata } from 'next'
import PageHero from '@/components/page-hero'
import SectionApproach from '@/components/about/section-approach'
import SectionContact from '@/components/home/section-contact'
import SectionStory from '@/components/about/section-story'

export const metadata: Metadata = {
  title: 'About Sol Noosa — locally-run car hire on the Sunshine Coast',
  description:
    'A small, family-run car rental company based in Noosa Heads. Honest pricing, easy pickup, real humans on call.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="our story"
        title={
          <>
            About <em className="not-italic italic font-display font-bold text-sol-yellow">Sol Noosa</em>
          </>
        }
        description="A small, locally-owned car hire on the Sunshine Coast — built around honest pricing, well-kept cars, and a real human on the other end of the line."
        showActions={false}
      />
      <SectionStory />
      <SectionApproach />
      <SectionContact />
    </main>
  )
}

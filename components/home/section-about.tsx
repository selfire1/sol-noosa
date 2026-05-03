import AboutImage from '@/public/about-image.jpg'
import Image from 'next/image'

export default function SectionAbout() {
  return (
    <section id="about" className="page-container py-24 grid sm:grid-cols-2 gap-16 items-start">
      <div className="space-y-4 max-w-prose">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sol-brown">
          About us
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
          A small, locally-run car hire on the Sunshine Coast.
        </h2>
        <div className="space-y-4 leading-[1.7] text-sol-ink">
          <p>
            We&rsquo;re Sol Noosa &mdash; a family-run rental outfit based in Noosa Heads. We
            started because we got sick of friends arriving on holiday and getting stitched up by
            national chains with hidden fees and a five-deep queue at the airport counter.
          </p>
          <p>
            Our fleet is small, well-kept, and chosen for the kind of driving you&rsquo;ll actually
            do here: beach runs, hinterland day trips, the slow loop up to Rainbow Beach. We meet
            you off the plane, hand you the keys, and tell you where to grab the best fish and
            chips.
          </p>
          <p>Locally owned. Locally driven. No hidden fees, ever.</p>
        </div>
      </div>
      <div className="aspect-square rounded-xl overflow-hidden">
        <Image
          src={AboutImage}
          alt="A small blue car on a Sunshine Coast beach at golden hour"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

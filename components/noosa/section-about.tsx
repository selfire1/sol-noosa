import AboutImage from '@/public/about-image.jpg'
import Image from 'next/image'

export default function SectionAbout() {
  return (
    <section id="about" className="page-container py-24 grid sm:grid-cols-2 gap-16 items-start">
      <div className="space-y-4 max-w-prose">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-sol-brown">
          Noosa car hire, made simple
        </p>
        <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-brown leading-[1.15]">
          A locally-run car hire, just minutes from Hastings Street.
        </h2>
        <div className="space-y-4 leading-[1.7] text-sol-ink">
          <p>
            Sol Noosa is a small, family-run rental outfit based in Noosa Heads. We started Sol
            because we got tired of watching mates land in Noosa and lose half their first day
            queueing at the airport, signing contracts in fine print, and paying twice what
            they&rsquo;d been quoted.
          </p>
          <p>
            We do car hire in Noosa the way it should be done: a clean car, a real person to talk
            to, and a fair price you can see up front. Whether you&rsquo;re flying into the
            Sunshine Coast Airport, the train into Cooroy, or driving up from Brisbane, we&rsquo;ll
            have the keys ready when you are.
          </p>
          <p>
            Locally owned. Locally driven. Built for Noosa &mdash; from Main Beach to the
            Hinterland.
          </p>
        </div>
      </div>
      <div className="aspect-square rounded-xl overflow-hidden">
        <Image
          src={AboutImage}
          alt="A Sol Noosa rental car parked near Noosa Main Beach at golden hour"
          sizes="(min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover"
        />
      </div>
    </section>
  )
}

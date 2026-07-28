import type { Metadata } from 'next'
import ContactForm from '@/components/contact-form'
import PageHero from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Contact — Sol Noosa Car Rentals',
  description:
    'Get in touch with Sol Noosa Car Rentals. Tell us when and where, and we’ll come back with a couple of options.',
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        eyebrow="say g’day"
        title="Contact us"
        description="Tell us when you’re arriving and what you’re after — we’ll come back with a couple of options."
        showActions={false}
      />
      <section className="page-container py-20 lg:py-24">
        <div className="max-w-xl mx-auto space-y-8">
          <ContactForm />
        </div>
      </section>
    </main>
  )
}

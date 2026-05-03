import ContactForm from '../contact-form'

export default function SectionContact() {
  return (
    <section id="contact" className="bg-sol-brown-deep text-sol-cream">
      <div className="page-container py-24">
        <div className="max-w-xl space-y-8 mx-auto">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-cream leading-[1.15]">
              Get in touch
            </h2>
            <p className="text-sol-cream/80 leading-relaxed">
              Tell us when and where, and we&rsquo;ll come back with a couple of options.
            </p>
          </div>
          <ContactForm onDarkSurface />
        </div>
      </div>
    </section>
  )
}

import ContactForm from '../contact-form'

type SectionContactProps = {
  title?: string
  description?: string
}

export default function SectionContact({
  title = 'Get in touch',
  description = 'Tell us when and where, and we’ll come back with a couple of options.',
}: SectionContactProps = {}) {
  return (
    <section id="contact" className="bg-sol-brown-deep text-sol-cream">
      <div className="page-container py-24">
        <div className="max-w-xl space-y-8 mx-auto">
          <div className="space-y-2">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-sol-cream leading-[1.15]">
              {title}
            </h2>
            <p className="text-sol-cream/80 leading-relaxed">{description}</p>
          </div>
          <ContactForm onDarkSurface />
        </div>
      </div>
    </section>
  )
}

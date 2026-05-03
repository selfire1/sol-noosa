import ContactForm from '../contact-form'

export default function SectionContact() {
  return (
    <div className="bg-gray-500 text-white">
      <div className="page-container py-24">
        <div className="max-w-xl space-y-8 mx-auto">
          <div className="space-y-2">
            <h2 className="font-bold text-3xl">Get in touch</h2>
            <p>Subheadline</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

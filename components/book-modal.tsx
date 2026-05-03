'use client'

import { useModal } from '@/hooks/useModal'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ContactForm from './contact-form'

export default function BookModal({ children }: { children: React.ReactNode }) {
  const { isPresented, setIsPresented } = useModal()

  return (
    <Dialog open={isPresented} onOpenChange={setIsPresented}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl text-sol-brown">
            Get in touch now
          </DialogTitle>
          <DialogDescription>
            Drop us your details and we&rsquo;ll come back with what&rsquo;s available for your
            dates.
          </DialogDescription>
        </DialogHeader>
        <ContactForm />
      </DialogContent>
    </Dialog>
  )
}

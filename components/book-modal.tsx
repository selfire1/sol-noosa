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

export default function BookModal({ children }: { children: React.ReactNode }) {
  const { isPresented, setIsPresented } = useModal()

  return (
    <Dialog open={isPresented} onOpenChange={setIsPresented}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[80vw]">
        <DialogHeader>
          <DialogTitle>Get in touch now!</DialogTitle>
          <DialogDescription>
            Lorem ad ut laboris ea Lorem labore sit qui proident. Pariatur duis est proident in eu
            tempor. In nisi irure dolore anim aute pariatur. Reprehenderit non nisi laboris
            cupidatat incididunt fugiat ullamco dolore nulla.
          </DialogDescription>
        </DialogHeader>

        {
          // TODO: form: Full name, phone number, email, message
        }
      </DialogContent>
    </Dialog>
  )
}

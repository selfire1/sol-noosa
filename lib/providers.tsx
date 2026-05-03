'use client'

import { useModal } from '@/hooks/useModal'
import { BookModalContext } from './book-context'

export default function Providers({ children }: { children: React.ReactNode }) {
  const { isPresented } = useModal()

  return <BookModalContext value={isPresented}>{children}</BookModalContext>
}

import { useState } from 'react'

export function useModal() {
  const [isPresented, setIsPresented] = useState(false)
  return { isPresented, setIsPresented }
}

'use client'

import { useFormStatus } from 'react-dom'

import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'

type SubmitButtonProps = React.ComponentProps<typeof Button> & {
  pendingLabel?: React.ReactNode
}

export default function SubmitButton({ children, pendingLabel, disabled, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending || disabled} {...props}>
      {pending ? (
        <>
          <Spinner className="size-4" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </Button>
  )
}

'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import SubmitButton from '@/components/ui/submit-button'

type DeleteCarButtonProps = {
  action: () => Promise<void>
  carName: string
}

export default function DeleteCarButton({ action, carName }: DeleteCarButtonProps) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <Button
        type="button"
        variant="destructive"
        size="lg"
        className="w-full h-12"
        onClick={() => {
          setConfirming(true)
        }}
      >
        Delete this car
      </Button>
    )
  }

  return (
    <div className="space-y-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
      <p className="text-sm text-sol-brown-deep">
        Delete <strong>{carName}</strong>? This can’t be undone.
      </p>
      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="h-12"
          onClick={() => {
            setConfirming(false)
          }}
        >
          Cancel
        </Button>
        <form action={action}>
          <SubmitButton
            variant="destructive"
            size="lg"
            className="w-full h-12"
            pendingLabel="Deleting…"
          >
            Yes, delete
          </SubmitButton>
        </form>
      </div>
    </div>
  )
}

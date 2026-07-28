'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { CarFormState } from '@/lib/fleet-actions'

type CarFormValues = {
  name: string
  type: string
  seats: number
  transmission: string
  pricePerDay: number
  published: boolean
}

type CarFormProps = {
  action: (previous: CarFormState, formData: FormData) => Promise<CarFormState>
  initialValues?: CarFormValues
  submitLabel: string
}

type FieldProps = {
  label: string
  error?: string
  children: React.ReactNode
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export default function CarForm({ action, initialValues, submitLabel }: CarFormProps) {
  const [state, formAction, pending] = useActionState(action, null)
  const errors = state?.errors ?? {}

  return (
    <form action={formAction} className="space-y-5">
      <Field label="Name" error={errors.name}>
        <Input name="name" defaultValue={initialValues?.name} className="h-12 text-base" />
      </Field>
      <Field label="Type" error={errors.type}>
        <Input
          name="type"
          defaultValue={initialValues?.type}
          placeholder="e.g. SUV, Convertible"
          className="h-12 text-base"
        />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Seats" error={errors.seats}>
          <Input
            name="seats"
            type="number"
            inputMode="numeric"
            min={1}
            defaultValue={initialValues?.seats}
            className="h-12 text-base"
          />
        </Field>
        <Field label="Price per day ($)" error={errors.pricePerDay}>
          <Input
            name="pricePerDay"
            type="number"
            inputMode="decimal"
            min={1}
            defaultValue={initialValues?.pricePerDay}
            className="h-12 text-base"
          />
        </Field>
      </div>
      <Field label="Transmission" error={errors.transmission}>
        <Input
          name="transmission"
          defaultValue={initialValues?.transmission}
          placeholder="e.g. Automatic, Manual"
          className="h-12 text-base"
        />
      </Field>
      <label className="flex items-center gap-3 py-3 select-none">
        <input
          type="checkbox"
          name="published"
          defaultChecked={initialValues?.published ?? true}
          className="size-5 accent-sol-yellow"
        />
        <span className="text-sm font-medium text-sol-brown-deep">Show on the public site</span>
      </label>
      <Button type="submit" size="lg" disabled={pending} className="w-full h-12">
        {pending ? 'Saving…' : submitLabel}
      </Button>
    </form>
  )
}

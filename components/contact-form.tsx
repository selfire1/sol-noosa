'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import { cn } from '@/lib/utils'
import { submitEnquiry, type EnquiryResult } from '@/lib/enquiries'

type ContactFormProps = {
  onDarkSurface?: boolean
}

export default function ContactForm({ onDarkSurface = false }: ContactFormProps) {
  const [result, setResult] = useState<EnquiryResult | null>(null)
  const honeypotRef = useRef('')
  const renderedAtRef = useRef(0)

  useEffect(() => {
    if (renderedAtRef.current === 0) {
      renderedAtRef.current = Date.now()
    }
  }, [])

  const form = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      const response = await submitEnquiry(value, honeypotRef.current, renderedAtRef.current)
      setResult(response)
    },
  })

  const fieldErrors = result?.status === 'invalid' ? result.errors : {}

  if (result?.status === 'success') {
    return (
      <div
        className={cn(
          'rounded-2xl border border-sol-beige-deep bg-sol-paper p-6 space-y-2',
          onDarkSurface && 'bg-sol-cream border-sol-cream/20'
        )}
        role="status"
      >
        <p className="font-display font-bold text-xl text-sol-brown-deep">Thanks for reaching out!</p>
        <p className="text-sol-brown-soft">
          We’ve got your message and we’ll come back to you as soon as we can.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        honeypotRef.current = String(new FormData(e.currentTarget).get('website') ?? '')
        form.handleSubmit()
      }}
      className={cn(
        'space-y-5',
        onDarkSurface &&
          '[&_input]:bg-sol-cream [&_textarea]:bg-sol-cream [&_input]:text-sol-ink [&_textarea]:text-sol-ink [&_input]:border-sol-cream/20 [&_textarea]:border-sol-cream/20 [&_label]:text-sol-cream'
      )}
    >
      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <form.Field name="fullName">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Full name</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              autoComplete="name"
            />
            {fieldErrors.fullName && (
              <p role="alert" className="text-sm text-destructive">
                {fieldErrors.fullName}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="phoneNumber">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Phone number</Label>
            <Input
              id={field.name}
              name={field.name}
              type="tel"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              autoComplete="tel"
            />
            {fieldErrors.phoneNumber && (
              <p role="alert" className="text-sm text-destructive">
                {fieldErrors.phoneNumber}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="email">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Email address</Label>
            <Input
              id={field.name}
              name={field.name}
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              autoComplete="email"
            />
            {fieldErrors.email && (
              <p role="alert" className="text-sm text-destructive">
                {fieldErrors.email}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="message">
        {(field) => (
          <div className="space-y-2">
            <Label htmlFor={field.name}>Message</Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              rows={5}
            />
            {fieldErrors.message && (
              <p role="alert" className="text-sm text-destructive">
                {fieldErrors.message}
              </p>
            )}
          </div>
        )}
      </form.Field>

      {result?.status === 'error' && (
        <p role="alert" className={cn('text-sm text-destructive', onDarkSurface && 'text-sol-yellow-soft')}>
          {result.message}
        </p>
      )}

      <div className="flex flex-wrap gap-4 items-center pt-2">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" variant="secondary" size="lg" className="sm:min-w-32" disabled={isSubmitting}>
              {isSubmitting ? 'Sending…' : 'Send message'}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  )
}

'use client'

import { useForm } from '@tanstack/react-form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Label } from './ui/label'
import CallButton from './call-button'
import { cn } from '@/lib/utils'

type ContactFormProps = {
  onDarkSurface?: boolean
}

export default function ContactForm({ onDarkSurface = false }: ContactFormProps) {
  const form = useForm({
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      email: '',
      message: '',
    },
    onSubmit: async ({ value }) => {
      console.log('Contact form submission:', value)
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
      className={cn(
        'space-y-5',
        onDarkSurface &&
          '[&_input]:bg-sol-cream [&_textarea]:bg-sol-cream [&_input]:text-sol-ink [&_textarea]:text-sol-ink [&_input]:border-sol-cream/20 [&_textarea]:border-sol-cream/20 [&_label]:text-sol-cream'
      )}
    >
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
          </div>
        )}
      </form.Field>

      <div className="flex flex-wrap gap-4 items-center pt-2">
        <Button type="submit" variant="secondary" size="lg" className="sm:min-w-32">
          Send message
        </Button>
        <CallButton
          type="button"
          size="lg"
          variant="ghost"
          className={cn(
            onDarkSurface &&
              'bg-transparent text-sol-cream hover:bg-sol-cream/10 hover:text-sol-cream'
          )}
        />
      </div>
    </form>
  )
}

'use client'

import { useActionState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { login } from '@/lib/auth/actions'

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(login, null)

  return (
    <div className="max-w-sm mx-auto w-full pt-10">
      <form action={formAction} className="space-y-5">
        <div className="space-y-1">
          <h1 className="font-display font-bold text-2xl text-sol-brown-deep">Log in</h1>
          <p className="text-sm text-sol-brown-soft">Enter the admin password to manage the site.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            className="h-12 text-base"
          />
        </div>
        {state?.error && (
          <p role="alert" className="text-sm text-destructive">
            {state.error}
          </p>
        )}
        <Button type="submit" size="lg" disabled={pending} className="w-full h-12">
          {pending ? 'Checking…' : 'Log in'}
        </Button>
      </form>
    </div>
  )
}

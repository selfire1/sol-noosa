'use server'

import { redirect } from 'next/navigation'

import { createSession, destroySession, verifyPassword } from '@/lib/auth'

export type LoginState = {
  error: string
} | null

export const login = async (_previous: LoginState, formData: FormData): Promise<LoginState> => {
  const password = String(formData.get('password') ?? '')
  if (!verifyPassword(password)) {
    return { error: 'That password didn’t work. Please try again.' }
  }
  await createSession()
  redirect('/admin')
}

export const logout = async (): Promise<void> => {
  await destroySession()
  redirect('/admin/login')
}

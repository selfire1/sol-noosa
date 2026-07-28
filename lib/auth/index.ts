import { timingSafeEqual } from 'node:crypto'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { ENV } from 'varlock/env'

import { SESSION_COOKIE, createSessionToken, verifySessionToken } from './session'

export { SESSION_COOKIE }

const SESSION_DAYS = 30
const DAY_MS = 24 * 60 * 60 * 1000

export const verifyPassword = (password: string): boolean => {
  const expected = Buffer.from(ENV.ADMIN_PASSWORD)
  const received = Buffer.from(password)
  if (expected.length !== received.length) {
    return false
  }
  return timingSafeEqual(expected, received)
}

export const createSession = async (): Promise<void> => {
  const expiresAt = Date.now() + SESSION_DAYS * DAY_MS
  const token = createSessionToken({ expiresAt }, ENV.ADMIN_PASSWORD)
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  })
}

export const destroySession = async (): Promise<void> => {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE)
}

export const hasValidSession = async (): Promise<boolean> => {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_COOKIE)?.value
  if (!token) {
    return false
  }
  return verifySessionToken(token, ENV.ADMIN_PASSWORD, Date.now())
}

export const requireAdmin = async (): Promise<void> => {
  const valid = await hasValidSession()
  if (!valid) {
    redirect('/admin/login')
  }
}

import { createHmac, timingSafeEqual } from 'node:crypto'

export const SESSION_COOKIE = 'sol_admin_session'

export type SessionPayload = {
  expiresAt: number
}

const sign = (data: string, secret: string) => {
  return createHmac('sha256', `sol-noosa-session:${secret}`).update(data).digest('base64url')
}

export const createSessionToken = (payload: SessionPayload, secret: string): string => {
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${encoded}.${sign(encoded, secret)}`
}

export const verifySessionToken = (token: string, secret: string, now: number): boolean => {
  const parts = token.split('.')
  if (parts.length !== 2 || parts[0].length === 0 || parts[1].length === 0) {
    return false
  }
  const [encoded, signature] = parts
  const expected = Buffer.from(sign(encoded, secret))
  const received = Buffer.from(signature)
  if (expected.length !== received.length || !timingSafeEqual(expected, received)) {
    return false
  }
  try {
    const payload = JSON.parse(Buffer.from(encoded, 'base64url').toString()) as SessionPayload
    if (typeof payload.expiresAt !== 'number') {
      return false
    }
    return now < payload.expiresAt
  } catch {
    return false
  }
}

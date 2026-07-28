import { describe, expect, test } from 'bun:test'

import { createSessionToken, verifySessionToken } from './session'

const DAY = 24 * 60 * 60 * 1000
const now = 1_753_747_200_000
const secret = 'correct-horse-battery-staple'

describe('session tokens', () => {
  test('a freshly signed token verifies against the same secret', () => {
    const token = createSessionToken({ expiresAt: now + 30 * DAY }, secret)
    expect(verifySessionToken(token, secret, now)).toBe(true)
  })

  test('a token signed with one secret fails against a different secret', () => {
    const token = createSessionToken({ expiresAt: now + 30 * DAY }, secret)
    expect(verifySessionToken(token, 'rotated-password', now)).toBe(false)
  })

  test('an expired token fails verification', () => {
    const token = createSessionToken({ expiresAt: now + DAY }, secret)
    expect(verifySessionToken(token, secret, now + 2 * DAY)).toBe(false)
  })

  test('a tampered payload with the original signature fails', () => {
    const token = createSessionToken({ expiresAt: now + DAY }, secret)
    const [, signature] = token.split('.')
    const forged = Buffer.from(JSON.stringify({ expiresAt: now + 3650 * DAY })).toString(
      'base64url',
    )
    expect(verifySessionToken(`${forged}.${signature}`, secret, now)).toBe(false)
  })

  test('malformed or empty tokens fail without throwing', () => {
    const junk = ['', '.', 'abc', 'a.b.c', 'not-base64.!!!', `${'x'.repeat(10)}.`]
    for (const token of junk) {
      expect(verifySessionToken(token, secret, now)).toBe(false)
    }
  })
})

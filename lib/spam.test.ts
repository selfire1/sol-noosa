import { describe, expect, test } from 'bun:test'

import {
  MIN_SUBMIT_TIME_MS,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  checkRateLimit,
  isHoneypotFilled,
  isSubmittedTooFast,
  type RateLimitEntry,
} from './spam'

const now = 1_753_747_200_000

describe('honeypot', () => {
  test('a filled honeypot is classified as spam', () => {
    expect(isHoneypotFilled('http://spam.example')).toBe(true)
    expect(isHoneypotFilled('  x  ')).toBe(true)
  })

  test('an empty honeypot passes', () => {
    expect(isHoneypotFilled('')).toBe(false)
    expect(isHoneypotFilled('   ')).toBe(false)
  })
})

describe('submit timing', () => {
  test('a submission faster than the threshold is rejected', () => {
    expect(isSubmittedTooFast(now, now + MIN_SUBMIT_TIME_MS - 1)).toBe(true)
  })

  test('a submission at exactly the threshold boundary is accepted', () => {
    expect(isSubmittedTooFast(now, now + MIN_SUBMIT_TIME_MS)).toBe(false)
  })

  test('realistic timing passes', () => {
    expect(isSubmittedTooFast(now, now + 45_000)).toBe(false)
  })

  test('a missing or nonsense render timestamp is rejected', () => {
    expect(isSubmittedTooFast(Number.NaN, now)).toBe(true)
    expect(isSubmittedTooFast(0, now)).toBe(true)
    expect(isSubmittedTooFast(-5, now)).toBe(true)
  })
})

describe('rate limiting', () => {
  test('requests under the limit pass; the request that exceeds it is rejected', () => {
    let entry: RateLimitEntry | undefined
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      const result = checkRateLimit(entry, now + i)
      expect(result.allowed).toBe(true)
      entry = result.entry
    }
    const exceeded = checkRateLimit(entry, now + RATE_LIMIT_MAX)
    expect(exceeded.allowed).toBe(false)
  })

  test('the window resets after it elapses', () => {
    let entry: RateLimitEntry | undefined
    for (let i = 0; i <= RATE_LIMIT_MAX; i += 1) {
      entry = checkRateLimit(entry, now).entry
    }
    const afterWindow = checkRateLimit(entry, now + RATE_LIMIT_WINDOW_MS)
    expect(afterWindow.allowed).toBe(true)
    expect(afterWindow.entry.count).toBe(1)
  })

  test('counters for different IPs do not interfere', () => {
    const counters = new Map<string, RateLimitEntry>()
    for (let i = 0; i <= RATE_LIMIT_MAX + 1; i += 1) {
      const result = checkRateLimit(counters.get('1.1.1.1'), now + i)
      counters.set('1.1.1.1', result.entry)
    }
    const blocked = checkRateLimit(counters.get('1.1.1.1'), now + 100)
    const fresh = checkRateLimit(counters.get('2.2.2.2'), now + 100)
    expect(blocked.allowed).toBe(false)
    expect(fresh.allowed).toBe(true)
  })
})

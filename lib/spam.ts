export const MIN_SUBMIT_TIME_MS = 3000
export const RATE_LIMIT_MAX = 5
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000

export type RateLimitEntry = {
  count: number
  windowStart: number
}

export const isHoneypotFilled = (value: string): boolean => {
  return value.trim().length > 0
}

export const isSubmittedTooFast = (
  renderedAt: number,
  submittedAt: number,
  minSubmitTimeMs = MIN_SUBMIT_TIME_MS,
): boolean => {
  if (!Number.isFinite(renderedAt) || renderedAt <= 0) {
    return true
  }
  return submittedAt - renderedAt < minSubmitTimeMs
}

export const checkRateLimit = (
  entry: RateLimitEntry | undefined,
  now: number,
  max = RATE_LIMIT_MAX,
  windowMs = RATE_LIMIT_WINDOW_MS,
): { allowed: boolean; entry: RateLimitEntry } => {
  if (!entry || now - entry.windowStart >= windowMs) {
    return { allowed: true, entry: { count: 1, windowStart: now } }
  }
  const count = entry.count + 1
  return { allowed: count <= max, entry: { ...entry, count } }
}

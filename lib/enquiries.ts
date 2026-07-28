'use server'

import { headers } from 'next/headers'

import { db } from '@/lib/db'
import { enquiries } from '@/lib/db/schema'
import { sendEnquiryNotification } from '@/lib/email'
import {
  checkRateLimit,
  isHoneypotFilled,
  isSubmittedTooFast,
  type RateLimitEntry,
} from '@/lib/spam'

export type EnquiryResult =
  | { status: 'success' }
  | { status: 'error'; message: string }
  | { status: 'invalid'; errors: Record<string, string> }

export type EnquiryValues = {
  fullName: string
  phoneNumber: string
  email: string
  message: string
}

const GENERIC_ERROR = 'Something went wrong sending your message. Please try again.'

// In-memory per-IP counters (KTD-10) — reset on deploy, fine at this traffic level.
const rateCounters = new Map<string, RateLimitEntry>()

const validate = (values: EnquiryValues): Record<string, string> => {
  const errors: Record<string, string> = {}
  if (values.fullName.trim().length === 0) {
    errors.fullName = 'Please tell us your name.'
  }
  if (values.phoneNumber.trim().length === 0) {
    errors.phoneNumber = 'Please add a phone number.'
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = 'That email address doesn’t look right.'
  }
  if (values.message.trim().length === 0) {
    errors.message = 'Let us know what you’re after.'
  }
  return errors
}

export const submitEnquiry = async (
  values: EnquiryValues,
  honeypot: string,
  renderedAt: number,
): Promise<EnquiryResult> => {
  if (isHoneypotFilled(honeypot)) {
    // Silent discard — a bot that gets an error learns to retry differently.
    return { status: 'success' }
  }
  if (isSubmittedTooFast(renderedAt, Date.now())) {
    return { status: 'error', message: GENERIC_ERROR }
  }

  const headerStore = await headers()
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const rate = checkRateLimit(rateCounters.get(ip), Date.now())
  rateCounters.set(ip, rate.entry)
  if (!rate.allowed) {
    return { status: 'error', message: GENERIC_ERROR }
  }

  const errors = validate(values)
  if (Object.keys(errors).length > 0) {
    return { status: 'invalid', errors }
  }

  const cleaned = {
    fullName: values.fullName.trim(),
    phoneNumber: values.phoneNumber.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  }
  let receivedAt: Date
  try {
    const inserted = await db
      .insert(enquiries)
      .values(cleaned)
      .returning({ receivedAt: enquiries.receivedAt })
    receivedAt = inserted[0]?.receivedAt ?? new Date()
  } catch (error) {
    console.error('Failed to store enquiry', error)
    return { status: 'error', message: GENERIC_ERROR }
  }

  await sendEnquiryNotification({ ...cleaned, receivedAt })

  return { status: 'success' }
}

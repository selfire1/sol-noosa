import { describe, expect, test } from 'bun:test'

import { deriveFleetBlurb } from './fleet'

const car = (pricePerDay: number, published = true) => {
  return { pricePerDay, published }
}

describe('deriveFleetBlurb', () => {
  test('five-car fleet names five cars and the minimum price', () => {
    const blurb = deriveFleetBlurb([car(89), car(119), car(79), car(69), car(149)])
    expect(blurb).toBe('Five cars, all local, all yours from $69 a day.')
  })

  test('single-car fleet uses singular phrasing', () => {
    const blurb = deriveFleetBlurb([car(99)])
    expect(blurb).toContain('One car,')
    expect(blurb).not.toContain('1 cars')
    expect(blurb).toContain('$99')
  })

  test('empty fleet returns a fallback with no price', () => {
    const blurb = deriveFleetBlurb([])
    expect(blurb).not.toContain('$')
    expect(blurb).not.toContain('Infinity')
    expect(blurb).not.toContain('0 cars')
  })

  test('minimum price ignores unpublished cheaper cars', () => {
    const blurb = deriveFleetBlurb([car(89), car(119), car(49, false)])
    expect(blurb).toBe('Two cars, all local, all yours from $89 a day.')
  })

  test('counts beyond twelve fall back to numerals', () => {
    const fleet = Array.from({ length: 13 }, () => {
      return car(59)
    })
    expect(deriveFleetBlurb(fleet)).toBe('13 cars, all local, all yours from $59 a day.')
  })
})

import { describe, expect, it } from 'vitest'
import { formatHeight, formatMass } from './units'

describe('formatHeight', () => {
  it('returns the raw value for the cm unit', () => {
    expect(formatHeight('172', 'cm')).toBe('172')
  })

  it('converts centimeters to meters for the m unit', () => {
    expect(formatHeight('172', 'm')).toBe('1.72')
  })

  it('handles a comma-formatted value', () => {
    expect(formatHeight('1,000', 'm')).toBe('10.00')
  })

  it.each(['unknown', 'n/a', ''])('returns a non-numeric value (%s) as-is', (raw) => {
    expect(formatHeight(raw, 'm')).toBe(raw)
    expect(formatHeight(raw, 'cm')).toBe(raw)
  })
})

describe('formatMass', () => {
  it('returns the raw value for the kg unit', () => {
    expect(formatMass('77', 'kg')).toBe('77')
  })

  it('converts kilograms to pounds for the lb unit', () => {
    expect(formatMass('77', 'lb')).toBe('169.8')
  })

  it('handles a comma-formatted value', () => {
    expect(formatMass('1,358', 'kg')).toBe('1358')
  })

  it.each(['unknown', 'n/a', ''])('returns a non-numeric value (%s) as-is', (raw) => {
    expect(formatMass(raw, 'lb')).toBe(raw)
    expect(formatMass(raw, 'kg')).toBe(raw)
  })
})

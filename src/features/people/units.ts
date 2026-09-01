export type HeightUnit = 'cm' | 'm'
export type MassUnit = 'kg' | 'lb'

const CM_PER_M = 100
const LB_PER_KG = 2.20462

function parseNumeric(raw: string): number | null {
  const normalized = raw.replace(/,/g, '').trim()
  if (normalized === '') {
    return null
  }
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

// SWAPI's height and mass strings can be "unknown" or "n/a" (or contain a comma, e.g. "1,358");
// parseNumeric returning null for those means they're displayed as-is instead of being run
// through a conversion. The API's own unit (centimeters for height, kilograms for mass) is always
// the source of truth: these functions only ever format that same source value for display.
export function formatHeight(raw: string, unit: HeightUnit): string {
  const centimeters = parseNumeric(raw)
  if (centimeters === null) {
    return raw
  }
  return unit === 'cm' ? String(centimeters) : (centimeters / CM_PER_M).toFixed(2)
}

export function formatMass(raw: string, unit: MassUnit): string {
  const kilograms = parseNumeric(raw)
  if (kilograms === null) {
    return raw
  }
  return unit === 'kg' ? String(kilograms) : (kilograms * LB_PER_KG).toFixed(1)
}

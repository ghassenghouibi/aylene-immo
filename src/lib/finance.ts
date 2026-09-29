/** Simulateur de financement : mensualité d'un crédit amortissable classique. */
export const DEFAULT_RATE = 8.5 // % annuel (indicatif)

export function monthly(principal: number, annualRate: number, years: number): number {
  if (principal <= 0) return 0
  const r = annualRate / 100 / 12
  const n = years * 12
  if (r === 0) return principal / n
  return (principal * r) / (1 - Math.pow(1 + r, -n))
}

export function plan(price: number, apportPct: number, years: number, rate = DEFAULT_RATE) {
  const apport = Math.round(price * (apportPct / 100))
  const borrowed = price - apport
  const m = Math.round(monthly(borrowed, rate, years))
  const total = m * years * 12
  const interest = Math.max(0, total - borrowed)
  /** Revenu mensuel net conseillé pour rester sous 40 % d'endettement */
  const income = Math.round(m / 0.4)
  return { apport, borrowed, monthly: m, total, interest, income }
}

/** Frais d'acquisition indicatifs (droits d'enregistrement, conservation foncière, honoraires). */
export function acquisitionFees(price: number) {
  const enregistrement = Math.round(price * 0.06)
  const conservation = Math.round(price * 0.01)
  const notaire = Math.round(Math.min(Math.max(price * 0.01, 1500), 15000))
  return { enregistrement, conservation, notaire, total: enregistrement + conservation + notaire }
}

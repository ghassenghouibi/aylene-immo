import { zoneBySlug } from '../data/zones'
import type { Categorie, Etat } from '../data/listings'

export interface EstimateInput {
  transaction: 'Vente' | 'Location'
  zone: string
  type: Categorie
  surface: number
  terrain?: number
  chambres?: number
  etat: Etat
  extras: string[]
  etage?: 'rdc' | 'inter' | 'dernier'
}

export const EXTRAS: { key: string; label: string; coef: number }[] = [
  { key: 'piscine', label: 'Piscine', coef: 0.08 },
  { key: 'vue-mer', label: 'Vue mer / lac', coef: 0.1 },
  { key: 'jardin', label: 'Jardin', coef: 0.04 },
  { key: 'terrasse', label: 'Terrasse > 20 m²', coef: 0.04 },
  { key: 'parking', label: 'Parking / garage', coef: 0.03 },
  { key: 'ascenseur', label: 'Ascenseur', coef: 0.02 },
  { key: 'gardiennage', label: 'Résidence gardée', coef: 0.03 },
]

const ETAT_COEF: Record<Etat, number> = { neuf: 1.12, renove: 1.06, bon: 1, 'a-rafraichir': 0.86 }
const TYPE_COEF: Record<Categorie, number> = { Appartement: 1, Duplex: 1.04, Villa: 1.08, Terrain: 0.45, Bureau: 1.05 }
const ETAGE_COEF = { rdc: 0.96, inter: 1, dernier: 1.05 }

/**
 * Estimation simplifiée : médiane du quartier × surface × coefficients.
 * Retourne une fourchette (±6 %) et le détail des ajustements pour l'afficher.
 */
export function estimate(i: EstimateInput) {
  const z = zoneBySlug(i.zone)
  if (!z || !i.surface) return null
  const base = i.transaction === 'Location' ? z.loyerM2 : z.venteM2
  const steps: { label: string; pct: number }[] = []
  let coef = 1
  const t = TYPE_COEF[i.type]
  if (t !== 1) { coef *= t; steps.push({ label: i.type, pct: (t - 1) * 100 }) }
  if (i.type !== 'Terrain') {
    const e = ETAT_COEF[i.etat]
    if (e !== 1) { coef *= e; steps.push({ label: { neuf: 'Neuf', renove: 'Rénové', bon: 'Bon état', 'a-rafraichir': 'À rafraîchir' }[i.etat], pct: (e - 1) * 100 }) }
    if (i.etage && i.type === 'Appartement') {
      const f = ETAGE_COEF[i.etage]
      if (f !== 1) { coef *= f; steps.push({ label: i.etage === 'rdc' ? 'Rez-de-chaussée' : 'Dernier étage', pct: (f - 1) * 100 }) }
    }
    for (const x of EXTRAS) if (i.extras.includes(x.key)) { coef *= 1 + x.coef; steps.push({ label: x.label, pct: x.coef * 100 }) }
    // Dégressivité des grandes surfaces
    if (i.surface > 250 && i.type !== 'Villa') { coef *= 0.95; steps.push({ label: 'Grande surface', pct: -5 }) }
  }
  let value = base * i.surface * coef
  if (i.type === 'Villa' && i.terrain) {
    const land = Math.max(0, i.terrain - i.surface) * base * 0.25
    value += land
    steps.push({ label: `Terrain (${Math.max(0, i.terrain - i.surface)} m² libres)`, pct: Math.round((land / (base * i.surface * coef)) * 100) })
  }
  const round = (n: number) => (i.transaction === 'Location' ? Math.round(n / 50) * 50 : Math.round(n / 5000) * 5000)
  return {
    low: round(value * 0.94),
    mid: round(value),
    high: round(value * 1.06),
    perM2: Math.round(value / i.surface),
    median: base,
    steps,
    zone: z,
  }
}

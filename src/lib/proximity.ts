import { CAT_LABEL, CAT_SHORT, CAT_WEIGHT, POIS, type Poi, type PoiCat } from '../data/lieux'
import type { Listing } from '../data/listings'

const CAT_ORDER: PoiCat[] = ['commerces', 'ecoles', 'transport', 'sante', 'loisirs', 'services']

/** Vitesse de marche retenue : 80 m/min (≈ 4,8 km/h). */
export const walkMin = (m: number) => Math.max(1, Math.round(m / 80))
/** Trajet voiture en ville : ≈ 500 m/min. */
export const driveMin = (m: number) => Math.max(1, Math.round(m / 500))

/** Distance lisible : « 280 m · 4 min à pied » ou « 11 km · 22 min en voiture ». */
export function distanceLabel(m: number): { dist: string; time: string; onFoot: boolean } {
  const onFoot = m <= 2000
  return {
    dist: m >= 1000 ? `${(m / 1000).toLocaleString('fr-FR', { maximumFractionDigits: 1 })} km` : `${m} m`,
    time: onFoot ? `${walkMin(m)} min à pied` : `${driveMin(m)} min en voiture`,
    onFoot,
  }
}

/**
 * Lieux du bien : ceux de son quartier, complétés (ou rapprochés) par les
 * `proximite` propres au bien. À label identique, l'entrée du bien gagne.
 */
export function poisFor(l: Listing): Poi[] {
  const base = POIS[l.zone] ?? []
  const own = l.proximite ?? []
  const ownLabels = new Set(own.map((p) => p.label))
  return [...own, ...base.filter((p) => !ownLabels.has(p.label))].sort((a, b) => a.m - b.m)
}

/** Lieux regroupés par catégorie, dans l'ordre d'affichage, les plus proches d'abord. */
export function poisByCat(l: Listing): { cat: PoiCat; label: string; short: string; items: Poi[]; nearest: number }[] {
  const all = poisFor(l)
  return CAT_ORDER
    .map((cat) => {
      const items = all.filter((p) => p.cat === cat)
      return { cat, label: CAT_LABEL[cat], short: CAT_SHORT[cat], items, nearest: items[0]?.m ?? Infinity }
    })
    .filter((g) => g.items.length > 0)
}

/** Note d'une catégorie (0 – 100) d'après la distance du lieu le plus proche. */
function catScore(m: number): number {
  if (m <= 250) return 100
  if (m <= 500) return 90
  if (m <= 800) return 78
  if (m <= 1200) return 64
  if (m <= 2000) return 48
  if (m <= 3500) return 30
  return 15
}

export interface DailyLife {
  score: number
  label: string
  /** Note par catégorie, pour la barre de détail */
  parts: { cat: PoiCat; label: string; score: number; nearest: number }[]
  /** Lieu le plus proche toutes catégories confondues, hors services */
  highlight?: Poi
}

/**
 * « Score de vie quotidienne » : moyenne pondérée des six catégories,
 * calculée sur la distance du lieu le plus proche de chacune.
 * Une catégorie absente du quartier est comptée 20.
 */
export function dailyLife(l: Listing): DailyLife {
  const groups = poisByCat(l)
  const byCat = new Map(groups.map((g) => [g.cat, g]))
  let sum = 0
  let weights = 0
  const parts = CAT_ORDER.map((cat) => {
    const g = byCat.get(cat)
    const score = g ? catScore(g.nearest) : 20
    sum += score * CAT_WEIGHT[cat]
    weights += CAT_WEIGHT[cat]
    return { cat, label: CAT_LABEL[cat], score, nearest: g?.nearest ?? Infinity }
  })
  const score = Math.round(sum / weights)
  const label =
    score >= 85 ? 'Tout à pied' :
    score >= 70 ? 'Très bien desservi' :
    score >= 55 ? 'Bien desservi' :
    score >= 40 ? 'Voiture utile' : 'Voiture indispensable'
  const highlight = poisFor(l).find((p) => p.cat === 'commerces' || p.cat === 'transport')
  return { score, label, parts, highlight }
}

export { CAT_LABEL, CAT_SHORT }
export type { Poi, PoiCat }

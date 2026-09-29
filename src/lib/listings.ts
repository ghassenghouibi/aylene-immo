import { LISTINGS, type Categorie, type Listing, type Transaction } from '../data/listings'
import { ZONES, zoneBySlug, type Zone } from '../data/zones'
import { trustOf } from './trust'
import { dailyLife } from './proximity'

export type Rubrique = 'acheter' | 'louer'
export const RUBRIQUE_LABEL: Record<Rubrique, string> = { acheter: 'Acheter', louer: 'Louer' }
export const RUBRIQUE_TITLE: Record<Rubrique, string> = { acheter: 'Biens à vendre', louer: 'Biens à louer' }
export const rubriqueOf = (l: Listing): Rubrique => (l.transaction === 'Location' ? 'louer' : 'acheter')

export const CATEGORIES: Categorie[] = ['Appartement', 'Villa', 'Duplex', 'Terrain', 'Bureau']
export const BUDGETS_VENTE = [300000, 500000, 750000, 1000000, 1500000, 2500000]
export const BUDGETS_LOCATION = [1500, 2000, 3000, 4000, 6000, 10000]

export const fmt = (n: number) => n.toLocaleString('fr-FR')
export const formatPrice = (l: Listing) => ({ main: `${fmt(l.prix)} DT`, suffix: l.transaction === 'Location' ? '/ mois' : '' })
export const priceCompact = (n: number) => (n >= 1_000_000 ? `${(n / 1_000_000).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} M DT` : `${fmt(n)} DT`)

export const zoneOf = (l: Listing): Zone => zoneBySlug(l.zone) ?? ZONES[0]
export const byId = (id: string) => LISTINGS.find((l) => l.id === id)
export const zoneCount = (z: Zone, t?: Transaction) => LISTINGS.filter((l) => l.zone === z.slug && l.disponible && (!t || l.transaction === t)).length

export function perM2(l: Listing): number {
  return Math.round(l.prix / l.surface)
}

/**
 * Indice « Prix juste » : écart (%) entre le prix/m² du bien et la médiane du quartier.
 * Négatif = sous la médiane. Terrains : 45 % de la médiane bâtie ; villas : médiane × 1,3.
 */
export function priceIndex(l: Listing): { diff: number; median: number; label: string; tone: 'good' | 'fair' | 'high' } {
  const z = zoneOf(l)
  let median = l.transaction === 'Location' ? z.loyerM2 : z.venteM2
  if (l.categorie === 'Terrain') median = Math.round(median * 0.45)
  if (l.categorie === 'Bureau') median = Math.round(median * 1.05)
  if (l.categorie === 'Villa') median = Math.round(median * 1.3) // prime villa (terrain, indépendance)
  const diff = Math.round(((perM2(l) - median) / median) * 100)
  const tone = diff <= -3 ? 'good' : diff <= 8 ? 'fair' : 'high'
  const label = diff <= -3 ? 'Sous la médiane du quartier' : diff <= 8 ? 'Dans la médiane du quartier' : 'Au-dessus de la médiane (prestations rares)'
  return { diff, median, label, tone }
}

export const daysOnline = (l: Listing) => Math.max(0, Math.round((Date.now() - new Date(l.ajout).getTime()) / 86400000))

export interface Filters {
  rubrique: Rubrique
  zone?: string
  type?: string
  budgetMax?: number
  pieces?: number
  surfaceMin?: number
  dossierComplet?: boolean
  exclu?: boolean
  /** Ne garder que les biens dont le score de vie quotidienne est élevé (≥ 70) */
  aPied?: boolean
  sort?: 'recent' | 'prix-asc' | 'prix-desc' | 'prix-m2' | 'surface' | 'proximite'
  q?: string
}

export function applyFilters(all: Listing[], f: Filters): Listing[] {
  let r = all.filter((l) => rubriqueOf(l) === f.rubrique)
  if (f.zone) r = r.filter((l) => l.zone === f.zone)
  if (f.type) r = r.filter((l) => l.categorie === f.type)
  if (f.budgetMax) r = r.filter((l) => l.prix <= f.budgetMax!)
  if (f.pieces) r = r.filter((l) => (l.chambres ?? 0) >= f.pieces!)
  if (f.surfaceMin) r = r.filter((l) => l.surface >= f.surfaceMin!)
  if (f.dossierComplet) r = r.filter((l) => trustOf(l).level === 'complet')
  if (f.exclu) r = r.filter((l) => l.exclusivite)
  if (f.aPied) r = r.filter((l) => dailyLife(l).score >= 70)
  if (f.q) {
    const q = f.q.toLowerCase()
    r = r.filter((l) => [l.titre, l.adresse, l.reference, zoneOf(l).name, ...l.features].join(' ').toLowerCase().includes(q))
  }
  const sort = f.sort ?? 'recent'
  r = [...r].sort((a, b) => {
    if (a.disponible !== b.disponible) return a.disponible ? -1 : 1
    switch (sort) {
      case 'prix-asc': return a.prix - b.prix
      case 'prix-desc': return b.prix - a.prix
      case 'prix-m2': return priceIndex(a).diff - priceIndex(b).diff
      case 'surface': return b.surface - a.surface
      case 'proximite': return dailyLife(b).score - dailyLife(a).score
      default: return b.ajout.localeCompare(a.ajout)
    }
  })
  return r
}

/** Biens comparables : même rubrique, même zone ou même catégorie, budget ±35 %. */
export function similar(l: Listing, n = 3): Listing[] {
  return LISTINGS
    .filter((o) => o.id !== l.id && o.disponible && o.transaction === l.transaction)
    .map((o) => ({ o, s: (o.zone === l.zone ? 2 : 0) + (o.categorie === l.categorie ? 1 : 0) + (Math.abs(o.prix - l.prix) / l.prix < 0.35 ? 1 : 0) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((x) => x.o)
}

export { LISTINGS, ZONES }
export type { Listing, Zone }

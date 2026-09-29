import type { DossierKey, Listing } from '../data/listings'

/** Les six pièces du « dossier de confiance » Aylene. */
export const DOSSIER_ITEMS: { key: DossierKey; label: string; detail: string; location?: boolean }[] = [
  { key: 'titre', label: 'Titre de propriété', detail: 'Titre foncier consulté et identité du vendeur vérifiée', location: true },
  { key: 'plan', label: 'Plan & surfaces', detail: 'Plan architectural et surfaces mesurées sur place' },
  { key: 'hypotheque', label: 'Absence d\'hypothèque', detail: 'Certificat de propriété récent, aucune inscription en cours' },
  { key: 'copro', label: 'Copropriété', detail: 'PV des assemblées, règlement et état des charges', location: true },
  { key: 'taxes', label: 'Taxes & charges', detail: 'Quittances de taxe municipale et charges à jour' },
  { key: 'conformite', label: 'Conformité', detail: 'Permis de bâtir et conformité au plan d\'urbanisme', location: true },
]

/** Pièces applicables selon le type de transaction (une location demande moins de pièces). */
export function applicableItems(l: Listing) {
  return DOSSIER_ITEMS.filter((it) => l.transaction === 'Vente' || it.location)
}

export type TrustLevel = 'complet' | 'avance' | 'en-cours'

export function trustOf(l: Listing): { level: TrustLevel; label: string; done: number; total: number; pct: number } {
  const items = applicableItems(l)
  const done = items.filter((it) => l.dossier.includes(it.key)).length
  const total = items.length
  const pct = Math.round((done / total) * 100)
  const level: TrustLevel = done === total ? 'complet' : done >= total - 2 ? 'avance' : 'en-cours'
  const label = level === 'complet' ? 'Dossier complet' : level === 'avance' ? 'Dossier avancé' : 'Dossier en cours'
  return { level, label, done, total, pct }
}

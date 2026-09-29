import type { Listing } from '../data/listings'
import { applicableItems, trustOf } from '../lib/trust'
import { priceIndex } from '../lib/listings'
import { Check, Clock, Shield, Trend } from './Icons'

/** Pastille « Dossier complet / avancé / en cours ». */
export function TrustBadge({ listing, compact = false }: { listing: Listing; compact?: boolean }) {
  const t = trustOf(listing)
  return (
    <span className={`trust trust-${t.level}`} title={`${t.done} pièces vérifiées sur ${t.total}`}>
      <Shield size={14} /> {compact ? `${t.done}/${t.total}` : t.label}
    </span>
  )
}

/** Indicateur « Prix juste » : écart au m² vs médiane du quartier. */
export function PriceIndex({ listing, long = false }: { listing: Listing; long?: boolean }) {
  const p = priceIndex(listing)
  const sign = p.diff > 0 ? '+' : ''
  return (
    <span className={`pidx pidx-${p.tone}`} title={p.label}>
      <Trend size={14} /> {sign}{p.diff} % {long ? `vs médiane du quartier` : 'vs quartier'}
    </span>
  )
}

/** Checklist complète du dossier de confiance (fiche du bien). */
export function TrustChecklist({ listing }: { listing: Listing }) {
  const t = trustOf(listing)
  const items = applicableItems(listing)
  return (
    <div className="card card-pad">
      <div className="row between wrap">
        <div>
          <div className="eyebrow" style={{ marginBottom: 6 }}>Dossier de confiance</div>
          <div className="h-card">{t.label} · {t.done}/{t.total} pièces</div>
        </div>
        <TrustBadge listing={listing} />
      </div>
      <div className="bar mt-16"><i style={{ width: `${t.pct}%`, background: t.level === 'complet' ? 'var(--sage)' : t.level === 'avance' ? 'var(--blue)' : 'var(--sand)' }} /></div>
      <ul className="col mt-24" style={{ gap: 14 }}>
        {items.map((it) => {
          const ok = listing.dossier.includes(it.key)
          return (
            <li key={it.key} className="row" style={{ alignItems: 'flex-start', gap: 12 }}>
              <span style={{ flex: 'none', width: 26, height: 26, borderRadius: '50%', display: 'grid', placeItems: 'center', background: ok ? 'var(--sage-soft)' : 'var(--sand-soft)', color: ok ? '#2f5a3f' : '#7a5a2a' }}>
                {ok ? <Check size={14} /> : <Clock size={14} />}
              </span>
              <span>
                <strong style={{ display: 'block', fontSize: 14.5 }}>{it.label}</strong>
                <span className="small muted">{ok ? it.detail : 'En cours de collecte auprès du propriétaire'}</span>
              </span>
            </li>
          )
        })}
      </ul>
      <p className="small muted mt-24">Chaque pièce est consultée par notre conseillère juridique avant la mise en ligne. Les originaux sont présentés lors de la visite.</p>
    </div>
  )
}

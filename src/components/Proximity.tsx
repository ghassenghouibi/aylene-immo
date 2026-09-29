import { useState } from 'react'
import type { Listing } from '../data/listings'
import type { PoiCat } from '../data/lieux'
import { dailyLife, distanceLabel, poisByCat } from '../lib/proximity'
import { Bag, Bank, Bus, Cap, Cross, Pin, Tree } from './Icons'
import './Proximity.css'

const CAT_ICON: Record<PoiCat, React.ReactNode> = {
  commerces: <Bag size={16} />,
  ecoles: <Cap size={16} />,
  transport: <Bus size={16} />,
  sante: <Cross size={16} />,
  loisirs: <Tree size={16} />,
  services: <Bank size={16} />,
}

/** Bloc « À proximité » de la fiche : score de vie quotidienne + lieux par catégorie. */
export default function Proximity({ listing }: { listing: Listing }) {
  const groups = poisByCat(listing)
  const dl = dailyLife(listing)
  const [open, setOpen] = useState(false)
  const tone = dl.score >= 80 ? 'good' : dl.score >= 55 ? 'fair' : 'low'

  return (
    <div>
      <div className={`prox-score prox-${tone}`}>
        <div className="prox-gauge" style={{ ['--v' as string]: `${dl.score * 3.6}deg` }}>
          <span className="num">{dl.score}</span>
        </div>
        <div>
          <div className="h-card">{dl.label}</div>
          <p className="small muted mt-8">
            Score de vie quotidienne calculé sur la distance à pied des commerces, écoles, transports, santé, loisirs et services.
            {dl.highlight && <> Le plus proche : <strong>{dl.highlight.label}</strong>, à {distanceLabel(dl.highlight.m).time}.</>}
          </p>
          <ul className="prox-parts mt-16">
            {dl.parts.map((p) => (
              <li key={p.cat}>
                <span className="small">{p.label}</span>
                <span className="bar"><i style={{ width: `${p.score}%` }} /></span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="prox-grid mt-24">
        {groups.map((g) => {
          const items = open ? g.items : g.items.slice(0, 3)
          return (
            <div key={g.cat} className="prox-cat card">
              <div className="prox-cat-head">
                <span className="prox-ic">{CAT_ICON[g.cat]}</span>
                <span className="tiny">{g.short}</span>
              </div>
              <ul>
                {items.map((p) => {
                  const d = distanceLabel(p.m)
                  return (
                    <li key={p.label}>
                      <span className="prox-name">
                        {p.label}
                        {p.note && <span className="prox-note">{p.note}</span>}
                      </span>
                      <span className={`prox-dist ${d.onFoot ? 'on-foot' : ''}`}>
                        <span className="num">{d.dist}</span>
                        <span className="small muted">{d.time}</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
              {!open && g.items.length > 3 && <span className="small muted prox-more">+ {g.items.length - 3} autre{g.items.length - 3 > 1 ? 's' : ''}</span>}
            </div>
          )
        })}
      </div>

      <div className="row between wrap mt-16" style={{ gap: 12 }}>
        <button className="btn btn-outline btn-sm" onClick={() => setOpen((o) => !o)}>
          {open ? 'Réduire la liste' : 'Voir tous les lieux à proximité'}
        </button>
        <span className="small muted row" style={{ gap: 6 }}><Pin size={14} /> Distances à pied depuis l'adresse du bien, vérifiées par le conseiller.</span>
      </div>
    </div>
  )
}

/** Version compacte pour la carte d'annonce : le commerce ou le transport le plus proche. */
export function ProximityHint({ listing }: { listing: Listing }) {
  const dl = dailyLife(listing)
  if (!dl.highlight) return null
  const d = distanceLabel(dl.highlight.m)
  return (
    <span className="prox-hint" title={`${dl.highlight.label} — ${d.dist}`}>
      <Bag size={13} /> {dl.highlight.label} · {d.time}
    </span>
  )
}

import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/PropertyCard'
import { MapMock, Pagination } from '../components/Blocks'
import { ArrowRight, Bus, Chevron, Grid, Map, Pin, Shield, Sparkle, X } from '../components/Icons'
import {
  BUDGETS_LOCATION, BUDGETS_VENTE, CATEGORIES, LISTINGS, RUBRIQUE_LABEL, RUBRIQUE_TITLE, ZONES,
  applyFilters, fmt, zoneCount, type Filters, type Rubrique,
} from '../lib/listings'
import { zoneBySlug } from '../data/zones'
import { useFavorites } from '../hooks/useFavorites'
import './Listings.css'

const PER_PAGE = 12

function Dropdown({ label, active, children }: { label: string; active?: boolean; children: React.ReactNode }) {
  return (
    <details className={`fb-dd ${active ? 'on' : ''}`}>
      <summary className={`chip ${active ? 'on' : ''}`}>{label} <Chevron size={15} /></summary>
      <div className="fb-menu card">{children}</div>
    </details>
  )
}

export default function Listings({ rubrique, favoritesOnly = false }: { rubrique: Rubrique; favoritesOnly?: boolean }) {
  const [sp, setSp] = useSearchParams()
  const { ids: favIds } = useFavorites()
  const [view, setView] = useState<'grid' | 'map'>('grid')

  const f: Filters = {
    rubrique,
    zone: sp.get('zone') ?? undefined,
    type: sp.get('type') ?? undefined,
    budgetMax: Number(sp.get('budget')) || undefined,
    pieces: Number(sp.get('pieces')) || undefined,
    surfaceMin: Number(sp.get('surface')) || undefined,
    dossierComplet: sp.get('dossier') === '1',
    exclu: sp.get('exclu') === '1',
    aPied: sp.get('apied') === '1',
    sort: (sp.get('sort') as Filters['sort']) ?? 'recent',
    q: sp.get('q') ?? undefined,
  }
  const page = Math.max(1, Number(sp.get('page')) || 1)

  const set = (key: string, value?: string | number | boolean) => {
    const next = new URLSearchParams(sp)
    if (value === undefined || value === '' || value === false || value === 0) next.delete(key)
    else next.set(key, String(value === true ? 1 : value))
    if (key !== 'page') next.delete('page')
    setSp(next)
  }
  const clear = () => setSp(new URLSearchParams())

  const results = useMemo(() => {
    if (favoritesOnly) return LISTINGS.filter((l) => favIds.includes(l.id))
    return applyFilters(LISTINGS, f)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp, rubrique, favoritesOnly, favIds])

  const pages = Math.ceil(results.length / PER_PAGE)
  const shown = results.slice((page - 1) * PER_PAGE, page * PER_PAGE)
  const zone = f.zone ? zoneBySlug(f.zone) : undefined
  const budgets = rubrique === 'louer' ? BUDGETS_LOCATION : BUDGETS_VENTE
  const activeCount = ['zone', 'type', 'budget', 'pieces', 'surface', 'dossier', 'exclu', 'apied'].filter((k) => sp.get(k)).length

  useEffect(() => { window.scrollTo({ top: 0 }) }, [page, rubrique])

  const title = favoritesOnly ? 'Mes favoris' : zone ? `${RUBRIQUE_TITLE[rubrique]} à ${zone.name}` : `${RUBRIQUE_TITLE[rubrique]} dans le Grand Tunis`

  return (
    <>
      {!favoritesOnly && (
        <div className="fb">
          <div className="container fb-row">
            {zone ? (
              <button className="chip on" onClick={() => set('zone')}><Pin size={15} /> {zone.name} <X size={14} /></button>
            ) : (
              <Dropdown label="Quartier">
                {ZONES.map((z) => <button key={z.slug} onClick={() => set('zone', z.slug)}>{z.name} <span className="muted">{zoneCount(z)}</span></button>)}
              </Dropdown>
            )}
            <Dropdown label={f.type ?? 'Type de bien'} active={!!f.type}>
              <button onClick={() => set('type')}>Tous les types</button>
              {CATEGORIES.map((c) => <button key={c} onClick={() => set('type', c)}>{c}</button>)}
            </Dropdown>
            <Dropdown label={f.budgetMax ? `≤ ${fmt(f.budgetMax)} DT` : 'Budget'} active={!!f.budgetMax}>
              <button onClick={() => set('budget')}>Tous les budgets</button>
              {budgets.map((b) => <button key={b} onClick={() => set('budget', b)}>Jusqu'à {fmt(b)} DT{rubrique === 'louer' ? ' / mois' : ''}</button>)}
            </Dropdown>
            <Dropdown label={f.pieces ? `${f.pieces}+ chambres` : 'Chambres'} active={!!f.pieces}>
              <button onClick={() => set('pieces')}>Indifférent</button>
              {[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => set('pieces', n)}>{n} chambre{n > 1 ? 's' : ''} et plus</button>)}
            </Dropdown>
            <Dropdown label={f.surfaceMin ? `≥ ${f.surfaceMin} m²` : 'Surface'} active={!!f.surfaceMin}>
              <button onClick={() => set('surface')}>Indifférent</button>
              {[80, 120, 160, 200, 300, 500].map((n) => <button key={n} onClick={() => set('surface', n)}>Plus de {n} m²</button>)}
            </Dropdown>
            <span className="fb-spacer" />
            <button className={`chip ${f.dossierComplet ? 'on' : ''}`} onClick={() => set('dossier', !f.dossierComplet)}><Shield size={15} /> Dossier complet</button>
            <button className={`chip ${f.exclu ? 'on' : ''}`} onClick={() => set('exclu', !f.exclu)}><Sparkle size={15} /> Exclusivités</button>
            <button className={`chip ${f.aPied ? 'on' : ''}`} onClick={() => set('apied', !f.aPied)} title="Commerces, écoles et transports à moins de 10 min à pied"><Bus size={15} /> Tout à pied</button>
            {activeCount > 0 && <button className="chip" onClick={clear}><X size={15} /> Effacer</button>}
          </div>
        </div>
      )}

      <div className="container lp">
        <div className="crumb"><Link to="/">Accueil</Link> · {favoritesOnly ? 'Favoris' : <Link to={`/${rubrique}`}>{RUBRIQUE_LABEL[rubrique]}</Link>}{zone ? ` · ${zone.name}` : ''}</div>
        <div className="lp-head">
          <div>
            <h1 className="h-section">{title}</h1>
            <p className="muted mt-8">
              {results.length} bien{results.length > 1 ? 's' : ''}
              {zone && rubrique === 'acheter' ? <> · médiane du quartier <strong className="num">{fmt(zone.venteM2)} DT/m²</strong></> : null}
              {zone && rubrique === 'louer' ? <> · loyer médian <strong className="num">{fmt(zone.loyerM2)} DT/m²/mois</strong></> : null}
            </p>
          </div>
          <div className="row wrap" style={{ gap: 10 }}>
            <label className="row" style={{ gap: 8 }}>
              <span className="small muted">Trier</span>
              <select className="select" style={{ height: 42, width: 'auto' }} value={f.sort} onChange={(e) => set('sort', e.target.value)}>
                <option value="recent">Plus récents</option>
                <option value="prix-m2">Meilleur prix au m² vs quartier</option>
                <option value="prix-asc">Prix croissant</option>
                <option value="prix-desc">Prix décroissant</option>
                <option value="surface">Surface</option>
                <option value="proximite">Proximité des commodités</option>
              </select>
            </label>
            <div className="seg">
              <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')} aria-label="Grille"><Grid size={16} /></button>
              <button className={view === 'map' ? 'on' : ''} onClick={() => setView('map')} aria-label="Carte"><Map size={16} /></button>
            </div>
          </div>
        </div>

        {results.length === 0 ? (
          <div className="card card-pad lp-empty">
            <div className="h-sub">{favoritesOnly ? 'Aucun favori pour le moment.' : 'Aucun bien ne correspond, pour l’instant.'}</div>
            <p className="muted mt-8">Nous publions peu, mais nous cherchons beaucoup. Décrivez votre projet et nous activons notre réseau hors-marché.</p>
            <div className="row wrap mt-24">
              <Link to="/recherche-sur-mesure" className="btn btn-primary">Recherche sur-mesure <ArrowRight size={16} /></Link>
              {!favoritesOnly && <button className="btn btn-outline" onClick={clear}>Effacer les filtres</button>}
            </div>
          </div>
        ) : view === 'map' ? (
          <div className="lp-map">
            <MapMock label={zone ? zone.name : 'Grand Tunis'} />
            <div className="lp-map-list">
              {shown.map((l) => <PropertyCard key={l.id} listing={l} compact />)}
            </div>
          </div>
        ) : (
          <div className="grid grid-3">
            {shown.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
        )}
        <Pagination page={page} pages={pages} onChange={(p) => set('page', p)} />

        {!favoritesOnly && (
          <div className="lp-note card card-soft card-pad mt-48">
            <Shield size={22} />
            <div>
              <strong>Pourquoi si peu d'annonces ?</strong>
              <p className="small muted mt-8">Nous ne publions un bien qu'après avoir consulté son titre de propriété et vérifié l'absence d'hypothèque. Cela prend quelques jours, et cela vous évite des semaines de mauvaises surprises. Les biens dont le dossier est encore en cours sont signalés comme tels.</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

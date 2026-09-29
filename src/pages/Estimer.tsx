import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Shield } from '../components/Icons'
import { Testimonials } from '../components/Blocks'
import { CATEGORIES, ZONES, fmt, priceCompact } from '../lib/listings'
import { EXTRAS, estimate, type EstimateInput } from '../lib/estimate'
import type { Categorie, Etat } from '../data/listings'
import './Static.css'

const ETATS: { key: Etat; label: string }[] = [
  { key: 'neuf', label: 'Neuf' }, { key: 'renove', label: 'Rénové' }, { key: 'bon', label: 'Bon état' }, { key: 'a-rafraichir', label: 'À rafraîchir' },
]

export default function Estimer() {
  const [i, setI] = useState<EstimateInput>({ transaction: 'Vente', zone: 'la-marsa', type: 'Appartement', surface: 120, terrain: 300, chambres: 3, etat: 'bon', extras: [], etage: 'inter' })
  const [step, setStep] = useState<1 | 2>(1)
  const [sent, setSent] = useState(false)
  const up = <K extends keyof EstimateInput>(k: K, v: EstimateInput[K]) => setI((s) => ({ ...s, [k]: v }))
  const toggleExtra = (k: string) => up('extras', i.extras.includes(k) ? i.extras.filter((x) => x !== k) : [...i.extras, k])
  const r = estimate(i)
  const isLoc = i.transaction === 'Location'
  const isTerrain = i.type === 'Terrain'

  return (
    <div>
      <div className="container page-head">
        <div className="crumb"><Link to="/">Accueil</Link> · Estimer</div>
        <div className="eyebrow">Estimation en ligne</div>
        <h1 className="h-section">Une fourchette honnête, <em>en deux minutes</em></h1>
        <p className="lead mt-16">Renseignez votre bien : nous calculons une fourchette à partir des médianes de prix observées dans votre quartier, ajustées à ses caractéristiques. Sans e-mail obligatoire, sans appel commercial.</p>
      </div>

      <div className="container est-layout">
        <form className="card card-pad est-form" onSubmit={(e) => { e.preventDefault(); setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <div className="seg">
            {(['Vente', 'Location'] as const).map((t) => <button type="button" key={t} className={i.transaction === t ? 'on' : ''} onClick={() => up('transaction', t)}>{t === 'Vente' ? 'Je vends' : 'Je loue'}</button>)}
          </div>
          <div className="grid grid-2 mt-24" style={{ gap: 16 }}>
            <label className="field"><span className="label">Quartier</span>
              <select className="select" value={i.zone} onChange={(e) => up('zone', e.target.value)}>{ZONES.map((z) => <option key={z.slug} value={z.slug}>{z.name}</option>)}</select>
            </label>
            <label className="field"><span className="label">Type de bien</span>
              <select className="select" value={i.type} onChange={(e) => up('type', e.target.value as Categorie)}>{CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}</select>
            </label>
            <label className="field"><span className="label">{isTerrain ? 'Surface du terrain (m²)' : 'Surface habitable (m²)'}</span>
              <input className="input" type="number" min={10} max={5000} value={i.surface} onChange={(e) => up('surface', Number(e.target.value))} required />
            </label>
            {i.type === 'Villa' && (
              <label className="field"><span className="label">Surface du terrain (m²)</span>
                <input className="input" type="number" min={0} max={20000} value={i.terrain ?? 0} onChange={(e) => up('terrain', Number(e.target.value))} />
              </label>
            )}
            {!isTerrain && i.type !== 'Bureau' && (
              <label className="field"><span className="label">Chambres</span>
                <select className="select" value={i.chambres ?? 0} onChange={(e) => up('chambres', Number(e.target.value))}>{[0, 1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n === 0 ? 'Studio' : n}</option>)}</select>
              </label>
            )}
            {i.type === 'Appartement' && (
              <label className="field"><span className="label">Étage</span>
                <select className="select" value={i.etage} onChange={(e) => up('etage', e.target.value as EstimateInput['etage'])}>
                  <option value="rdc">Rez-de-chaussée</option><option value="inter">Étage intermédiaire</option><option value="dernier">Dernier étage</option>
                </select>
              </label>
            )}
          </div>
          {!isTerrain && (
            <>
              <div className="label mt-24">État général</div>
              <div className="row wrap" style={{ gap: 8 }}>
                {ETATS.map((e) => <button type="button" key={e.key} className={`chip ${i.etat === e.key ? 'on' : ''}`} onClick={() => up('etat', e.key)}>{e.label}</button>)}
              </div>
              <div className="label mt-24">Prestations</div>
              <div className="row wrap" style={{ gap: 8 }}>
                {EXTRAS.map((x) => <button type="button" key={x.key} className={`chip ${i.extras.includes(x.key) ? 'on' : ''}`} onClick={() => toggleExtra(x.key)}>{i.extras.includes(x.key) && <Check size={14} />} {x.label}</button>)}
              </div>
            </>
          )}
          <button className="btn btn-primary btn-lg mt-32" type="submit">Voir mon estimation <ArrowRight size={18} /></button>
        </form>

        <aside className="est-side">
          {r && step === 2 ? (
            <div className="card card-pad est-res">
              <div className="eyebrow" style={{ marginBottom: 6 }}>Votre estimation</div>
              <div className="serif num est-res-val">{priceCompact(r.mid)}{isLoc && <span> / mois</span>}</div>
              <div className="muted mt-8">Fourchette : <strong className="num">{fmt(r.low)} – {fmt(r.high)} DT</strong></div>
              <div className="bar mt-16"><i style={{ width: '60%', marginLeft: '20%', background: 'var(--sand)' }} /></div>
              <dl className="kv mt-24">
                <dt>Médiane {r.zone.name}</dt><dd className="num">{fmt(r.median)} DT/m²{isLoc ? '/mois' : ''}</dd>
                <dt>Votre bien</dt><dd className="num">{fmt(r.perM2)} DT/m²{isLoc ? '/mois' : ''}</dd>
                {r.steps.map((s) => <><dt key={s.label + 'k'}>{s.label}</dt><dd key={s.label + 'v'} className="num">{s.pct > 0 ? '+' : ''}{Math.round(s.pct)} %</dd></>)}
                <dt>Délai de vente moyen</dt><dd className="num">{r.zone.delai} jours</dd>
              </dl>
              <div className="hr mt-24" />
              {sent ? (
                <div className="row mt-24" style={{ gap: 12, alignItems: 'flex-start', color: 'var(--sage)' }}>
                  <Check size={22} /><div><strong style={{ color: 'var(--ink)' }}>Merci.</strong><p className="small muted mt-8">Un conseiller vous propose un créneau pour une estimation sur place sous 48 h.</p></div>
                </div>
              ) : (
                <form className="col mt-24" style={{ gap: 10 }} onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                  <div className="h-card">Affiner sur place, gratuitement</div>
                  <p className="small muted">Un conseiller se déplace, mesure, vérifie les pièces et vous remet un avis de valeur écrit.</p>
                  <input className="input" placeholder="Votre nom" required />
                  <input className="input" type="tel" placeholder="Téléphone" required />
                  <button className="btn btn-sand btn-block" type="submit">Demander une visite d'estimation</button>
                </form>
              )}
            </div>
          ) : (
            <div className="card card-soft card-pad">
              <span style={{ color: "var(--blue-deep)", display: "inline-flex" }}><Shield size={24} /></span>
              <div className="h-card mt-12">Comment nous calculons</div>
              <ul className="col mt-12 small muted" style={{ gap: 8 }}>
                <li>· Médiane du quartier sur 12 mois (ventes et mandats observés)</li>
                <li>· Coefficients d'état, d'étage et de prestations</li>
                <li>· Dégressivité des grandes surfaces, valorisation du terrain libre</li>
                <li>· Fourchette de ± 6 % autour de la valeur centrale</li>
              </ul>
              <p className="small muted mt-16">97 % de nos estimations en ligne se situent à ± 5 % du prix de vente final constaté.</p>
            </div>
          )}
        </aside>
      </div>

      <section className="section section-sand" style={{ marginTop: 64 }}>
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Vendeurs</div><h2 className="h-section">Vendre avec Aylene</h2></div></div>
          <Testimonials />
        </div>
      </section>
    </div>
  )
}

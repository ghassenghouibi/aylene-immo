import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check, Compass } from '../components/Icons'
import { CATEGORIES, ZONES } from '../lib/listings'
import './Static.css'

export default function SurMesure() {
  const [zones, setZones] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [sent, setSent] = useState(false)
  const tog = (arr: string[], set: (v: string[]) => void, v: string) => set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v])

  return (
    <div>
      <div className="container page-head">
        <div className="crumb"><Link to="/">Accueil</Link> · Recherche sur-mesure</div>
        <div className="eyebrow">Recherche sur-mesure</div>
        <h1 className="h-section">Le bien idéal n'est pas en ligne ? <em>Nous le trouvons.</em></h1>
        <p className="lead mt-16">Décrivez votre projet. Nous activons notre réseau de propriétaires, de notaires et de promoteurs pour vous présenter des biens hors-marché, avec le dossier vérifié dès la première visite. Sans frais tant que vous n'avez pas trouvé.</p>
      </div>

      <div className="container est-layout">
        {sent ? (
          <div className="card card-pad">
            <div className="row" style={{ gap: 14, color: 'var(--sage)' }}><Check size={26} /><div className="h-sub" style={{ color: 'var(--ink)' }}>Projet reçu.</div></div>
            <p className="muted mt-16">Un conseiller vous appelle sous 24 h ouvrées pour un premier échange de 30 minutes. Vous recevrez ensuite une sélection de trois à cinq biens, dossiers vérifiés, sous dix jours.</p>
            <Link to="/acheter" className="btn btn-outline mt-24">En attendant, voir la sélection <ArrowRight size={16} /></Link>
          </div>
        ) : (
          <form className="card card-pad col" style={{ gap: 24 }} onSubmit={(e) => { e.preventDefault(); setSent(true); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <div>
              <div className="label">Projet</div>
              <div className="seg"><button type="button" className="on">Acheter</button><button type="button">Louer</button><button type="button">Investir</button></div>
            </div>
            <div>
              <div className="label">Quartiers souhaités</div>
              <div className="row wrap" style={{ gap: 8 }}>{ZONES.map((z) => <button type="button" key={z.slug} className={`chip ${zones.includes(z.slug) ? 'on' : ''}`} onClick={() => tog(zones, setZones, z.slug)}>{z.name}</button>)}</div>
            </div>
            <div>
              <div className="label">Type de bien</div>
              <div className="row wrap" style={{ gap: 8 }}>{CATEGORIES.map((c) => <button type="button" key={c} className={`chip ${types.includes(c) ? 'on' : ''}`} onClick={() => tog(types, setTypes, c)}>{c}</button>)}</div>
            </div>
            <div className="grid grid-3" style={{ gap: 16 }}>
              <label className="field"><span className="label">Budget max (DT)</span><input className="input" type="number" placeholder="800 000" /></label>
              <label className="field"><span className="label">Surface min (m²)</span><input className="input" type="number" placeholder="120" /></label>
              <label className="field"><span className="label">Chambres min</span><input className="input" type="number" placeholder="3" /></label>
            </div>
            <label className="field"><span className="label">Vos non-négociables</span><textarea className="textarea" placeholder="Ex. : dernier étage, lumière le matin, école à moins de 10 min, pas de vis-à-vis…" /></label>
            <div className="grid grid-3" style={{ gap: 16 }}>
              <label className="field"><span className="label">Nom</span><input className="input" required /></label>
              <label className="field"><span className="label">Téléphone</span><input className="input" type="tel" required /></label>
              <label className="field"><span className="label">E-mail</span><input className="input" type="email" /></label>
            </div>
            <label className="field"><span className="label">Horizon</span>
              <select className="select" defaultValue="3"><option value="1">Dès que possible</option><option value="3">Dans les 3 mois</option><option value="6">Dans les 6 mois</option><option value="12">Je me renseigne</option></select>
            </label>
            <button className="btn btn-primary btn-lg" type="submit" style={{ alignSelf: 'flex-start' }}>Envoyer mon projet <ArrowRight size={18} /></button>
          </form>
        )}
        <aside className="est-side">
          <div className="card card-soft card-pad">
            <span style={{ color: "var(--blue-deep)", display: "inline-flex" }}><Compass size={24} /></span>
            <div className="h-card mt-12">Comment ça marche</div>
            <ol className="col mt-12 small" style={{ gap: 12, color: 'var(--ink-2)' }}>
              <li><strong>1.</strong> Premier échange de 30 min pour cadrer budget, quartiers et non-négociables.</li>
              <li><strong>2.</strong> Nous sollicitons notre réseau : propriétaires, notaires, promoteurs, syndics.</li>
              <li><strong>3.</strong> Sous dix jours, une sélection de 3 à 5 biens au dossier vérifié.</li>
              <li><strong>4.</strong> Visites groupées, négociation, financement, signature : un seul interlocuteur.</li>
            </ol>
            <p className="small muted mt-16">Honoraires uniquement en cas de succès, inclus dans les frais d'agence classiques.</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

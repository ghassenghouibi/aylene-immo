import { useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import Photo from '../components/Photo'
import { TrustBadge } from '../components/Trust'
import { CtaSurMesure, Promises, Steps, Testimonials, ZoneCard } from '../components/Blocks'
import { ArrowRight, Check, Shield, Trend } from '../components/Icons'
import { LISTINGS, ZONES, fmt, priceCompact, zoneCount, type Rubrique } from '../lib/listings'
import { trustOf } from '../lib/trust'
import { estimate } from '../lib/estimate'
import { useCountUp, useRevealAll } from '../hooks/useReveal'
import './Home.css'

function Stat({ value, label, suffix = '' }: { value: number; label: string; suffix?: string }) {
  const { ref, n } = useCountUp(value)
  return (
    <div className="stat">
      <strong ref={ref as React.RefObject<HTMLElement>} className="num">{n.toLocaleString('fr-FR')}{suffix}</strong>
      <span>{label}</span>
    </div>
  )
}

const HERO_ID = 'AY-1041'

export default function Home() {
  const page = useRevealAll<HTMLDivElement>()
  const [tab, setTab] = useState<Rubrique>('acheter')
  const hero = LISTINGS.find((l) => l.id === HERO_ID) ?? LISTINGS[0]
  const heroTrust = trustOf(hero)

  const featured = LISTINGS
    .filter((l) => l.disponible && (tab === 'acheter' ? l.transaction === 'Vente' : l.transaction === 'Location'))
    .sort((a, b) => trustOf(b).done - trustOf(a).done || b.ajout.localeCompare(a.ajout))
    .slice(0, 4)

  const complet = LISTINGS.filter((l) => trustOf(l).level === 'complet').length
  const zones = [...ZONES].sort((a, b) => zoneCount(b) - zoneCount(a)).slice(0, 5)

  // Mini-estimateur du bandeau
  const [ezone, setEzone] = useState('la-marsa')
  const [esurf, setEsurf] = useState(120)
  const e = estimate({ transaction: 'Vente', zone: ezone, type: 'Appartement', surface: esurf, etat: 'bon', extras: [] })

  return (
    <div ref={page}>
      {/* ---------- HERO ---------- */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">Agence immobilière · Grand Tunis</div>
            <h1 className="h-display">
              L'immobilier,<br />en toute <em>confiance</em>.
            </h1>
            <p className="lead mt-24">
              Chez Aylene, un bien n'est publié qu'avec un dossier vérifié, un prix justifié face au quartier, et un conseiller unique jusqu'à la remise des clés. Moins d'annonces. Plus de preuves.
            </p>
            <div className="row wrap mt-32" style={{ gap: 12 }}>
              <Link to="/acheter" className="btn btn-primary btn-lg">Voir la sélection <ArrowRight size={18} /></Link>
              <Link to="/estimer" className="btn btn-outline btn-lg">Estimer mon bien en 2 min</Link>
            </div>
            <ul className="hero-proof mt-32">
              <li><Check size={15} /> {complet} biens au dossier complet</li>
              <li><Check size={15} /> Prix au m² vs médiane du quartier</li>
              <li><Check size={15} /> Simulateur de financement</li>
            </ul>
          </div>

          <div className="hero-visual">
            <Photo src={hero.photos[0]} alt={hero.titre} className="hero-photo" tone="ph-dark" eager />
            <Link to={`/bien/${hero.id}`} className="hero-card card">
              <div className="row between">
                <TrustBadge listing={hero} />
                <span className="tiny muted">{hero.reference}</span>
              </div>
              <div className="h-card mt-12">{hero.titre}</div>
              <div className="row between mt-12">
                <span className="serif" style={{ fontSize: 24, color: 'var(--blue-ink)' }}>{priceCompact(hero.prix)}</span>
                <span className="small muted">{hero.surface} m² · {hero.chambres} ch.</span>
              </div>
              <ul className="hero-card-list mt-12">
                {['Titre foncier vérifié', 'Aucune hypothèque', 'Surfaces mesurées'].map((t) => <li key={t}><Shield size={13} /> {t}</li>)}
              </ul>
              <span className="link mt-12">Voir le dossier ({heroTrust.done}/{heroTrust.total}) <ArrowRight size={15} /></span>
            </Link>
          </div>
        </div>
        <div className="container hero-search">
          <SearchBar />
        </div>
      </section>

      {/* ---------- PROMESSES ---------- */}
      <section className="section-tight">
        <div className="container">
          <Promises />
        </div>
      </section>

      {/* ---------- SÉLECTION ---------- */}
      <section className="section-tight">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">La sélection</div>
              <h2 className="h-section">Des biens dont le dossier est <em>déjà prêt</em></h2>
            </div>
            <div className="seg">
              {(['acheter', 'louer'] as Rubrique[]).map((k) => <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{k === 'acheter' ? 'À vendre' : 'À louer'}</button>)}
            </div>
          </div>
          <div className="grid grid-4 reveal reveal-stagger">
            {featured.map((l) => <PropertyCard key={l.id} listing={l} />)}
          </div>
          <div className="row mt-32 reveal" style={{ justifyContent: 'center' }}>
            <Link to={`/${tab}`} className="btn btn-outline">Tous les biens {tab === 'acheter' ? 'à vendre' : 'à louer'} <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ---------- CHIFFRES ---------- */}
      <section className="container">
        <div className="stats card reveal">
          <Stat value={LISTINGS.filter((l) => l.disponible).length} label="biens sélectionnés, pas un de plus" />
          <Stat value={41} label="jours en moyenne pour vendre" />
          <Stat value={97} suffix=" %" label="d'estimations à ± 5 % du prix final" />
          <Stat value={6} label="pièces vérifiées par dossier" />
        </div>
      </section>

      {/* ---------- MÉTHODE ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div style={{ maxWidth: 640 }}>
              <div className="eyebrow">Notre méthode</div>
              <h2 className="h-section">Un parcours <em>accompagné</em>, du premier appel aux clés</h2>
            </div>
            <Link to="/accompagnement" className="link">Tout le détail <ArrowRight size={16} /></Link>
          </div>
          <Steps />
        </div>
      </section>

      {/* ---------- ESTIMATION ---------- */}
      <section className="section section-blue">
        <div className="container est-grid">
          <div className="reveal">
            <div className="eyebrow">Estimation en ligne</div>
            <h2 className="h-section">Combien vaut votre bien, <em style={{ color: 'var(--sand)' }}>vraiment</em> ?</h2>
            <p className="lead mt-16">
              Notre estimateur s'appuie sur les médianes de prix que nous observons quartier par quartier, ajustées à l'état, à l'étage et aux prestations. Une fourchette honnête en deux minutes, affinée ensuite sur place par votre conseiller.
            </p>
            <Link to="/estimer" className="btn btn-sand btn-lg mt-24">Lancer l'estimation complète <ArrowRight size={18} /></Link>
          </div>
          <div className="est-box reveal">
            <div className="tiny" style={{ color: 'var(--sand)' }}>Aperçu express · appartement en bon état</div>
            <label className="field mt-16">
              <span className="label" style={{ color: '#c2ccd9' }}>Quartier</span>
              <select className="select" value={ezone} onChange={(ev) => setEzone(ev.target.value)}>
                {ZONES.map((z) => <option key={z.slug} value={z.slug}>{z.name}</option>)}
              </select>
            </label>
            <label className="mt-16" style={{ display: 'block' }}>
              <div className="row between small"><span style={{ color: '#c2ccd9' }}>Surface</span><strong className="num">{esurf} m²</strong></div>
              <input type="range" className="range" min={40} max={400} step={5} value={esurf} onChange={(ev) => setEsurf(Number(ev.target.value))} />
            </label>
            {e && (
              <div className="est-result mt-24">
                <div className="small" style={{ color: '#c2ccd9' }}>Fourchette estimée</div>
                <div className="serif num est-val">{priceCompact(e.low)} – {priceCompact(e.high)}</div>
                <div className="small mt-8" style={{ color: '#c2ccd9' }}>soit ≈ {fmt(e.perM2)} DT/m² · médiane {e.zone.name} : {fmt(e.median)} DT/m²</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- QUARTIERS ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Baromètre</div>
              <h2 className="h-section">Les quartiers, <em>chiffres à l'appui</em></h2>
            </div>
            <Link to="/quartiers" className="link">Tous les quartiers <Trend size={16} /></Link>
          </div>
          <div className="zones reveal reveal-stagger">
            {zones.map((z, i) => <ZoneCard key={z.slug} zone={z} big={i === 0} />)}
          </div>
        </div>
      </section>

      {/* ---------- TÉMOIGNAGES ---------- */}
      <section className="section section-sand">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="eyebrow">Ils ont acheté, vendu, trouvé</div>
              <h2 className="h-section">Ce que change un <em>dossier prêt</em></h2>
            </div>
          </div>
          <Testimonials />
        </div>
      </section>

      <CtaSurMesure />
    </div>
  )
}

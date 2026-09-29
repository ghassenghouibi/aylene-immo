import { useState } from 'react'
import { Link } from 'react-router-dom'
import Photo from '../components/Photo'
import { CtaSurMesure } from '../components/Blocks'
import { ArrowRight, Trend } from '../components/Icons'
import { ZONES, fmt, zoneCount } from '../lib/listings'
import './Static.css'

type Sort = 'prix' | 'tendance' | 'delai' | 'nom'

export default function Quartiers() {
  const [sort, setSort] = useState<Sort>('prix')
  const max = Math.max(...ZONES.map((z) => z.venteM2))
  const zones = [...ZONES].sort((a, b) =>
    sort === 'prix' ? b.venteM2 - a.venteM2 : sort === 'tendance' ? b.tendance - a.tendance : sort === 'delai' ? a.delai - b.delai : a.name.localeCompare(b.name))

  return (
    <div>
      <div className="container page-head">
        <div className="crumb"><Link to="/">Accueil</Link> · Quartiers</div>
        <div className="eyebrow">Baromètre Aylene</div>
        <h1 className="h-section">Les quartiers du Grand Tunis, <em>chiffres à l'appui</em></h1>
        <p className="lead mt-16">Médianes de prix, loyers, tendances et délais de vente que nous observons quartier par quartier. Ce sont ces références qui alimentent l'indice « Prix juste » de chaque fiche.</p>
      </div>

      <div className="container">
        <div className="row between wrap" style={{ marginBottom: 20 }}>
          <span className="small muted">Médiane 12 mois · valeurs de démonstration</span>
          <div className="seg">
            {([['prix', 'Prix au m²'], ['tendance', 'Tendance'], ['delai', 'Délai de vente'], ['nom', 'A → Z']] as [Sort, string][]).map(([k, l]) => (
              <button key={k} className={sort === k ? 'on' : ''} onClick={() => setSort(k)}>{l}</button>
            ))}
          </div>
        </div>
        <div className="card baro">
          <div className="baro-row baro-head tiny muted">
            <span>Quartier</span><span>Vente médiane</span><span className="hide-mobile">Loyer médian</span><span>12 mois</span><span className="hide-mobile">Délai</span><span className="hide-mobile">Biens</span>
          </div>
          {zones.map((z) => (
            <Link key={z.slug} to={`/acheter?zone=${z.slug}`} className="baro-row">
              <span className="row" style={{ gap: 12 }}>
                <Photo src={z.photo} alt="" className="baro-ph" />
                <span><strong style={{ display: 'block' }}>{z.name}</strong><span className="small muted">{z.ambiance}</span></span>
              </span>
              <span>
                <strong className="num">{fmt(z.venteM2)} DT/m²</strong>
                <span className="bar mt-8" style={{ maxWidth: 140 }}><i style={{ width: `${(z.venteM2 / max) * 100}%` }} /></span>
              </span>
              <span className="num hide-mobile">{fmt(z.loyerM2)} DT/m²</span>
              <span className={`pidx ${z.tendance >= 4 ? 'pidx-good' : 'pidx-fair'}`}><Trend size={14} /> +{z.tendance.toLocaleString('fr-FR')} %</span>
              <span className="num hide-mobile">{z.delai} j</span>
              <span className="hide-mobile">{zoneCount(z)} <ArrowRight size={14} /></span>
            </Link>
          ))}
        </div>
        <p className="small muted mt-16">Médianes fictives à titre de démonstration. En production, ces valeurs proviennent des transactions et mandats observés par l'agence et sont mises à jour chaque trimestre.</p>
      </div>

      <div style={{ marginTop: 72 }}><CtaSurMesure /></div>
    </div>
  )
}

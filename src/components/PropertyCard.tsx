import { Link } from 'react-router-dom'
import Photo from './Photo'
import { Area, Bed, Heart, Land, Pin } from './Icons'
import { PriceIndex, TrustBadge } from './Trust'
import { ProximityHint } from './Proximity'
import { formatPrice, fmt, perM2, zoneOf, type Listing } from '../lib/listings'
import { useFavorites } from '../hooks/useFavorites'
import './PropertyCard.css'

export default function PropertyCard({ listing: l, compact = false }: { listing: Listing; compact?: boolean }) {
  const { has, toggle } = useFavorites()
  const price = formatPrice(l)
  const fav = has(l.id)
  const zone = zoneOf(l)
  const isLoc = l.transaction === 'Location'

  return (
    <article className={`pc ${compact ? 'pc-compact' : ''}`}>
      <Link to={`/bien/${l.id}`} className="pc-media">
        <Photo src={l.photos[0]} alt={l.titre} tone={Number(l.id.replace(/\D/g, '')) % 2 ? 'ph-warm' : ''} className="pc-photo" />
        <div className="pc-badges">
          <span className={`badge ${isLoc ? 'badge-location' : 'badge-vente'}`}>{l.transaction}</span>
          {l.exclusivite && <span className="badge badge-exclu">Exclusivité</span>}
          {l.etat === 'neuf' && <span className="badge badge-neuf">Neuf</span>}
          {!l.disponible && <span className="badge badge-status">{isLoc ? 'Loué' : 'Vendu'}</span>}
        </div>
        <span className="pc-trust"><TrustBadge listing={l} compact={compact} /></span>
      </Link>
      <button className={`pc-fav ${fav ? 'on' : ''}`} aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'} onClick={() => toggle(l.id)}>
        <Heart size={16} filled={fav} />
      </button>
      <div className="pc-body">
        <div className="pc-kicker">{l.categorie} · {zone.name}</div>
        <h3 className="h-card pc-title"><Link to={`/bien/${l.id}`}>{l.titre}</Link></h3>
        <div className="pc-loc"><Pin size={14} /> {l.adresse}</div>
        <div className="pc-price-row">
          <span className="pc-price">{price.main}{price.suffix && <span> {price.suffix}</span>}</span>
          {!compact && <span className="small muted num">{fmt(perM2(l))} DT/m²</span>}
        </div>
        <div className="pc-meta">
          {l.chambres ? <span><Bed size={15} /> {l.chambres} ch.</span> : l.categorie === 'Terrain' ? <span><Land size={15} /> Terrain</span> : null}
          <span><Area size={15} /> {fmt(l.surface)} m²</span>
          {l.terrain && l.categorie !== 'Terrain' && !compact ? <span><Land size={15} /> {fmt(l.terrain)} m²</span> : null}
        </div>
        {!compact && (
          <div className="pc-foot">
            <PriceIndex listing={l} />
            <ProximityHint listing={l} />
          </div>
        )}
      </div>
    </article>
  )
}

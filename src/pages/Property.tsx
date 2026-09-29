import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import Photo from '../components/Photo'
import PropertyCard from '../components/PropertyCard'
import Mortgage from '../components/Mortgage'
import Proximity from '../components/Proximity'
import { PriceIndex, TrustBadge, TrustChecklist } from '../components/Trust'
import { AdvisorCard, MapMock } from '../components/Blocks'
import { ArrowRight, Area, Bath, Bed, Calendar, Camera, Check, ChevronLeft, ChevronRight, Clock, Eye, Heart, Land, Pin, Share, X } from '../components/Icons'
import { RUBRIQUE_LABEL, byId, daysOnline, fmt, formatPrice, perM2, priceIndex, rubriqueOf, similar, zoneOf } from '../lib/listings'
import { advisorFor } from '../data/agence'
import { useFavorites } from '../hooks/useFavorites'
import './Property.css'

const ETAT_LABEL = { neuf: 'Neuf', renove: 'Rénové', bon: 'Bon état', 'a-rafraichir': 'À rafraîchir' }

function paragraphs(desc: string): string[] {
  const s = desc.split(/(?<=[.!?])\s+(?=[A-ZÀ-Ý])/)
  const out: string[] = []
  for (let i = 0; i < s.length; i += 2) out.push(s.slice(i, i + 2).join(' '))
  return out.filter(Boolean)
}

export default function Property() {
  const { id = '' } = useParams()
  const l = byId(id)
  const { has, toggle } = useFavorites()
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const [sentFor, setSentFor] = useState<string | null>(null)
  const sent = sentFor === id

  useEffect(() => { window.scrollTo({ top: 0 }) }, [id])
  useEffect(() => {
    if (lightbox === null || !l) return
    const n = l.photos.length
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => (i === null ? null : (i + 1) % n))
      if (e.key === 'ArrowLeft') setLightbox((i) => (i === null ? null : (i - 1 + n) % n))
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox, l])

  if (!l) return <Navigate to="/acheter" replace />

  const price = formatPrice(l)
  const pidx = priceIndex(l)
  const zone = zoneOf(l)
  const advisor = advisorFor(l.zone)
  const rubrique = rubriqueOf(l)
  const fav = has(l.id)
  const isLoc = l.transaction === 'Location'
  const waText = encodeURIComponent(`Bonjour, je souhaite consulter le dossier du bien "${l.titre}" (${l.reference}) et organiser une visite.`)

  const share = async () => {
    const url = window.location.href
    if (navigator.share) { try { await navigator.share({ title: l.titre, url }) } catch { /* annulé */ } }
    else { await navigator.clipboard?.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800) }
  }

  return (
    <div className="container pp">
      <div className="crumb"><Link to="/">Accueil</Link> · <Link to={`/${rubrique}`}>{RUBRIQUE_LABEL[rubrique]}</Link> · <Link to={`/${rubrique}?zone=${zone.slug}`}>{zone.name}</Link> · {l.reference}</div>

      <div className="row wrap" style={{ gap: 8 }}>
        <span className={`badge ${isLoc ? 'badge-location' : 'badge-vente'}`}>{l.transaction}</span>
        {l.exclusivite && <span className="badge badge-exclu">Exclusivité Aylene</span>}
        {l.etat === 'neuf' && <span className="badge badge-neuf">Neuf</span>}
        {l.meuble && <span className="badge badge-soft">Meublé</span>}
        {!l.disponible && <span className="badge badge-status">{isLoc ? 'Loué' : 'Vendu'}</span>}
        <TrustBadge listing={l} />
      </div>

      <div className="pp-head">
        <div>
          <h1 className="pp-title">{l.titre}</h1>
          <div className="row muted mt-8" style={{ gap: 6 }}><Pin size={16} /> {l.adresse}</div>
        </div>
        <div className="pp-pricebox">
          <div className="pp-price">{price.main}{price.suffix && <span> {price.suffix}</span>}</div>
          <div className="small muted num">{fmt(perM2(l))} DT/m²{isLoc ? '/mois' : ''} · <PriceIndex listing={l} long /></div>
        </div>
      </div>

      {/* ---------- Galerie ---------- */}
      <div className={`pp-gallery ${l.photos.length < 3 ? 'pp-gallery-few' : ''}`}>
        <button className="pp-g-main" onClick={() => setLightbox(0)}>
          <Photo src={l.photos[0]} alt={l.titre} eager />
          <span className="badge badge-glass pp-g-count"><Camera size={15} /> {l.photos.length} photos</span>
        </button>
        {l.photos.slice(1, 3).map((p, i) => (
          <button key={p} className="pp-g-side" onClick={() => setLightbox(i + 1)}>
            <Photo src={p} alt="" tone={i ? 'ph-warm' : ''} />
          </button>
        ))}
      </div>

      <div className="pp-actions">
        <div className="row wrap" style={{ gap: 8 }}>
          <button className={`btn btn-outline btn-sm ${fav ? 'pp-fav-on' : ''}`} onClick={() => toggle(l.id)}><Heart size={15} filled={fav} /> {fav ? 'Dans vos favoris' : 'Ajouter aux favoris'}</button>
          <button className="btn btn-outline btn-sm" onClick={share}><Share size={15} /> {copied ? 'Lien copié' : 'Partager'}</button>
        </div>
        <div className="row wrap small muted" style={{ gap: 16 }}>
          <span className="row" style={{ gap: 5 }}><Clock size={14} /> En ligne depuis {daysOnline(l)} j</span>
          <span className="row" style={{ gap: 5 }}><Eye size={14} /> {l.visites} visites organisées</span>
        </div>
      </div>

      <div className="pp-grid">
        <div className="pp-main">
          {/* Chiffres clés */}
          <div className="pp-facts card">
            {l.chambres ? <div><Bed size={20} /><strong>{l.chambres}</strong><span>chambres</span></div> : null}
            {l.sdb ? <div><Bath size={20} /><strong>{l.sdb}</strong><span>salles de bains</span></div> : null}
            <div><Area size={20} /><strong className="num">{fmt(l.surface)}</strong><span>m² {l.categorie === 'Terrain' ? 'de terrain' : 'habitables'}</span></div>
            {l.terrain && l.categorie !== 'Terrain' ? <div><Land size={20} /><strong className="num">{fmt(l.terrain)}</strong><span>m² de terrain</span></div> : null}
            {l.annee ? <div><Calendar size={20} /><strong>{l.annee}</strong><span>construction</span></div> : null}
          </div>

          {/* Prix juste */}
          <section className="pp-section">
            <h2 className="h-sub">Le prix, expliqué</h2>
            <div className={`pp-pidx pp-pidx-${pidx.tone} mt-16`}>
              <div>
                <div className="tiny">{pidx.label}</div>
                <div className="serif num" style={{ fontSize: 34, lineHeight: 1.1, marginTop: 6 }}>{pidx.diff > 0 ? '+' : ''}{pidx.diff} %</div>
              </div>
              <dl className="kv" style={{ alignSelf: 'center' }}>
                <dt>Ce bien</dt><dd className="num">{fmt(perM2(l))} DT/m²</dd>
                <dt>Médiane {zone.name}</dt><dd className="num">{fmt(pidx.median)} DT/m²</dd>
                <dt>Tendance 12 mois</dt><dd className="num">{zone.tendance > 0 ? '+' : ''}{zone.tendance.toLocaleString('fr-FR')} %</dd>
                <dt>Délai de vente moyen</dt><dd className="num">{zone.delai} jours</dd>
              </dl>
            </div>
            <p className="small muted mt-12">Médiane calculée sur les transactions et mandats observés par Aylene dans le quartier sur 12 mois.</p>
          </section>

          {/* Description */}
          <section className="pp-section">
            <h2 className="h-sub">Le bien</h2>
            <div className="prose mt-16">{paragraphs(l.description).map((p, i) => <p key={i}>{p}</p>)}</div>
            <div className="row wrap mt-24" style={{ gap: 8 }}>
              {l.features.map((f) => <span key={f} className="tag"><Check size={14} /> {f}</span>)}
            </div>
          </section>

          {/* Détails */}
          <section className="pp-section">
            <h2 className="h-sub">En détail</h2>
            <dl className="kv pp-details mt-16">
              <dt>Référence</dt><dd>{l.reference}</dd>
              <dt>Type</dt><dd>{l.categorie}</dd>
              <dt>État</dt><dd>{ETAT_LABEL[l.etat]}</dd>
              {l.etage && <><dt>Étage</dt><dd>{l.etage}</dd></>}
              <dt>Quartier</dt><dd>{zone.name}</dd>
              <dt>Disponibilité</dt><dd>{l.disponible ? 'Immédiate' : isLoc ? 'Loué' : 'Vendu'}</dd>
              {l.exclusivite && <><dt>Mandat</dt><dd>Exclusif Aylene</dd></>}
            </dl>
          </section>

          {/* Dossier de confiance */}
          <section className="pp-section">
            <TrustChecklist listing={l} />
          </section>

          {/* À proximité */}
          <section className="pp-section">
            <h2 className="h-sub">À proximité</h2>
            <p className="muted mt-8">Ce qu'on trouve autour du bien, à pied : commerces, écoles, transports, santé, loisirs et services.</p>
            <div className="mt-16"><Proximity listing={l} /></div>
          </section>

          {/* Localisation */}
          <section className="pp-section">
            <h2 className="h-sub">Où ?</h2>
            <p className="muted mt-8">{l.adresse} · {zone.ambiance}</p>
            <div className="mt-16"><MapMock label={zone.name} /></div>
            <p className="small muted mt-12">L'adresse exacte est communiquée lors de la prise de rendez-vous.</p>
          </section>
        </div>

        {/* ---------- Colonne latérale ---------- */}
        <aside className="pp-side">
          <div className="card card-pad pp-contact">
            <div className="eyebrow" style={{ marginBottom: 6 }}>Votre conseiller</div>
            <AdvisorCard a={advisor} compact />
            <div className="hr mt-24" />
            {sent ? (
              <div className="pp-sent mt-24">
                <Check size={22} />
                <div><strong>Demande envoyée.</strong><p className="small muted mt-8">{advisor.name.split(' ')[0]} vous rappelle sous 24 h ouvrées avec le dossier complet et des créneaux de visite.</p></div>
              </div>
            ) : (
              <form className="col mt-24" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); setSentFor(id) }}>
                <div className="h-card">Recevoir le dossier & visiter</div>
                <input className="input" placeholder="Votre nom" required />
                <input className="input" type="tel" placeholder="Téléphone" required />
                <input className="input" type="email" placeholder="E-mail" />
                <select className="select" defaultValue="">
                  <option value="" disabled>Votre situation</option>
                  <option>Je souhaite visiter</option>
                  <option>Je souhaite recevoir le dossier complet</option>
                  <option>J'ai un bien à vendre avant d'acheter</option>
                  <option>Je cherche un financement</option>
                </select>
                <button className="btn btn-primary btn-block" type="submit">Envoyer <ArrowRight size={16} /></button>
                <a href={`https://wa.me/${advisor.phone.replace(/\D/g, '')}?text=${waText}`} target="_blank" rel="noreferrer" className="btn btn-soft btn-block">Écrire sur WhatsApp</a>
                <p className="small muted" style={{ textAlign: 'center' }}>Réponse sous 24 h ouvrées · sans engagement</p>
              </form>
            )}
          </div>
          {!isLoc && <Mortgage price={l.prix} />}
        </aside>
      </div>

      {/* ---------- Biens comparables ---------- */}
      <section className="pp-similar">
        <div className="section-head">
          <div>
            <div className="eyebrow">Comparables</div>
            <h2 className="h-section">Dans le même esprit</h2>
          </div>
          <Link to={`/${rubrique}?zone=${zone.slug}`} className="link">Tout {zone.name} <ArrowRight size={16} /></Link>
        </div>
        <div className="grid grid-3">{similar(l).map((s) => <PropertyCard key={s.id} listing={s} />)}</div>
      </section>

      {/* ---------- Lightbox ---------- */}
      {lightbox !== null && (
        <div className="lb" onClick={() => setLightbox(null)} role="dialog" aria-label="Galerie">
          <button className="lb-close" aria-label="Fermer"><X size={22} /></button>
          <button className="lb-nav lb-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + l.photos.length) % l.photos.length) }} aria-label="Précédente"><ChevronLeft size={26} /></button>
          <img src={l.photos[lightbox]} alt="" onClick={(e) => e.stopPropagation()} />
          <button className="lb-nav lb-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % l.photos.length) }} aria-label="Suivante"><ChevronRight size={26} /></button>
          <span className="lb-count">{lightbox + 1} / {l.photos.length}</span>
        </div>
      )}
    </div>
  )
}

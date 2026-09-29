import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AdvisorCard, MapMock } from '../components/Blocks'
import { ArrowRight, Check, Clock, Mail, Phone, Pin, WhatsApp } from '../components/Icons'
import { ADVISORS, AGENCE } from '../data/agence'
import './Static.css'

export default function Contact() {
  const [sent, setSent] = useState(false)
  return (
    <div>
      <div className="container page-head">
        <div className="crumb"><Link to="/">Accueil</Link> · Contact</div>
        <div className="eyebrow">Contact</div>
        <h1 className="h-section">Parlons de <em>votre projet</em></h1>
        <p className="lead mt-16">Une question sur un bien, une estimation, un financement ? Écrivez-nous ou passez à l'agence : nous recevons sur rendez-vous pour vous consacrer le temps nécessaire.</p>
      </div>
      <div className="container est-layout">
        <div className="col" style={{ gap: 20 }}>
          <div className="card card-pad">
            <ul className="col" style={{ gap: 14, fontSize: 15 }}>
              <li className="row" style={{ gap: 12, alignItems: 'flex-start' }}><Pin size={18} /> <span>{AGENCE.address}</span></li>
              <li className="row" style={{ gap: 12 }}><Phone size={18} /> <a href={`tel:${AGENCE.phone.replace(/\s/g, '')}`}>{AGENCE.phone}</a></li>
              <li className="row" style={{ gap: 12 }}><Mail size={18} /> <a href={`mailto:${AGENCE.email}`}>{AGENCE.email}</a></li>
              <li className="row" style={{ gap: 12 }}><Clock size={18} /> <span>{AGENCE.hours}</span></li>
            </ul>
            <div className="row wrap mt-24">
              <a href={`https://wa.me/${AGENCE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary"><WhatsApp size={16} /> WhatsApp</a>
              <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(AGENCE.mapsQuery)}`} target="_blank" rel="noreferrer" className="btn btn-outline">Itinéraire <ArrowRight size={16} /></a>
            </div>
          </div>
          <MapMock label="Aylene · Berges du Lac 2" />
          <div className="grid grid-3" style={{ gap: 16 }}>{ADVISORS.map((a) => <AdvisorCard key={a.id} a={a} compact />)}</div>
        </div>
        <aside className="est-side">
          <div className="card card-pad">
            {sent ? (
              <div className="row" style={{ gap: 12, alignItems: 'flex-start', color: 'var(--sage)' }}><Check size={22} /><div><strong style={{ color: 'var(--ink)' }}>Message envoyé.</strong><p className="small muted mt-8">Nous vous répondons sous 24 h ouvrées.</p></div></div>
            ) : (
              <form className="col" style={{ gap: 12 }} onSubmit={(e) => { e.preventDefault(); setSent(true) }}>
                <div className="h-card">Écrivez-nous</div>
                <input className="input" placeholder="Votre nom" required />
                <input className="input" type="tel" placeholder="Téléphone" required />
                <input className="input" type="email" placeholder="E-mail" />
                <select className="select" defaultValue=""><option value="" disabled>Objet</option><option>Un bien en particulier</option><option>Estimer mon bien</option><option>Recherche sur-mesure</option><option>Financement</option><option>Autre</option></select>
                <textarea className="textarea" placeholder="Votre message" />
                <button className="btn btn-primary btn-block" type="submit">Envoyer <ArrowRight size={16} /></button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

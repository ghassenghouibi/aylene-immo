import { Link } from 'react-router-dom'
import Photo from './Photo'
import { ArrowRight, Calendar, Compass, FileText, Key, Phone, Pin, Quote, Scale, Shield, User, WhatsApp } from './Icons'
import { TESTIMONIALS, type Advisor } from '../data/agence'
import './Blocks.css'

/** Les trois promesses Aylene — répétées sur l'accueil et la page méthode. */
export const PROMISES = [
  { icon: <Shield size={22} />, title: 'Dossier vérifié', text: "Titre, plan, hypothèque, copropriété, taxes, conformité : six pièces contrôlées avant la mise en ligne. Vous savez ce que vous achetez." },
  { icon: <Scale size={22} />, title: 'Prix justifié', text: "Chaque bien affiche son prix au m² face à la médiane du quartier. Pas de prix « à débattre » : un prix expliqué." },
  { icon: <User size={22} />, title: 'Un seul interlocuteur', text: "Du premier appel à la remise des clés, un conseiller unique gère visites, financement, notaire et suivi." },
]

export function Promises() {
  return (
    <div className="promises reveal reveal-stagger">
      {PROMISES.map((p) => (
        <div key={p.title} className="promise">
          <span className="promise-ic">{p.icon}</span>
          <div>
            <div className="h-card">{p.title}</div>
            <p className="small muted mt-8">{p.text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

/** Le parcours accompagné, en 5 étapes. */
export const STEPS = [
  { icon: <Phone size={18} />, title: 'Premier échange', text: "30 minutes pour cerner votre projet, votre budget réel et vos non-négociables.", when: 'Jour 1' },
  { icon: <Compass size={18} />, title: 'Sélection sur-mesure', text: "Trois à cinq biens choisis, dossiers déjà vérifiés, visites groupées sur une demi-journée.", when: 'Semaine 1' },
  { icon: <FileText size={18} />, title: 'Dossier & financement', text: "Nous montons le plan de financement, négocions le taux et sécurisons la promesse de vente.", when: 'Semaines 2 – 4' },
  { icon: <Calendar size={18} />, title: 'Signature accompagnée', text: "Relecture des actes, coordination avec le notaire, vérification finale des pièces.", when: 'Semaines 5 – 8' },
  { icon: <Key size={18} />, title: 'Remise des clés & après', text: "État des lieux, transfert des contrats, carnet d'artisans de confiance. Nous restons joignables.", when: 'Jour J et après' },
]

export function Steps({ dark = false }: { dark?: boolean }) {
  return (
    <ol className={`steps ${dark ? 'steps-dark' : ''} reveal reveal-stagger`}>
      {STEPS.map((s, i) => (
        <li key={s.title} className="step">
          <div className="step-top"><span className="step-ic">{s.icon}</span><span className="step-n">0{i + 1}</span></div>
          <div className="tiny" style={{ color: dark ? 'var(--sand)' : 'var(--blue)', marginTop: 14 }}>{s.when}</div>
          <div className="h-card mt-8">{s.title}</div>
          <p className="small mt-8" style={{ color: dark ? '#c2ccd9' : 'var(--muted)' }}>{s.text}</p>
        </li>
      ))}
    </ol>
  )
}

export function Testimonials() {
  return (
    <div className="grid grid-3 reveal reveal-stagger">
      {TESTIMONIALS.map((t) => (
        <blockquote key={t.name} className="card card-pad tq">
          <span className="tq-q"><Quote size={26} /></span>
          <p className="tq-text">{t.text}</p>
          <footer className="mt-24">
            <strong style={{ display: 'block' }}>{t.name}</strong>
            <span className="small muted">{t.where}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  )
}

export function AdvisorCard({ a, compact = false }: { a: Advisor; compact?: boolean }) {
  return (
    <div className={`adv card ${compact ? 'adv-compact card-pad' : ''}`}>
      <Photo src={a.photo} alt={a.name} className="adv-photo" tone="ph-warm" />
      <div className="adv-body">
        <div className="tiny" style={{ color: 'var(--blue)' }}>{a.role}</div>
        <div className="h-card mt-8">{a.name}</div>
        {!compact && <p className="small muted mt-8">{a.bio}</p>}
        <div className="row wrap mt-16" style={{ gap: 8 }}>
          <a href={`tel:${a.phone.replace(/\s/g, '')}`} className="btn btn-outline btn-sm"><Phone size={15} /> {a.phone}</a>
          <a href={`https://wa.me/${a.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="btn btn-soft btn-sm"><WhatsApp size={15} /> WhatsApp</a>
        </div>
      </div>
    </div>
  )
}

export function MapMock({ label }: { label: string }) {
  return (
    <div className="mapmock">
      <div className="mapmock-grid" />
      <span className="mapmock-pin"><Pin size={22} /></span>
      <span className="badge badge-glass mapmock-label">{label}</span>
    </div>
  )
}

/** Bandeau bleu « recherche sur-mesure ». */
export function CtaSurMesure() {
  return (
    <section className="section-blue" style={{ padding: '72px 0' }}>
      <div className="container cta reveal">
        <div>
          <div className="eyebrow">Vous ne trouvez pas ?</div>
          <h2 className="h-section">Confiez-nous votre <em style={{ color: 'var(--sand)' }}>recherche</em>.</h2>
          <p className="lead mt-16">Décrivez le bien idéal. Nous activons notre réseau de propriétaires et de notaires, et vous présentons des biens qui ne sont pas en ligne — dossier vérifié dès la première visite.</p>
        </div>
        <div className="row wrap">
          <Link to="/recherche-sur-mesure" className="btn btn-sand btn-lg">Décrire mon projet <ArrowRight size={18} /></Link>
          <Link to="/accompagnement" className="btn btn-outline-white btn-lg">Notre méthode</Link>
        </div>
      </div>
    </section>
  )
}

export function Pagination({ page, pages, onChange }: { page: number; pages: number; onChange: (p: number) => void }) {
  if (pages <= 1) return null
  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
        <button key={p} className={p === page ? 'on' : ''} onClick={() => onChange(p)} aria-current={p === page ? 'page' : undefined}>{p}</button>
      ))}
    </div>
  )
}

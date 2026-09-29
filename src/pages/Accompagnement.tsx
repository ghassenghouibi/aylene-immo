import { Link } from 'react-router-dom'
import { AdvisorCard, PROMISES, Steps, Testimonials } from '../components/Blocks'
import { ArrowRight, Check, X } from '../components/Icons'
import { ADVISORS } from '../data/agence'
import { DOSSIER_ITEMS } from '../lib/trust'
import './Static.css'

const COMPARE: [string, boolean, boolean][] = [
  ['Titre de propriété consulté avant publication', true, false],
  ['Vérification de l\'absence d\'hypothèque', true, false],
  ['Prix au m² comparé à la médiane du quartier', true, false],
  ['Un conseiller unique du début à la fin', true, false],
  ['Plan de financement négocié avec les banques', true, false],
  ['Relecture des actes avant signature', true, false],
  ['Visites groupées sur une demi-journée', true, false],
  ['Des centaines d\'annonces à trier soi-même', false, true],
]

export default function Accompagnement() {
  return (
    <div>
      <div className="container page-head">
        <div className="crumb"><Link to="/">Accueil</Link> · Notre méthode</div>
        <div className="eyebrow">Notre méthode</div>
        <h1 className="h-section">Moins d'annonces. <em>Plus de preuves.</em></h1>
        <p className="lead mt-16">Aylene est une agence indépendante qui a choisi de ne publier que des biens dont elle a vérifié le dossier. Ce choix nous coûte du volume ; il vous fait gagner du temps, de l'argent et de la sérénité.</p>
      </div>

      <div className="container">
        <div className="promises">
          {PROMISES.map((p) => (
            <div key={p.title} className="promise"><span className="promise-ic">{p.icon}</span><div><div className="h-card">{p.title}</div><p className="small muted mt-8">{p.text}</p></div></div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Le parcours</div><h2 className="h-section">Cinq étapes, un interlocuteur</h2></div></div>
          <Steps />
        </div>
      </section>

      <section className="section section-white">
        <div className="container dossier-grid">
          <div>
            <div className="eyebrow">Le dossier de confiance</div>
            <h2 className="h-section">Six pièces, <em>vérifiées avant</em> la mise en ligne</h2>
            <p className="lead mt-16">Chaque fiche affiche l'état du dossier. Complet, avancé ou en cours : vous savez toujours où en est la vérification, et ce qu'il reste à obtenir.</p>
            <Link to="/acheter?dossier=1" className="btn btn-primary mt-24">Voir les biens au dossier complet <ArrowRight size={16} /></Link>
          </div>
          <ul className="dossier-list">
            {DOSSIER_ITEMS.map((it, i) => (
              <li key={it.key}><span className="serif dossier-n">0{i + 1}</span><div><strong>{it.label}</strong><p className="small muted mt-8">{it.detail}</p></div></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Comparer</div><h2 className="h-section">Aylene face à une agence classique</h2></div></div>
          <div className="card compare">
            <div className="compare-row compare-head tiny muted"><span /><span>Aylene</span><span>Agence classique</span></div>
            {COMPARE.map(([label, a, b]) => (
              <div key={label} className="compare-row"><span>{label}</span><span className={a ? 'yes' : 'no'}>{a ? <Check size={18} /> : <X size={18} />}</span><span className={b ? 'yes' : 'no'}>{b ? <Check size={18} /> : <X size={18} />}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">L'équipe</div><h2 className="h-section">Trois conseillers, <em>trois expertises</em></h2></div></div>
          <div className="grid grid-3">{ADVISORS.map((a) => <AdvisorCard key={a.id} a={a} />)}</div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Témoignages</div><h2 className="h-section">Ils racontent</h2></div></div>
          <Testimonials />
        </div>
      </section>
    </div>
  )
}

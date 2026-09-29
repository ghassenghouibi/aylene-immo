import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Facebook, Instagram, Linkedin, Mail, Phone, Pin } from './Icons'
import { AGENCE } from '../data/agence'
import { ZONES } from '../data/zones'

export default function Footer() {
  return (
    <footer style={{ background: '#fff', borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
      <div className="container" style={{ paddingBlock: 64 }}>
        <div className="grid" style={{ gridTemplateColumns: 'minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))', gap: 40 }}>
          <div>
            <Logo height={26} />
            <p className="muted mt-16" style={{ maxWidth: 34 + 'ch' }}>
              Agence immobilière indépendante du Grand Tunis. Moins d'annonces, plus de preuves : chaque bien est vendu avec un dossier vérifié et un prix justifié.
            </p>
            <div className="row mt-24" style={{ gap: 14, color: 'var(--muted)' }}>
              <a href="#" aria-label="Instagram"><Instagram size={19} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={19} /></a>
              <a href="#" aria-label="Facebook"><Facebook size={19} /></a>
            </div>
          </div>
          <div>
            <div className="tiny muted" style={{ marginBottom: 14 }}>Le site</div>
            <ul className="col" style={{ gap: 9, fontSize: 14.5 }}>
              <li><Link to="/acheter">Acheter</Link></li>
              <li><Link to="/louer">Louer</Link></li>
              <li><Link to="/estimer">Estimer mon bien</Link></li>
              <li><Link to="/accompagnement">Notre méthode</Link></li>
              <li><Link to="/recherche-sur-mesure">Recherche sur-mesure</Link></li>
            </ul>
          </div>
          <div>
            <div className="tiny muted" style={{ marginBottom: 14 }}>Quartiers</div>
            <ul className="col" style={{ gap: 9, fontSize: 14.5 }}>
              {ZONES.slice(0, 7).map((z) => <li key={z.slug}><Link to={`/acheter?zone=${z.slug}`}>{z.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <div className="tiny muted" style={{ marginBottom: 14 }}>Nous joindre</div>
            <ul className="col" style={{ gap: 11, fontSize: 14.5 }}>
              <li className="row" style={{ gap: 8, alignItems: 'flex-start' }}><Pin size={16} /> <span>{AGENCE.address}</span></li>
              <li className="row" style={{ gap: 8 }}><Phone size={16} /> <a href={`tel:${AGENCE.phone.replace(/\s/g, '')}`}>{AGENCE.phone}</a></li>
              <li className="row" style={{ gap: 8 }}><Mail size={16} /> <a href={`mailto:${AGENCE.email}`}>{AGENCE.email}</a></li>
              <li className="muted small">{AGENCE.hours}</li>
            </ul>
          </div>
        </div>
        <div className="hr mt-48" />
        <div className="row between wrap small muted" style={{ paddingTop: 20 }}>
          <span>© {new Date().getFullYear()} Aylene. Site de démonstration — annonces fictives.</span>
          <span className="row" style={{ gap: 18 }}><a href="#">Mentions légales</a><a href="#">Confidentialité</a></span>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { footer .grid { grid-template-columns: 1fr 1fr !important; } } @media (max-width: 560px) { footer .grid { grid-template-columns: 1fr !important; } }`}</style>
    </footer>
  )
}
